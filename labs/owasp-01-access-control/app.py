from flask import Flask, request, render_template_string

app = Flask(__name__)

FLAG = "FLAG{ACCESS_CONTROL_MATTERS}"

LOGIN_PAGE = """
<!doctype html>
<html>
<head>
    <title>SecureBank Training Lab</title>
</head>

<body>

<h1>SecureBank</h1>

<p>Authorized training environment.</p>

<form method="POST">

    <label>Username</label><br>
    <input name="username" required>

    <br><br>

    <button type="submit">
        Login
    </button>

</form>

</body>
</html>
"""


@app.route("/", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        username = request.form.get("username", "")

        return f"""
        <h1>Welcome, {username}</h1>

        <p>You are authenticated.</p>

        <a href="/dashboard">
            Continue to dashboard
        </a>
        """

    return render_template_string(LOGIN_PAGE)


@app.route("/dashboard")
def dashboard():

    username = request.args.get("username", "student")

    return f"""
    <h1>SecureBank Dashboard</h1>

    <p>Logged in as: {username}</p>

    <h2>Account Information</h2>

    <p>Balance: $1,250</p>

    <hr>

    <p>
        Training note:
        authentication alone does not determine authorization.
    </p>

    <a href="/admin">
        Administrator Area
    </a>
    """


@app.route("/admin")
def admin():

    return f"""
    <h1>Administrator Area</h1>

    <p>
        This area should only be accessible to authorized administrators.
    </p>

    <p>
        Training Flag:
        <strong>{FLAG}</strong>
    </p>

    """

    
if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=8080,
        debug=False
    )
