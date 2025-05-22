from flask import Blueprint, request, jsonify
from models import db, Animal, User
from flask_jwt_extended import jwt_required, get_jwt_identity

animal_bp = Blueprint('animal_bp', __name__)

@animal_bp.route('/', methods=['GET'])
def get_all_animals():
    # Query params for filtering
    animal_type = request.args.get('type')
    breed = request.args.get('breed')
    min_age = request.args.get('min_age', type=int)
    max_age = request.args.get('max_age', type=int)

    query = Animal.query

    if animal_type:
        query = query.filter(Animal.type.ilike(f'%{animal_type}%'))  # case-insensitive partial match

    if breed:
        query = query.filter(Animal.breed.ilike(f'%{breed}%'))

    if min_age is not None:
        query = query.filter(Animal.age >= min_age)

    if max_age is not None:
        query = query.filter(Animal.age <= max_age)

    animals = query.all()
    animals_list = [{
        'id': animal.id,
        'type': animal.type,
        'breed': animal.breed,
        'age': animal.age,
        'is_liver': animal.is_liver,
        'price': animal.price,
        'description': animal.description,
        'image_url': animal.image_url,
        'farmer_id': animal.farmer_id
    } for animal in animals]

    return jsonify(animals_list), 200


@animal_bp.route('/<int:animal_id>', methods=['GET'])
def get_animal(animal_id):
    animal = Animal.query.get_or_404(animal_id)
    return jsonify({
        'id': animal.id,
        'type': animal.type,
        'breed': animal.breed,
        'age': animal.age,
        'is_liver': animal.is_liver,
        'price': animal.price,
        'description': animal.description,
        'image_url': animal.image_url,
        'farmer_id': animal.farmer_id
    }), 200


@animal_bp.route('/', methods=['POST'])
@jwt_required()
def create_animal():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    if user.role != 'farmer':
        return jsonify({'error': 'Only farmers can create animals'}), 403

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing JSON in request'}), 400

    required_fields = ['type', 'breed', 'age', 'price']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    animal = Animal(
        type=data['type'],
        breed=data['breed'],
        age=data['age'],
        price=data['price'],
        is_liver=data.get('is_liver', False),
        description=data.get('description'),
        image_url=data.get('image_url'),
        farmer_id=user_id
    )

    db.session.add(animal)
    db.session.commit()

    return jsonify({'message': 'Animal created', 'animal_id': animal.id}), 201


@animal_bp.route('/<int:animal_id>', methods=['PUT'])
@jwt_required()
def update_animal(animal_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    animal = Animal.query.get_or_404(animal_id)

    if user.role != 'farmer' or animal.farmer_id != user_id:
        return jsonify({'error': 'Only the owner farmer can update this animal'}), 403

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Missing JSON in request'}), 400

    for field in ['type', 'breed', 'age', 'price', 'is_liver', 'description', 'image_url']:
        if field in data:
            setattr(animal, field, data[field])

    db.session.commit()

    return jsonify({'message': 'Animal updated'}), 200


@animal_bp.route('/<int:animal_id>', methods=['DELETE'])
@jwt_required()
def delete_animal(animal_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    animal = Animal.query.get_or_404(animal_id)

    if user.role != 'farmer' or animal.farmer_id != user_id:
        return jsonify({'error': 'Only the owner farmer can delete this animal'}), 403

    db.session.delete(animal)
    db.session.commit()

    return jsonify({'message': 'Animal deleted'}), 200
