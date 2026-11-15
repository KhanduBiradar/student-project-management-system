function Progress() {
  const completedTasks = 13
  const pendingTasks = 7
  const totalTasks = completedTasks + pendingTasks
  const progress = 65

  const milestones = [
    {
      title: 'Requirement Analysis',
      status: 'Completed',
      statusClass: 'text-success',
      icon: '✅'
    },
    {
      title: 'System Design',
      status: 'Completed',
      statusClass: 'text-success',
      icon: '✅'
    },
    {
      title: 'Development',
      status: 'In Progress',
      statusClass: 'text-primary',
      icon: '⚙️'
    },
    {
      title: 'Testing & Submission',
      status: 'Pending',
      statusClass: 'text-warning',
      icon: '⏳'
    }
  ]

  return (
    <div className="container-fluid p-4">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          📈 Project Progress
        </h2>

        <p className="text-muted mb-0">
          Track your project development and task completion.
        </p>
      </div>

      {/* OVERALL PROGRESS */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{
          borderRadius: '15px',
          borderTop: '4px solid #4f46e5'
        }}
      >
        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <div>
              <h4 className="fw-bold mb-1">
                Overall Progress
              </h4>

              <small className="text-muted">
                Student Project Management System
              </small>
            </div>

            <div className="text-end">
              <h3 className="fw-bold text-primary mb-0">
                {progress}%
              </h3>

              <small className="text-muted">
                Completed
              </small>
            </div>

          </div>

          <div
            className="progress"
            style={{
              height: '12px',
              borderRadius: '10px',
              background: '#e9ecef'
            }}
          >
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{
                width: `${progress}%`,
                borderRadius: '10px'
              }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">

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
                    COMPLETED TASKS
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {completedTasks}
                  </h2>

                  <span className="text-success small">
                    Tasks completed successfully
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

        {/* PENDING */}
        <div className="col-md-4">

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
                    PENDING TASKS
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {pendingTasks}
                  </h2>

                  <span className="text-warning small">
                    Tasks remaining
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

        {/* TOTAL */}
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
                    TOTAL TASKS
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {totalTasks}
                  </h2>

                  <span className="text-primary small">
                    Total project tasks
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
                  📋
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MILESTONES */}
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
                🎯 Project Milestones
              </h4>

              <small className="text-muted">
                Track important project development stages.
              </small>
            </div>

            <span
              className="badge bg-primary"
              style={{
                padding: '10px 14px',
                borderRadius: '8px'
              }}
            >
              {milestones.length} Milestones
            </span>

          </div>

          {milestones.map((milestone, index) => (

            <div
              key={index}
              className="d-flex justify-content-between align-items-center"
              style={{
                padding: '16px 0',
                borderBottom:
                  index !== milestones.length - 1
                    ? '1px solid #e5e7eb'
                    : 'none'
              }}
            >

              <div className="d-flex align-items-center">

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: '45px',
                    height: '45px',
                    background:
                      milestone.status === 'Completed'
                        ? '#d1fae5'
                        : milestone.status === 'In Progress'
                        ? '#eef2ff'
                        : '#fef3c7',
                    fontSize: '20px'
                  }}
                >
                  {milestone.icon}
                </div>

                <div>

                  <h6 className="fw-bold mb-1">
                    {milestone.title}
                  </h6>

                  <small className="text-muted">
                    Project milestone {index + 1}
                  </small>

                </div>

              </div>

              <span
                className={milestone.statusClass}
                style={{
                  fontWeight: '600'
                }}
              >
                {milestone.status}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Progress