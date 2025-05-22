

def register_routes(app):
    from controllers.auth_controller import auth_bp
    from controllers.animal_controller import animal_bp
    from controllers.order_controller import order_bp
    

    # Register each blueprint with a URL prefix
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(animal_bp, url_prefix="/api/animals")
    app.register_blueprint(order_bp, url_prefix="/api/orders")
    
