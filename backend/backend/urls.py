from django.contrib import admin
from django.urls import path, include

api_patterns = [
    path('analytics/', include('analytics.urls', namespace='analytics')),
    path('community/', include('community.urls', namespace='community')),
    path('metadata/', include('metadata.urls', namespace='metadata')),
    path('prompt_templates/', include('prompt_templates.urls', namespace='prompt_templates')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v0/', include((api_patterns, 'api_v0'))),
]

