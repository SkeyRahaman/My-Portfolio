import requests
from bs4 import BeautifulSoup
from .models import Profile, Media
from config import Config
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string import Template
from datetime import datetime, date, timedelta

def get_project_live_url(github_project_url):
    """
    Fetches the live project URL from a GitHub project page by finding the first 'a' tag within a 'div' element
    with class 'Link--secondary'.
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(github_project_url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    
    divs = soup.find_all('div', {'class': 'Link--secondary'})
    
    for div in divs:
        a_tag = div.find('a')
        if a_tag and 'href' in a_tag.attrs:
            return a_tag['href']
    
    return ""

def get_projects():
    """
    Scrapes project data from the GitHub profile of a user stored in the database and returns
    it in the form of a dictionary.

    The function retrieves the GitHub profile URL from the `Profile` model in the database, 
    then scrapes pinned project cards from the GitHub profile using BeautifulSoup. Each card 
    contains the project name, description, and primary programming language, which are 
    stored in a dictionary and returned.

    Returns:
        dict: A dictionary where the keys are project names and the values are dictionaries 
        containing the project's URL, description, and programming language.
    """

    url = Profile.objects.filter(website_name = "github")[0].profile_url
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    
    cards = soup.find_all('div', {'class': 'pinned-item-list-item-content'})
    projects = dict()
    for card in cards[:3]:
        name = card.find('span', {'class': 'repo'}).text.replace("-", " ")
        image_url = Media.objects.filter(tag = name.lower().replace(" ","_"))
        image_url = image_url.first().media_file.url if len(image_url) > 0 else "https://via.placeholder.com/300x200"
        github_url = "https://github.com" + card.find('a').get("href")
        projects[name] = {
            'url' : github_url,
            'project_url' : get_project_live_url(github_url),
            'description' : card.find('p', {'class': 'pinned-item-desc'}).text if card.find('p', {'class': 'pinned-item-desc'}) else "",
            'language' : card.find('span', {'itemprop': 'programmingLanguage'}).text if card.find('span', {'itemprop': 'programmingLanguage'}) else "",
            'image_url' : image_url,
        }
    return projects

def get_urls():
    linkedin = Profile.objects.filter(website_name = "linkedin")
    linkedin = linkedin.first().profile_url if len(linkedin) > 0 else "#"

    github = Profile.objects.filter(website_name = "github")
    github = github.first().profile_url if len(github) > 0 else "#"

    leetcode = Profile.objects.filter(website_name = "leetcode")
    leetcode = leetcode.first().profile_url if len(leetcode) > 0 else "#"
    return {
        'linkedin' : linkedin,
        'github' : github,
        'leetcode' : leetcode,
    }

def read_template(filename):
    with open(filename, 'r', encoding='utf-8') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)

def send_mail(name,email,subject,body):
    print(body)
    # return False
    login = False
    server = smtplib.SMTP(Config.SMTP_ENDPOINT)
    server.ehlo()
    server.starttls()
    print(Config.FROM_EMAIL, Config.FROM_EMAIL_PASSWORD)
    try:
        server.login(user=Config.FROM_EMAIL, password=Config.FROM_EMAIL_PASSWORD)
        login = True
    except Exception as e:
        print(e)
    if login:
        msg = MIMEMultipart()
        msg['From'] = Config.FROM_EMAIL
        msg['To'] = Config.TO_EMAIL
        msg['subject'] = "Message From An Unknown Person Through Your Portfolio.!"
        message = read_template("templates/message.html").substitute(
            name=name,
            email=email,
            subject=subject,
            body=body,
            time=datetime.now().strftime("%H:%M:%S"),
            date=datetime.now().strftime("%Y-%m-%d")
        )
        msg.attach(MIMEText(message, 'html'))
        server.send_message(msg)
        del msg
    if login:
        server.quit()
        return True
    else:
        return False
