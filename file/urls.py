from django.urls import path
from file import views


urlpatterns = [
    path('myfiles/', views.MyFilesView.as_view(), name='myfiles'),
    # path('files/', views.MyFilesView.as_view(), name='myfiles'),
    path('myfiles/<int:pk>/', views.FileDetailView.as_view(), name='file_detail'),
    path('myfiles/comment/<int:pk>/', views.FileCommentView.as_view(), name='file_comment'),
]
