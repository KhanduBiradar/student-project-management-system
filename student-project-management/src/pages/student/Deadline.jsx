import { useEffect, useState } from 'react'

function Deadline() {
  const [deadlines, setDeadlines] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDeadlines = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/deadlines'
      )

      const data = await response.json()

      if (data.success) {
        setDeadlines(data.deadlines)
      }
    } catch (error) {
      console.error('Fetch student deadlines error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeadlines()
  }, [])

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}

      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          📅 Project Deadlines
        </h2>

        <p className="text-muted mb-0">
          Track important dates and deadlines for your project.
        </p>
      </div>

      {/* DEADLINES CARD */}

      <div
        className="card border-0 shadow-sm"
        style={{ borderRadius: '16px' }}
      >

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h4 className="fw-bold mb-1">
                📋 My Project Deadlines
              </h4>

              <small className="text-muted">
                Important project activities and submission dates.
              </small>
            </div>

            <span
              className="badge bg-primary"
              style={{
                padding: '9px 12px',
                borderRadius: '8px'
              }}
            >
              {deadlines.length} Deadlines
            </span>

          </div>

          <div className="table-responsive">

            <table className="table align-middle mb-0">

              <thead className="table-light">

                <tr>
                  <th>#</th>
                  <th>Deadline</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4"
                    >
                      Loading deadlines...
                    </td>
                  </tr>

                ) : deadlines.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-muted py-4"
                    >
                      No deadlines available.
                    </td>
                  </tr>

                ) : (

                  deadlines.map((item, index) => (

                    <tr key={item.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <div className="fw-semibold">
                          {item.title}
                        </div>
                      </td>

                      <td>
                        📅 {item.deadline_date}
                      </td>

                      <td>
                        {item.description || '-'}
                      </td>

                      <td>

                        <span
                          className={
                            item.status === 'Completed'
                              ? 'badge text-bg-success'
                              : item.status === 'Overdue'
                                ? 'badge text-bg-danger'
                                : 'badge text-bg-warning'
                          }
                        >
                          {item.status}
                        </span>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Deadline