from django.contrib import admin
from .models import Template, TemplatePart

# Customize how the Template model appears in the admin interface
class TemplateAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'visibility', 'date_created', 'last_modified')
    list_filter = ('visibility', 'date_created', 'last_modified')
    search_fields = ['name', 'user__username']
    readonly_fields = ('date_created', 'last_modified')  # make these fields read-only
    filter_horizontal = ('parts',)  # Add filter interface for ManyToManyField

# Customize how the TemplatePart model appears in the admin interface
class TemplatePartAdmin(admin.ModelAdmin):
    list_display = ('content', 'type', 'order')
    list_filter = ('type',)
    search_fields = ['content']

# Register the models with the customized view classes
admin.site.register(Template, TemplateAdmin)
admin.site.register(TemplatePart, TemplatePartAdmin)

