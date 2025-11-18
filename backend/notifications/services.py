from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from bookings.models import Booking


class EmailNotificationService:
    """
    Service for sending email notifications.
    Configure email backend in settings.py for production.
    """

    @staticmethod
    def send_booking_confirmation(booking):
        """Send booking confirmation email to customer"""
        subject = f'Booking Confirmation - {booking.performer.name}'
        message = f"""
        Dear {booking.customer.get_full_name() or booking.customer.username},
        
        Your booking request has been confirmed!
        
        Performer: {booking.performer.name}
        Event Type: {booking.event_type}
        Date: {booking.event_date}
        Location: {booking.event_location}
        
        GigGH team will contact you within 24 hours to finalize payment.
        
        Thank you for choosing GigGH!
        """
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [booking.customer.email],
            fail_silently=False,
        )

    @staticmethod
    def send_booking_request(booking):
        """Send booking request notification to performer"""
        subject = f'New Booking Request - {booking.event_type}'
        message = f"""
        Dear {booking.performer.name},
        
        You have received a new booking request!
        
        Customer: {booking.customer.get_full_name() or booking.customer.username}
        Event Type: {booking.event_type}
        Date: {booking.event_date}
        Location: {booking.event_location}
        Duration: {booking.event_duration} hours
        
        Please log in to your dashboard to accept or decline this booking.
        
        Best regards,
        GigGH Team
        """
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [booking.performer.user.email],
            fail_silently=False,
        )

    @staticmethod
    def send_booking_reminder(booking):
        """Send reminder 24 hours before event"""
        subject = f'Reminder: Event Tomorrow - {booking.performer.name}'
        message = f"""
        Dear {booking.customer.get_full_name() or booking.customer.username},
        
        This is a reminder that your event is scheduled for tomorrow!
        
        Performer: {booking.performer.name}
        Event Type: {booking.event_type}
        Date: {booking.event_date}
        Location: {booking.event_location}
        
        We hope you have a wonderful celebration!
        
        Best regards,
        GigGH Team
        """
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [booking.customer.email],
            fail_silently=False,
        )

    @staticmethod
    def send_payment_receipt(booking, payment):
        """Send payment receipt to customer"""
        subject = f'Payment Receipt - Booking #{booking.id}'
        message = f"""
        Dear {booking.customer.get_full_name() or booking.customer.username},
        
        Thank you for your payment!
        
        Booking Details:
        Performer: {booking.performer.name}
        Amount Paid: GH₵{payment.amount}
        Transaction ID: {payment.transaction_id}
        Date: {payment.payment_date}
        
        Your booking is confirmed. We look forward to your event!
        
        Best regards,
        GigGH Team
        """
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [booking.customer.email],
            fail_silently=False,
        )

    @staticmethod
    def send_refund_notification(booking, refund_amount):
        """Send refund notification"""
        subject = f'Refund Processed - Booking #{booking.id}'
        message = f"""
        Dear {booking.customer.get_full_name() or booking.customer.username},
        
        A refund of GH₵{refund_amount} has been processed for your booking.
        
        Booking Details:
        Performer: {booking.performer.name}
        Event Date: {booking.event_date}
        
        The refund will reflect in your account within 3-5 business days.
        
        If you have any questions, please contact us.
        
        Best regards,
        GigGH Team
        """
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [booking.customer.email],
            fail_silently=False,
        )


class SMSNotificationService:
    """
    Service for sending SMS notifications (optional).
    Requires Twilio or similar service integration.
    """
    
    @staticmethod
    def send_booking_confirmation_sms(booking):
        """Send SMS confirmation (to be implemented with Twilio)"""
        # TODO: Implement Twilio integration
        pass

