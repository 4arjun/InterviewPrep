from django.db import models

class Experience(models.Model):
    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    interview_type = models.CharField(max_length=50)
    job_location = models.CharField(max_length=100, blank=True)
    offered_package = models.CharField(max_length=100, blank=True)
    
    college = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    graduation_year = models.IntegerField()
    cgpa = models.CharField(max_length=10, blank=True)
    resume_link = models.URLField(blank=True)

    interview_month = models.CharField(max_length=20)
    interview_year = models.IntegerField()
    number_of_rounds = models.IntegerField()

    rounds = models.JSONField()  # You can also create a separate Round model

    final_outcome = models.CharField(max_length=50)
    offer_accepted = models.BooleanField()
    number_of_offers = models.IntegerField()

    preparation_strategy = models.TextField(blank=True)
    what_to_do_differently = models.TextField(blank=True)
    tips_for_juniors = models.TextField(blank=True)

    tags = models.JSONField(default=list)
    difficulty_rating = models.CharField(max_length=50)
    preparation_time = models.CharField(max_length=50)

    show_profile = models.BooleanField(default=False)
    agree_to_terms = models.BooleanField(default=False)

    author_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company} - {self.role}"
