from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = "community"

router = DefaultRouter()
router.register(r'community-shares', views.CommunityShareViewSet, basename='communityshare')
router.register(r'comment-feedbacks', views.CommentFeedbackViewSet, basename='commentfeedback')

urlpatterns = [
    path('', include(router.urls)),
]

