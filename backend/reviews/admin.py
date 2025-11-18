from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['customer', 'performer', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['customer__username', 'performer__name', 'review_text']
