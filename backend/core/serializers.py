from rest_framework import serializers
from .models import User, Property, PropertyImage, Feature, ContactMessage

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'first_name', 'last_name']

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'name']

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image']

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    features = FeatureSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Property
        fields = [
            'id', 'title', 'price', 'city', 'type', 'features', 'images', 'description', 'owner', 'created_at', 'updated_at'
        ]

class PropertyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = [
            'id', 'title', 'price', 'city', 'type', 'description', 'owner', 'created_at', 'updated_at'
        ]
        extra_kwargs = {
            'owner': {'required': True}
        }

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'property', 'name', 'email', 'message', 'created_at'] 