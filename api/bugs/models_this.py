from django.db import models

# class User(models.Model):
#     ROLE_CHOICES = [
#         ("USER", "User"),
#         ("ADMIN", "Admin"),
#     ]

#     name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES)
#     pwd_hash = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.name} ({self.email})"


# class Issue(models.Model):
#     SEVERITY_CHOICES = [
#         ("LOW", "Low"),
#         ("MEDIUM", "Medium"),
#         ("HIGH", "High"),
#         ("CRITICAL", "Critical"),
#     ]

#     STATUS_CHOICES = [
#         ("OPEN", "Open"),
#         ("IN_PROGRESS", "In Progress"),
#         ("RESOLVED", "Resolved"),
#         ("TESTING", "Testing"),
#         ("DEPLOYED", "Deployed"),
#         ("CLOSED", "Closed"),
#     ]

#     assignee = models.ForeignKey(
#         User,
#         null=True,
#         blank=True,
#         related_name="assigned_issues",
#         on_delete=models.SET_NULL,
#     )
#     reporter = models.ForeignKey(
#         User,
#         related_name="reported_issues",
#         on_delete=models.CASCADE,
#     )
#     title = models.CharField(max_length=255)
#     description = models.TextField(blank=True)
#     severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
#     status = models.CharField(
#         max_length=20,
#         choices=STATUS_CHOICES,
#         default="OPEN",
#     )
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.title} [{self.status}]"


# class Comment(models.Model):
#     author = models.ForeignKey(User, on_delete=models.CASCADE)
#     issue = models.ForeignKey(
#         Issue,
#         related_name="comments",
#         on_delete=models.CASCADE,
#     )
#     body = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"Comment by {self.author.name} on {self.issue.title}"


# class AuditLog(models.Model):
#     ENTITY_CHOICES = [
#         ("issue", "Issue"),
#         ("comment", "Comment"),
#     ]

#     ACTION_CHOICES = [
#         ("CREATED", "Created"),
#         ("UPDATED", "Updated"),
#         ("DELETED", "Deleted"),
#         ("STATUS_CHANGE", "Status Change"),
#     ]

#     entity_type = models.CharField(max_length=20, choices=ENTITY_CHOICES)
#     entity_id = models.IntegerField()  # flexible, app decides based on entity_type
#     action = models.CharField(max_length=20, choices=ACTION_CHOICES)
#     old_value = models.JSONField(null=True, blank=True)
#     new_value = models.JSONField(null=True, blank=True)
#     actor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.entity_type} {self.action} by {self.actor}"
