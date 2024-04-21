from datetime import date, timedelta
from datetime import datetime
from bs4 import BeautifulSoup
import requests
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from string import Template
from static.data import credential
import random


def generate_question_grid():
    global g, a, num_count
    track = True
    z = 0
    while track:
        z += 1
        a = [[0 for i in range(10)] for j in range(10)]
        num_count = 0
        while num_count < 15:
            cell = random.randint(0, 80)
            i, j = cell // 9, cell % 9
            if a[i][j] == 0:
                num = random.randint(1, 9)
                check = check_board(a, num, (i, j))
                if check:
                    a[i][j] = num
                    num_count += 1
        g = [[f for f in m] for m in a]
        tf, g = solve(g)
        track = not tf
    while num_count < 35:
        cell = random.randint(0, 80)
        i, j = cell // 9, cell % 9
        if a[i][j] == 0:
            a[i][j] = g[i][j]
            num_count += 1

    return a


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
        message = read_template("templates/message.html").substitute(message=message, time=datetime.now().time(),
                                                                     date=datetime.now().date())
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
            data_list = soup.find_all(class_='dm hh hi dh hj')[0:2]
        else:
            data_list = soup.find_all(class_='dm hh hi dh hj')[0:2]
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
            for i in text_page.find_all('p', {"class": "hb"}):
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


def solve(bo):
    next = next_blank(bo)
    if not next:
        return True, bo
    for i in range(1, 10):
        if check_board(bo, i, next):
            bo[next[0]][next[1]] = i
            tf, bo = solve(bo)
            if tf:
                return True, bo
            bo[next[0]][next[1]] = 0
    return False, bo


def check_board(bo, num, pos):
    # check in row
    for i in range(9):
        if bo[pos[0]][i] == num and i != pos[1]:
            return False

    # check in column
    for i in range(9):
        if bo[i][pos[1]] == num and i != pos[0]:
            return False

    # check in small box
    box_x = pos[0] // 3
    box_y = pos[1] // 3

    for row in range(box_x * 3, box_x * 3 + 3):
        for col in range(box_y * 3, box_y * 3 + 3):
            if bo[row][col] == num and row != pos[0] and col != pos[1]:
                return False
    return True


def next_blank(bo):
    for row in range(9):
        for col in range(9):
            if bo[row][col] == 0:
                return (row, col)

    return False
