from datetime import datetime, timedelta
import string
import socket
import os

from django.utils.crypto import get_random_string

from celery import shared_task

from file.models import File
from user.models import UserInfo


@shared_task
def create_user_info():
    hostname = socket.gethostname()    
    IPAddress = socket.gethostbyname(hostname)
    username =  os.getlogin()
    UserInfo.objects.using('users').create(
        info={
            'IPAddress': IPAddress,
            'hostname': hostname,
            'username': username,
        },
    )
    return 'User info created with success!'


@shared_task
def delete_file():
    files = File.objects.filter(created_at__lt=datetime.now() - timedelta(days=7))
    files.delete()
    return 'Files deleted with success!'