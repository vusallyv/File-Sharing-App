from django.urls import path

from file.api.views import FileView, FileAccessView, FileCommentView


urlpatterns = [
    path('', FileView.as_view(), name='file'),
    path('<int:pk>/', FileView.as_view(), name='file_detail'),
    path('<int:pk>/access/', FileAccessView.as_view(), name='file_access'),
    path('<int:pk>/access/<int:access_id>', FileAccessView.as_view(), name='single_file_access'),
    path('comment/<int:pk>/', FileCommentView.as_view(), name='file_comment'),
]