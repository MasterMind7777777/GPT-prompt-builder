from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = "prompt_templates"

router = DefaultRouter()
router.register(r"templates", views.TemplateViewSet, basename='template')
router.register(r"template-parts", views.TemplatePartViewSet, basename='template-part')

urlpatterns = [
    path("", include(router.urls)),
]

