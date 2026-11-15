import { useEffect, useState } from 'react'

function Submission() {
  const loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUser') || 'null'
  )

  const teacherId = loggedInUser?.teacher_id || 1

  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load teacher submissions
  const loadSubmissions = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        `http://localhost:5000/api/teacher/submissions/${teacherId}`
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || 'Failed to load submissions')
        return
      }

      setSubmissions(data.submissions || [])
    } catch (err) {
      console.error('Teacher submissions error:', err)
      setError('Server connection failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubmissions()
  }, [])

  // Approve / Reject
  const updateStatus = async (submissionId, status) => {
    const actionText =
      status === 'Approved' ? 'approve' : 'reject'

    const confirmed = window.confirm(
      `Are you sure you want to ${actionText} this submission?`
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/teacher/submission/${submissionId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status,
            remarks:
              status === 'Approved'
                ? 'Submission approved by teacher'
                : 'Submission rejected by teacher'
          })
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            `Failed to ${actionText} submission`
        )
        return
      }

      alert(
        status === 'Approved'
          ? 'Submission approved successfully!'
          : 'Submission rejected successfully!'
      )

      await loadSubmissions()
    } catch (err) {
      console.error('Update submission error:', err)
      alert('Server connection failed')
    }
  }

  // Render uploaded files
  const renderFiles = (fileName) => {
    if (!fileName) {
      return (
        <span className="text-muted">
          No files uploaded
        </span>
      )
    }

    const files = fileName
      .split(' | ')
      .map((file) => file.trim())
      .filter(Boolean)

    return (
      <div className="d-flex flex-column gap-2">

        {files.map((file, index) => {
          const lowerFileName = file.toLowerCase()

          let fileLabel = '📄 File'

          if (
            lowerFileName.endsWith('.pdf')
          ) {
            fileLabel = '📄 Final Project Report'
          } else if (
            lowerFileName.endsWith('.zip') ||
            lowerFileName.endsWith('.rar')
          ) {
            fileLabel = '💻 Source Code'
          } else if (
            lowerFileName.endsWith('.ppt') ||
            lowerFileName.endsWith('.pptx')
          ) {
            fileLabel = '📊 Project Presentation'
          }

          const fileUrl =
            `http://localhost:5000/api/uploads/${encodeURIComponent(
              file
            )}`

          return (
            <div
              key={`${file}-${index}`}
              className="d-flex align-items-center justify-content-between gap-2"
              style={{
                minWidth: '320px'
              }}
            >

              <span
                className="fw-semibold text-truncate"
                style={{
                  maxWidth: '180px'
                }}
                title={file}
              >
                {fileLabel}
              </span>

              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                View / Download
              </a>

            </div>
          )
        })}

      </div>
    )
  }

  return (
    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-1">
        Submission Management
      </h2>

      <p className="text-muted mb-4">
        Review student project files and approve or reject submissions.
      </p>

      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-bold mb-0">
              📄 Student Submissions
            </h5>

            <span className="badge text-bg-primary">
              {submissions.length} Submissions
            </span>

          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-4">

              <div className="spinner-border text-primary"></div>

              <p className="mt-2 text-muted">
                Loading submissions...
              </p>

            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {/* Table */}
          {!loading &&
            !error &&
            submissions.length > 0 && (

              <div className="table-responsive">

                <table className="table align-middle">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student</th>
                      <th>Project</th>
                      <th>Uploaded Files</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {submissions.map(
                      (submission, index) => (

                        <tr key={submission.id}>

                          {/* Number */}
                          <td>
                            {index + 1}
                          </td>

                          {/* Student */}
                          <td>
                            <div className="fw-semibold">
                              {submission.student_name}
                            </div>

                            <small className="text-muted">
                              Student ID:{' '}
                              {submission.student_id}
                            </small>
                          </td>

                          {/* Project */}
                          <td>
                            <div className="fw-semibold">
                              {submission.project_title}
                            </div>

                            <small className="text-muted">
                              {submission.title}
                            </small>
                          </td>

                          {/* Uploaded Files */}
                          <td
                            style={{
                              minWidth: '350px'
                            }}
                          >
                            {renderFiles(
                              submission.file_name
                            )}
                          </td>

                          {/* Date */}
                          <td>
                            {submission.submission_date
                              ? new Date(
                                  submission.submission_date
                                ).toLocaleDateString()
                              : '-'}
                          </td>

                          {/* Status */}
                          <td>

                            {submission.status ===
                            'Approved' ? (

                              <span className="badge text-bg-success">
                                Approved
                              </span>

                            ) : submission.status ===
                              'Rejected' ? (

                              <span className="badge text-bg-danger">
                                Rejected
                              </span>

                            ) : (

                              <span className="badge text-bg-warning">
                                Pending
                              </span>

                            )}

                          </td>

                          {/* Action */}
                          <td>

                            {submission.status ===
                            'Pending' ? (

                              <div className="d-flex flex-column gap-2">

                                <button
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() =>
                                    updateStatus(
                                      submission.id,
                                      'Approved'
                                    )
                                  }
                                >
                                  ✓ Approve
                                </button>

                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() =>
                                    updateStatus(
                                      submission.id,
                                      'Rejected'
                                    )
                                  }
                                >
                                  ✕ Reject
                                </button>

                              </div>

                            ) : submission.status ===
                              'Approved' ? (

                              <span className="badge text-bg-success">
                                ✓ Approved
                              </span>

                            ) : (

                              <span className="badge text-bg-danger">
                                ✕ Rejected
                              </span>

                            )}

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>
            )}

          {/* No submissions */}
          {!loading &&
            !error &&
            submissions.length === 0 && (

              <div className="text-center py-4">

                <p className="text-muted mb-0">
                  No submissions found.
                </p>

              </div>
            )}

        </div>

      </div>

    </div>
  )
}

export default Submission