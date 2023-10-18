from django.contrib import admin
from .models import Template, TemplatePart

# Inline class to represent TemplatePart inside the Template admin view
class TemplatePartInline(admin.TabularInline):
    model = TemplatePart
    extra = 1  # How many rows to show for empty linked records
    fields = ['content', 'order', 'type']

# Customize how the Template model appears in the admin interface
class TemplateAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'visibility', 'date_created', 'last_modified')
    list_filter = ('visibility', 'date_created', 'last_modified')
    search_fields = ['name', 'user__username']
    inlines = [TemplatePartInline]  # Embed TemplatePart records
    readonly_fields = ('date_created', 'last_modified')  # make these fields read-only

# Customize how the TemplatePart model appears in the admin interface
class TemplatePartAdmin(admin.ModelAdmin):
    list_display = ('template', 'type', 'order')
    list_filter = ('type',)
    search_fields = ['template__name']

# Register the models with the customized view classes
admin.site.register(Template, TemplateAdmin)
admin.site.register(TemplatePart, TemplatePartAdmin)
