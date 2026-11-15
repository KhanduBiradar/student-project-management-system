from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import os

load_dotenv()

app = Flask(__name__)
CORS(app)


# =========================
# File Upload Configuration
# =========================

UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "uploads"
)

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Maximum upload size: 100 MB
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024

ALLOWED_EXTENSIONS = {
    "pdf",
    "zip",
    "rar",
    "ppt",
    "pptx"
}


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower()
        in ALLOWED_EXTENSIONS
    )


# =========================
# MySQL Database Connection
# =========================

db = mysql.connector.connect(
    host=os.getenv("DB_HOST", "localhost"),
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD", "123456"),
    database=os.getenv("DB_NAME", "spms_db")
)

print("MySQL Connected Successfully")



# =========================
# Test API
# =========================

@app.route("/")
def home():
    return jsonify({
        "message": "SPMS Python Flask Backend is running"
    })


# =========================
# Login API
# =========================

@app.route("/api/login", methods=["POST"])
def login():

    try:

        data = request.get_json()

        email = data.get("email")
        password = data.get("password")
        role = data.get("role")

        if not email or not password or not role:
            return jsonify({
                "success": False,
                "message": "Email, password and role are required"
            }), 400

        cursor = db.cursor(dictionary=True)

        sql = """
            SELECT
                users.id,
                users.name,
                users.email,
                users.role,
                students.id AS student_id
            FROM users

            LEFT JOIN students
                ON students.user_id = users.id

            WHERE users.email = %s
            AND users.password = %s
            AND users.role = %s
        """

        cursor.execute(
            sql,
            (email, password, role)
        )

        user = cursor.fetchone()

        cursor.close()

        if not user:
            return jsonify({
                "success": False,
                "message": "Invalid email, password or role"
            }), 401

        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": user
        })

    except Exception as error:

        print("Login Error:", error)

        return jsonify({
            "success": False,
            "message": "Login failed",
            "error": str(error)
        }), 500
    
