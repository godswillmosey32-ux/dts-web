import os
from flask import Flask, redirect, render_template, request
app = Flask(__name__)
@app.route("/")
def home():
  return render_templates("index.html")
@app.route("/login", methods=["GET", "POST"])
def login():
  if request.method == "POST":
    return redirect("/dashboard")
  return render_template("login.html")
@app.route("/register", methods=["GET", "POST"])
def register():
  if request.method == "POST":
    return redirect("/dashboard")
  return render_template("register.html")
@app.route("/dashboard")
def dashboard():
  return render_template("dashboard.html")
@app.route("/about")
def about():
  return render_template("about.html")
@app.route("/contact")
def contact():
  return render_template("contact.html")
@app.route("/courses")
def courses():
  return render_template("courses.html")
@app.route("/gallery")
def gallery():
  return render_template("gallery.html")
@app.route("/staff")
def staff():
  return render_template("staff.html")
@app.route("/admissions")
def admissions():
  return render_template("admissions.html")
@app.route("/alumni")
def alumni():
  return render_template("alumni.html")
@app.route("/careers")
def careers():
  return render_template("careers.html")
@app.route("/downloads")
def downloads():
  return render_template("downloads.html")
@app.route("/events")
def events():
  return render_template("events.html")
@app.route("/faq")
def faq():
  return render_template("faq.html")
@app.route("/hod")
def hod():
  return render_template("hod.html")
@app.route("/laboratories")
def laboratories():
  return render_template("laboratories.html")
@app.route("/library")
def library():
  return render_template("library.html")
@app.route("/news")
def news():
  return render_template("news.html")
@app.route("/policies")
def policies():
  return render_template("policies.html")
@app.route("/programmes")
def programmes():
  return render_template("programmes.html")
@app.route("/publications")
def publications():
  return render_template("publications.html")
@app.route("/quality-assurance")
def quality_assurance():
  return render_template("quality-assurance.html")
@app.route("/research")
def research():
  return render_template("research.html")
@app.route("/admin")
def admin():
  return render_template("admin.html")
@app.route("/add_student")
def add_student():
  return render_template("add_student.html")
@app.route("/student-portal")
def student_portal():
  return render_template("student-portal.html")
if __name__ == "__main__":
  app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
