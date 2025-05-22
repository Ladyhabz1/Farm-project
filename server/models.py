from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# User Model
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'farmer' or 'user'
    contact_info = db.Column(db.String(200))

    animals = db.relationship('Animal', backref='farmer', lazy=True, cascade="all, delete-orphan")
    orders = db.relationship('Order', backref='user', lazy=True, cascade="all, delete-orphan")
    cart = db.relationship('Cart', backref='user', uselist=False, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.username}>"

# Animal Model
class Animal(db.Model):
    __tablename__ = 'animals'

    id = db.Column(db.Integer, primary_key=True)   
    type = db.Column(db.String, nullable=False)  # e.g., Cow, Goat, Chicken
    breed = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    is_liver = db.Column(db.Boolean, default=False)  # true = liver, false = meat
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String, nullable=False)
    part = db.Column(db.String, default='whole')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    farmer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    order_items = db.relationship('OrderItem', backref='animal', lazy=True, cascade="all, delete-orphan")
    cart_items = db.relationship('CartItem', backref='animal', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Animal {self.type} - {self.breed}>"

# Order Model
class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)    
    status = db.Column(db.String(50), default='pending')  # pending, confirmed, rejected
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    items = db.relationship('OrderItem', backref='order', lazy=True, cascade="all, delete-orphan")

    @property
    def total_price(self):
        return sum(item.animal.price * item.quantity for item in self.items)

    def __repr__(self):
        return f"<Order {self.id} - {self.status}>"

# OrderItem Model (many-to-many between Order and Animal)
class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<OrderItem Order#{self.order_id} Animal#{self.animal_id} Qty:{self.quantity}>"

# Cart Model
class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    items = db.relationship('CartItem', backref='cart', lazy=True, cascade="all, delete-orphan")

    @property
    def total_price(self):
        return sum(item.animal.price * item.quantity for item in self.items)

    def __repr__(self):
        return f"<Cart for User {self.user_id}>"

# CartItem Model
class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<CartItem Cart#{self.cart_id} Animal#{self.animal_id} Qty:{self.quantity}>"
