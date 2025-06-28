from rest_framework import routers
from .views import UserViewSet, PropertyViewSet, PropertyImageViewSet, FeatureViewSet, RegisterView, LoginView, ContactMessageViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'images', PropertyImageViewSet)
router.register(r'features', FeatureViewSet)
router.register(r'contact-messages', ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
] 