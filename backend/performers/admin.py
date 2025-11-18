from django.contrib import admin
from .models import Performer, Category


@admin.register(Performer)
class PerformerAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'sub_category', 'price_tier', 'rating', 'is_verified']
    list_filter = ['category', 'price_tier', 'is_verified']
    search_fields = ['name', 'category', 'sub_category']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
