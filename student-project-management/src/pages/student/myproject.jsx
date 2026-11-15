import { useState } from 'react'

function MyProject() {
  const [projectTitle, setProjectTitle] = useState(
    'Student Project Management System'
  )

  const [domain, setDomain] = useState('Web Development')

  const [description, setDescription] = useState(
    'A web-based system for managing student projects, teams, submissions, feedback and evaluation.'
  )

  const [guide, setGuide] = useState('Dr. ABC')

  const [status, setStatus] = useState('In Progress')

  const handleSave = () => {
    alert('Project details saved successfully!')
  }

  return (
    <div className="container-fluid p-4">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">📁 My Project</h2>
        <p className="text-muted mb-0">
          View and manage your project information.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">

        {/* Status */}
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderTop: '4px solid #4f46e5',
              borderRadius: '15px'
            }}
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    PROJECT STATUS
                  </small>

                  <h4 className="fw-bold mt-2 mb-2">
                    {status}
                  </h4>

                  <span className="badge bg-primary-subtle text-primary">
                    Active Project
                  </span>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '55px',
                    height: '55px',
                    background: '#eef2ff',
                    fontSize: '25px'
                  }}
                >
                  📊
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Domain */}
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
                    PROJECT DOMAIN
                  </small>

                  <h4 className="fw-bold mt-2 mb-2">
                    {domain}
                  </h4>

                  <span className="text-muted small">
                    Technology Domain
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
                  💻
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderTop: '4px solid #10b981',
              borderRadius: '15px'
            }}
          >
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <small className="text-muted">
                    PROJECT PROGRESS
                  </small>

                  <h4 className="fw-bold mt-2 mb-0">
                    65%
                  </h4>
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
                  📈
                </div>
              </div>

              <div
                className="progress mt-3"
                style={{
                  height: '9px',
                  borderRadius: '10px'
                }}
              >
                <div
                  className="progress-bar bg-success"
                  style={{
                    width: '65%',
                    borderRadius: '10px'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* PROJECT DETAILS */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>

        <div className="card-body p-4">

          <div className="d-flex align-items-center mb-4">
            <div
              className="rounded-circle me-3 d-flex align-items-center justify-content-center"
              style={{
                width: '45px',
                height: '45px',
                background: '#eef2ff',
                fontSize: '22px'
              }}
            >
              📋
            </div>

            <div>
              <h4 className="fw-bold mb-0">
                Project Details
              </h4>

              <small className="text-muted">
                Manage your project information
              </small>
            </div>
          </div>

          <div className="row g-4">

            {/* Project Title */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Project Title
              </label>

              <input
                type="text"
                className="form-control form-control-lg"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Enter project title"
              />
            </div>

            {/* Domain */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Project Domain
              </label>

              <select
                className="form-select form-select-lg"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              >
                <option>Web Development</option>
                <option>Artificial Intelligence</option>
                <option>Data Science</option>
                <option>Mobile Application</option>
                <option>Cyber Security</option>
              </select>
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                Project Description
              </label>

              <textarea
                className="form-control"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
              ></textarea>
            </div>

            {/* Guide */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Guide / Teacher
              </label>

              <input
                type="text"
                className="form-control form-control-lg"
                value={guide}
                onChange={(e) => setGuide(e.target.value)}
                placeholder="Enter guide name"
              />
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Project Status
              </label>

              <select
                className="form-select form-select-lg"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

          </div>

          {/* SAVE BUTTON */}
          <div className="mt-4">
            <button
              className="btn btn-primary px-4 py-2"
              onClick={handleSave}
              style={{
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              💾 Save Project
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default MyProject