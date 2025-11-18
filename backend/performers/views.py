from rest_framework import viewsets
from rest_framework import filters
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Performer
from .serializers import PerformerSerializer, PerformerListSerializer


class PerformerViewSet(viewsets.ModelViewSet):
    queryset = Performer.objects.all()
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'sub_category', 'price_tier', 'location']
    search_fields = ['name', 'category', 'sub_category', 'bio', 'skills']
    ordering_fields = ['rating', 'exact_price', 'years_experience', 'created_at']
    ordering = ['-rating']

    def get_serializer_class(self):
        if self.action == 'list':
            return PerformerListSerializer
        return PerformerSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = self.queryset.order_by('-rating')[:6]
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '')
        performers = self.queryset.filter(
            name__icontains=query
        ) | self.queryset.filter(
            category__icontains=query
        ) | self.queryset.filter(
            sub_category__icontains=query
        )
        serializer = self.get_serializer(performers, many=True)
        return Response(serializer.data)