@app.route("/api/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        roll_no = data.get("roll_no")
        course = data.get("course")
        year = data.get("year")
        phone = data.get("phone")

        if not name or not email or not password or not roll_no:
            return jsonify({
                "success": False,
                "message": "Name, email, password and roll number are required"
            }), 400

        cursor = db.cursor(dictionary=True)

        # Check duplicate email
        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )
        existing_user = cursor.fetchone()

        if existing_user:
            cursor.close()
            return jsonify({
                "success": False,
                "message": "Email already registered"
            }), 409

        # Check duplicate roll number
        cursor.execute(
            "SELECT id FROM students WHERE roll_no = %s",
            (roll_no,)
        )
        existing_student = cursor.fetchone()

        if existing_student:
            cursor.close()
            return jsonify({
                "success": False,
                "message": "Roll number already registered"
            }), 409

        # Create student user
        cursor.execute(
            """
            INSERT INTO users
            (name, email, password, role)
            VALUES (%s, %s, %s, 'Student')
            """,
            (name, email, password)
        )

        user_id = cursor.lastrowid

        # Create student profile
        cursor.execute(
            """
            INSERT INTO students
            (user_id, roll_no, course, year, phone)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (user_id, roll_no, course, year, phone)
        )

        db.commit()
        cursor.close()

        return jsonify({
            "success": True,
            "message": "Student account created successfully"
        }), 201

    except Exception as error:
        print("Signup Error:", error)
        return jsonify({
            "success": False,
            "message": "Signup failed",
            "error": str(error)
        }), 500


# =========================
# Reset Password API
# =========================

@app.route("/api/reset-password", methods=["PUT"])
def reset_password():

    data = request.get_json()

    email = data.get("email")
    new_password = data.get("newPassword") or data.get("password")

    if not email or not new_password:
        return jsonify({
            "success": False,
            "message": "Email and new password are required"
        }), 400

    cursor = db.cursor()

    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )

    user = cursor.fetchone()

    if not user:
        cursor.close()

        return jsonify({
            "success": False,
            "message": "Email not found"
        }), 404

    cursor.execute(
        """
        UPDATE users
        SET password = %s
        WHERE email = %s
        """,
        (new_password, email)
    )

    db.commit()

    cursor.close()

    return jsonify({
        "success": True,
        "message": "Password reset successfully"
    })

# ADMIN SIGNUP
@app.route("/api/admin/signup", methods=["POST"])
def admin_signup():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({
                "success": False,
                "message": "Name, email and password are required"
            }), 400

        cursor = db.cursor(dictionary=True)

        # Check existing email
        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            cursor.close()

            return jsonify({
                "success": False,
                "message": "Email already registered"
            }), 409

        # Create Admin account
        cursor.execute(
            """INSERT INTO users
               (name, email, password, role)
               VALUES (%s, %s, %s, 'Admin')""",
            (name, email, password)
        )

        db.commit()
        cursor.close()

        return jsonify({
            "success": True,
            "message": "Admin account created successfully"
        }), 201

    except Exception as error:

        print("Admin Signup Error:", error)

        return jsonify({
            "success": False,
            "message": "Admin signup failed",
            "error": str(error)
        }), 500

# =========================
# Student - Submission Upload
# =========================

@app.route("/api/submission/upload", methods=["POST"])
def upload_submission():

    try:

        project_id = request.form.get("project_id")
        student_id = request.form.get("student_id")

        if not project_id or not student_id:
            return jsonify({
                "success": False,
                "message": "Project ID and Student ID are required"
            }), 400

        cursor = db.cursor(dictionary=True)

        # Check project
        cursor.execute(
            """
            SELECT id
            FROM projects
            WHERE id = %s
            """,
            (project_id,)
        )

        project = cursor.fetchone()

        if not project:
            cursor.close()

            return jsonify({
                "success": False,
                "message": "Project not found"
            }), 404

        # Check student
        cursor.execute(
            """
            SELECT id
            FROM students
            WHERE id = %s
            """,
            (student_id,)
        )

        student = cursor.fetchone()

        if not student:
            cursor.close()

            return jsonify({
                "success": False,
                "message": "Student not found"
            }), 404

        # Required files
        report = request.files.get("report")
        source_code = request.files.get("sourceCode")
        ppt = request.files.get("ppt")

        if not report or not source_code or not ppt:
            cursor.close()

            return jsonify({
                "success": False,
                "message": "Please upload all required documents"
            }), 400

        files = [
            ("Final Project Report", report),
            ("Source Code", source_code),
            ("Project Presentation", ppt)
        ]

        saved_files = []

        # Save all files
        for title, file in files:

            if not file.filename:
                cursor.close()

                return jsonify({
                    "success": False,
                    "message": f"{title} file name is missing"
                }), 400

            if not allowed_file(file.filename):
                cursor.close()

                return jsonify({
                    "success": False,
                    "message": (
                        f"Invalid file type for {title}. "
                        "Allowed formats: PDF, ZIP, RAR, PPT, PPTX"
                    )
                }), 400

            filename = secure_filename(file.filename)

            file_path = os.path.join(
                app.config["UPLOAD_FOLDER"],
                filename
            )

            file.save(file_path)

            saved_files.append(filename)

        # Store file names in one submission record
        combined_file_names = " | ".join(saved_files)

        cursor.execute(
            """
            INSERT INTO submissions
            (
                project_id,
                student_id,
                title,
                file_name,
                status,
                remarks
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                %s,
                %s
            )
            """,
            (
                project_id,
                student_id,
                "Project Documents",
                combined_file_names,
                "Pending",
                "Waiting for teacher review"
            )
        )

        db.commit()

        submission_id = cursor.lastrowid

        cursor.close()

        return jsonify({
            "success": True,
            "message": "Project submitted successfully",
            "submission_id": submission_id,
            "files": saved_files
        }), 201

    except Exception as error:

        print("Upload Error:", error)

        return jsonify({
            "success": False,
            "message": "File upload failed",
            "error": str(error)
        }), 500


# =========================
# Uploaded File Access
# =========================

@app.route("/api/uploads/<path:filename>", methods=["GET"])
def uploaded_file(filename):

    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        filename
    )

# =========================
# TEAM INVITATION APIs
# =========================

# SEND TEAM INVITATION
@app.route("/api/team/invite", methods=["POST"])
def send_team_invitation():
    try:
        data = request.get_json()

        team_id = data.get("team_id")
        sender_id = data.get("sender_id")
        receiver_id = data.get("receiver_id")

        if not team_id or not sender_id or not receiver_id:
            return jsonify({
                "success": False,
                "message": "team_id, sender_id and receiver_id are required"
            }), 400

        if int(sender_id) == int(receiver_id):
            return jsonify({
                "success": False,
                "message": "You cannot invite yourself"
            }), 400

        cursor = db.cursor(dictionary=True)

        # Check sender is already a member of the team
        cursor.execute(
            """
            SELECT id
            FROM team_members
            WHERE team_id = %s AND student_id = %s
            """,
            (team_id, sender_id)
        )

        sender_member = cursor.fetchone()

        if not sender_member:
            cursor.close()
            return jsonify({
                "success": False,
                "message": "You are not a member of this team"
            }), 403

        # Check receiver already belongs to team
        cursor.execute(
            """
            SELECT id
            FROM team_members
            WHERE team_id = %s AND student_id = %s
            """,
            (team_id, receiver_id)
        )

        already_member = cursor.fetchone()

        if already_member:
            cursor.close()
            return jsonify({
                "success": False,
                "message": "Student is already a team member"
            }), 409

        # Check pending invitation
        cursor.execute(
            """
            SELECT id
            FROM team_invitations
            WHERE team_id = %s
            AND sender_id = %s
            AND receiver_id = %s
            AND status = 'Pending'
            """,
            (team_id, sender_id, receiver_id)
        )

        existing_invitation = cursor.fetchone()

        if existing_invitation:
            cursor.close()
            return jsonify({
                "success": False,
                "message": "Invitation already sent"
            }), 409

        # Create invitation
        cursor.execute(
            """
            INSERT INTO team_invitations
            (team_id, sender_id, receiver_id, status)
            VALUES (%s, %s, %s, 'Pending')
            """,
            (team_id, sender_id, receiver_id)
        )

        db.commit()
        cursor.close()

        return jsonify({
            "success": True,
            "message": "Team invitation sent successfully"
        }), 201

    except Exception as error:
        print("Send Invitation Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to send team invitation",
            "error": str(error)
        }), 500


# GET PENDING INVITATIONS FOR STUDENT
@app.route("/api/team/invitations/<int:student_id>", methods=["GET"])
def get_team_invitations(student_id):
    try:
        cursor = db.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                ti.id,
                ti.team_id,
                ti.sender_id,
                ti.receiver_id,
                ti.status,
                ti.created_at,
                t.team_name,
                p.title AS project_title,
                sender_user.name AS sender_name
            FROM team_invitations ti
            JOIN teams t
                ON ti.team_id = t.id
            JOIN projects p
                ON t.project_id = p.id
            JOIN students sender_student
                ON ti.sender_id = sender_student.id
            JOIN users sender_user
                ON sender_student.user_id = sender_user.id
            WHERE ti.receiver_id = %s
            AND ti.status = 'Pending'
            ORDER BY ti.created_at DESC
            """,
            (student_id,)
        )

        invitations = cursor.fetchall()
        cursor.close()

        return jsonify({
            "success": True,
            "invitations": invitations
        })

    except Exception as error:
        print("Get Invitations Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to load invitations",
            "error": str(error)
        }), 500


