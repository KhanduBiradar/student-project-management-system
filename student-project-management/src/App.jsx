import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
  Link
} from 'react-router-dom'

// ================= STUDENT =================
import StudentDashboard from './pages/student/studentDashboard'
import MyTeam from './pages/student/myTeam'
import MyProject from './pages/student/myproject'
import Feedback from './pages/student/Feedback'
import Submission from './pages/student/submission'
import Evaluation from './pages/student/Evaluation'
import Deadline from './pages/student/Deadline'

// ================= TEACHER =================
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import StudentProjects from './pages/teacher/StudentProjects'
import TeacherFeedback from './pages/teacher/teacherFeedback'
import TeacherEvaluation from './pages/teacher/Evaluation'
import TeacherSubmission from './pages/teacher/Submission'
import Students from './pages/teacher/Students'

// ================= ADMIN =================
import AdminDashboard from './pages/admin/adminDashboard'
import AdminStudents from './pages/admin/Students'
import AdminTeachers from './pages/admin/Teachers'
import AdminProjects from './pages/admin/Projects'
import AdminSubmissions from './pages/admin/Submission'
import AdminTeams from './pages/admin/Teams'
import AdminDeadlines from './pages/admin/Deadlines'
import AdminReports from './pages/admin/Reports'

// ================= FORGOT PASSWORD =================
import ForgotPassword from './pages/ForgotPassword'
import Signup from './pages/Signup'
import AdminSignup from './pages/AdminSignup'

// ================= LAYOUTS =================
import AdminLayout from './components/adminLayout'
import TeacherLayout from './components/teacherLayout'

import './App.css'

// ==================================================
// LOGIN
// ==================================================

function Login() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [role, setRole] = React.useState('Student')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please enter email and password')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            role:
              role === 'Teacher / Guide'
                ? 'Teacher'
                : role === 'Principal / Admin'
                  ? 'Admin'
                  : 'Student'
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      localStorage.setItem('loggedInUser',JSON.stringify(data.user))

      alert('Login successful!')
      

      if (data.user.role === 'Student') {
        navigate('/student/dashboard')
      } else if (data.user.role === 'Teacher') {
        navigate('/teacher/dashboard')
      } else if (data.user.role === 'Admin') {
        navigate('/admin/dashboard')
      }

    } catch (error) {
      console.error('Login error:', error)

      alert(
        'Server connection failed. Please check backend.'
      )
    }
  }

  return (
    <main className="login-page">

      <section className="login-card">

        <div className="login-header">

          <div className="logo">
            🎓
          </div>

          <h1>SPMS</h1>

          <p>
            Student Project Management System
          </p>

        </div>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="mb-3">

            <label className="form-label">
              Email / Username
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* PASSWORD */}

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <div className="input-group">

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>

            </div>

          </div>

          {/* ROLE */}

          <div className="mb-3">

            <label className="form-label">
              Login As
            </label>

            <select
              className="form-select"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >

              <option>Student</option>
              <option>Teacher / Guide</option>
              <option>Principal / Admin</option>

            </select>

          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="btn btn-primary w-100 login-btn"
          >
            Login
          </button>

          {/* FORGOT PASSWORD */}

          <div className="text-center mt-3">

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>

          {/* STUDENT SIGNUP */}

          <div className="text-center mt-3">

            <button
              type="button"
              className="btn btn-outline-primary w-100"
              onClick={() => navigate('/signup')}
            >
              New Student? Create Account
            </button>

            <div className="text-center mt-3">
            <Link to="/admin-signup" className="text-danger">
              Create Admin Account
            </Link>
          </div>

          </div>

        </form>

      </section>

    </main>
  )
}

// ==================================================
// ROLE PROTECTION
// ==================================================

function RoleRoute({ allowedRole, children }) {

  const loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUser')
  )

  // Redirect unauthenticated users to login
  if (!loggedInUser) {
    return <Navigate to="/" replace />
  }

  // Redirect users to their own dashboard if role is not allowed
  if (loggedInUser.role !== allowedRole) {

    if (loggedInUser.role === 'Student') {
      return <Navigate to="/student/dashboard" replace />
    }

    if (loggedInUser.role === 'Teacher') {
      return <Navigate to="/teacher/dashboard" replace />
    }

    if (loggedInUser.role === 'Admin') {
      return <Navigate to="/admin/dashboard" replace />
    }
  }

  return children
}

// ==================================================
// APP
// ==================================================

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* ================= STUDENT SIGNUP ================= */}

        <Route
          path="/signup"
          element={<Signup />}

        />
        <Route
          path="/admin-signup"
          element={<AdminSignup />}
        />

        {/* ================= FORGOT PASSWORD ================= */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ================= STUDENT ================= */}

        <Route
          path="/student"
          element={
            <RoleRoute allowedRole="Student">
              <StudentDashboard />
            </RoleRoute>
          }
        >

          <Route
            path="dashboard"
            element={<></>}
          />

          <Route
            path="project"
            element={<MyProject />}
          />

          <Route
            path="team"
            element={<MyTeam />}
          />

          <Route
            path="deadline"
            element={<Deadline />}
          />

          <Route
            path="submission"
            element={<Submission />}
          />

          <Route
            path="evaluation"
            element={<Evaluation />}
          />

          <Route
            path="feedback"
            element={<Feedback />}
          />

        </Route>

        {/* ================= TEACHER ================= */}

        <Route
          path="/teacher/dashboard"
          element={
            <RoleRoute allowedRole="Teacher">
              <TeacherLayout>
                <TeacherDashboard />
              </TeacherLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/teacher/students"
          element={
            <RoleRoute allowedRole="Teacher">
              <TeacherLayout>
                <Students />
              </TeacherLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/teacher/projects"
          element={
            <RoleRoute allowedRole="Teacher">
              <TeacherLayout>
                <StudentProjects />
              </TeacherLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/teacher/submission"
          element={
            <RoleRoute allowedRole="Teacher">
              <TeacherLayout>
                <TeacherSubmission />
              </TeacherLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/teacher/feedback"
          element={
            <RoleRoute allowedRole="Teacher">
              <TeacherLayout>
                <TeacherFeedback />
              </TeacherLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/teacher/evaluation"
          element={
            <RoleRoute allowedRole="Teacher">
              <TeacherLayout>
                <TeacherEvaluation />
              </TeacherLayout>
            </RoleRoute>
          }
        />

        {/* ================= ADMIN ================= */}


        <Route
          path="/admin/dashboard"
          element={
            <RoleRoute allowedRole="Admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <RoleRoute allowedRole="Admin">
              <AdminLayout>
                <AdminStudents />
              </AdminLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/admin/teachers"
          element={
            <RoleRoute allowedRole="Admin">
              <AdminLayout>
                <AdminTeachers />
              </AdminLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <RoleRoute allowedRole="Admin">
              <AdminLayout>
                <AdminProjects />
              </AdminLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/admin/submissions"
          element={
            <RoleRoute allowedRole="Admin">
              <AdminLayout>
                <AdminSubmissions />
              </AdminLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/admin/teams"
          element={
            <RoleRoute allowedRole="Admin">
              <AdminLayout>
                <AdminTeams />
              </AdminLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/admin/deadlines"
          element={
            <RoleRoute allowedRole="Admin">
              <AdminLayout>
                <AdminDeadlines />
              </AdminLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <RoleRoute allowedRole="Admin">
              <AdminLayout>
                <AdminReports />
              </AdminLayout>
            </RoleRoute>
          }
        />

        {/* ================= WRONG URL ================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App