import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True, null=False, blank=False)
    uuid = models.CharField(max_length=255, unique=True, null=True, blank=True)

    def __str__(self):
        return self.username

    def generate_uuid(self):
        return str(uuid.uuid4())

    def save(self, *args, **kwargs):
        if not self.uuid:
            self.uuid = self.generate_uuid()
        super().save(*args, **kwargs)