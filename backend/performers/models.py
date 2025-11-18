from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    sub_categories = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Performer(models.Model):
    PRICE_TIER_CHOICES = [
        ('Basic', 'Basic'),
        ('Standard', 'Standard'),
        ('Premium', 'Premium'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='performer_profile')
    name = models.CharField(max_length=200)
    bio = models.TextField()
    category = models.CharField(max_length=100)
    sub_category = models.CharField(max_length=100)
    price_tier = models.CharField(max_length=20, choices=PRICE_TIER_CHOICES)
    exact_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    years_experience = models.IntegerField(validators=[MinValueValidator(0)])
    location = models.CharField(max_length=200)
    areas_served = models.JSONField(default=list)
    profile_photo = models.ImageField(upload_to='performers/', blank=True, null=True)
    video_urls = models.JSONField(default=list)
    skills = models.JSONField(default=list)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    review_count = models.IntegerField(default=0)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-rating', '-created_at']

    def __str__(self):
        return self.name
