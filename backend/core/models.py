from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

class Recording(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('done', 'Done'),
        ('failed', 'Failed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file = models.FileField(upload_to='recordings/')
    report = models.JSONField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    analysis_result = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.file.name}"
