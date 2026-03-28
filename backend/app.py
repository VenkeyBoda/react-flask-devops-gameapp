import sqlite3
import jwt
import datetime
from functools import wraps
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

SECRET = "mysecretkey"

# DB
def db():
    return sqlite3.connect("users.db")

# Init DB
def init_db():
    conn = db()
    conn.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
    )
    """)
    conn.close()

init_db()

# JWT decorator
def auth_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Token missing"}), 401
        try:
            jwt.decode(token, SECRET, algorithms=["HS256"])
        except:
            return jsonify({"error": "Invalid or expired token"}), 401
        return f(*args, **kwargs)
    return wrapper

# Register
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = generate_password_hash(data.get("password"))

    try:
        conn = db()
        conn.execute(
            "INSERT INTO users(username,email,password) VALUES(?,?,?)",
            (username, email, password)
        )
        conn.commit()
        conn.close()
        return jsonify({"msg": "Registered successfully"})
    except sqlite3.IntegrityError:
        return jsonify({"error": "User already exists"}), 400

# Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = db()
    user = conn.execute(
        "SELECT * FROM users WHERE username=?",
        (username,)
    ).fetchone()
    conn.close()

    if user and check_password_hash(user[3], password):
        token = jwt.encode({
            "user": username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, SECRET, algorithm="HS256")
        return jsonify({"token": token})
    return jsonify({"error": "Invalid credentials"}), 401

# Protected route example
@app.route("/profile", methods=["GET"])
@auth_required
def profile():
    return jsonify({"msg": "You are authorized!"})

@app.route("/")
def home():
    return "Backend running"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
    
# import sqlite3
# import jwt
# import datetime
# from functools import wraps
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# SECRET = "mysecretkey"

# # DB
# def db():
#     return sqlite3.connect("users.db")

# # Init DB
# def init_db():
#     conn = db()
#     conn.execute("""
#     CREATE TABLE IF NOT EXISTS users(
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         firstName TEXT,
#         lastName TEXT,
#         username TEXT UNIQUE,
#         email TEXT UNIQUE,
#         password TEXT
#     )
#     """)
#     conn.close()

# init_db()

# # 🔐 JWT Decorator
# def auth_required(f):
#     @wraps(f)
#     def wrapper(*args, **kwargs):
#         token = request.headers.get("Authorization")

#         if not token:
#             return jsonify({"error": "Token missing"}), 401

#         try:
#             jwt.decode(token, SECRET, algorithms=["HS256"])
#         except:
#             return jsonify({"error": "Invalid or expired token"}), 401

#         return f(*args, **kwargs)
#     return wrapper

# # 📝 Register
# @app.route("/register", methods=["POST"])
# def register():
#     data = request.json

#     try:
#         conn = db()
#         conn.execute(
#             "INSERT INTO users(firstName,lastName,username,email,password) VALUES(?,?,?,?,?)",
#             (data.get("firstName"), data.get("lastName"), data["username"], data["email"], data["password"])
#         )
#         conn.commit()
#         conn.close()
#         return jsonify({"msg": "Registered"})
#     except:
#         return jsonify({"error": "User already exists"}), 400

# # 🔑 Login
# @app.route("/login", methods=["POST"])
# def login():
#     data = request.json

#     conn = db()
#     user = conn.execute(
#         "SELECT * FROM users WHERE username=? AND password=?",
#         (data["username"], data["password"])
#     ).fetchone()
#     conn.close()

#     if user:
#         token = jwt.encode({
#             "user": data["username"],
#             "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
#         }, SECRET, algorithm="HS256")

#         return jsonify({"token": token})

#     return jsonify({"error": "Invalid credentials"}), 401

# # 🔒 Protected Route
# @app.route("/profile", methods=["GET"])
# @auth_required
# def profile():
#     return jsonify({"msg": "You are authorized!"})

# # Health
# @app.route("/")
# def home():
#     return "Backend running"

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)