from django.contrib import admin

from file.models import File, FileAccess, Comment

# Register your models here.

admin.site.register([File, FileAccess, Comment])