from django.db import models
from django.conf import settings

from file_sharing_app.utils.base_model import BaseModel

# Create your models here.

class File(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='files/')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class FileAccess(BaseModel):
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    can_read = models.BooleanField(default=True)
    can_write_comment = models.BooleanField(default=False)

    def __str__(self):
        return self.file.name + ' - ' + self.user.username
        

class FileComment(BaseModel):
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.TextField()
    edited_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='edited_by')
    edited_at = models.DateTimeField(auto_now=True)
    deleted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='deleted_by')
    deleted_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.file.name + ' - ' + self.user.username + ' - ' + self.comment[:20] + '...'

    @property
    def is_deleted(self):
        return self.deleted_at is not None

    @property
    def is_edited(self):
        return self.edited_at is not None