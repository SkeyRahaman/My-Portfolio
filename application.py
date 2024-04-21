from flask import Flask, render_template, redirect, jsonify, request, flash

import config
from functions_required import *
from static.data import data
import config

app = application = Flask(__name__)
app.secret_key = config.SECRET_KEY


@app.route("/")
def home():
    # flash("This is not your data to delete!", "danger")
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


@app.route("/sudoku/solve_manual", methods=["POST", "GET"])
def sudoku_check():
    question_grid = [[0 for i in range(9)] for _ in range(9)]
    if request.method == 'POST':
        nums = []
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
            nums.append(num_row)
        question_grid = [[i for i in m] for m in nums]
        tf, result = solve(nums)
        if tf:
            flash("Your Solution is given below", "success")
            return render_template("suduku_solver_manual.html", nums=question_grid, result=result, title="SUDOKU")
        else:
            flash("There is no solution for this combination", "danger")
            return render_template("suduku_solver_manual.html", nums=[[0 for i in range(9)] for _ in range(9)], result=question_grid, title="SUDOKU")
    return render_template("suduku_solver_manual.html",
                           nums=question_grid,
                           result=[[0 for i in range(9)] for _ in range(9)],
                           title="SUDOKU")


@app.route("/sudoku", methods=["POST", "GET"])
def suduku():
    question_grid = [[0 for i in range(9)] for _ in range(9)]
    check_score = 0
    wrong = False
    if request.method == 'POST':
        if request.form['generate_sol'] == "check":
            nums = []
            tf = False
            for i in range(9):
                num_row = []
                for j in range(9):
                    cell_name = "cell" + str(i) + str(j)
                    cell_check_name = "cell" + str(i) + str(j) + "check"
                    a = request.form.get(cell_name)
                    b = request.form.get(cell_check_name)
                    if b:
                        question_grid[i][j] = int(a)
                    try:
                        a = int(a)
                        if a < 1 or a > 9:
                            a = 0
                    except:
                        a = 0
                    num_row.append(a)
                nums.append(num_row)
            result = True
            for i in range(9):
                for j in range(9):
                    cell1 = nums[i][j]
                    cell2 = question_grid[i][j]
                    if -1 < cell1 < 10 and -1 < cell2 < 10 and cell1 == cell2:
                        pass
                    else:
                        result = check_board(nums, cell1, (i, j))
                        if not result:
                            wrong = True
                        if result:
                            check_score += 1
            if wrong:
                flash("Some cell value does not match the conditions.", "danger")
            else:
                flash("Congratulation you get " + str(check_score) + " right positions", "success")
            return render_template("suduku_solver.html", nums=question_grid, result=nums, title="SUDOKU")
        else:
            nums = []
            for i in range(9):
                num_row = []
                for j in range(9):
                    cell_name = "cell" + str(i) + str(j)
                    cell_check_name = "cell" + str(i) + str(j) + "check"
                    a = request.form.get(cell_name)
                    b = request.form.get(cell_check_name)
                    if b:
                        question_grid[i][j] = int(a)
                    try:
                        a = int(a)
                        if a < 1 or a > 9:
                            a = 0
                    except:
                        a = 0
                    num_row.append(a)
                nums.append(num_row)
            tf, result = solve(nums)
            if tf:
                return render_template("suduku_solver.html", nums=question_grid, result=result, title="SUDOKU")
            else:
                return render_template("suduku_solver.html", nums=question_grid, result=nums, title="SUDOKU")

    question_grid = generate_question_grid()
    return render_template("suduku_solver.html", nums=question_grid, result=[[0 for i in range(9)] for _ in range(9)],
                           title="SUDOKU")


if __name__ == "__main__":
    app.run(debug=config.DEBUG)
