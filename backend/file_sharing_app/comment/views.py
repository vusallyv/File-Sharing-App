from django.shortcuts import render

# Create your views here.

from file.models import File


def index_view(request):
    return render(request, 'index.html', {
        'rooms': File.objects.all(),
    })


def room_view(request, room_name):
    chat_room, created = File.objects.get_or_create(name=room_name)
    return render(request, 'room.html', {
        'room': chat_room,
    })