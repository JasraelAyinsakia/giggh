from rest_framework import serializers
from .models import Performer


class PerformerSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Performer
        fields = [
            'id', 'name', 'bio', 'category', 'sub_category', 'price_tier', 'exact_price',
            'years_experience', 'location', 'areas_served', 'profile_photo', 'video_urls',
            'skills', 'rating', 'review_count', 'is_verified', 'user_email', 'user_username',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['rating', 'review_count', 'created_at', 'updated_at']


class PerformerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Performer
        fields = [
            'id', 'name', 'category', 'sub_category', 'price_tier', 'exact_price',
            'rating', 'review_count', 'years_experience', 'location', 'profile_photo'
        ]

