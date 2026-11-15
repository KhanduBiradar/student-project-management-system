import { useEffect, useState } from 'react'

function Deadlines() {
  const [deadlines, setDeadlines] = useState([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)

  // ================= GET DEADLINES =================

  const fetchDeadlines = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/deadlines'
      )

      const data = await response.json()

      if (data.success) {
        setDeadlines(data.deadlines)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Fetch deadlines error:', error)
      alert('Unable to load deadlines')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeadlines()
  }, [])

  // ================= ADD DEADLINE =================

  const addDeadline = async (e) => {
    e.preventDefault()

    if (!title || !date) {
      alert('Please enter deadline title and date')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/deadlines',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            project_id: 1,
            title: title,
            description: description,
            deadline_date: date
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      alert('Deadline added successfully!')

      setTitle('')
      setDate('')
      setDescription('')

      fetchDeadlines()

    } catch (error) {
      console.error('Add deadline error:', error)
      alert('Unable to add deadline')
    }
  }

  // ================= DELETE DEADLINE =================

  const deleteDeadline = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this deadline?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/deadlines/${id}`,
        {
          method: 'DELETE'
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      alert('Deadline deleted successfully!')

      fetchDeadlines()

    } catch (error) {
      console.error('Delete deadline error:', error)
      alert('Unable to delete deadline')
    }
  }

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}

      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Deadline Management
        </h2>

        <p className="text-muted mb-0">
          Manage important project deadlines and schedules.
        </p>
      </div>

      {/* ADD DEADLINE */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body p-4">

          <h5 className="fw-bold mb-3">
            ➕ Add New Deadline
          </h5>

          <form onSubmit={addDeadline}>

            <div className="row g-3">

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Deadline Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter deadline title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />

              </div>

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Deadline Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                />

              </div>

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Description
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                />

              </div>

            </div>

            <div className="mt-3">

              <button
                type="submit"
                className="btn btn-primary"
              >
                ➕ Add Deadline
              </button>

            </div>

          </form>

        </div>

      </div>

      {/* DEADLINE TABLE */}

      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <div>

              <h5 className="fw-bold mb-1">
                📅 Project Deadlines
              </h5>

              <small className="text-muted">
                Deadlines loaded from MySQL database
              </small>

            </div>

            <span className="badge text-bg-primary">
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
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-4"
                    >
                      Loading deadlines...
                    </td>

                  </tr>

                ) : deadlines.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center text-muted py-4"
                    >
                      No deadlines available.
                    </td>

                  </tr>

                ) : (

                  deadlines.map((deadline, index) => (

                    <tr key={deadline.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td className="fw-semibold">
                        {deadline.title}
                      </td>

                      <td>
                        📅 {deadline.deadline_date}
                      </td>

                      <td>
                        {deadline.description || '-'}
                      </td>

                      <td>

                        <span
                          className={
                            deadline.status === 'Completed'
                              ? 'badge text-bg-success'
                              : deadline.status === 'Overdue'
                                ? 'badge text-bg-danger'
                                : 'badge text-bg-warning'
                          }
                        >
                          {deadline.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            deleteDeadline(deadline.id)
                          }
                        >
                          🗑 Delete
                        </button>

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

export default Deadlines