# ACCEPT TEAM INVITATION
@app.route("/api/team/invitation/<int:invitation_id>/accept", methods=["PUT"])
def accept_team_invitation(invitation_id):
    try:
        cursor = db.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT *
            FROM team_invitations
            WHERE id = %s
            """,
            (invitation_id,)
        )

        invitation = cursor.fetchone()

        if not invitation:
            cursor.close()
            return jsonify({
                "success": False,
                "message": "Invitation not found"
            }), 404

        if invitation["status"] != "Pending":
            cursor.close()
            return jsonify({
                "success": False,
                "message": "Invitation is no longer pending"
            }), 400

        team_id = invitation["team_id"]
        receiver_id = invitation["receiver_id"]

        # Check whether already a team member
        cursor.execute(
            """
            SELECT id
            FROM team_members
            WHERE team_id = %s AND student_id = %s
            """,
            (team_id, receiver_id)
        )

        already_member = cursor.fetchone()

        if not already_member:
            cursor.execute(
                """
                INSERT INTO team_members
                (team_id, student_id)
                VALUES (%s, %s)
                """,
                (team_id, receiver_id)
            )

        # Update invitation status
        cursor.execute(
            """
            UPDATE team_invitations
            SET status = 'Accepted'
            WHERE id = %s
            """,
            (invitation_id,)
        )

        db.commit()
        cursor.close()

        return jsonify({
            "success": True,
            "message": "Team invitation accepted successfully"
        })

    except Exception as error:
        db.rollback()

        print("Accept Invitation Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to accept invitation",
            "error": str(error)
        }), 500


# REJECT TEAM INVITATION
@app.route("/api/team/invitation/<int:invitation_id>/reject", methods=["PUT"])
def reject_team_invitation(invitation_id):
    try:
        cursor = db.cursor()

        cursor.execute(
            """
            UPDATE team_invitations
            SET status = 'Rejected'
            WHERE id = %s
            AND status = 'Pending'
            """,
            (invitation_id,)
        )

        if cursor.rowcount == 0:
            cursor.close()

            return jsonify({
                "success": False,
                "message": "Invitation not found or already processed"
            }), 404

        db.commit()
        cursor.close()

        return jsonify({
            "success": True,
            "message": "Team invitation rejected"
        })

    except Exception as error:
        db.rollback()

        print("Reject Invitation Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to reject invitation",
            "error": str(error)
        }), 500

# =========================
# Admin - Statistics
# =========================

@app.route("/api/admin/stats", methods=["GET"])
def get_admin_stats():

    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT COUNT(*) AS total FROM students"
    )

    students = cursor.fetchone()["total"]

    cursor.execute(
        "SELECT COUNT(*) AS total FROM teachers"
    )

    teachers = cursor.fetchone()["total"]

    cursor.execute(
        "SELECT COUNT(*) AS total FROM projects"
    )

    projects = cursor.fetchone()["total"]

    cursor.execute(
        """
        SELECT COUNT(*) AS total
        FROM submissions
        WHERE status = 'Pending'
        """
    )

    pending_submissions = cursor.fetchone()["total"]

    cursor.close()

    return jsonify({
        "success": True,
        "students": students,
        "teachers": teachers,
        "projects": projects,
        "pending_submissions": pending_submissions
    })


# =========================
# Admin - Students
# =========================

@app.route("/api/admin/students", methods=["GET"])
def get_students():

    cursor = db.cursor(dictionary=True)

    sql = """
        SELECT
            students.id,
            students.roll_no,
            students.course,
            students.year,
            students.phone,
            users.name,
            users.email
        FROM students
        INNER JOIN users
        ON students.user_id = users.id
        ORDER BY students.id DESC
    """

    cursor.execute(sql)

    students = cursor.fetchall()

    cursor.close()

    return jsonify({
        "success": True,
        "students": students
    })


# =========================
# Admin - Teachers
# =========================

@app.route("/api/admin/teachers", methods=["GET"])
def get_teachers():

    cursor = db.cursor(dictionary=True)

    sql = """
        SELECT
            teachers.id,
            teachers.employee_id,
            teachers.department,
            teachers.phone,
            users.name,
            users.email
        FROM teachers
        INNER JOIN users
        ON teachers.user_id = users.id
        ORDER BY teachers.id DESC
    """

    cursor.execute(sql)

    teachers = cursor.fetchall()

    cursor.close()

    return jsonify({
        "success": True,
        "teachers": teachers
    })


# =========================
# Admin - Projects
# =========================

@app.route("/api/admin/projects", methods=["GET"])
def get_projects():

    cursor = db.cursor(dictionary=True)

    sql = """
        SELECT
            projects.id,
            projects.title,
            projects.description,
            projects.status,
            projects.progress,
            projects.created_at,
            student_users.name AS student_name,
            teacher_users.name AS teacher_name
        FROM projects

        INNER JOIN students
        ON projects.student_id = students.id

        INNER JOIN users AS student_users
        ON students.user_id = student_users.id

        LEFT JOIN teachers
        ON projects.teacher_id = teachers.id

        LEFT JOIN users AS teacher_users
        ON teachers.user_id = teacher_users.id

        ORDER BY projects.id DESC
    """

    cursor.execute(sql)

    projects = cursor.fetchall()

    cursor.close()

    return jsonify({
        "success": True,
        "projects": projects
    })


# =========================
# Admin - Teams
# =========================

@app.route("/api/admin/teams", methods=["GET"])
def get_teams():

    cursor = db.cursor(dictionary=True)

    sql = """
        SELECT
            teams.id,
            teams.team_name,
            teams.created_at,
            projects.id AS project_id,
            projects.title AS project_title,
            students.id AS team_leader_id,
            users.name AS team_leader_name
        FROM teams

        INNER JOIN projects
        ON teams.project_id = projects.id

        INNER JOIN students
        ON teams.team_leader_id = students.id

        INNER JOIN users
        ON students.user_id = users.id

        ORDER BY teams.id DESC
    """

    cursor.execute(sql)

    teams = cursor.fetchall()

    cursor.close()

    return jsonify({
        "success": True,
        "teams": teams
    })
# =========================
# ADMIN REMOVE TEAM
# =========================
@app.route("/api/admin/team/<int:team_id>", methods=["DELETE"])
def admin_remove_team(team_id):
    try:
        cursor = db.cursor(dictionary=True)

        # Check team exists
        cursor.execute(
            "SELECT id, team_name FROM teams WHERE id = %s",
            (team_id,)
        )

        team = cursor.fetchone()

        if not team:
            cursor.close()
            return jsonify({
                "success": False,
                "message": "Team not found"
            }), 404

        # Remove team invitations
        cursor.execute(
            "DELETE FROM team_invitations WHERE team_id = %s",
            (team_id,)
        )

        # Remove team members
        cursor.execute(
            "DELETE FROM team_members WHERE team_id = %s",
            (team_id,)
        )

        # Remove team
        cursor.execute(
            "DELETE FROM teams WHERE id = %s",
            (team_id,)
        )

        db.commit()
        cursor.close()

        return jsonify({
            "success": True,
            "message": f"Team '{team['team_name']}' removed successfully"
        })

    except Exception as error:
        db.rollback()

        print("Admin Remove Team Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to remove team",
            "error": str(error)
        }), 500


# =========================
# Student - Feedback
# =========================

@app.route("/api/student/feedback/<int:student_id>", methods=["GET"])
def get_student_feedback(student_id):

    cursor = db.cursor(dictionary=True)

    sql = """
        SELECT
            feedback.id,
            feedback.feedback_text,
            feedback.rating,
            feedback.created_at,
            projects.title AS project_title,
            users.name AS teacher_name
        FROM feedback

        INNER JOIN projects
        ON feedback.project_id = projects.id

        INNER JOIN teachers
        ON feedback.teacher_id = teachers.id

        INNER JOIN users
        ON teachers.user_id = users.id

        WHERE feedback.student_id = %s

        ORDER BY feedback.id DESC
    """

    cursor.execute(sql, (student_id,))

    feedback_data = cursor.fetchall()

    cursor.close()

    return jsonify({
        "success": True,
        "feedback": feedback_data
    })


# =========================
# Student - Submission Status
# =========================

@app.route("/api/student/submission/<int:student_id>", methods=["GET"])
def get_student_submission(student_id):

    cursor = db.cursor(dictionary=True)

    sql = """
        SELECT
            submissions.id,
            submissions.project_id,
            submissions.student_id,
            submissions.title,
            submissions.file_name,
            submissions.submission_date,
            submissions.status,
            submissions.remarks,
            projects.title AS project_title
        FROM submissions
        INNER JOIN projects
        ON submissions.project_id = projects.id
        WHERE submissions.student_id = %s
        ORDER BY submissions.id DESC
        LIMIT 1
    """

    cursor.execute(sql, (student_id,))

    submission = cursor.fetchone()

    cursor.close()

    if not submission:
        return jsonify({
            "success": True,
            "submitted": False,
            "message": "No submission found"
        })

    return jsonify({
        "success": True,
        "submitted": True,
        "submission": submission
    })


# =========================
# Admin - Deadlines
# =========================

@app.route("/api/admin/deadlines", methods=["GET"])
def get_deadlines():

    cursor = db.cursor(dictionary=True)

    sql = """
        SELECT
            deadlines.id,
            deadlines.title,
            deadlines.description,
            deadlines.deadline_date,
            deadlines.status,
            deadlines.created_at,
            projects.title AS project_title
        FROM deadlines

        INNER JOIN projects
        ON deadlines.project_id = projects.id

        ORDER BY deadlines.deadline_date ASC
    """

    cursor.execute(sql)

    deadlines = cursor.fetchall()

    cursor.close()

    return jsonify({
        "success": True,
        "deadlines": deadlines
    })


# =========================
# Admin - Submissions
# =========================

@app.route("/api/admin/submissions", methods=["GET"])
def get_submissions():

    cursor = db.cursor(dictionary=True)

    sql = """
        SELECT
            submissions.id,
            submissions.title,
            submissions.file_name,
            submissions.submission_date,
            submissions.status,
            submissions.remarks,
            projects.title AS project_title,
            students.id AS student_id,
            users.name AS student_name
        FROM submissions

        INNER JOIN projects
        ON submissions.project_id = projects.id

        INNER JOIN students
        ON submissions.student_id = students.id

        INNER JOIN users
        ON students.user_id = users.id

        ORDER BY submissions.id DESC
    """

    cursor.execute(sql)

    submissions = cursor.fetchall()

    cursor.close()

    return jsonify({
        "success": True,
        "submissions": submissions
    })


# =========================
# Admin - Update Submission
# =========================

@app.route(
    "/api/admin/submissions/<int:submission_id>",
    methods=["PUT"]
)
def update_submission(submission_id):

    data = request.get_json()

    status = data.get("status")

    allowed_status = [
        "Pending",
        "Reviewed",
        "Approved",
        "Rejected"
    ]

    if status not in allowed_status:

        return jsonify({
            "success": False,
            "message": "Invalid submission status"
        }), 400

    cursor = db.cursor()

    sql = """
        UPDATE submissions
        SET status = %s
        WHERE id = %s
    """

    cursor.execute(
        sql,
        (status, submission_id)
    )

    db.commit()

    cursor.close()

    return jsonify({
        "success": True,
        "message": "Submission status updated successfully"
    })


# =========================
# Student - Response
# =========================

@app.route("/api/student/response", methods=["POST"])
def student_response():

    try:

        data = request.get_json()

        student_id = data.get("student_id")
        project_id = data.get("project_id")
        teacher_id = data.get("teacher_id")
        response_text = data.get("response_text")

        if (
            not student_id
            or not project_id
            or not teacher_id
            or not response_text
        ):

            return jsonify({
                "success": False,
                "message": "All response fields are required"
            }), 400

        cursor = db.cursor()

        cursor.execute(
            """
            INSERT INTO student_responses
            (project_id, student_id, teacher_id, response_text)
            VALUES (%s, %s, %s, %s)
            """,
            (
                project_id,
                student_id,
                teacher_id,
                response_text
            )
        )

        db.commit()

        cursor.close()

        return jsonify({
            "success": True,
            "message": "Response submitted successfully"
        }), 201

    except Exception as error:

        print("Student Response Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to submit response",
            "error": str(error)
        }), 500


# =========================
# Teacher - Student Responses
# =========================

@app.route(
    "/api/teacher/responses/<int:teacher_id>",
    methods=["GET"]
)
def get_teacher_student_responses(teacher_id):

    try:

        cursor = db.cursor(dictionary=True)

        sql = """
            SELECT
                student_responses.id,
                student_responses.student_id,
                student_responses.project_id,
                student_responses.teacher_id,
                student_responses.response_text,
                student_responses.created_at,
                users.name AS student_name,
                users.email AS student_email,
                projects.title AS project_title
            FROM student_responses

            INNER JOIN students
                ON student_responses.student_id = students.id

            INNER JOIN users
                ON students.user_id = users.id

            INNER JOIN projects
                ON student_responses.project_id = projects.id

            WHERE student_responses.teacher_id = %s

            ORDER BY student_responses.id DESC
        """

        cursor.execute(sql, (teacher_id,))

        responses = cursor.fetchall()

        cursor.close()

        return jsonify({
            "success": True,
            "responses": responses
        })

    except Exception as error:

        print("Get Student Responses Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to load student responses",
            "error": str(error)
        }), 500


# =========================
# Teacher - Delete Student Response
# =========================

@app.route(
    "/api/teacher/response/<int:response_id>",
    methods=["DELETE"]
)
def delete_teacher_student_response(response_id):

    try:

        cursor = db.cursor()

        cursor.execute(
            "DELETE FROM student_responses WHERE id = %s",
            (response_id,)
        )

        db.commit()

        if cursor.rowcount == 0:

            cursor.close()

            return jsonify({
                "success": False,
                "message": "Student response not found"
            }), 404

        cursor.close()

        return jsonify({
            "success": True,
            "message": "Student response deleted successfully"
        })

    except Exception as error:

        print("Delete Student Response Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to delete response",
            "error": str(error)
        }), 500


# =========================
# Student - Evaluation
# =========================

@app.route(
    "/api/student/evaluation/<int:student_id>",
    methods=["GET"]
)
def get_student_evaluation(student_id):

    try:

        cursor = db.cursor(dictionary=True)

        sql = """
            SELECT
                evaluation.id,
                evaluation.project_id,
                evaluation.teacher_id,
                evaluation.student_id,
                evaluation.marks,
                evaluation.grade,
                evaluation.comments,
                evaluation.evaluated_at,
                projects.title AS project_title,
                users.name AS teacher_name
            FROM evaluation

            INNER JOIN projects
                ON evaluation.project_id = projects.id

            INNER JOIN teachers
                ON evaluation.teacher_id = teachers.id

            INNER JOIN users
                ON teachers.user_id = users.id

            WHERE evaluation.student_id = %s

            ORDER BY evaluation.id DESC

            LIMIT 1
        """

        cursor.execute(sql, (student_id,))

        evaluation_data = cursor.fetchone()

        cursor.close()

        if not evaluation_data:

            return jsonify({
                "success": True,
                "evaluated": False,
                "message": "Evaluation not published yet"
            })

        return jsonify({
            "success": True,
            "evaluated": True,
            "evaluation": evaluation_data
        })

    except Exception as error:

        print("Student Evaluation Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to load evaluation",
            "error": str(error)
        }), 500


# =========================
# Teacher - Submit Evaluation
# =========================

@app.route(
    "/api/teacher/evaluation",
    methods=["POST"]
)
def submit_teacher_evaluation():

    try:

        data = request.get_json()

        project_id = data.get("project_id")
        teacher_id = data.get("teacher_id")
        student_id = data.get("student_id")
        marks = data.get("marks")
        grade = data.get("grade")
        comments = data.get("comments")

        if (
            not project_id
            or not teacher_id
            or not student_id
            or marks is None
            or not grade
            or not comments
        ):

            return jsonify({
                "success": False,
                "message": "All evaluation fields are required"
            }), 400

        marks = int(marks)

        if marks < 0 or marks > 100:

            return jsonify({
                "success": False,
                "message": "Marks must be between 0 and 100"
            }), 400

        cursor = db.cursor()

        cursor.execute(
            """
            SELECT id
            FROM evaluation
            WHERE project_id = %s
            AND student_id = %s
            ORDER BY id DESC
            LIMIT 1
            """,
            (
                project_id,
                student_id
            )
        )

        existing = cursor.fetchone()

        if existing:

            cursor.execute(
                """
                UPDATE evaluation
                SET teacher_id = %s,
                    marks = %s,
                    grade = %s,
                    comments = %s,
                    evaluated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                """,
                (
                    teacher_id,
                    marks,
                    grade,
                    comments,
                    existing[0]
                )
            )

        else:

            cursor.execute(
                """
                INSERT INTO evaluation
                (
                    project_id,
                    teacher_id,
                    student_id,
                    marks,
                    grade,
                    comments
                )
                VALUES
                (
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s
                )
                """,
                (
                    project_id,
                    teacher_id,
                    student_id,
                    marks,
                    grade,
                    comments
                )
            )

        db.commit()

        cursor.close()

        return jsonify({
            "success": True,
            "message": "Evaluation submitted successfully"
        }), 201

    except Exception as error:

        print("Teacher Evaluation Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to submit evaluation",
            "error": str(error)
        }), 500


# =========================
# Teacher - Submissions
# =========================

@app.route(
    "/api/teacher/submissions/<int:teacher_id>",
    methods=["GET"]
)
def get_teacher_submissions(teacher_id):

    try:

        cursor = db.cursor(dictionary=True)

        sql = """
            SELECT
                submissions.id,
                submissions.project_id,
                submissions.student_id,
                submissions.title,
                submissions.file_name,
                submissions.submission_date,
                submissions.status,
                submissions.remarks,
                projects.title AS project_title,
                users.name AS student_name
            FROM submissions

            INNER JOIN projects
                ON submissions.project_id = projects.id

            INNER JOIN students
                ON submissions.student_id = students.id

            INNER JOIN users
                ON students.user_id = users.id

            WHERE projects.teacher_id = %s

            ORDER BY submissions.id DESC
        """

        cursor.execute(sql, (teacher_id,))

        submissions = cursor.fetchall()

        cursor.close()

        return jsonify({
            "success": True,
            "submissions": submissions
        })

    except Exception as error:

        print("Teacher Submission Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to load submissions",
            "error": str(error)
        }), 500


# =========================
# Teacher - Update Submission Status
# =========================

@app.route(
    "/api/teacher/submission/<int:submission_id>/status",
    methods=["PUT"]
)
def update_submission_status(submission_id):

    try:

        data = request.get_json()

        status = data.get("status")
        remarks = data.get("remarks", "")

        if status not in [
            "Approved",
            "Rejected"
        ]:

            return jsonify({
                "success": False,
                "message": "Invalid submission status"
            }), 400

        cursor = db.cursor()

        cursor.execute(
            """
            UPDATE submissions
            SET status = %s,
                remarks = %s
            WHERE id = %s
            """,
            (
                status,
                remarks,
                submission_id
            )
        )

        db.commit()

        if cursor.rowcount == 0:

            cursor.close()

            return jsonify({
                "success": False,
                "message": "Submission not found"
            }), 404

        cursor.close()

        return jsonify({
            "success": True,
            "message": f"Submission {status.lower()} successfully"
        })

    except Exception as error:

        print("Update Submission Status Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to update submission",
            "error": str(error)
        }), 500

@app.route("/api/admin/teachers", methods=["POST"])
def add_teacher():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        employee_id = data.get("employee_id")
        department = data.get("department")
        phone = data.get("phone")

        # Validate required fields
        if not name or not email or not password or not employee_id:
            return jsonify({
                "success": False,
                "message": "Name, email, password and employee ID are required"
            }), 400

        cursor = db.cursor(dictionary=True)

        # Check duplicate email
        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            cursor.close()

            return jsonify({
                "success": False,
                "message": "Email already registered"
            }), 409

        # Check duplicate employee ID
        cursor.execute(
            "SELECT id FROM teachers WHERE employee_id = %s",
            (employee_id,)
        )

        existing_teacher = cursor.fetchone()

        if existing_teacher:
            cursor.close()

            return jsonify({
                "success": False,
                "message": "Employee ID already registered"
            }), 409

        # Create teacher user
        cursor.execute(
            """
            INSERT INTO users
            (name, email, password, role)
            VALUES (%s, %s, %s, 'Teacher')
            """,
            (
                name,
                email,
                password
            )
        )

        user_id = cursor.lastrowid

        # Create teacher profile
        cursor.execute(
            """
            INSERT INTO teachers
            (user_id, employee_id, department, phone)
            VALUES (%s, %s, %s, %s)
            """,
            (
                user_id,
                employee_id,
                department,
                phone
            )
        )

        db.commit()

        cursor.close()

        return jsonify({
            "success": True,
            "message": "Teacher added successfully",
            "user_id": user_id
        }), 201

    except Exception as error:

        print("Add Teacher Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to add teacher",
            "error": str(error)
        }), 500

@app.route("/api/admin/teachers/<int:teacher_id>", methods=["DELETE"])
def delete_teacher(teacher_id):
    try:
        cursor = db.cursor(dictionary=True)

        # Get user_id of the teacher
        cursor.execute(
            "SELECT user_id FROM teachers WHERE id = %s",
            (teacher_id,)
        )
        teacher = cursor.fetchone()

        if not teacher:
            cursor.close()
            return jsonify({
                "success": False,
                "message": "Teacher not found"
            }), 404

        user_id = teacher["user_id"]

        # Delete teacher record first
        cursor.execute(
            "DELETE FROM teachers WHERE id = %s",
            (teacher_id,)
        )

        # Delete user account
        cursor.execute(
            "DELETE FROM users WHERE id = %s AND role = 'Teacher'",
            (user_id,)
        )

        db.commit()
        cursor.close()

        return jsonify({
            "success": True,
            "message": "Teacher deleted successfully"
        })

    except Exception as error:
        print("Delete Teacher Error:", error)
        return jsonify({
            "success": False,
            "message": "Failed to delete teacher",
            "error": str(error)
        }), 500    

# =========================
# Admin - Add Deadline
# =========================

@app.route(
    "/api/admin/deadlines",
    methods=["POST"]
)
def add_deadline():

    try:

        data = request.get_json()

        project_id = data.get("project_id")
        title = data.get("title")
        description = data.get("description")
        deadline_date = data.get("deadline_date")

        if (
            not project_id
            or not title
            or not deadline_date
        ):

            return jsonify({
                "success": False,
                "message": "Project, title and deadline date are required"
            }), 400

        cursor = db.cursor()

        cursor.execute(
            """
            INSERT INTO deadlines
            (
                project_id,
                title,
                description,
                deadline_date,
                status
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                'Pending'
            )
            """,
            (
                project_id,
                title,
                description,
                deadline_date
            )
        )

        db.commit()

        cursor.close()

        return jsonify({
            "success": True,
            "message": "Deadline added successfully"
        }), 201

    except Exception as error:

        print("Add Deadline Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to add deadline",
            "error": str(error)
        }), 500


# =========================
# Admin - Delete Deadline
# =========================

@app.route(
    "/api/admin/deadlines/<int:deadline_id>",
    methods=["DELETE"]
)
def delete_deadline(deadline_id):

    try:

        cursor = db.cursor()

        cursor.execute(
            """
            DELETE FROM deadlines
            WHERE id = %s
            """,
            (deadline_id,)
        )

        db.commit()

        if cursor.rowcount == 0:

            cursor.close()

            return jsonify({
                "success": False,
                "message": "Deadline not found"
            }), 404

        cursor.close()

        return jsonify({
            "success": True,
            "message": "Deadline deleted successfully"
        })

    except Exception as error:

        print("Delete Deadline Error:", error)

        return jsonify({
            "success": False,
            "message": "Failed to delete deadline",
            "error": str(error)
        }), 500


# =========================
# File Size Error
# =========================

@app.errorhandler(413)
def file_too_large(error):

    return jsonify({
        "success": False,
        "message": "File size is too large. Maximum allowed size is 100 MB."
    }), 413


# =========================
# Run Server
# =========================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )