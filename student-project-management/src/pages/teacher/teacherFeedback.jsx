import { useEffect, useState } from 'react'

function TeacherFeedback() {
  const [project, setProject] = useState('')
  const [rating, setRating] = useState('')
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [studentResponses, setStudentResponses] = useState([])
  const [loadingResponses, setLoadingResponses] = useState(true)

  const projects = [
    'Student Project Management System - Khandu Biradar',
    'Online Learning System - Rahul Patil',
    'College Attendance System - Amit Shinde',
    'Library Management System - Sneha Jadhav'
  ]

  // Fetch student responses
  useEffect(() => {
    const fetchStudentResponses = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/teacher/responses/1'
        )

        const data = await response.json()

        if (data.success) {
          setStudentResponses(data.responses)
        } else {
          console.error(data.message)
        }
      } catch (error) {
        console.error('Student responses error:', error)
      } finally {
        setLoadingResponses(false)
      }
    }

    fetchStudentResponses()
  }, [])

  // Delete student response
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this student response?'
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(
        `http://localhost:5000/api/teacher/response/${id}`,
        {
          method: 'DELETE'
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to delete response')
        return
      }

      setStudentResponses((prev) =>
        prev.filter((item) => item.id !== id)
      )

      alert('Student response deleted successfully!')
    } catch (error) {
      console.error('Delete response error:', error)
      alert('Server connection failed.')
    }
  }

  // Submit teacher feedback
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!project || !rating || !feedback.trim()) {
      alert('Please select project, rating and enter feedback.')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/teacher/feedback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            project_id: 1,
            teacher_id: 1,
            student_id: 1,
            feedback_text: feedback.trim(),
            rating: Number(rating)
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to submit feedback')
        return
      }

      alert('Feedback submitted successfully!')

      setSubmitted(true)
      setProject('')
      setRating('')
      setFeedback('')
    } catch (error) {
      console.error('Teacher feedback error:', error)
      alert('Server connection failed. Please check backend.')
    }
  }

  return (
    <div
      className="container-fluid p-4"
      style={{ background: '#f5f7fb', minHeight: '100vh' }}
    >

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          📝 Teacher Feedback
        </h2>

        <p className="text-muted mb-0">
          Give feedback to students and review their responses.
        </p>
      </div>

      {/* STUDENT RESPONSES */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{
          borderRadius: '16px'
        }}
      >
        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h4 className="fw-bold mb-1">
                💬 Student Responses
              </h4>

              <small className="text-muted">
                Responses received from students.
              </small>
            </div>

            <span
              className="badge bg-primary"
              style={{
                padding: '9px 13px',
                borderRadius: '8px'
              }}
            >
              {studentResponses.length} Responses
            </span>

          </div>

          {loadingResponses ? (

            <div className="text-center py-5">

              <div className="spinner-border text-primary"></div>

              <p className="text-muted mt-3 mb-0">
                Loading student responses...
              </p>

            </div>

          ) : studentResponses.length === 0 ? (

            <div
              className="text-center py-5"
              style={{
                background: '#f8fafc',
                borderRadius: '12px'
              }}
            >

              <div style={{ fontSize: '42px' }}>
                💬
              </div>

              <h6 className="fw-bold mt-3">
                No Student Responses
              </h6>

              <p className="text-muted mb-0">
                Student responses will appear here.
              </p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="table-light">

                  <tr>
                    <th>Student</th>
                    <th>Project</th>
                    <th>Response</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {studentResponses.map((item) => (

                    <tr key={item.id}>

                      <td>

                        <div className="d-flex align-items-center">

                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-2"
                            style={{
                              width: '40px',
                              height: '40px',
                              background: '#dbeafe'
                            }}
                          >
                            👨‍🎓
                          </div>

                          <div>

                            <div className="fw-semibold">
                              {item.student_name}
                            </div>

                            <small className="text-muted">
                              {item.student_email}
                            </small>

                          </div>

                        </div>

                      </td>

                      <td>
                        <span className="fw-semibold">
                          📁 {item.project_title}
                        </span>
                      </td>

                      <td style={{ minWidth: '250px' }}>
                        <span className="text-muted">
                          {item.response_text}
                        </span>
                      </td>

                      <td>
                        {new Date(
                          item.created_at
                        ).toLocaleDateString('en-GB')}
                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          style={{
                            borderRadius: '7px'
                          }}
                        >
                          🗑 Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>
      </div>

      {/* FEEDBACK FORM */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: '16px'
        }}
      >
        <div className="card-body p-4">

          <div className="d-flex align-items-center mb-4">

            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: '48px',
                height: '48px',
                background: '#eef2ff',
                fontSize: '23px'
              }}
            >
              📝
            </div>

            <div>

              <h4 className="fw-bold mb-1">
                Give Feedback to Student
              </h4>

              <small className="text-muted">
                Select a project and provide your assessment.
              </small>

            </div>

          </div>

          {submitted && (

            <div
              className="alert alert-success"
              style={{
                borderRadius: '10px'
              }}
            >
              ✅ Feedback submitted successfully!
            </div>

          )}

          <form onSubmit={handleSubmit}>

            <div className="row g-4">

              {/* PROJECT */}
              <div className="col-md-8">

                <label className="form-label fw-semibold">
                  Select Project
                </label>

                <select
                  className="form-select form-select-lg"
                  value={project}
                  onChange={(e) =>
                    setProject(e.target.value)
                  }
                >

                  <option value="">
                    -- Select Project --
                  </option>

                  {projects.map((item, index) => (
                    <option
                      key={index}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}

                </select>

              </div>

              {/* RATING */}
              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Rating
                </label>

                <select
                  className="form-select form-select-lg"
                  value={rating}
                  onChange={(e) =>
                    setRating(e.target.value)
                  }
                >

                  <option value="">
                    -- Select Rating --
                  </option>

                  <option value="5">
                    ⭐⭐⭐⭐⭐ Excellent
                  </option>

                  <option value="4">
                    ⭐⭐⭐⭐ Very Good
                  </option>

                  <option value="3">
                    ⭐⭐⭐ Good
                  </option>

                  <option value="2">
                    ⭐⭐ Average
                  </option>

                  <option value="1">
                    ⭐ Needs Improvement
                  </option>

                </select>

              </div>

              {/* FEEDBACK */}
              <div className="col-12">

                <label className="form-label fw-semibold">
                  Feedback
                </label>

                <textarea
                  className="form-control"
                  rows="6"
                  placeholder="Write detailed feedback for the student..."
                  value={feedback}
                  onChange={(e) =>
                    setFeedback(e.target.value)
                  }
                ></textarea>

                <small className="text-muted">
                  Provide helpful suggestions about the project.
                </small>

              </div>

              {/* SUBMIT */}
              <div className="col-12">

                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2"
                  style={{
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  📤 Submit Feedback
                </button>

              </div>

            </div>

          </form>

        </div>
      </div>

    </div>
  )
}

export default TeacherFeedback