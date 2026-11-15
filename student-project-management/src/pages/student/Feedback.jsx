import { useEffect, useState } from 'react'

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/student/feedback/1'
        )

        const data = await response.json()

        if (data.success) {
          setFeedbackList(data.feedback)
        } else {
          console.error(data.message)
        }
      } catch (error) {
        console.error('Student feedback error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  const latestFeedback = feedbackList[0]

  const averageRating =
    feedbackList.length > 0
      ? (
          feedbackList.reduce(
            (sum, item) => sum + (Number(item.rating) || 0),
            0
          ) / feedbackList.length
        ).toFixed(1)
      : '0.0'

  return (
    <div className="container-fluid p-4">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          📝 Teacher Feedback
        </h2>

        <p className="text-muted mb-0">
          View feedback given by your project guide.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">

        {/* Total Feedback */}
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
                    TOTAL FEEDBACK
                  </small>

                  <h3 className="fw-bold mt-2 mb-1">
                    {feedbackList.length}
                  </h3>

                  <span className="text-muted small">
                    Feedback received
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
                  📝
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Latest Rating */}
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
                    AVERAGE RATING
                  </small>

                  <h3 className="fw-bold mt-2 mb-1">
                    ⭐ {averageRating}/5
                  </h3>

                  <span className="text-muted small">
                    Teacher rating
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
                  ⭐
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Project */}
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
                    PROJECT
                  </small>

                  <h6 className="fw-bold mt-3 mb-1">
                    {latestFeedback
                      ? latestFeedback.project_title
                      : 'No project feedback'}
                  </h6>

                  <span className="text-muted small">
                    Current project
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
                  📁
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      {/* LATEST FEEDBACK */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{ borderRadius: '15px' }}
      >

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
              💬
            </div>

            <div>
              <h4 className="fw-bold mb-0">
                Latest Teacher Feedback
              </h4>

              <small className="text-muted">
                Most recent feedback from your project guide
              </small>
            </div>

          </div>

          {loading ? (

            <div className="text-center py-4">

              <div className="spinner-border text-primary"></div>

              <p className="text-muted mt-3 mb-0">
                Loading feedback...
              </p>

            </div>

          ) : feedbackList.length === 0 ? (

            <div
              className="d-flex align-items-center"
              style={{
                background: '#fffbeb',
                borderRadius: '12px',
                padding: '20px'
              }}
            >

              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: '50px',
                  height: '50px',
                  background: '#fef3c7',
                  fontSize: '22px'
                }}
              >
                ⏳
              </div>

              <div>
                <h6 className="fw-bold mb-1">
                  No Feedback Available
                </h6>

                <p className="text-muted mb-0">
                  Your teacher has not provided feedback yet.
                </p>
              </div>

            </div>

          ) : (

            <div
              style={{
                background: '#f8fafc',
                borderRadius: '12px',
                padding: '24px'
              }}
            >

              <div className="row g-4">

                <div className="col-md-6">

                  <small className="text-muted">
                    PROJECT
                  </small>

                  <h5 className="fw-bold mt-2">
                    📁 {latestFeedback.project_title}
                  </h5>

                </div>

                <div className="col-md-6">

                  <small className="text-muted">
                    GUIDE / TEACHER
                  </small>

                  <h5 className="fw-bold mt-2">
                    👨‍🏫 {latestFeedback.teacher_name}
                  </h5>

                </div>

                <div className="col-12">

                  <small className="text-muted">
                    FEEDBACK
                  </small>

                  <div
                    className="mt-2"
                    style={{
                      background: 'white',
                      borderRadius: '10px',
                      padding: '18px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    {latestFeedback.feedback_text}
                  </div>

                </div>

                <div className="col-md-6">

                  <small className="text-muted">
                    RATING
                  </small>

                  <h5 className="fw-bold mt-2">
                    {latestFeedback.rating
                      ? `⭐ ${latestFeedback.rating}/5`
                      : 'Not given'}
                  </h5>

                </div>

                <div className="col-md-6">

                  <small className="text-muted">
                    DATE
                  </small>

                  <h5 className="fw-bold mt-2">
                    📅{' '}
                    {new Date(
                      latestFeedback.created_at
                    ).toLocaleDateString('en-GB')}
                  </h5>

                </div>

              </div>

            </div>

          )}

        </div>
      </div>

      {/* FEEDBACK HISTORY */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{ borderRadius: '15px' }}
      >

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h4 className="fw-bold mb-1">
                📋 Feedback History
              </h4>

              <small className="text-muted">
                Previous feedback from your teacher
              </small>
            </div>

            <span
              className="badge bg-primary"
              style={{
                padding: '10px 14px',
                borderRadius: '8px'
              }}
            >
              {feedbackList.length} Feedback
            </span>

          </div>

          {loading ? (

            <p className="text-muted">
              Loading...
            </p>

          ) : feedbackList.length === 0 ? (

            <div className="text-center text-muted py-4">
              No feedback available.
            </div>

          ) : (

            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead className="table-light">

                  <tr>
                    <th>Guide</th>
                    <th>Project</th>
                    <th>Feedback</th>
                    <th>Rating</th>
                    <th>Date</th>
                  </tr>

                </thead>

                <tbody>

                  {feedbackList.map((item) => (
                    <tr key={item.id}>

                      <td>
                        <span className="fw-semibold">
                          👨‍🏫 {item.teacher_name}
                        </span>
                      </td>

                      <td>
                        {item.project_title}
                      </td>

                      <td>
                        <span className="text-muted">
                          {item.feedback_text}
                        </span>
                      </td>

                      <td>

                        <span
                          className={
                            item.rating
                              ? 'badge text-bg-success'
                              : 'badge text-bg-secondary'
                          }
                        >
                          {item.rating
                            ? `⭐ ${item.rating}/5`
                            : 'Not given'}
                        </span>

                      </td>

                      <td>
                        {new Date(
                          item.created_at
                        ).toLocaleDateString('en-GB')}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>
      </div>

      {/* STUDENT RESPONSE */}
      <div
        className="card border-0 shadow-sm"
        style={{ borderRadius: '15px' }}
      >

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
              💬
            </div>

            <div>
              <h4 className="fw-bold mb-0">
                Submit Your Response
              </h4>

              <small className="text-muted">
                Respond to your teacher's feedback.
              </small>
            </div>

          </div>

          <ResponseForm />

        </div>

      </div>

    </div>
  )
}

function ResponseForm() {
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message.trim()) {
      alert('Please enter your response')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(
        'http://localhost:5000/api/student/response',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            student_id: 1,
            project_id: 1,
            teacher_id: 1,
            response_text: message.trim()
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Failed to submit response')
        return
      }

      alert('Response submitted successfully!')

      setMessage('')

    } catch (error) {
      console.error('Response submit error:', error)
      alert('Server connection failed. Please check backend.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <div className="mb-3">

        <label className="form-label fw-semibold">
          Your Message
        </label>

        <textarea
          className="form-control"
          rows="5"
          placeholder="Write your response..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={submitting}
        />

      </div>

      <button
        type="submit"
        className="btn btn-primary px-4 py-2"
        disabled={submitting}
        style={{
          borderRadius: '8px',
          fontWeight: '600'
        }}
      >
        {submitting
          ? '⏳ Submitting...'
          : '📨 Submit Response'}
      </button>

    </form>
  )
}

export default Feedback