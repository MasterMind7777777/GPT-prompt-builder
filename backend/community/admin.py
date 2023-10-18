from django.contrib import admin
from .models import CommunityShare, CommentFeedback

# Customize how the CommunityShare model appears in the admin interface
class CommunityShareAdmin(admin.ModelAdmin):
    list_display = ('shared_by_user', 'shared_with_user', 'template', 'part', 'date_shared')
    list_filter = ('date_shared',)
    search_fields = ['shared_by_user__username', 'shared_with_user__username', 'template__name', 'part__name']

# Customize how the CommentFeedback model appears in the admin interface
class CommentFeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'template', 'part', 'date_commented')
    list_filter = ('date_commented',)
    search_fields = ['user__username', 'template__name', 'part__name']
    raw_id_fields = ('parent_comment',)  # Useful if you expect a large number of comments

# Register the models with the customized view classes
admin.site.register(CommunityShare, CommunityShareAdmin)
admin.site.register(CommentFeedback, CommentFeedbackAdmin)
