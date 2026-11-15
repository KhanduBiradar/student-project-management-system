import { useEffect, useState } from 'react'

function Evaluation() {
  const [evaluation, setEvaluation] = useState(null)
  const [loading, setLoading] = useState(true)

  const studentId = 1

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/student/evaluation/${studentId}`
        )

        const data = await response.json()

        if (data.success && data.evaluated) {
          setEvaluation(data.evaluation)
        } else {
          setEvaluation(null)
        }
      } catch (error) {
        console.error('Student evaluation error:', error)
        setEvaluation(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEvaluation()
  }, [])

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="text-muted mt-3">
            Loading evaluation...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid p-4">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          ⭐ Project Evaluation
        </h2>

        <p className="text-muted mb-0">
          View your project evaluation, marks and teacher remarks.
        </p>
      </div>

      {!evaluation ? (
        <div
          className="card border-0 shadow-sm"
          style={{
            borderRadius: '15px',
            borderTop: '4px solid #f59e0b'
          }}
        >
          <div className="card-body p-4">

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
                  fontSize: '23px'
                }}
              >
                ⏳
              </div>

              <div>
                <h5 className="fw-bold mb-1">
                  Evaluation Pending
                </h5>

                <p className="text-muted mb-0">
                  Your teacher has not published the project evaluation yet.
                </p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <>
          {/* EVALUATION STATUS */}
          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              borderRadius: '15px',
              borderTop: '4px solid #10b981'
            }}
          >
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center">

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: '55px',
                      height: '55px',
                      background: '#d1fae5',
                      fontSize: '25px'
                    }}
                  >
                    ✅
                  </div>

                  <div>
                    <small className="text-muted">
                      EVALUATION STATUS
                    </small>

                    <h4 className="fw-bold mt-1 mb-1">
                      Evaluated
                    </h4>

                    <p className="text-muted mb-0">
                      {evaluation.project_title}
                    </p>

                    <small className="text-muted">
                      Evaluated on{' '}
                      {new Date(
                        evaluation.evaluated_at
                      ).toLocaleDateString('en-GB')}
                    </small>
                  </div>

                </div>

                <span
                  className="badge text-bg-success"
                  style={{
                    padding: '10px 14px',
                    fontSize: '14px',
                    borderRadius: '8px'
                  }}
                >
                  Completed
                </span>

              </div>

            </div>
          </div>

          {/* SCORE CARDS */}
          <div className="row g-4 mb-4">

            <div className="col-md-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderTop: '4px solid #4f46e5',
                  borderRadius: '15px'
                }}
              >
                <div className="card-body p-4 text-center">

                  <small className="text-muted">
                    TOTAL MARKS
                  </small>

                  <h1 className="fw-bold mt-2 mb-1">
                    {evaluation.marks}
                  </h1>

                  <span className="text-muted">
                    out of 100
                  </span>

                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderTop: '4px solid #10b981',
                  borderRadius: '15px'
                }}
              >
                <div className="card-body p-4 text-center">

                  <small className="text-muted">
                    GRADE
                  </small>

                  <h2 className="fw-bold text-success mt-3 mb-2">
                    {evaluation.grade || 'Not Given'}
                  </h2>

                  <span className="text-muted">
                    Final grade
                  </span>

                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderTop: '4px solid #7c3aed',
                  borderRadius: '15px'
                }}
              >
                <div className="card-body p-4 text-center">

                  <small className="text-muted">
                    GUIDE / TEACHER
                  </small>

                  <h5 className="fw-bold mt-3 mb-2">
                    👨‍🏫 {evaluation.teacher_name}
                  </h5>

                  <span className="text-muted">
                    Project Guide
                  </span>

                </div>
              </div>
            </div>

          </div>

          {/* EVALUATION DETAILS */}
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
                  📊
                </div>

                <div>
                  <h4 className="fw-bold mb-0">
                    Evaluation Details
                  </h4>

                  <small className="text-muted">
                    Final project assessment
                  </small>
                </div>

              </div>

              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead className="table-light">
                    <tr>
                      <th>Evaluation Item</th>
                      <th>Details</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td className="fw-semibold">
                        Project
                      </td>

                      <td>
                        📁 {evaluation.project_title}
                      </td>
                    </tr>

                    <tr>
                      <td className="fw-semibold">
                        Marks
                      </td>

                      <td>
                        <span className="badge bg-primary">
                          {evaluation.marks} / 100
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="fw-semibold">
                        Grade
                      </td>

                      <td>
                        <span className="badge text-bg-success">
                          {evaluation.grade || 'Not Given'}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="fw-semibold">
                        Teacher
                      </td>

                      <td>
                        👨‍🏫 {evaluation.teacher_name}
                      </td>
                    </tr>

                    <tr>
                      <td className="fw-semibold">
                        Evaluation Date
                      </td>

                      <td>
                        📅{' '}
                        {new Date(
                          evaluation.evaluated_at
                        ).toLocaleDateString('en-GB')}
                      </td>
                    </tr>

                  </tbody>

                </table>

              </div>

            </div>
          </div>

          {/* TEACHER REMARKS */}
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
                  📝
                </div>

                <div>
                  <h4 className="fw-bold mb-0">
                    Teacher Remarks
                  </h4>

                  <small className="text-muted">
                    Feedback from your project guide
                  </small>
                </div>

              </div>

              <div
                className="alert alert-info"
                style={{
                  borderRadius: '10px',
                  border: 'none'
                }}
              >
                {evaluation.comments || 'No remarks provided.'}
              </div>

              <div className="row">

                <div className="col-md-6">
                  <span className="text-muted">
                    Guide / Teacher
                  </span>

                  <h6 className="fw-bold mt-1">
                    👨‍🏫 {evaluation.teacher_name}
                  </h6>
                </div>

                <div className="col-md-6 text-md-end">
                  <span className="text-muted">
                    Evaluation Date
                  </span>

                  <h6 className="fw-bold mt-1">
                    📅{' '}
                    {new Date(
                      evaluation.evaluated_at
                    ).toLocaleDateString('en-GB')}
                  </h6>
                </div>

              </div>

            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default Evaluation