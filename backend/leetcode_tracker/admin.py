from django.contrib import admin
from .models import Experience

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('company', 'role', 'college', 'interview_year', 'final_outcome', 'created_at')
    search_fields = ('company', 'role', 'college', 'department', 'tags')
    list_filter = ('final_outcome', 'difficulty_rating', 'interview_type', 'interview_year')
