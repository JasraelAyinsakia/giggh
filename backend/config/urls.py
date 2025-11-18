from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def api_root(request):
    """Root API endpoint that lists available endpoints"""
    return JsonResponse({
        'message': 'GigGH API',
        'version': '1.0',
        'endpoints': {
            'auth': '/api/auth/',
            'performers': '/api/performers/',
            'bookings': '/api/bookings/',
            'reviews': '/api/reviews/',
            'admin': '/admin/',
        }
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('api/', api_root, name='api-root-alt'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('performers.urls')),
    path('api/', include('bookings.urls')),
    path('api/', include('reviews.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

