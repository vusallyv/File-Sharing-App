from django.urls import path

from file.api.views import FileView, FileAccessView, FileCommentView


urlpatterns = [
    path('file/', FileView.as_view(), name='file'),
    path('file/<int:pk>/', FileView.as_view(), name='file_detail'),
    path('file/access/', FileAccessView.as_view(), name='file_access'),
    path('file/comment/', FileCommentView.as_view(), name='file_comment'),
    path('file/comment/<int:pk>/', FileCommentView.as_view(), name='file_comment_detail'),
]