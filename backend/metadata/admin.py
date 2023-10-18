from django.contrib import admin
from .models import Prompt, Outcome, Tag

# Customize how the Prompt model appears in the admin interface
class PromptAdmin(admin.ModelAdmin):
    list_display = ('template', 'date_generated')
    list_filter = ('template', 'date_generated')
    search_fields = ['template__name']

# Customize how the Outcome model appears in the admin interface
class OutcomeAdmin(admin.ModelAdmin):
    list_display = ('prompt', 'generated_at', 'tool_used')
    list_filter = ('generated_at', 'tool_used')
    search_fields = ['prompt__template__name', 'tool_used']

# Customize how the Tag model appears in the admin interface
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ['name']

# Register the models with the customized view classes
admin.site.register(Prompt, PromptAdmin)
admin.site.register(Outcome, OutcomeAdmin)
admin.site.register(Tag, TagAdmin)

