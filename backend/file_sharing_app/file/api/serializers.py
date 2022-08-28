from file.models import File, FileAccess
from rest_framework import serializers
from user.api.serializers import UserSerializer

class FileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()
    
    class Meta:
        model = File
        fields = ('id', 'user', 'name', 'description', 'created_at', 'updated_at', 'file')

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y, %H:%M:%S")

    def get_updated_at(self, obj):
        return obj.updated_at.strftime("%d/%m/%Y, %H:%M:%S")


class FileAccessSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    file = FileSerializer(read_only=True)
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()
    
    class Meta:
        model = FileAccess
        fields = ('id', 'user', 'file', 'can_read', 'can_write_comment', 'created_at', 'updated_at')

    def get_created_at(self, obj):
        return obj.created_at.strftime("%d/%m/%Y, %H:%M:%S")

    def get_updated_at(self, obj):
        return obj.updated_at.strftime("%d/%m/%Y, %H:%M:%S")
