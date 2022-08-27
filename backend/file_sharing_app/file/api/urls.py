from django.urls import path

from file.api.views import FileView, FileAccessView, FileCommentView


urlpatterns = [
    path('', FileView.as_view(), name='file'),
    path('<int:pk>/', FileView.as_view(), name='file_detail'),
    path('access/', FileAccessView.as_view(), name='file_access'),
    path('comment/', FileCommentView.as_view(), name='file_comment'),
    path('comment/<int:pk>/', FileCommentView.as_view(), name='file_comment_detail'),
]