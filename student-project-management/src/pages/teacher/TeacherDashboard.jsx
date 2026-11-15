import { useNavigate } from 'react-router-dom'

function TeacherDashboard() {
  const navigate = useNavigate()

  const projects = [
    {
      project: 'Student Project Management System',
      student: 'Khandu Biradar',
      progress: 65,
      status: 'In Progress'
    },
    {
      project: 'Online Learning System',
      student: 'Rahul Patil',
      progress: 80,
      status: 'Almost Completed'
    },
    {
      project: 'College Attendance System',
      student: 'Amit Shinde',
      progress: 45,
      status: 'In Progress'
    },
    {
      project: 'Library Management System',
      student: 'Sneha Jadhav',
      progress: 100,
      status: 'Completed'
    }
  ]

  return (
    <div className="teacher-dashboard-page">

      <div className="teacher-dashboard-content container-fluid p-4">

        {/* WELCOME BANNER */}
        <div
          className="mb-4"
          style={{
            background:
              'linear-gradient(135deg, #2563eb, #7c3aed)',
            borderRadius: '18px',
            padding: '28px 30px',
            color: 'white'
          }}
        >
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <small
                style={{
                  fontWeight: '600',
                  letterSpacing: '1px'
                }}
              >
                TEACHER DASHBOARD
              </small>

              <h2 className="fw-bold mt-2 mb-2">
                Welcome back, Teacher! 👋
              </h2>

              <p className="mb-0">
                Manage student projects, review submissions and provide guidance.
              </p>
            </div>

            <div style={{ fontSize: '65px' }}>
              👨‍🏫
            </div>

          </div>
        </div>

        {/* STATISTICS CARDS */}
        <div className="row g-4 mb-4">

          {/* Total Students */}
          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderTop: '4px solid #2563eb',
                borderRadius: '15px'
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <small className="text-muted">
                      TOTAL STUDENTS
                    </small>

                    <h2 className="fw-bold mt-2 mb-2">
                      48
                    </h2>

                    <span className="text-primary">
                      👨‍🎓 Registered students
                    </span>
                  </div>

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '55px',
                      height: '55px',
                      background: '#dbeafe',
                      fontSize: '25px'
                    }}
                  >
                    👨‍🎓
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Total Projects */}
          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderTop: '4px solid #7c3aed',
                borderRadius: '15px'
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <small className="text-muted">
                      TOTAL PROJECTS
                    </small>

                    <h2 className="fw-bold mt-2 mb-2">
                      12
                    </h2>

                    <span className="text-primary">
                      📁 Active projects
                    </span>
                  </div>

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '55px',
                      height: '55px',
                      background: '#f3e8ff',
                      fontSize: '25px'
                    }}
                  >
                    📁
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderTop: '4px solid #f59e0b',
                borderRadius: '15px'
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <small className="text-muted">
                      PENDING REVIEWS
                    </small>

                    <h2 className="fw-bold mt-2 mb-2">
                      5
                    </h2>

                    <span className="text-warning">
                      ⏳ Need review
                    </span>
                  </div>

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '55px',
                      height: '55px',
                      background: '#fef3c7',
                      fontSize: '25px'
                    }}
                  >
                    ⏳
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="col-md-3">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderTop: '4px solid #10b981',
                borderRadius: '15px'
              }}
            >
              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>
                    <small className="text-muted">
                      COMPLETED
                    </small>

                    <h2 className="fw-bold mt-2 mb-2">
                      7
                    </h2>

                    <span className="text-success">
                      ✅ Projects completed
                    </span>
                  </div>

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '55px',
                      height: '55px',
                      background: '#d1fae5',
                      fontSize: '25px'
                    }}
                  >
                    ✅
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

        {/* PROJECT OVERVIEW + QUICK ACTIONS */}
        <div className="row g-4 mb-4">

          {/* Project Overview */}
          <div className="col-lg-7">

            <div
              className="card border-0 shadow-sm h-100"
              style={{ borderRadius: '15px' }}
            >
              <div className="card-body p-4">

                <h4 className="fw-bold mb-3">
                  📁 Project Overview
                </h4>

                <h5 className="fw-bold text-primary">
                  Recent Student Projects
                </h5>

                <p className="text-muted mb-4">
                  Monitor student projects, progress and current status.
                </p>

                <div className="row g-3">

                  <div className="col-md-6">
                    <div
                      className="p-3"
                      style={{
                        background: '#f8fafc',
                        borderRadius: '10px'
                      }}
                    >
                      <small className="text-muted">
                        ACTIVE PROJECTS
                      </small>

                      <h4 className="fw-bold mt-2 mb-0">
                        12
                      </h4>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div
                      className="p-3"
                      style={{
                        background: '#f8fafc',
                        borderRadius: '10px'
                      }}
                    >
                      <small className="text-muted">
                        COMPLETED PROJECTS
                      </small>

                      <h4 className="fw-bold mt-2 mb-0 text-success">
                        7
                      </h4>
                    </div>
                  </div>

                </div>

                <button
                  className="btn btn-primary mt-4"
                  onClick={() => navigate('/teacher/projects')}
                  style={{
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  📊 View All Projects
                </button>

              </div>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="col-lg-5">

            <div
              className="card border-0 shadow-sm h-100"
              style={{ borderRadius: '15px' }}
            >
              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  ⚡ Quick Actions
                </h4>

                <div className="d-grid gap-3">

                  <button
                    className="btn btn-primary text-start py-3"
                    onClick={() =>
                      navigate('/teacher/students')
                    }
                    style={{
                      borderRadius: '10px',
                      fontWeight: '600'
                    }}
                  >
                    👨‍🎓 View Students
                  </button>

                  <button
                    className="btn btn-success text-start py-3"
                    onClick={() =>
                      navigate('/teacher/projects')
                    }
                    style={{
                      borderRadius: '10px',
                      fontWeight: '600'
                    }}
                  >
                    📁 Manage Projects
                  </button>

                  <button
                    className="btn btn-warning text-start py-3"
                    onClick={() =>
                      navigate('/teacher/submission')
                    }
                    style={{
                      borderRadius: '10px',
                      fontWeight: '600'
                    }}
                  >
                    📄 Review Submissions
                  </button>

                  <button
                    className="btn btn-info text-start py-3"
                    onClick={() =>
                      navigate('/teacher/feedback')
                    }
                    style={{
                      borderRadius: '10px',
                      fontWeight: '600'
                    }}
                  >
                    📝 Give Feedback
                  </button>

                  <button
                    className="btn btn-dark text-start py-3"
                    onClick={() =>
                      navigate('/teacher/evaluation')
                    }
                    style={{
                      borderRadius: '10px',
                      fontWeight: '600'
                    }}
                  >
                    ⭐ Evaluate Project
                  </button>

                </div>

              </div>
            </div>

          </div>

        </div>

        {/* RECENT STUDENT PROJECTS */}
        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: '15px' }}
        >

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <h4 className="fw-bold mb-1">
                  📊 Recent Student Projects
                </h4>

                <small className="text-muted">
                  Track student project progress and status.
                </small>
              </div>

              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  navigate('/teacher/projects')
                }
                style={{
                  borderRadius: '7px'
                }}
              >
                View All
              </button>

            </div>

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Student</th>
                    <th>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {projects.map((project, index) => (

                    <tr key={index}>

                      <td>
                        {index + 1}
                      </td>

                      <td className="fw-semibold">
                        {project.project}
                      </td>

                      <td>
                        👨‍🎓 {project.student}
                      </td>

                      <td style={{ minWidth: '170px' }}>

                        <div className="d-flex justify-content-between mb-1">
                          <small>
                            {project.progress}%
                          </small>
                        </div>

                        <div
                          className="progress"
                          style={{
                            height: '8px',
                            borderRadius: '10px'
                          }}
                        >
                          <div
                            className="progress-bar"
                            style={{
                              width: `${project.progress}%`,
                              borderRadius: '10px'
                            }}
                          ></div>
                        </div>

                      </td>

                      <td>

                        <span
                          className={
                            project.status === 'Completed'
                              ? 'badge text-bg-success'
                              : project.status === 'Almost Completed'
                              ? 'badge text-bg-info'
                              : 'badge text-bg-primary'
                          }
                        >
                          {project.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        </div>

      </div>

    </div>
  )
}

export default TeacherDashboard