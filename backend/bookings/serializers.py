from rest_framework import serializers
from .models import Booking
from performers.serializers import PerformerListSerializer
from accounts.serializers import UserSerializer


class BookingSerializer(serializers.ModelSerializer):
    performer_details = PerformerListSerializer(source='performer', read_only=True)
    customer_details = UserSerializer(source='customer', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'customer', 'performer', 'event_type', 'event_date', 'event_location',
            'event_duration', 'budget', 'additional_details', 'status', 'performer_details',
            'customer_details', 'created_at', 'updated_at'
        ]
        read_only_fields = ['customer', 'status', 'created_at', 'updated_at']


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'performer', 'event_type', 'event_date', 'event_location',
            'event_duration', 'budget', 'additional_details'
        ]

