from django.contrib import admin
from .models import OutcomeMetric, Ranking

# Customize how the OutcomeMetric model appears in the admin interface
class OutcomeMetricAdmin(admin.ModelAdmin):
    list_display = ('metric_type', 'value', 'outcome', 'template', 'part')
    list_filter = ('metric_type',)
    search_fields = ['metric_type', 'value']

# Customize how the Ranking model appears in the admin interface
class RankingAdmin(admin.ModelAdmin):
    list_display = ('user', 'score', 'template', 'part', 'ranked_at')
    list_filter = ('score', 'ranked_at')
    search_fields = ['user__username', 'template__name', 'part__name']

# Register the models with the customized view classes
admin.site.register(OutcomeMetric, OutcomeMetricAdmin)
admin.site.register(Ranking, RankingAdmin)

