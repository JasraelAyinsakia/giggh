from django.db.models.signals import post_save
from django.dispatch import receiver
from bookings.models import Booking
from .services import EmailNotificationService


@receiver(post_save, sender=Booking)
def send_booking_notifications(sender, instance, created, **kwargs):
    """Send notifications when booking status changes"""
    if created:
        # New booking request
        EmailNotificationService.send_booking_request(instance)
    elif instance.status == 'confirmed':
        # Booking confirmed
        EmailNotificationService.send_booking_confirmation(instance)

