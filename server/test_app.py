import pytest
import json
from app import app, db

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

@pytest.fixture
def farmer_token(client):
    farmer_data = {
        "name": "Mohammed Guyo",
        "email": "mohammedhassanguyo@gmail.com",
        "password": "password",
        "phone_number": "0710749935",
        "role": "farmer"
    }
    client.post('/register', json=farmer_data)
    res = client.post('/login', json={"email": farmer_data["email"], "password": farmer_data["password"]})
    return json.loads(res.data)["token"]

@pytest.fixture
def user_token(client):
    user_data = {
        "name": "Habiba Guyo",
        "email": "habibahassanguto10@gmail.com",
        "password": "password",
        "phone_number": "0747825645",
        "role": "user"
    }
    client.post('/register', json=user_data)
    res = client.post('/login', json={"email": user_data["email"], "password": user_data["password"]})
    return json.loads(res.data)["token"]

def add_animal(client, token):
    animal_data = {
        "type": "cow",
        "breed": "Angus",
        "age": 3,
        "price": 1500,
        "part": "whole"
    }
    res = client.post('/animals', json=animal_data, headers={"Authorization": f"Bearer {token}"})
    return res

def test_farmer_add_animal(client, farmer_token):
    res = add_animal(client, farmer_token)
    assert res.status_code == 201
    data = json.loads(res.data)
    assert data['type'] == 'cow'
    assert data['breed'] == 'Angus'

def test_farmer_update_animal(client, farmer_token):
    res = add_animal(client, farmer_token)
    animal_id = json.loads(res.data)['id']

    update_data = {"price": 1800}
    res = client.patch(f'/animals/{animal_id}', json=update_data, headers={"Authorization": f"Bearer {farmer_token}"})
    assert res.status_code == 200
    data = json.loads(res.data)
    assert data['price'] == 1800

def test_user_view_animals(client, farmer_token):
    add_animal(client, farmer_token)
    res = client.get('/animals')
    assert res.status_code == 200
    data = json.loads(res.data)
    assert len(data) > 0

def test_user_search_filter_animals(client, farmer_token):
    add_animal(client, farmer_token)
    res = client.get('/animals?type=cow&breed=Angus')
    assert res.status_code == 200
    data = json.loads(res.data)
    assert all(animal['type'] == 'cow' and animal['breed'] == 'Angus' for animal in data)

def test_user_add_to_cart_and_place_order(client, farmer_token, user_token):
    res = add_animal(client, farmer_token)
    animal_id = json.loads(res.data)['id']

    cart_res = client.post('/cart', json={"animal_id": animal_id, "quantity": 1}, headers={"Authorization": f"Bearer {user_token}"})
    assert cart_res.status_code == 201

    order_res = client.post('/orders', headers={"Authorization": f"Bearer {user_token}"})
    assert order_res.status_code == 201
    order_data = json.loads(order_res.data)
    assert order_data['status'] == 'pending'

def test_farmer_confirm_reject_order(client, farmer_token, user_token):
    res = add_animal(client, farmer_token)
    animal_id = json.loads(res.data)['id']

    client.post('/cart', json={"animal_id": animal_id, "quantity": 1}, headers={"Authorization": f"Bearer {user_token}"})
    order_res = client.post('/orders', headers={"Authorization": f"Bearer {user_token}"})
    order_id = json.loads(order_res.data)['id']

    confirm_res = client.patch(f'/orders/{order_id}', json={"status": "confirmed"}, headers={"Authorization": f"Bearer {farmer_token}"})
    assert confirm_res.status_code == 200
    data = json.loads(confirm_res.data)
    assert data['status'] == 'confirmed'

def test_checkout_cart(client, farmer_token, user_token):
    res = add_animal(client, farmer_token)
    animal_id = json.loads(res.data)['id']

    client.post('/cart', json={"animal_id": animal_id, "quantity": 1}, headers={"Authorization": f"Bearer {user_token}"})

    checkout_res = client.post('/checkout', headers={"Authorization": f"Bearer {user_token}"})
    assert checkout_res.status_code == 200
    data = json.loads(checkout_res.data)
    assert data.get('message') == 'Checkout successful'
