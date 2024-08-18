from django.db import models

class Message(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    subject = models.CharField(max_length=225, blank=True, null=True)
    body = models.TextField()

    def __str__(self) -> str:
        return self.subject if self.subject else "No Subject"
    
class LinkedInRecommendation(models.Model):
    recommender_name = models.CharField(max_length=255)  
    recommender_title = models.CharField(max_length=255, blank=True, null=True)  
    recommender_profile_url = models.URLField(blank=True, null=True)  
    recommendation_content = models.TextField()  
    date_given = models.DateField(blank=True, null=True)  

    def __str__(self):
        return f"Recommendation by {self.recommender_name}"

    class Meta:
        verbose_name = "LinkedIn Recommendation"
        verbose_name_plural = "LinkedIn Recommendations"

class Company(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)  # Company logo

    def __str__(self):
        return self.name

class WorkExperience(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)  # Link to Company model
    position = models.CharField(max_length=255)  # Job title (e.g., Senior Web Developer)
    start_date = models.DateField()  # Start date of the position
    end_date = models.DateField(blank=True, null=True)  # End date of the position (null for current)
    responsibilities = models.TextField()  # Description of key responsibilities and achievements
    
    def __str__(self):
        return f"{self.position} at {self.company.name}"

    class Meta:
        verbose_name = "Work Experience"
        verbose_name_plural = "Work Experiences"

class Profile(models.Model):
    website_name = models.CharField(max_length=255)  # Name of the website (e.g., LinkedIn, GitHub)
    profile_url = models.URLField()  # URL to the profile on that website
    website_logo = models.ImageField(upload_to='website_logos/')  # Logo of the website

    def __str__(self):
        return self.website_name
    
class Media(models.Model):
    media_file = models.FileField(upload_to='media/')  
    tag = models.CharField(max_length=255)  
    description = models.TextField(blank=True, null=True)  

    def __str__(self):
        return f"{self.tag}: {self.media_file.name}"

    class Meta:
        verbose_name = "Media"
        verbose_name_plural = "Media"

class WebsiteData(models.Model):
    data = models.TextField()  
    tag = models.CharField(max_length=255)  
    description = models.TextField(blank=True, null=True)  

    def __str__(self):
        return f"{self.tag}: {self.data[:50]}"  

    class Meta:
        verbose_name = "Website Data"
        verbose_name_plural = "Website Data"



    


