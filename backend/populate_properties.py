import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'estate.settings')
django.setup()

from core.models import User, Property, Feature, PropertyImage

def create_sample_data():
    # Create a test user if it doesn't exist
    user, created = User.objects.get_or_create(
        email='test@example.com',
        defaults={
            'username': 'test@example.com',
            'name': 'Test User',
            'first_name': 'Test',
            'last_name': 'User'
        }
    )
    
    if created:
        user.set_password('testpass123')
        user.save()
        print(f"Created user: {user.email}")
    else:
        print(f"User already exists: {user.email}")

    # Create some features
    features_data = ['3 BHK', 'Sea View', 'Gym', 'Parking', 'Pool', 'Garden', 'WiFi', 'Furnished', 'Studio', '2 BHK']
    features = []
    for feature_name in features_data:
        feature, created = Feature.objects.get_or_create(name=feature_name)
        features.append(feature)
        if created:
            print(f"Created feature: {feature_name}")

    # Create sample properties
    properties_data = [
        {
            'title': 'Luxury Apartment in Mumbai',
            'price': 12000000,
            'city': 'Mumbai',
            'type': 'Buy',
            'description': 'Beautiful luxury apartment with sea view and modern amenities.',
            'features': ['3 BHK', 'Sea View', 'Gym', 'Parking'],
            'images': [
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80'
            ]
        },
        {
            'title': 'Cozy Studio in Pune',
            'price': 18000,
            'city': 'Pune',
            'type': 'Rent',
            'description': 'Fully furnished studio apartment in prime location.',
            'features': ['Studio', 'Furnished', 'WiFi'],
            'images': [
                'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80'
            ]
        },
        {
            'title': 'Modern 2BHK in Bangalore',
            'price': 25000,
            'city': 'Bangalore',
            'type': 'Rent',
            'description': 'Modern 2BHK apartment with all amenities.',
            'features': ['2 BHK', 'Gym', 'Parking', 'Garden'],
            'images': [
                'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80'
            ]
        }
    ]

    for prop_data in properties_data:
        # Create property
        property_obj, created = Property.objects.get_or_create(
            title=prop_data['title'],
            defaults={
                'price': prop_data['price'],
                'city': prop_data['city'],
                'type': prop_data['type'],
                'description': prop_data['description'],
                'owner': user
            }
        )
        
        if created:
            # Add features
            for feature_name in prop_data['features']:
                feature = Feature.objects.get(name=feature_name)
                property_obj.features.add(feature)
            
            # Add images
            for image_url in prop_data['images']:
                PropertyImage.objects.create(property=property_obj, image=image_url)
            
            print(f"Created property: {property_obj.title}")
        else:
            print(f"Property already exists: {property_obj.title}")

if __name__ == '__main__':
    create_sample_data()
    print("Sample data creation completed!")