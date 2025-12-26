from django.utils import timezone
from django.db import models


class BaseModel(models.Model):

    """
    Abstract class to use for models, to keep common hooks and caching etc
    """

    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)


    class Meta:
        abstract=True    


    def save(self, *args, **kwargs):
        """Extend later, call hooks, capture logs, clear caches"""
        self.before_save()
        super().save(*args, **kwargs)
        self.after_save()
    
    def before_save(self, *args, **kwargs):
        pass

    def after_save(self, *args, **kwargs):
        pass