from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import User, Property, PropertyImage, Feature, ContactMessage
from .serializers import UserSerializer, PropertySerializer, PropertyCreateSerializer, PropertyImageSerializer, FeatureSerializer, ContactMessageSerializer
from rest_framework import mixins
from rest_framework.decorators import action

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer
    permission_classes = [permissions.AllowAny]

class PropertyImageViewSet(viewsets.ModelViewSet):
    queryset = PropertyImage.objects.all()
    serializer_class = PropertyImageSerializer
    permission_classes = [permissions.AllowAny]

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().select_related('owner').prefetch_related('features', 'images')
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == 'create':
            return PropertyCreateSerializer
        return PropertySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        owner = self.request.query_params.get('owner')
        if owner:
            queryset = queryset.filter(owner__id=owner)
        return queryset

    def create(self, request, *args, **kwargs):
        # Get the user from the request
        user_id = request.data.get('owner')
        
        if not user_id:
            return Response({'error': 'Owner is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Create the property
        property_data = {
            'title': request.data.get('title'),
            'price': request.data.get('price'),
            'city': request.data.get('city'),
            'type': request.data.get('type'),
            'description': request.data.get('description', ''),
            'owner': user.id
        }
        
        serializer = self.get_serializer(data=property_data)
        if serializer.is_valid():
            property_obj = serializer.save()
            
            # Handle features
            features_data = request.data.get('features', [])
            if isinstance(features_data, str):
                features_data = [f.strip() for f in features_data.split(',') if f.strip()]
            
            for feature_name in features_data:
                feature, created = Feature.objects.get_or_create(name=feature_name)
                property_obj.features.add(feature)
            
            # Handle images
            images_data = request.data.get('images', [])
            for image_url in images_data:
                PropertyImage.objects.create(property=property_obj, image=image_url)
            
            # Return the full property data using the read serializer
            read_serializer = PropertySerializer(property_obj)
            return Response(read_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Update basic property data
        property_data = {
            'title': request.data.get('title', instance.title),
            'price': request.data.get('price', instance.price),
            'city': request.data.get('city', instance.city),
            'type': request.data.get('type', instance.type),
            'description': request.data.get('description', instance.description),
            'owner': instance.owner.id  # Keep the same owner
        }
        
        serializer = self.get_serializer(instance, data=property_data, partial=True)
        if serializer.is_valid():
            property_obj = serializer.save()
            
            # Handle features update
            features_data = request.data.get('features', [])
            if isinstance(features_data, str):
                features_data = [f.strip() for f in features_data.split(',') if f.strip()]
            
            # Clear existing features and add new ones
            property_obj.features.clear()
            for feature_name in features_data:
                feature, created = Feature.objects.get_or_create(name=feature_name)
                property_obj.features.add(feature)
            
            # Handle images update (optional - only if provided)
            images_data = request.data.get('images', [])
            if images_data:
                # Clear existing images and add new ones
                property_obj.images.all().delete()
                for image_url in images_data:
                    PropertyImage.objects.create(property=property_obj, image=image_url)
            
            # Return the full property data using the read serializer
            read_serializer = PropertySerializer(property_obj)
            return Response(read_serializer.data)
        else:
            print(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        password = request.data.get('password')
        if not first_name or not last_name or not email or not password:
            return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(
            username=email,
            email=email,
            name=f"{first_name} {last_name}",
            first_name=first_name,
            last_name=last_name,
            password=password
        )
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'error': 'Email and password required.'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(request, username=email, password=password)
        if user is not None:
            return Response(UserSerializer(user).data)
        else:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]
