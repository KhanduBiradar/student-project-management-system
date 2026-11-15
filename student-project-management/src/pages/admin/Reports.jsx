function Reports() {

  const reports = [
    {
      id: 1,
      project: 'Student Project Management System',
      student: 'Rohit patil',
      progress: '65%',
      submission: 'Pending',
      evaluation: 'Not Evaluated'
    },
    {
      id: 2,
      project: 'Online Learning System',
      student: 'Rahul Patil',
      progress: '80%',
      submission: 'Approved',
      evaluation: '86 / 100'
    },
    {
      id: 3,
      project: 'College Attendance System',
      student: 'Amit Shinde',
      progress: '45%',
      submission: 'Pending',
      evaluation: 'Not Evaluated'
    },
    {
      id: 4,
      project: 'Library Management System',
      student: 'Sneha Jadhav',
      progress: '100%',
      submission: 'Approved',
      evaluation: '92 / 100'
    }
  ]

  return (
    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-1">
        Project Reports
      </h2>

      <p className="text-muted mb-4">
        View overall student project progress and performance reports.
      </p>

      {/* Statistics */}

      <div className="row g-4 mb-4">

        <div className="col-md-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Total Projects
              </h6>

              <h2 className="fw-bold">
                12
              </h2>

              <span className="text-primary">
                📁 Registered projects
              </span>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Completed
              </h6>

              <h2 className="fw-bold">
                4
              </h2>

              <span className="text-success">
                ✅ Completed projects
              </span>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Pending
              </h6>

              <h2 className="fw-bold">
                5
              </h2>

              <span className="text-warning">
                ⏳ Pending submissions
              </span>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Evaluated
              </h6>

              <h2 className="fw-bold">
                3
              </h2>

              <span className="text-info">
                ⭐ Evaluated projects
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Report Table */}

      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <h5 className="fw-bold mb-3">
            📊 Project Performance Report
          </h5>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>
                  <th>#</th>
                  <th>Project</th>
                  <th>Student</th>
                  <th>Progress</th>
                  <th>Submission</th>
                  <th>Evaluation</th>
                </tr>

              </thead>

              <tbody>

                {reports.map((report) => (

                  <tr key={report.id}>

                    <td>
                      {report.id}
                    </td>

                    <td className="fw-semibold">
                      {report.project}
                    </td>

                    <td>
                      {report.student}
                    </td>

                    <td>

                      <div className="progress">

                        <div
                          className="progress-bar"
                          style={{
                            width: report.progress
                          }}
                        >
                          {report.progress}
                        </div>

                      </div>

                    </td>

                    <td>

                      <span
                        className={
                          report.submission === 'Approved'
                            ? 'badge text-bg-success'
                            : 'badge text-bg-warning'
                        }
                      >
                        {report.submission}
                      </span>

                    </td>

                    <td>

                      <span
                        className={
                          report.evaluation === 'Not Evaluated'
                            ? 'badge text-bg-secondary'
                            : 'badge text-bg-primary'
                        }
                      >
                        {report.evaluation}
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
  )
}

export default Reports