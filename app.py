from flask import Flask, render_template, request, redirect, url_for, flash
from models import db, User, Student

app = Flask(__name__)

app.config["SECRET_KEY"] = "datascience_secret_key"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///department.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

    admin = User.query.filter_by(login_id="admin").first()

    if not admin:
        admin = User(
            login_id="admin",
            password="1234",
            role="admin"
        )

        db.session.add(admin)
        db.session.commit()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        login_id = request.form["login_id"]
        password = request.form["password"]

        user = User.query.filter_by(login_id=login_id).first()

        if user and user.password == password:

            if user.role == "admin":
                return redirect(url_for("admin"))

            elif user.role == "student":
                return redirect(url_for("students"))

            else:
                return "Lecturer Dashboard Coming Soon"

        return "Invalid Login ID or Password"

    return render_template("login.html")
    
@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/add_student", methods=["GET", "POST"])
def add_student():

    if request.method == "POST":

        try:

            # Check if registration number already exists
            if Student.query.filter_by(reg_number=request.form["reg_number"]).first():
                flash("❌ Registration number already exists.", "error")
                return redirect(url_for("add_student"))

            # Check if email already exists
            if Student.query.filter_by(email=request.form["email"]).first():
                flash("❌ Email address is already registered.", "error")
                return redirect(url_for("add_student"))

            student = Student(
                reg_number=request.form["reg_number"],
                full_name=request.form["full_name"],
                gender=request.form["gender"],
                level=request.form["level"],
                email=request.form["email"],
                phone=request.form["phone"],
                password=request.form["password"],
                department="Data Science",
                admission_year=request.form["admission_year"]
            )

            db.session.add(student)
            db.session.commit()

            flash("✅ Student added successfully!", "success")
            return redirect(url_for("add_student"))

        except Exception as e:
            db.session.rollback()
            flash(f"Error: {e}", "error")
            return redirect(url_for("add_student"))

    return render_template("add_student.html")
if __name__ == "__main__":
    app.run(debug=True)