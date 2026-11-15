function Progress() {
  return (
    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-1">Project Progress</h2>
      <p className="text-muted mb-4">
        Track your project development and task completion.
      </p>

      {/* Overall Progress */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">

          <div className="d-flex justify-content-between mb-2">
            <h5 className="fw-bold mb-0">Overall Progress</h5>
            <span className="fw-bold text-primary">65%</span>
          </div>

          <div className="progress" style={{ height: '12px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: '65%' }}
            >
            </div>
          </div>

        </div>
      </div>

      {/* Progress Cards */}
      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Completed Tasks</h6>
              <h2 className="fw-bold">13</h2>
              <span className="text-success">
                ✓ Tasks completed
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Pending Tasks</h6>
              <h2 className="fw-bold">7</h2>
              <span className="text-warning">
                ⏳ Tasks pending
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Tasks</h6>
              <h2 className="fw-bold">20</h2>
              <span className="text-primary">
                📋 Total project tasks
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Project Milestones */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">

          <h5 className="fw-bold mb-4">Project Milestones</h5>

          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <span>Requirement Analysis</span>
              <span className="text-success">Completed</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <span>System Design</span>
              <span className="text-success">Completed</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <span>Development</span>
              <span className="text-primary">In Progress</span>
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-between">
              <span>Testing & Submission</span>
              <span className="text-muted">Pending</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Progress