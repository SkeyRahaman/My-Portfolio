from datetime import date, timedelta
from datetime import datetime
from bs4 import BeautifulSoup
import requests
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string import Template
from static.data import credential


def read_template(filename):
    with open(filename, 'r', encoding='utf-8') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)


def send_mail(message):
    to = "sakibmondal7@gmail.com"
    login = False
    server = smtplib.SMTP("smtp.gmail.com:587")
    server.ehlo()
    server.starttls()
    try:
        server.login(user=credential.email_user, password=credential.email_password)
        login = True
    except Exception as e:
        print(e)
    if login:
        msg = MIMEMultipart()
        msg['From'] = credential.email_user
        msg['To'] = to
        msg['subject'] = "Message From An Unknown Person Through Your Portfolio.!"
        message = read_template("templates/message.html").substitute(message=message, time=datetime.now().time(), date=datetime.now().date())
        msg.attach(MIMEText(message, 'html'))
        server.send_message(msg)
        del msg
    if login:
        server.quit()
        return True
    else:
        return False


def age():
    today = date.today()
    bday = date(1998, 12, 17)
    return (today.year - bday.year) - ((today.month, today.day) < (bday.month, bday.day))


def get_blogs(amount="all"):
    try:
        url = "https://medium.com/@shakibmondal"
        soup = BeautifulSoup(requests.get(url).text, "html.parser")
        blog = []
        if amount == "all":
            data_list = soup.find_all(class_='r s y')
        else:
            data_list = soup.find_all(class_='r s y')[0:2]
        for data in data_list:
            heading = data.find("h1").text
            image_link = data.find('img').get("src")
            try:
                image_link = image_link.replace("max/60", "max/1080")
            except:
                pass
            page_url = "https://medium.com" + data.find('a').get('href')
            text_page = BeautifulSoup(requests.get(page_url).text,
                                      "html.parser")
            actual_text = ''
            for i in text_page.find_all('p', {"class": "cx"}):
                actual_text += (i.text + " <br> \n")
                if len(actual_text) > 500:
                    break
            try:
                actual_text = actual_text[0:600]
            except:
                pass
            blog.append([heading, image_link, actual_text, page_url])
        return blog
    except:
        return [["Error in web scraping", "Error in web scraping", "Error in web scraping", "Error in web scraping"]]


def get_projects():
    url = "https://github.com/SkeyRahaman"
    soup = BeautifulSoup(requests.get(url).text, "html.parser")
    cards = soup.find_all('div', {'class': 'pinned-item-list-item-content'})
    projects = []
    for card in cards:
        url = "https://github.com" + card.find('a').get("href")
        name = card.find('span', {'class': 'repo'}).text.replace("-", " ")
        try:
            des = card.find('p', {'class': 'pinned-item-desc'}).text
        except:
            des = ""
        lang = card.find('span', {'itemprop': 'programmingLanguage'}).text
        projects.append([name, des, lang, url])
    return projects