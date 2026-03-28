from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def db():
    return sqlite3.connect("users.db")

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    try:
        conn = db()
        conn.execute("INSERT INTO users(username,email,password) VALUES(?,?,?)",
                     (data["username"], data["email"], data["password"]))
        conn.commit()
        conn.close()
        return jsonify({"msg":"Registered"})
    except:
        return jsonify({"error":"User exists"}), 400

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = db()
    user = conn.execute("SELECT * FROM users WHERE username=? AND password=?",
                        (data["username"], data["password"])).fetchone()
    conn.close()

    if user:
        return jsonify({"msg":"Success"})
    return jsonify({"error":"Invalid"}), 401

if __name__ == "__main__":
    conn = db()
    conn.execute("""CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE,
        email TEXT,
        password TEXT)""")
    conn.close()

    app.run(host="0.0.0.0", port=5000)