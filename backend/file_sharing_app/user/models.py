import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.conf import settings

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True, null=False, blank=False)
    uuid = models.CharField(max_length=255, unique=True, null=True, blank=True)
    is_online = models.BooleanField(default=False)

    def __str__(self):
        return self.username

    def generate_uuid(self):
        return str(uuid.uuid4())

    def get_online_count(self):
        return self.online.count()

    def join(self, user):
        self.online.add(user)
        self.save()

    def leave(self, user):
        self.online.remove(user)
        self.save()

    def save(self, *args, **kwargs):
        if not self.uuid:
            self.uuid = self.generate_uuid()
        super().save(*args, **kwargs)


class UserInfo(models.Model):
    info = models.JSONField(default=dict)

    def __str__(self):
        return str(self.info)

    class Meta:
        verbose_name = 'User Info'
        verbose_name_plural = 'User Info'
    