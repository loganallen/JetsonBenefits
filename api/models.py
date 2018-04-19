from django.db import models
from django.db.models.signals import signals
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

# this code listens for a user creation and then creates a Token object for it
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
