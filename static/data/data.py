import calendar
from datetime import datetime


def calculate_exp(st_month, st_year, en_month, en_year=datetime.now().year):
    if en_month == "ongoing":
        en_month = datetime.now().month
        en_year = datetime.now().year
    else:
        en_month = list(calendar.month_abbr).index(en_month.title())
    st_month = list(calendar.month_abbr).index(st_month.title())
    if st_month > en_month:
        en_month += 12
        en_year -= 1
    return {"month": en_month - st_month,
            "year": en_year - st_year}


experience = [
    {
        "icon": "static/images/mywbut.jpg",
        "title": "Technical Content Strategist",
        "employment_type": "Internship",
        "company": "Mywbut.com",
        "location": "kolkata",
        "start_date": {
            "month": "jul",
            "year": 2019,
        },
        "end_date": {
            "month": "ongoing",
            "year": 0
        },
        "exp": calculate_exp(st_month="jul", st_year=2019, en_month="ongoing", en_year=2020),
        "description": ""
    },
    {
        "icon": "static/images/roc.jpg",
        "title": "Club Literacy Committee Chair",
        "employment_type": "Part-time",
        "company": "Rotaract Club of Government College of Engineering and Leather Technology",
        "location": "kolkata",
        "start_date": {
            "month": "sep",
            "year": 2019,
        },
        "end_date": {
            "month": "ongoing",
            "year": 0
        },
        "exp": calculate_exp(st_month="jul", st_year=2019, en_month="ongoing", en_year=2020),
        "description": "I am a part of this club. We do various kind of social works like blood donation camp, Clothes distribution for the poor people, Tree plantation program etc under the name of this club."
    }
]
