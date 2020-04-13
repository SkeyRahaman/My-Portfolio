from flask import Flask, render_template, redirect, jsonify
import functions_required as fn
from static.data import data

application = Flask(__name__)


@application.route("/")
def home():
    return render_template("home.html", age=fn.age())


@application.route("/about")
def about():
    return render_template("about.html",
                           blogs=fn.get_blogs(amount="2"),
                           experience=data.experience)


@application.route("/resume")
def resume():
    return render_template("resume.html")


@application.route("/projects")
def projects():
    return render_template("projects.html", projects=fn.get_projects())


@application.route("/blog")
def blog():
    return render_template("blogs.html", blogs=fn.get_blogs())


@application.route("/unknown_message")
def unknown_message():
    return render_template("unknown_message.html")


@application.route("/send_message/<message>")
def send_message(message):
    return jsonify(fn.send_mail(message))


@application.route("/tic_tac_toe")
def game_tic_tac_toe():
    return render_template("game_tic_tac_toe.html")


if __name__ == "__main__":
    application.run(debug=True)
