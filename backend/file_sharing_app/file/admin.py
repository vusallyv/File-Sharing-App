from django.contrib import admin

from file.models import File, FileAccess, FileComment

# Register your models here.

class FileAccessInline(admin.TabularInline):
    model = FileAccess
    extra = 1


class FileCommentInline(admin.TabularInline):
    model = FileComment
    extra = 1


class FileAdmin(admin.ModelAdmin):
    model = File
    inlines = [FileAccessInline, FileCommentInline]
    list_display: list = ['name', 'user', 'created_at', 'updated_at']


admin.site.register(File, FileAdmin)
