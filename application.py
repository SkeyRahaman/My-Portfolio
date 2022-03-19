from flask import Flask, render_template, redirect, jsonify, request
from functions_required import *
from static.data import data

app = application = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html", age=age())


@app.route("/about")
def about():
    return render_template("about.html",
                           blogs=get_blogs(amount="2"),
                           experience=data.experience)


@app.route("/resume")
def resume():
    return render_template("resume.html")


@app.route("/projects")
def projects():
    return render_template("projects.html", projects=get_projects())


@app.route("/blog")
def blog():
    return render_template("blogs.html", blogs=get_blogs())


@app.route("/unknown_message")
def unknown_message():
    return render_template("unknown_message.html")


@app.route("/send_message/<message>")
def send_message(message):
    return jsonify(send_mail(message))


@app.route("/tic_tac_toe")
def game_tic_tac_toe():
    return render_template("game_tic_tac_toe.html")


@app.route("/result_12")
def result_12():
    return render_template("Result_12.html")


@app.route("/suduku", methods=["POST", "GET"])
def suduku():
    nums = []
    if request.method == 'POST':
        for i in range(9):
            num_row = []
            for j in range(9):
                cell_name = "cell" + str(i) + str(j)
                a = request.form.get(cell_name)
                try:
                    a = int(a)
                    if a < 1 or a > 9:
                        a = 0
                except:
                    a = 0
                num_row.append(a)
            print(num_row)
            nums.append(num_row)

        tf, nums = solve(nums)
        print(tf)
        for i in nums:
            print(i)
    if len(nums) == 0:
        return render_template("suduku_solver.html", nums=False)
    else:
        return render_template("suduku_solver.html", nums=nums)


# @app.route("/suduku/gen_sol", methods=["POST"])
# def add_expence():
#     return redirect("/suduku")


if __name__ == "__main__":
    app.run(debug=True)
