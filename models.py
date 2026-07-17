from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login_id = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    
class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)

    reg_number = db.Column(db.String(20), unique=True, nullable=False)

    full_name = db.Column(db.String(100), nullable=False)

    gender = db.Column(db.String(10), nullable=False)

    level = db.Column(db.String(10), nullable=False)

    email = db.Column(db.String(100), unique=True)

    phone = db.Column(db.String(20))

    password = db.Column(db.String(255), nullable=False)

    department = db.Column(db.String(100), nullable=False)

    admission_year = db.Column(db.String(4), nullable=False)

    def __repr__(self):
        return f"<Student {self.reg_number}>"