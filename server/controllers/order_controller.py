from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Animal, Cart, CartItem, Order, OrderItem

order_bp = Blueprint('order', __name__)

# ========== CART ROUTES ==========

# Add animal to cart
@order_bp.route('/cart/add', methods=['POST'])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'user':
        return jsonify({'error': 'Only users can add to cart'}), 403

    data = request.get_json()
    animal_id = data.get('animal_id')
    quantity = data.get('quantity', 1)

    if not animal_id or not isinstance(quantity, int) or quantity <= 0:
        return jsonify({'error': 'Invalid animal_id or quantity'}), 400

    animal = Animal.query.get_or_404(animal_id)

    if not user.cart:
        cart = Cart(user_id=user.id)
        db.session.add(cart)
        db.session.commit()
    else:
        cart = user.cart

    cart_item = CartItem.query.filter_by(cart_id=cart.id, animal_id=animal_id).first()
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id=cart.id, animal_id=animal_id, quantity=quantity)
        db.session.add(cart_item)

    db.session.commit()
    return jsonify({'message': f'Added {quantity} of animal {animal_id} to cart'}), 200


# Checkout cart (place order)
@order_bp.route('/cart/checkout', methods=['POST'])
@jwt_required()
def checkout_cart():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'user':
        return jsonify({'error': 'Only users can checkout'}), 403

    cart = user.cart
    if not cart or not cart.items:
        return jsonify({'error': 'Cart is empty'}), 400

    order = Order(user_id=user.id, status='pending')
    db.session.add(order)
    db.session.commit()  # commit early to get order.id for foreign keys

    for item in cart.items:
        order_item = OrderItem(order_id=order.id, animal_id=item.animal_id, quantity=item.quantity)
        db.session.add(order_item)

    db.session.commit()  # commit all order items

    # Clear the cart after checkout
    CartItem.query.filter_by(cart_id=cart.id).delete()
    db.session.commit()

    # Return order info including total_price property
    return jsonify({
        'message': 'Order placed successfully',
        'order_id': order.id,
        'total_price': order.total_price
    }), 201


# ========== ORDER ROUTES ==========

@order_bp.route('/', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.role == 'farmer':
        # Orders for animals owned by this farmer
        orders = Order.query.join(OrderItem).join(Animal).filter(Animal.farmer_id == user_id).all()
    else:
        orders = Order.query.filter_by(user_id=user_id).all()

    orders_list = []
    for order in orders:
        items = []
        for item in order.items:
            items.append({
                "animal_id": item.animal_id,
                "animal_type": item.animal.type,
                "quantity": item.quantity,
                "price": item.animal.price,
                "subtotal": item.quantity * item.animal.price
            })
        orders_list.append({
            "order_id": order.id,
            "status": order.status,
            "created_at": order.created_at.isoformat(),
            "total_price": order.total_price,
            "items": items
        })

    return jsonify(orders_list), 200


@order_bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != 'user':
        return jsonify({"error": "Only users can create orders."}), 403

    data = request.get_json()
    items_data = data.get('items')

    if not items_data or not isinstance(items_data, list):
        return jsonify({"error": "Order items must be provided as a list."}), 400

    new_order = Order(user_id=user_id, status='pending')
    db.session.add(new_order)
    db.session.commit()  # commit to get new_order.id

    for item_data in items_data:
        animal_id = item_data.get('animal_id')
        quantity = item_data.get('quantity')

        if not animal_id or not isinstance(quantity, int) or quantity <= 0:
            return jsonify({"error": "Invalid animal_id or quantity"}), 400

        animal = Animal.query.get(animal_id)
        if not animal:
            return jsonify({"error": f"Animal with id {animal_id} not found"}), 404

        order_item = OrderItem(order_id=new_order.id, animal_id=animal_id, quantity=quantity)
        db.session.add(order_item)

    db.session.commit()

    return jsonify({
        "message": "Order created successfully",
        "order_id": new_order.id,
        "total_price": new_order.total_price
    }), 201


@order_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_order_status(id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    order = Order.query.get_or_404(id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    new_status = data.get('status')

    if user.role != 'farmer':
        return jsonify({"error": "Only farmers can update order status."}), 403

    owns_animals = any(item.animal.farmer_id == user_id for item in order.items)
    if not owns_animals:
        return jsonify({"error": "You cannot update orders not related to your animals."}), 403

    if new_status not in ['pending', 'confirmed', 'rejected']:
        return jsonify({"error": "Invalid status."}), 400

    order.status = new_status
    db.session.commit()
    return jsonify({"message": f"Order status updated to {new_status}"}), 200


@order_bp.route('/orders/<int:order_id>/confirm', methods=['PUT'])
@jwt_required()
def confirm_order(order_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != 'farmer':
        return jsonify({'error': 'Only farmers can confirm orders'}), 403

    order = Order.query.get_or_404(order_id)
    # Farmers don’t own order directly; check if any order items have animals owned by this farmer
    owns_animals = any(item.animal.farmer_id == user_id for item in order.items)
    if not owns_animals:
        return jsonify({'error': 'Not your order'}), 403

    order.status = 'confirmed'
    db.session.commit()
    return jsonify({'message': 'Order confirmed'}), 200


@order_bp.route('/orders/<int:order_id>/reject', methods=['PUT'])
@jwt_required()
def reject_order(order_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != 'farmer':
        return jsonify({'error': 'Only farmers can reject orders'}), 403

    order = Order.query.get_or_404(order_id)
    owns_animals = any(item.animal.farmer_id == user_id for item in order.items)
    if not owns_animals:
        return jsonify({'error': 'Not your order'}), 403

    order.status = 'rejected'
    db.session.commit()
    return jsonify({'message': 'Order rejected'}), 200
