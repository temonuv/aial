from rest_framework import serializers
from .models import Recording

class RecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recording
        fields = ['id', 'user', 'file', 'report', 'status', 'created_at']
        read_only_fields = ['id', 'user', 'report', 'status', 'created_at']
