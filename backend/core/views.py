from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import Recording
from .serializers import RecordingSerializer
import os

class RecordingViewSet(viewsets.ModelViewSet):
    serializer_class = RecordingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Recording.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        uploaded_files = request.FILES.getlist('files') or request.FILES.getlist('file')
        if not uploaded_files:
            return Response({'error': 'No files uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        created = []
        for f in uploaded_files:
            recording = Recording.objects.create(
                user=request.user,
                file=f,
                status='pending',
                report={
                    "file_name": f.name,
                    "analysis": "Sample AI output for demo"
                }
            )
            recording.status = 'done'
            recording.save()
            created.append(RecordingSerializer(recording).data)

        return Response(created, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        """Delete single recording and its file"""
        instance = self.get_object()

        # Delete the physical file if it exists
        if instance.file and os.path.isfile(instance.file.path):
            os.remove(instance.file.path)

        instance.delete()
        return Response(
            {"detail": "Recording and associated data deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )

    @action(detail=False, methods=['post'])
    def bulk_delete(self, request):
        """Delete multiple recordings by IDs"""
        ids = request.data.get('ids', [])
        if not isinstance(ids, list) or not ids:
            return Response(
                {"detail": "Please provide a list of recording IDs to delete."},
                status=status.HTTP_400_BAD_REQUEST
            )

        recordings = Recording.objects.filter(user=request.user, id__in=ids)
        deleted_count = 0

        for recording in recordings:
            if recording.file and os.path.isfile(recording.file.path):
                os.remove(recording.file.path)
            recording.delete()
            deleted_count += 1

        return Response(
            {"detail": f"Deleted {deleted_count} recording(s)."},
            status=status.HTTP_200_OK
        )
