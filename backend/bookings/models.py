from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator

User = get_user_model()


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    EVENT_TYPE_CHOICES = [
        ('Birthday', 'Birthday'),
        ('Wedding', 'Wedding'),
        ('Anniversary', 'Anniversary'),
        ('Corporate', 'Corporate'),
        ('Other', 'Other'),
    ]

    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    performer = models.ForeignKey('performers.Performer', on_delete=models.CASCADE, related_name='bookings')
    event_type = models.CharField(max_length=50, choices=EVENT_TYPE_CHOICES)
    event_date = models.DateField()
    event_location = models.CharField(max_length=500)
    event_duration = models.IntegerField(validators=[MinValueValidator(1)], blank=True, null=True)
    budget = models.CharField(max_length=50, blank=True)
    additional_details = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.customer.username} - {self.performer.name} - {self.event_date}"
