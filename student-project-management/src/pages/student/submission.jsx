import { useEffect, useState } from 'react'

function Submission() {
  // =========================
  // Logged-in Student
  // =========================

  const loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUser') || 'null'
  )

  const studentId = loggedInUser?.student_id
  const studentName = loggedInUser?.name || 'Student'
  const studentEmail = loggedInUser?.email || ''

  // Project ID
  const projectId = 1

  // =========================
  // State
  // =========================

  const [report, setReport] = useState(null)
  const [sourceCode, setSourceCode] = useState(null)
  const [ppt, setPpt] = useState(null)

  const [submitted, setSubmitted] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [submissionRemarks, setSubmissionRemarks] = useState('')

  const [statusLoading, setStatusLoading] = useState(true)
  const [loading, setLoading] = useState(false)

  // =========================
  // Fetch Submission Status
  // =========================

  const fetchSubmissionStatus = async () => {
    if (!studentId) {
      console.error('Student ID not found')
      setStatusLoading(false)
      return
    }

    try {
      setStatusLoading(true)

      console.log(
        '🔄 Fetching submission status for student:',
        studentId
      )

      const response = await fetch(
        `http://localhost:5000/api/student/submission/${studentId}`
      )

      const data = await response.json()

      console.log(
        '✅ Submission API Response:',
        data
      )

      if (
        data.success &&
        data.submitted &&
        data.submission
      ) {
        setSubmitted(true)

        setSubmissionStatus(
          data.submission.status
        )

        setSubmissionRemarks(
          data.submission.remarks || ''
        )
      } else {
        setSubmitted(false)
        setSubmissionStatus(null)
        setSubmissionRemarks('')
      }
    } catch (error) {
      console.error(
        '❌ Submission status error:',
        error
      )
    } finally {
      setStatusLoading(false)
    }
  }

  // =========================
  // Load Submission
  // =========================

  useEffect(() => {
    console.log(
      '✅ Submission component loaded'
    )

    console.log(
      'Logged-in Student:',
      loggedInUser
    )

    console.log(
      'Student ID:',
      studentId
    )

    console.log(
      'Student Name:',
      studentName
    )

    fetchSubmissionStatus()
  }, [studentId])

  // =========================
  // Submit Project
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!studentId) {
      alert(
        'Student information not found. Please logout and login again.'
      )
      return
    }

    if (!report || !sourceCode || !ppt) {
      alert(
        'Please upload all required documents'
      )
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append(
        'project_id',
        projectId
      )

      formData.append(
        'student_id',
        studentId
      )

      formData.append(
        'report',
        report
      )

      formData.append(
        'sourceCode',
        sourceCode
      )

      formData.append(
        'ppt',
        ppt
      )

      console.log(
        '📤 Submitting project for student:',
        studentId
      )

      const response = await fetch(
        'http://localhost:5000/api/submission/upload',
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()

      console.log(
        '📥 Upload Response:',
        data
      )

      if (!response.ok || !data.success) {
        alert(
          data.message ||
          'Project submission failed'
        )
        return
      }

      // =========================
      // Save Submission Locally
      // =========================

      localStorage.setItem(
        'studentSubmission',
        JSON.stringify({
          project:
            'Student Project Management System',

          student:
            studentName,

          email:
            studentEmail,

          studentId:
            studentId,

          date:
            new Date().toLocaleDateString('en-GB'),

          report:
            report.name,

          sourceCode:
            sourceCode.name,

          ppt:
            ppt.name,

          status:
            'Pending',

          submissionId:
            data.submission_id
        })
      )

      // =========================
      // Update UI
      // =========================

      setSubmitted(true)

      setSubmissionStatus(
        'Pending'
      )

      setSubmissionRemarks(
        'Waiting for teacher review'
      )

      alert(
        'Project submitted successfully!'
      )

      // Refresh status
      await fetchSubmissionStatus()

      // Clear selected files
      setReport(null)
      setSourceCode(null)
      setPpt(null)

    } catch (error) {
      console.error(
        '❌ Submission error:',
        error
      )

      alert(
        'Server connection failed. Please check backend.'
      )
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // Status Helpers
  // =========================

  const getStatusTitle = () => {
    if (submissionStatus === 'Approved') {
      return 'Approved'
    }

    if (submissionStatus === 'Rejected') {
      return 'Rejected'
    }

    if (submissionStatus === 'Reviewed') {
      return 'Reviewed'
    }

    if (submitted) {
      return 'Submitted'
    }

    return 'Pending'
  }

  const getStatusBadge = () => {
    if (submissionStatus === 'Approved') {
      return 'Approved by Teacher'
    }

    if (submissionStatus === 'Rejected') {
      return 'Rejected by Teacher'
    }

    if (submissionStatus === 'Reviewed') {
      return 'Reviewed by Teacher'
    }

    if (submitted) {
      return 'Successfully Submitted'
    }

    return 'Waiting for Submission'
  }

  const getBadgeClass = () => {
    if (submissionStatus === 'Approved') {
      return 'badge text-bg-success'
    }

    if (submissionStatus === 'Rejected') {
      return 'badge text-bg-danger'
    }

    if (submissionStatus === 'Reviewed') {
      return 'badge text-bg-primary'
    }

    if (submitted) {
      return 'badge text-bg-success'
    }

    return 'badge text-bg-warning'
  }

  const getTeacherReviewMessage = () => {
    if (submissionStatus === 'Approved') {
      return (
        'Your project submission has been approved by the teacher.'
      )
    }

    if (submissionStatus === 'Rejected') {
      return (
        'Your project submission has been rejected by the teacher.'
      )
    }

    if (submissionStatus === 'Reviewed') {
      return (
        'Your project submission has been reviewed by the teacher.'
      )
    }

    return (
      'Your submission has been sent successfully and is waiting for teacher review.'
    )
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="container-fluid p-4">

      {/* PAGE HEADER */}

      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          🚀 Project Submission
        </h2>

        <p className="text-muted mb-0">
          Submit your final project documents for teacher review.
        </p>
      </div>


      {/* STUDENT INFORMATION */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">

          <div className="row">

            <div className="col-md-4">
              <small className="text-muted">
                STUDENT NAME
              </small>

              <h5 className="fw-bold mt-1">
                👤 {studentName}
              </h5>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                EMAIL
              </small>

              <h5 className="fw-bold mt-1">
                📧 {studentEmail}
              </h5>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                STUDENT ID
              </small>

              <h5 className="fw-bold mt-1">
                🆔 {studentId || 'Not available'}
              </h5>
            </div>

          </div>

        </div>
      </div>


      {/* SUMMARY CARDS */}

      <div className="row g-4 mb-4">

        {/* STATUS */}

        <div className="col-md-4">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderTop:
                '4px solid #4f46e5',
              borderRadius: '15px'
            }}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <small className="text-muted">
                    SUBMISSION STATUS
                  </small>

                  {statusLoading ? (

                    <h4 className="fw-bold mt-2 mb-2">
                      Loading...
                    </h4>

                  ) : (

                    <>

                      <h4 className="fw-bold mt-2 mb-2">
                        {getStatusTitle()}
                      </h4>

                      <span
                        className={getBadgeClass()}
                      >
                        {getStatusBadge()}
                      </span>

                    </>

                  )}

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
                  📤
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* REQUIRED FILES */}

        <div className="col-md-4">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderTop:
                '4px solid #10b981',
              borderRadius: '15px'
            }}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <small className="text-muted">
                    REQUIRED FILES
                  </small>

                  <h3 className="fw-bold mt-2 mb-1">
                    3
                  </h3>

                  <span className="text-muted small">
                    Report, Source Code, PPT
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
                  📄
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* DEADLINE */}

        <div className="col-md-4">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderTop:
                '4px solid #f59e0b',
              borderRadius: '15px'
            }}
          >

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <small className="text-muted">
                    SUBMISSION DEADLINE
                  </small>

                  <h5 className="fw-bold mt-3 mb-1">
                    30 Sep 2026
                  </h5>

                  <span className="text-warning small">
                    Final submission date
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
                  📅
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* TEACHER REVIEW */}

      {submitted && (

        <div
          className="card border-0 shadow-sm mb-4"
          style={{
            borderRadius: '15px',
            borderTop:
              '4px solid #0ea5e9'
          }}
        >

          <div className="card-body p-4">

            <div className="d-flex align-items-center">

              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: '50px',
                  height: '50px',
                  background: '#e0f2fe',
                  fontSize: '23px'
                }}
              >
                👨‍🏫
              </div>

              <div>

                <h5 className="fw-bold mb-1">
                  Teacher Review
                </h5>

                <p className="text-muted mb-0">
                  {getTeacherReviewMessage()}
                </p>

                {submissionRemarks && (
                  <small className="text-muted">
                    {submissionRemarks}
                  </small>
                )}

              </div>

              <span
                className={`${getBadgeClass()} ms-auto`}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px'
                }}
              >
                {submissionStatus ||
                  'Pending Review'}
              </span>

            </div>

          </div>

        </div>

      )}


      {/* UPLOAD SECTION */}

      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: '15px'
        }}
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
              📄
            </div>

            <div>

              <h4 className="fw-bold mb-0">
                Upload Final Documents
              </h4>

              <small className="text-muted">
                Upload all three required files before submitting.
              </small>

            </div>

          </div>


          <form onSubmit={handleSubmit}>

            {/* REPORT */}

            <div
              className="mb-4 p-3"
              style={{
                background: '#f8fafc',
                borderRadius: '12px'
              }}
            >

              <label className="form-label fw-semibold">
                📄 Final Project Report
              </label>

              <input
                type="file"
                className="form-control"
                accept=".pdf"
                disabled={loading}
                onChange={(e) => {
                  setReport(
                    e.target.files[0]
                  )
                }}
              />

              <small className="text-muted">
                Accepted format: PDF
              </small>

              {report && (
                <div className="mt-2 text-success fw-semibold">
                  ✅ {report.name}
                </div>
              )}

            </div>


            {/* SOURCE CODE */}

            <div
              className="mb-4 p-3"
              style={{
                background: '#f8fafc',
                borderRadius: '12px'
              }}
            >

              <label className="form-label fw-semibold">
                💻 Source Code
              </label>

              <input
                type="file"
                className="form-control"
                accept=".zip,.rar"
                disabled={loading}
                onChange={(e) => {
                  setSourceCode(
                    e.target.files[0]
                  )
                }}
              />

              <small className="text-muted">
                Accepted format: ZIP / RAR
              </small>

              {sourceCode && (
                <div className="mt-2 text-success fw-semibold">
                  ✅ {sourceCode.name}
                </div>
              )}

            </div>


            {/* PPT */}

            <div
              className="mb-4 p-3"
              style={{
                background: '#f8fafc',
                borderRadius: '12px'
              }}
            >

              <label className="form-label fw-semibold">
                📊 Project Presentation
              </label>

              <input
                type="file"
                className="form-control"
                accept=".ppt,.pptx"
                disabled={loading}
                onChange={(e) => {
                  setPpt(
                    e.target.files[0]
                  )
                }}
              />

              <small className="text-muted">
                Accepted format: PPT / PPTX
              </small>

              {ppt && (
                <div className="mt-2 text-success fw-semibold">
                  ✅ {ppt.name}
                </div>
              )}

            </div>


            <hr className="my-4" />


            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="btn btn-primary px-4 py-2"
              disabled={loading}
              style={{
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >

              {loading
                ? '⏳ Uploading...'
                : '🚀 Submit Project'}

            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Submission