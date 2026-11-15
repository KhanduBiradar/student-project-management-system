import { useEffect, useState } from 'react'

function Submission() {

  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch submissions
  const fetchSubmissions = () => {

    setLoading(true)

    fetch('http://localhost:5000/api/admin/submissions')
      .then((response) => {

        if (!response.ok) {
          throw new Error('Failed to fetch submissions')
        }

        return response.json()
      })
      .then((data) => {

        if (data.success) {
          setSubmissions(data.submissions)
          setError('')
        } else {
          setError('Unable to load submissions')
        }

        setLoading(false)
      })
      .catch((err) => {

        console.error('Submissions fetch error:', err)
        setError('Server connection failed')
        setLoading(false)

      })
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  return (
    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-1">
        Submission Management
      </h2>

      <p className="text-muted mb-4">
        View all student project submissions and their approval status.
      </p>

      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-bold mb-0">
              📄 All Submissions
            </h5>

            <span className="badge text-bg-primary">
              {submissions.length} Submissions
            </span>

          </div>

          {loading && (
            <div className="text-center py-4">

              <div className="spinner-border text-primary"></div>

              <p className="mt-2 text-muted">
                Loading submissions...
              </p>

            </div>
          )}

          {!loading && error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {!loading && !error && (

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>
                  <tr>

                    <th>#</th>
                    <th>Title</th>
                    <th>Student</th>
                    <th>Project</th>
                    <th>File</th>
                    <th>Date</th>
                    <th>Status</th>

                  </tr>
                </thead>

                <tbody>

                  {submissions.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center text-muted py-4"
                      >
                        No submissions found.
                      </td>

                    </tr>

                  ) : (

                    submissions.map((submission, index) => (

                      <tr key={submission.id}>

                        <td>
                          {index + 1}
                        </td>

                        <td className="fw-semibold">
                          {submission.title}
                        </td>

                        <td>
                          {submission.student_name}
                        </td>

                        <td>
                          {submission.project_title}
                        </td>

                        <td>
                          {submission.file_name || 'No file'}
                        </td>

                        <td>
                          {new Date(
                            submission.submission_date
                          ).toLocaleDateString()}
                        </td>

                        <td>

                          <span
                            className={
                              submission.status === 'Approved'
                                ? 'badge text-bg-success'
                                : submission.status === 'Rejected'
                                ? 'badge text-bg-danger'
                                : submission.status === 'Reviewed'
                                ? 'badge text-bg-info'
                                : 'badge text-bg-warning'
                            }
                          >
                            {submission.status}
                          </span>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default Submission