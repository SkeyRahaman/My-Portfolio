from django.shortcuts import render
import markdown

from .models import WebsiteData, Media, WorkExperience, LinkedInRecommendation, Profile
from .helpers import *
from .forms import MessageForm

# Create your views here.
def home(request):
    alert_message = None
    message_form = MessageForm()
    if request.method == 'POST':
        message_form = MessageForm(request.POST)
        if message_form.is_valid():
            name = message_form.cleaned_data['name']
            email = message_form.cleaned_data['email']
            subject = message_form.cleaned_data['subject']
            body = message_form.cleaned_data['body']
            try:
                send_mail(
                    name=name,
                    email=email,
                    subject=subject,
                    body=body
                )
            except Exception as e:
                pass
            message_form.save()
            message_form = MessageForm()
            alert_message = {'color' : 'success' , 'message' : 'Your Message is Successfully Delevered.'}

    about = WebsiteData.objects.filter(tag='about_text_home_page')
    about = about[0].data if len(about) >= 1 else "No About in database"
    about = markdown.markdown(about, extensions=['fenced_code', 'codehilite'])

    hero_image = Media.objects.filter(tag='hero_image_home_page')
    hero_image = hero_image[0].media_file.url if len(hero_image) >= 1 else None

    hero_resume_url = Media.objects.filter(tag='hero_resume_homepage')
    hero_resume_url = hero_resume_url[0].media_file.url if len(hero_resume_url) >= 1 else None

    all_experience = dict()
    for work_experience in WorkExperience.objects.all().order_by('-start_date'):
        if work_experience.company in all_experience:
            all_experience[work_experience.company].append(work_experience)
        else:
            all_experience[work_experience.company] = [work_experience]
    
    linkedinrecommendation = LinkedInRecommendation.objects.all().order_by('-date_given')

    context = {
        'about' : about,
        'hero_image' : hero_image,
        'resume_url' : hero_resume_url,
        'projects' : get_projects(),
        'all_experience' : all_experience,
        'linkedinrecommendation' : linkedinrecommendation,
        'form' : message_form,
        'alert_message' : alert_message,
        'urls' : get_urls(),
    }
    return render(request, 'app/home.html', context)
