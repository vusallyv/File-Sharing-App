
import os

from channels.auth import AuthMiddlewareStack  # new import
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

import comment.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'file_sharing_app.settings')

application = ProtocolTypeRouter({
  'http': get_asgi_application(),
  'websocket': AuthMiddlewareStack(  # new
        URLRouter(
            comment.routing.websocket_urlpatterns
        )
    ),  # new
})