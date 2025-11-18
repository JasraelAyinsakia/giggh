from rest_framework import serializers
from .models import Review
from accounts.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    customer_details = UserSerializer(source='customer', read_only=True)

    class Meta:
        model = Review
        fields = [
            'id', 'booking', 'performer', 'customer', 'rating', 'review_text',
            'event_type', 'customer_details', 'created_at', 'updated_at'
        ]
        read_only_fields = ['customer', 'created_at', 'updated_at']


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['booking', 'performer', 'rating', 'review_text', 'event_type']

