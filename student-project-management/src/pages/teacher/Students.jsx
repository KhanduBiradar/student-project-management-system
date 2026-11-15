import { useState } from 'react'

function Students() {
  const [search, setSearch] = useState('')

  const students = [
    {
      name: 'Khandu Biradar',
      email: 'khandu@example.com',
      project: 'Student Project Management System',
      team: 4,
      progress: 65,
      submission: 'Pending',
      evaluation: 'Pending'
    },
    {
      name: 'Rahul Patil',
      email: 'rahul@example.com',
      project: 'Online Learning System',
      team: 3,
      progress: 80,
      submission: 'Submitted',
      evaluation: 'Evaluated'
    },
    {
      name: 'Amit Shinde',
      email: 'amit@example.com',
      project: 'College Attendance System',
      team: 4,
      progress: 45,
      submission: 'Pending',
      evaluation: 'Pending'
    },
    {
      name: 'Sneha Jadhav',
      email: 'sneha@example.com',
      project: 'Library Management System',
      team: 3,
      progress: 100,
      submission: 'Submitted',
      evaluation: 'Evaluated'
    }
  ]

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.project.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  )

  const submittedCount = students.filter(
    (student) => student.submission === 'Submitted'
  ).length

  const evaluatedCount = students.filter(
    (student) => student.evaluation === 'Evaluated'
  ).length

  const viewStudent = (student) => {
    alert(
      `Student: ${student.name}\n` +
      `Email: ${student.email}\n` +
      `Project: ${student.project}\n` +
      `Progress: ${student.progress}%\n` +
      `Submission: ${student.submission}\n` +
      `Evaluation: ${student.evaluation}`
    )
  }

  return (
    <div className="container-fluid p-4">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          👨‍🎓 Student Details
        </h2>

        <p className="text-muted mb-0">
          View student information and monitor project progress.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">

        {/* TOTAL STUDENTS */}
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
                    TOTAL STUDENTS
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {students.length}
                  </h2>

                  <span className="text-primary small">
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

        {/* SUBMITTED */}
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
                    SUBMITTED
                  </small>

                  <h2 className="fw-bold text-success mt-2 mb-1">
                    {submittedCount}
                  </h2>

                  <span className="text-success small">
                    ✅ Submitted projects
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
                  📤
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* EVALUATED */}
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
                    EVALUATED
                  </small>

                  <h2 className="fw-bold text-primary mt-2 mb-1">
                    {evaluatedCount}
                  </h2>

                  <span className="text-primary small">
                    ⭐ Evaluated students
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
                  ⭐
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* STUDENTS TABLE */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: '15px'
        }}
      >

        <div className="card-body p-4">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h4 className="fw-bold mb-1">
                👨‍🎓 All Students
              </h4>

              <small className="text-muted">
                View and monitor student project information.
              </small>

            </div>

            <span
              className="badge bg-primary"
              style={{
                padding: '10px 14px',
                borderRadius: '8px'
              }}
            >
              {filteredStudents.length} Students
            </span>

          </div>

          {/* SEARCH */}
          <div className="mb-4">

            <div className="input-group">

              <span className="input-group-text bg-white">
                🔍
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Search student, email or project..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* TABLE */}
          <div className="table-responsive">

            <table className="table align-middle mb-0">

              <thead className="table-light">

                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Project</th>
                  <th>Team</th>
                  <th>Progress</th>
                  <th>Submission</th>
                  <th>Evaluation</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {filteredStudents.length > 0 ? (

                  filteredStudents.map((student, index) => (

                    <tr key={student.email}>

                      {/* NUMBER */}
                      <td>
                        <span className="fw-semibold">
                          {index + 1}
                        </span>
                      </td>

                      {/* STUDENT */}
                      <td>

                        <div className="d-flex align-items-center">

                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                              width: '42px',
                              height: '42px',
                              background: '#eef2ff',
                              fontSize: '18px'
                            }}
                          >
                            👤
                          </div>

                          <div>

                            <div className="fw-semibold">
                              {student.name}
                            </div>

                            <small className="text-muted">
                              {student.email}
                            </small>

                          </div>

                        </div>

                      </td>

                      {/* PROJECT */}
                      <td>
                        <span className="fw-semibold">
                          📁 {student.project}
                        </span>
                      </td>

                      {/* TEAM */}
                      <td>

                        <span
                          className="badge bg-light text-dark"
                          style={{
                            padding: '8px 10px'
                          }}
                        >
                          👥 {student.team}
                        </span>

                      </td>

                      {/* PROGRESS */}
                      <td style={{ minWidth: '160px' }}>

                        <div className="d-flex justify-content-between mb-1">

                          <small className="fw-semibold">
                            {student.progress}%
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
                              student.progress === 100
                                ? 'progress-bar bg-success'
                                : 'progress-bar bg-primary'
                            }
                            style={{
                              width: `${student.progress}%`,
                              borderRadius: '10px'
                            }}
                          ></div>

                        </div>

                      </td>

                      {/* SUBMISSION */}
                      <td>

                        <span
                          className={
                            student.submission === 'Submitted'
                              ? 'badge text-bg-success'
                              : 'badge text-bg-warning'
                          }
                        >
                          {student.submission}
                        </span>

                      </td>

                      {/* EVALUATION */}
                      <td>

                        <span
                          className={
                            student.evaluation === 'Evaluated'
                              ? 'badge text-bg-success'
                              : 'badge text-bg-secondary'
                          }
                        >
                          {student.evaluation}
                        </span>

                      </td>

                      {/* ACTION */}
                      <td>

                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            viewStudent(student)
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
                      colSpan="8"
                      className="text-center text-muted py-5"
                    >
                      🔍 No student found.
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

export default Students