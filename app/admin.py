from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Message)
admin.site.register(LinkedInRecommendation)
admin.site.register(Company)
admin.site.register(WorkExperience)
admin.site.register(Profile)
admin.site.register(Media)
admin.site.register(WebsiteData)

