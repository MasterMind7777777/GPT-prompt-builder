from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = "metadata"

router = DefaultRouter()
router.register(r'tags', views.TagViewSet, basename='tag')
router.register(r'prompts', views.PromptViewSet, basename='prompt')
router.register(r'outcomes', views.OutcomeViewSet, basename='outcome')

urlpatterns = [
    path('', include(router.urls)),
]

