import { useState } from 'react'

function StudentProjects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const projects = [
    {
      project: 'Student Project Management System',
      leader: 'Khandu Biradar',
      team: 4,
      progress: 65,
      status: 'In Progress'
    },
    {
      project: 'Online Learning System',
      leader: 'Rahul Patil',
      team: 3,
      progress: 80,
      status: 'Almost Complete'
    },
    {
      project: 'College Attendance System',
      leader: 'Amit Shinde',
      team: 4,
      progress: 45,
      status: 'In Progress'
    },
    {
      project: 'Library Management System',
      leader: 'Sneha Jadhav',
      team: 3,
      progress: 100,
      status: 'Completed'
    }
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.project.toLowerCase().includes(search.toLowerCase()) ||
      project.leader.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' ||
      project.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const inProgressCount = projects.filter(
    (project) => project.status === 'In Progress'
  ).length

  const completedCount = projects.filter(
    (project) => project.status === 'Completed'
  ).length

  const getStatusClass = (status) => {
    if (status === 'Completed') {
      return 'badge text-bg-success'
    }

    if (status === 'Almost Complete') {
      return 'badge text-bg-info'
    }

    return 'badge text-bg-primary'
  }

  return (
    <div className="container-fluid p-4">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          📁 Student Projects
        </h2>

        <p className="text-muted mb-0">
          View and monitor projects assigned to you.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">

        {/* TOTAL */}
        <div className="col-md-4">
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
                    TOTAL PROJECTS
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {projects.length}
                  </h2>

                  <span className="text-primary small">
                    📁 Assigned projects
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
                  📁
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* IN PROGRESS */}
        <div className="col-md-4">
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
                    IN PROGRESS
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {inProgressCount}
                  </h2>

                  <span className="text-primary small">
                    ⚙️ Projects under development
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
                  ⚙️
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* COMPLETED */}
        <div className="col-md-4">
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

                  <h2 className="fw-bold mt-2 mb-1">
                    {completedCount}
                  </h2>

                  <span className="text-success small">
                    ✅ Completed projects
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

      {/* SEARCH + FILTER */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{
          borderRadius: '15px'
        }}
      >
        <div className="card-body p-4">

          <div className="row g-3">

            <div className="col-md-8">

              <label className="form-label fw-semibold">
                Search Projects
              </label>

              <div className="input-group">

                <span className="input-group-text bg-white">
                  🔍
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search project or team leader..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="col-md-4">

              <label className="form-label fw-semibold">
                Filter by Status
              </label>

              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Almost Complete">
                  Almost Complete
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

          </div>

        </div>
      </div>

      {/* SELECTED PROJECT DETAILS */}
      {selectedProject && (
        <div
          className="card border-0 shadow-sm mb-4"
          style={{
            borderRadius: '15px',
            borderTop: '4px solid #4f46e5'
          }}
        >

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <h4 className="fw-bold mb-1">
                  📋 Project Details
                </h4>

                <small className="text-muted">
                  Detailed information about selected project.
                </small>
              </div>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() =>
                  setSelectedProject(null)
                }
                style={{
                  borderRadius: '7px'
                }}
              >
                ✕ Close
              </button>

            </div>

            <div className="row g-4">

              <div className="col-md-6">

                <small className="text-muted">
                  PROJECT NAME
                </small>

                <h6 className="fw-bold mt-2">
                  📁 {selectedProject.project}
                </h6>

              </div>

              <div className="col-md-6">

                <small className="text-muted">
                  TEAM LEADER
                </small>

                <h6 className="fw-bold mt-2">
                  👨‍🎓 {selectedProject.leader}
                </h6>

              </div>

              <div className="col-md-4">

                <small className="text-muted">
                  TEAM SIZE
                </small>

                <h6 className="fw-bold mt-2">
                  👥 {selectedProject.team} Students
                </h6>

              </div>

              <div className="col-md-4">

                <small className="text-muted">
                  PROGRESS
                </small>

                <h6 className="fw-bold mt-2">
                  {selectedProject.progress}%
                </h6>

              </div>

              <div className="col-md-4">

                <small className="text-muted">
                  STATUS
                </small>

                <div className="mt-2">
                  <span
                    className={getStatusClass(
                      selectedProject.status
                    )}
                  >
                    {selectedProject.status}
                  </span>
                </div>

              </div>

            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-between mb-2">

              <span className="fw-semibold">
                Project Progress
              </span>

              <span className="text-primary fw-bold">
                {selectedProject.progress}%
              </span>

            </div>

            <div
              className="progress"
              style={{
                height: '12px',
                borderRadius: '10px'
              }}
            >
              <div
                className={
                  selectedProject.progress === 100
                    ? 'progress-bar bg-success'
                    : 'progress-bar bg-primary'
                }
                style={{
                  width: `${selectedProject.progress}%`,
                  borderRadius: '10px'
                }}
              ></div>
            </div>

          </div>
        </div>
      )}

      {/* PROJECT TABLE */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: '15px'
        }}
      >

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h4 className="fw-bold mb-1">
                📁 All Student Projects
              </h4>

              <small className="text-muted">
                Monitor your assigned project teams and progress.
              </small>
            </div>

            <span
              className="badge bg-primary"
              style={{
                padding: '10px 14px',
                borderRadius: '8px'
              }}
            >
              {filteredProjects.length} Projects
            </span>

          </div>

          <div className="table-responsive">

            <table className="table align-middle mb-0">

              <thead className="table-light">

                <tr>
                  <th>#</th>
                  <th>Project</th>
                  <th>Team Leader</th>
                  <th>Team Size</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {filteredProjects.length > 0 ? (

                  filteredProjects.map((project, index) => (

                    <tr key={project.project}>

                      <td>
                        {index + 1}
                      </td>

                      <td>

                        <div className="d-flex align-items-center">

                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: '40px',
                              height: '40px',
                              background: '#eef2ff'
                            }}
                          >
                            📁
                          </div>

                          <span className="fw-semibold">
                            {project.project}
                          </span>

                        </div>

                      </td>

                      <td>
                        👨‍🎓 {project.leader}
                      </td>

                      <td>
                        👥 {project.team}
                      </td>

                      <td style={{ minWidth: '160px' }}>

                        <div className="d-flex justify-content-between mb-1">

                          <small className="fw-semibold">
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
                            className={
                              project.progress === 100
                                ? 'progress-bar bg-success'
                                : 'progress-bar bg-primary'
                            }
                            style={{
                              width: `${project.progress}%`,
                              borderRadius: '10px'
                            }}
                          ></div>

                        </div>

                      </td>

                      <td>

                        <span
                          className={getStatusClass(
                            project.status
                          )}
                        >
                          {project.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            setSelectedProject(project)
                          }
                          style={{
                            borderRadius: '7px'
                          }}
                        >
                          👁 View
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center text-muted py-5"
                    >
                      🔍 No projects found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

    </div>
  )
}

export default StudentProjects