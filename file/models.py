from django.db import models

# Create your models here.


class File(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    file = models.FileField(upload_to='files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class FileAccess(models.Model):
    file = models.ForeignKey(
        'file.File', on_delete=models.CASCADE, related_name='fileaccess')
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    can_see = models.BooleanField(default=True)
    can_comment = models.BooleanField(default=False)

    def __str__(self):
        if self.can_comment:
            return '{} can comment {}'.format(self.user, self.file)
        else:
            return '{} cannot comment {}'.format(self.user, self.file)

    class Meta:
        unique_together = ('file', 'user')


class Comment(models.Model):
    file = models.ForeignKey(
        'file.File', on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
