from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PerformerViewSet

router = DefaultRouter()
router.register(r'performers', PerformerViewSet, basename='performer')

urlpatterns = [
    path('', include(router.urls)),
]

