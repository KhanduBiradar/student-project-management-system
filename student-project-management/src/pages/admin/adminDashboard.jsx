import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalProjects: 0,
    pendingSubmissions: 0
  })

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/stats')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setStats({
            totalStudents: data.students,
            totalTeachers: data.teachers,
            totalProjects: data.projects,
            pendingSubmissions: data.pending_submissions
          })
   }
      })
      .catch((error) => {
        console.error('Stats error:', error)
      })
  }, [])

  return (
    <div
      className="container-fluid p-4"
      style={{
        background: '#f5f7fb',
        minHeight: '100vh'
      }}
    >

      {/* ================= ADMIN HEADER ================= */}

      <div
        className="mb-4"
        style={{
          background:
            'linear-gradient(135deg, #111827 0%, #1e3a8a 55%, #4f46e5 100%)',
          borderRadius: '18px',
          padding: '28px 30px',
          color: 'white',
          boxShadow: '0 8px 25px rgba(30,58,138,0.18)'
        }}
      >

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                color: '#bfdbfe'
              }}
            >
              ADMIN CONTROL PANEL
            </div>

            <h2 className="fw-bold mt-2 mb-2">
              System Overview
            </h2>

            <p className="mb-0" style={{ color: '#dbeafe' }}>
              Manage users, projects, submissions and overall system activity.
            </p>

          </div>

          <div
            style={{
              fontSize: '65px'
            }}
          >
            🛡️
          </div>

        </div>

      </div>

      {/* ================= STATISTICS ================= */}

      <div className="row g-4 mb-4">

        {/* STUDENTS */}

        <div className="col-md-3">

          <div
            className="card border-0 h-100"
            style={{
              borderRadius: '16px',
              boxShadow: '0 5px 18px rgba(15,23,42,0.07)'
            }}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between">

                <div>

                  <small className="text-muted fw-semibold">
                    STUDENTS
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {stats.totalStudents}
                  </h2>

                  <span className="text-primary small">
                    👨‍🎓 Registered users
                  </span>

                </div>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: '#dbeafe',
                    fontSize: '24px'
                  }}
                >
                  👨‍🎓
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* TEACHERS */}

        <div className="col-md-3">

          <div
            className="card border-0 h-100"
            style={{
              borderRadius: '16px',
              boxShadow: '0 5px 18px rgba(15,23,42,0.07)'
            }}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between">

                <div>

                  <small className="text-muted fw-semibold">
                    TEACHERS
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {stats.totalTeachers}
                  </h2>

                  <span className="text-success small">
                    👨‍🏫 Active guides
                  </span>

                </div>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: '#dcfce7',
                    fontSize: '24px'
                  }}
                >
                  👨‍🏫
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PROJECTS */}

        <div className="col-md-3">

          <div
            className="card border-0 h-100"
            style={{
              borderRadius: '16px',
              boxShadow: '0 5px 18px rgba(15,23,42,0.07)'
            }}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between">

                <div>

                  <small className="text-muted fw-semibold">
                    PROJECTS
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {stats.totalProjects}
                  </h2>

                  <span className="text-info small">
                    📁 Total projects
                  </span>

                </div>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: '#cffafe',
                    fontSize: '24px'
                  }}
                >
                  📁
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SUBMISSIONS */}

        <div className="col-md-3">

          <div
            className="card border-0 h-100"
            style={{
              borderRadius: '16px',
              boxShadow: '0 5px 18px rgba(15,23,42,0.07)'
            }}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between">

                <div>

                  <small className="text-muted fw-semibold">
                    PENDING SUBMISSIONS
                  </small>

                  <h2 className="fw-bold text-warning mt-2 mb-1">
                    {stats.pendingSubmissions}
                  </h2>

                  <span className="text-warning small">
                    ⏳ Require review
                  </span>

                </div>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: '#fef3c7',
                    fontSize: '24px'
                  }}
                >
                  📄
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= MAIN ADMIN AREA ================= */}

      <div className="row g-4 mb-4">

        {/* SYSTEM CONTROL */}

        <div className="col-lg-7">

          <div
            className="card border-0 h-100"
            style={{
              borderRadius: '16px',
              boxShadow: '0 5px 18px rgba(15,23,42,0.07)'
            }}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                  <h4 className="fw-bold mb-1">
                    ⚙️ System Management
                  </h4>

                  <small className="text-muted">
                    Quickly access major administration areas.
                  </small>

                </div>

                <span
                  className="badge bg-dark"
                  style={{
                    padding: '9px 12px',
                    borderRadius: '8px'
                  }}
                >
                  Admin Access
                </span>

              </div>

              <div className="row g-3">

                <div className="col-md-6">

                  <button
                    className="w-100 text-start border-0 p-3"
                    onClick={() => navigate('/admin/students')}
                    style={{
                      background: '#eff6ff',
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{ fontSize: '24px' }}>
                      👨‍🎓
                    </div>

                    <div className="fw-bold mt-2">
                      Manage Students
                    </div>

                    <small className="text-muted">
                      View and manage student records
                    </small>
                  </button>

                </div>

                <div className="col-md-6">

                  <button
                    className="w-100 text-start border-0 p-3"
                    onClick={() => navigate('/admin/teachers')}
                    style={{
                      background: '#f0fdf4',
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{ fontSize: '24px' }}>
                      👨‍🏫
                    </div>

                    <div className="fw-bold mt-2">
                      Manage Teachers
                    </div>

                    <small className="text-muted">
                      View teacher information
                    </small>
                  </button>

                </div>

                <div className="col-md-6">

                  <button
                    className="w-100 text-start border-0 p-3"
                    onClick={() => navigate('/admin/projects')}
                    style={{
                      background: '#f5f3ff',
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{ fontSize: '24px' }}>
                      📁
                    </div>

                    <div className="fw-bold mt-2">
                      Manage Projects
                    </div>

                    <small className="text-muted">
                      Monitor all student projects
                    </small>
                  </button>

                </div>

                <div className="col-md-6">

                  <button
                    className="w-100 text-start border-0 p-3"
                    onClick={() => navigate('/admin/submissions')}
                    style={{
                      background: '#fffbeb',
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{ fontSize: '24px' }}>
                      📄
                    </div>

                    <div className="fw-bold mt-2">
                      Review Submissions
                    </div>

                    <small className="text-muted">
                      Monitor submitted documents
                    </small>
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ADMIN TOOLS */}

        <div className="col-lg-5">

          <div
            className="card border-0 h-100"
            style={{
              borderRadius: '16px',
              boxShadow: '0 5px 18px rgba(15,23,42,0.07)'
            }}
          >

            <div className="card-body p-4">

              <h4 className="fw-bold mb-1">
                📊 Admin Tools
              </h4>

              <small className="text-muted">
                System monitoring and management tools.
              </small>

              <div className="mt-4">

                <button
                  className="btn btn-outline-dark w-100 text-start mb-3 py-3"
                  onClick={() => navigate('/admin/teams')}
                >
                  👥 &nbsp; Manage Teams
                </button>

                <button
                  className="btn btn-outline-primary w-100 text-start mb-3 py-3"
                  onClick={() => navigate('/admin/deadlines')}
                >
                  📅 &nbsp; Manage Deadlines
                </button>

                <button
                  className="btn btn-outline-success w-100 text-start mb-3 py-3"
                  onClick={() => navigate('/admin/reports')}
                >
                  📊 &nbsp; View Reports
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= RECENT ACTIVITY ================= */}

      <div
        className="card border-0"
        style={{
          borderRadius: '16px',
          boxShadow: '0 5px 18px rgba(15,23,42,0.07)'
        }}
      >

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h4 className="fw-bold mb-1">
                🔔 Recent System Activity
              </h4>

              <small className="text-muted">
                Latest activities across the project management system.
              </small>
            </div>

            <span
              className="badge bg-light text-dark"
              style={{
                padding: '9px 12px'
              }}
            >
              Live Activity
            </span>

          </div>

          <div className="row g-3">

            <div className="col-md-6">
              <div
                className="d-flex align-items-center p-3"
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px'
                }}
              >

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '42px',
                    height: '42px',
                    background: '#dbeafe'
                  }}
                >
                  📄
                </div>

                <div>
                  <div className="fw-semibold">
                    Project document submitted
                  </div>

                  <small className="text-muted">
                    Khandu Biradar submitted project documents.
                  </small>
                </div>

              </div>
            </div>

            <div className="col-md-6">
              <div
                className="d-flex align-items-center p-3"
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px'
                }}
              >

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '42px',
                    height: '42px',
                    background: '#f3e8ff'
                  }}
                >
                  ⭐
                </div>

                <div>
                  <div className="fw-semibold">
                    Project evaluation completed
                  </div>

                  <small className="text-muted">
                    A student project was evaluated by teacher.
                  </small>
                </div>

              </div>
            </div>

            <div className="col-md-6">
              <div
                className="d-flex align-items-center p-3"
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px'
                }}
              >

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '42px',
                    height: '42px',
                    background: '#dcfce7'
                  }}
                >
                  📝
                </div>

                <div>
                  <div className="fw-semibold">
                    Teacher feedback added
                  </div>

                  <small className="text-muted">
                    Feedback was added to a student project.
                  </small>
                </div>

              </div>
            </div>

            <div className="col-md-6">
              <div
                className="d-flex align-items-center p-3"
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px'
                }}
              >

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '42px',
                    height: '42px',
                    background: '#fef3c7'
                  }}
                >
                  ✅
                </div>

                <div>
                  <div className="fw-semibold">
                    Project completed
                  </div>

                  <small className="text-muted">
                    A student project reached 100% completion.
                  </small>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard