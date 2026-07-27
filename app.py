from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("login.html")


@app.route("/login", methods=["POST"])
def login():

@app.route("/register", methods=["POST"])
def register():




    username = request.form["username"]
    password = request.form["password"]

    # Authenticate user here

    return redirect("/")