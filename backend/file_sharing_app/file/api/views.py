from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from file.models import File, FileAccess, FileComment
from user.models import User
from .serializers import FileSerializer, FileAccessSerializer


class FileView(APIView):
    serializer = FileSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        get_object_or_404(File, pk=kwargs["pk"]) if "pk" in kwargs else None
        if "pk" in kwargs and (
            FileAccess.objects.filter(file=kwargs["pk"], user=request.user).exists()
            or File.objects.get(pk=kwargs["pk"]).user == request.user
        ):
            file = File.objects.get(pk=kwargs["pk"])
            serializer = self.serializer(file)
            return Response(serializer.data)
        files_ids = File.objects.filter(user=request.user).values_list("id", flat=True)
        file_accesses_ids = FileAccess.objects.filter(user=request.user).values_list(
            "file", flat=True
        )
        ids = list(files_ids) + list(file_accesses_ids)
        files = File.objects.filter(id__in=ids)
        serializer = self.serializer(files, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        file = File.objects.create(
            user=request.user,
            file=request.data["file"],
            name=request.data["file"],
            description=request.data["file"],
        )
        serializer = self.serializer(file)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs["id"])
        if file.user == request.user:
            file.delete()
            return Response(status=204)
        return Response(status=403)


class FileAccessView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer = FileAccessSerializer

    def get(self, request, *args, **kwargs):
        file = get_object_or_404(File, pk=kwargs["pk"])
        if (
            file.user == request.user
            or FileAccess.objects.filter(file=file, user=request.user).exists()
        ):
            file_access = FileAccess.objects.filter(file=file)
            serializer = self.serializer(file_access, many=True)
            return Response(serializer.data)
        return Response(status=403)

    def post(self, request, *args, **kwargs):
        file = File.objects.get(pk=kwargs["pk"])
        can_read: bool = request.data["can_read"]
        can_write_comment: bool = request.data["can_write_comment"]
        user = (
            get_object_or_404(User, username=request.data["user"])
            if "user" in request.data
            else None
        )
        if (
            not FileAccess.objects.filter(file=file, user=user).exists()
            and user != request.user
        ):
            FileAccess.objects.create(
                file=file,
                user=user,
                can_read=can_read,
                can_write_comment=can_write_comment,
            )
            return Response(status=201, data={'success': True, 'message': 'File access created'})
        elif user == request.user:
            return Response(status=403, data={'success': False, 'message': 'You can not add yourself'})
        elif FileAccess.objects.filter(file=file, user=user).exists():
            return Response(status=403, data={'success': False, 'message': 'File access already exists'})
        return Response(status=400, data={'success': False})

    def delete(self, request, *args, **kwargs):
        file = get_object_or_404(File, pk=kwargs["pk"])
        access_id = kwargs["access_id"]
        if file.user == request.user and FileAccess.objects.filter(
            file=file, id=access_id
        ).exists():
            FileAccess.objects.filter(file=file, pk=access_id).delete()
            return Response(status=202, data={"access_id": access_id})
        return Response(status=403)

    def put(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs["id"])
        can_read: bool = request.data["can_read"]
        can_write_comment: bool = request.data["can_write_comment"]
        user = User.objects.get(uuid=request.data["user_uuid"])
        if file.user == request.user:
            FileAccess.objects.filter(file=file, user=user).update(
                can_read=can_read, can_write_comment=can_write_comment
            )
            return Response(status=200)
        return Response(status=403)


class FileCommentView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, **kwargs):
        file = File.objects.get(id=kwargs["pk"])
        if (
            file.user == request.user
            or FileAccess.objects.filter(
                file=file, user=request.user, can_write_comment=True
            ).exists()
        ):
            FileComment.objects.create(
                file=file, user=request.user, comment=request.data["comment"]
            )
            return Response(status=200)
        return Response(status=403)

    def get(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs["id"])
        if (
            file.user == request.user
            or FileAccess.objects.filter(
                file=file, user=request.user, can_read=True
            ).exists()
        ):
            if "comment_id" in kwargs:
                comment = FileComment.objects.get(id=kwargs["comment_id"])
                serializer = self.serializer(comment)
                return Response(serializer.data)
            comments = FileComment.objects.filter(file=file)
            serializer = self.serializer(comments, many=True)
            return Response(serializer.data)
        return Response(status=403)

    def put(self, request, *args, **kwargs):
        get_object_or_404(File, pk=kwargs["id"])
        comment = get_object_or_404(FileComment, pk=kwargs["comment_id"])
        if comment.user == request.user:
            comment.comment = request.data["comment"]
            comment.edited_by = request.user
            comment.edited_at = datetime.now()
            comment.save()
            return Response(status=200)
        return Response(status=403)

    def delete(self, request, *args, **kwargs):
        file = File.objects.get(id=kwargs["id"])
        comment = FileComment.objects.get(id=kwargs["comment_id"])
        if file.user == request.user or comment.user == request.user:
            comment.deleted_at = datetime.now()
            comment.deleted_by = request.user
            comment.save()
            return Response(status=204)
        return Response(status=403)
