from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from file.models import File, FileAccess, FileComment
from user.models import User
from .serializers import FileSerializer


class FileView(APIView):
    serializer = FileSerializer
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        if 'id' in kwargs and (File.objects.get(id=kwargs['id']).user == request.user or FileAccess.objects.filter(file=kwargs['id'], user=request.user).exists()):
            file = File.objects.get(id=kwargs['id'])
            serializer = self.serializer(file)
            return Response(serializer.data)
        files = File.objects.filter(user=request.user)
        serializer = self.serializer(files, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        file = File.objects.create(user=request.user, name=request.data['name'], file=request.data['file'])
        serializer = self.serializer(file)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs['id'])
        if file.user == request.user:
            file.delete()
            return Response(status=204)
        return Response(status=403)


class FileAccessView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs['id'])
        can_read: bool = request.data['can_read']
        can_write_comment: bool = request.data['can_write_comment']
        user = User.objects.get(uuid=request.data['user_uuid'])
        if file.user == request.user and not FileAccess.objects.filter(file=file, user=user).exists():
            FileAccess.objects.create(file=file, user=user, can_read=can_read, can_write_comment=can_write_comment)
            return Response(status=200)
        return Response(status=403)

    def delete(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs['id'])
        if file.user == request.user:
            FileAccess.objects.filter(file=file, user=request.user).delete()
            return Response(status=204)
        return Response(status=403)

    def put(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs['id'])
        can_read: bool = request.data['can_read']
        can_write_comment: bool = request.data['can_write_comment']
        user = User.objects.get(uuid=request.data['user_uuid'])
        if file.user == request.user:
            FileAccess.objects.filter(file=file, user=user).update(can_read=can_read, can_write_comment=can_write_comment)
            return Response(status=200)
        return Response(status=403)


class FileCommentView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs['pk'])
        if file.user == request.user or FileAccess.objects.filter(file=file, user=request.user, can_write_comment=True).exists():
            FileComment.objects.create(file=file, user=request.user, comment=request.data['comment'])
            return Response(status=200)
        return Response(status=403)

    def get(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs['id'])
        if file.user == request.user or FileAccess.objects.filter(file=file, user=request.user, can_read=True).exists():
            if 'comment_id' in kwargs:
                comment = FileComment.objects.get(id=kwargs['comment_id'])
                serializer = self.serializer(comment)
                return Response(serializer.data)
            comments = FileComment.objects.filter(file=file)
            serializer = self.serializer(comments, many=True)
            return Response(serializer.data)
        return Response(status=403)

    def put(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs['id'])
        comment = FileComment.objects.get(id=kwargs['comment_id'])
        if comment.user == request.user:
            comment.comment = request.data['comment']
            comment.edited_by = request.user
            comment.edited_at = datetime.now()
            comment.save()
            return Response(status=200)
        return Response(status=403)

    def delete(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs['id'])
        comment = FileComment.objects.get(id=kwargs['comment_id'])
        if file.user == request.user or comment.user == request.user:
            comment.deleted_at = datetime.now()
            comment.deleted_by = request.user
            comment.save()
            return Response(status=204)
        return Response(status=403)