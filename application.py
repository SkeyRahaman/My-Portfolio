from flask import Flask, render_template, redirect, jsonify
import functions_required as fn
from static.data import data

app = application = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html", age=fn.age())


@app.route("/about")
def about():
    return render_template("about.html",
                           blogs=fn.get_blogs(amount="2"),
                           experience=data.experience)


@app.route("/resume")
def resume():
    return render_template("resume.html")


@app.route("/projects")
def projects():
    return render_template("projects.html", projects=fn.get_projects())


@app.route("/blog")
def blog():
    return render_template("blogs.html", blogs=fn.get_blogs())


@app.route("/unknown_message")
def unknown_message():
    return render_template("unknown_message.html")


@app.route("/send_message/<message>")
def send_message(message):
    return jsonify(fn.send_mail(message))


@app.route("/tic_tac_toe")
def game_tic_tac_toe():
    return render_template("game_tic_tac_toe.html")

@app.route("/result_12")
def result_12():
    return render_template("Result_12.html")


if __name__ == "__main__":
    app.run(debug=True)
