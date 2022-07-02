from django.contrib import admin

# Register your models here.

from .models import User


class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ['username', 'email', 'is_staff']


admin.site.register(User, UserAdmin)