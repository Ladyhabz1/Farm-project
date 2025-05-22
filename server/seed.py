from app import create_app
from models import db, Animal, OrderItem

# Create the app and push the application context
app = create_app()

animals_data = [
    {
        "type": "cow",
        "breed": "Angus",
        "age": 3,
        "is_liver": False,
        "part": "whole",
        "price": 1200.0,
        "image_url": "https://images.pexels.com/photos/4577861/pexels-photo-4577861.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "cow",
        "breed": "Angus",
        "age": None,
        "is_liver": True,
        "part": "liver",
        "price": 300.0,
        "image_url": "https://images.pexels.com/photos/6281495/pexels-photo-6281495.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "goat",
        "breed": "Boer",
        "age": 2,
        "is_liver": False,
        "part": "whole",
        "price": 300.0,
        "image_url": "https://images.pexels.com/photos/29405393/pexels-photo-29405393/free-photo-of-side-view-of-a-boer-goat-in-green-pasture.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "goat",
        "breed": "Boer",
        "age": None,
        "is_liver": True,
        "part": "liver",
        "price": 300.0,
        "image_url": "https://images.pexels.com/photos/18606644/pexels-photo-18606644/free-photo-of-meat-and-livers-at-butchery.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "sheep",
        "breed": "Merino",
        "age": 4,
        "is_liver": False,
        "part": "whole",
        "price": 400.0,
        "image_url": "https://images.pexels.com/photos/30331199/pexels-photo-30331199/free-photo-of-flock-of-sheep-grazing-in-pastoral-setting.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "chicken",
        "breed": "Rhode Island Red",
        "age": 1,
        "is_liver": False,
        "part": "whole",
        "price": 50.0,
        "image_url": "https://images.pexels.com/photos/29451700/pexels-photo-29451700/free-photo-of-close-up-portrait-of-a-brown-hen-in-natural-setting.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "cow",
        "breed": "Hereford",
        "age": 5,
        "is_liver": False,
        "part": "whole",
        "price": 1300.0,
        "image_url": "https://images.pexels.com/photos/13064130/pexels-photo-13064130.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "goat",
        "breed": "Nubian",
        "age": 3,
        "is_liver": False,
        "part": "whole",
        "price": 320.0,
        "image_url": "https://images.pexels.com/photos/16136576/pexels-photo-16136576/free-photo-of-two-baby-goats-lying-on-steps.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "sheep",
        "breed": "Suffolk",
        "age": 2,
        "is_liver": False,
        "part": "whole",
        "price": 450.0,
        "image_url": "https://images.pexels.com/photos/11010647/pexels-photo-11010647.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "chicken",
        "breed": "Leghorn",
        "age": 1,
        "is_liver": False,
        "part": "whole",
        "price": 45.0,
        "image_url": "https://images.pexels.com/photos/17780889/pexels-photo-17780889/free-photo-of-a-hen-on-a-farm.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "cow",
        "breed": "Limousin",
        "age": 4,
        "is_liver": False,
        "part": "whole",
        "price": 1250.0,
        "image_url": "https://images.pexels.com/photos/32135363/pexels-photo-32135363/free-photo-of-cows-grazing-under-shady-tree-in-germany.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        "type": "goat",
        "breed": "Kiko",
        "age": 2,
        "is_liver": False,
        "part": "whole",
        "price": 280.0,
        "image_url": "https://images.pexels.com/photos/32114495/pexels-photo-32114495/free-photo-of-dramatic-black-and-white-goat-showdown.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
]

if __name__ == "__main__":
    with app.app_context():
        print("Clearing old data...")
        OrderItem.query.delete()
        Animal.query.delete()
        db.session.commit()

        print("Seeding new animal data...")
        for data in animals_data:
            animal = Animal(**data)
            db.session.add(animal)

        db.session.commit()
        print(f"Seeded {len(animals_data)} animals into the database successfully.")
