from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'analytics'

router = DefaultRouter()
router.register(r'outcome-metrics', views.OutcomeMetricViewSet, basename='outcomemetric')
router.register(r'rankings', views.RankingViewSet, basename='ranking')

urlpatterns = [
    path('', include(router.urls)),
]

