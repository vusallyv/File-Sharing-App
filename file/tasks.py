from celery import shared_task
from django.utils import timezone
from datetime import timedelta

from file.models import File


@shared_task
def delete_files():
    files = File.objects.filter(
        uploaded_at__lte=timezone.now() - timedelta(days=7))
    files.delete()
