from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db, Animal, User, Order, OrderItem, Cart, CartItem
from flask_sqlalchemy import SQLAlchemy

migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from routes import register_routes
    register_routes(app)

    @app.route('/')
    def index():
        return {"message": "Welcome to the Meat Marketplace API"}


    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
