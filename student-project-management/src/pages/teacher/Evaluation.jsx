import { useState } from 'react'

function Evaluation() {
  const [project, setProject] = useState('')

  const [marks, setMarks] = useState({
    quality: '',
    technical: '',
    documentation: '',
    presentation: '',
    viva: ''
  })

  const [remarks, setRemarks] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const total =
    Number(marks.quality || 0) +
    Number(marks.technical || 0) +
    Number(marks.documentation || 0) +
    Number(marks.presentation || 0) +
    Number(marks.viva || 0)

  const percentage = total

  const getGrade = () => {
    if (total >= 90) return 'A+'
    if (total >= 80) return 'A'
    if (total >= 70) return 'B+'
    if (total >= 60) return 'B'
    if (total >= 50) return 'C'
    if (total >= 40) return 'D'
    return 'F'
  }

  const handleMarks = (field, value) => {
    if (value === '') {
      setMarks({
        ...marks,
        [field]: ''
      })
      setSubmitted(false)
      return
    }

    const numberValue = Number(value)

    if (numberValue < 0 || numberValue > 20) {
      return
    }

    setMarks({
      ...marks,
      [field]: value
    })

    setSubmitted(false)
  }

 const handleSubmit = async (e) => {
  e.preventDefault()

  if (!project) {
    alert('Please select a student project.')
    return
  }

  if (
    marks.quality === '' ||
    marks.technical === '' ||
    marks.documentation === '' ||
    marks.presentation === '' ||
    marks.viva === ''
  ) {
    alert('Please enter marks for all evaluation criteria.')
    return
  }

  if (!remarks.trim()) {
    alert('Please enter teacher remarks.')
    return
  }

  try {
    const response = await fetch(
      'http://localhost:5000/api/teacher/evaluation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          project_id: 1,
          teacher_id: 1,
          student_id: 1,
          marks: total,
          grade: getGrade(),
          comments: remarks.trim()
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      alert(data.message || 'Failed to submit evaluation')
      return
    }

    alert(
      `Evaluation submitted successfully!\nTotal Marks: ${total}/100\nGrade: ${getGrade()}`
    )

    setSubmitted(true)

    setProject('')

    setMarks({
      quality: '',
      technical: '',
      documentation: '',
      presentation: '',
      viva: ''
    })

    setRemarks('')

  } catch (error) {
    console.error('Teacher evaluation error:', error)
    alert('Server connection failed. Please check backend.')
  }
}

  return (
    <div
      className="container-fluid p-4"
      style={{
        background: '#f5f7fb',
        minHeight: '100vh'
      }}
    >

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          ⭐ Project Evaluation
        </h2>

        <p className="text-muted mb-0">
          Evaluate student projects and assign marks.
        </p>
      </div>

      {/* EVALUATION FORM */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: '16px'
        }}
      >

        <div className="card-body p-4">

          {/* TITLE */}
          <div className="d-flex align-items-center mb-4">

            <div
              className="d-flex align-items-center justify-content-center me-3"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#eef2ff',
                fontSize: '23px'
              }}
            >
              ⭐
            </div>

            <div>
              <h4 className="fw-bold mb-1">
                Evaluate Student Project
              </h4>

              <small className="text-muted">
                Enter marks for each evaluation criterion.
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
              ✅ Evaluation submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* PROJECT */}
            <div
              className="p-4 mb-4"
              style={{
                background: '#f8fafc',
                borderRadius: '12px'
              }}
            >

              <label className="form-label fw-semibold">
                Select Student Project
              </label>

              <select
                className="form-select form-select-lg"
                value={project}
                onChange={(e) => {
                  setProject(e.target.value)
                  setSubmitted(false)
                }}
              >

                <option value="">
                  -- Select Student Project --
                </option>

                <option value="Student Project Management System - Khandu Biradar">
                  Student Project Management System - Khandu Biradar
                </option>

                <option value="Online Learning System - Rahul Patil">
                  Online Learning System - Rahul Patil
                </option>

                <option value="College Attendance System - Amit Shinde">
                  College Attendance System - Amit Shinde
                </option>

                <option value="Library Management System - Sneha Jadhav">
                  Library Management System - Sneha Jadhav
                </option>

              </select>

            </div>

            {/* MARKING TABLE */}
            <div className="mb-4">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                  <h5 className="fw-bold mb-1">
                    📊 Evaluation Criteria
                  </h5>

                  <small className="text-muted">
                    Each criterion carries maximum 20 marks.
                  </small>
                </div>

                <span className="badge bg-primary">
                  Total: {total}/100
                </span>

              </div>

              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead className="table-light">

                    <tr>
                      <th>Evaluation Criteria</th>
                      <th>Maximum Marks</th>
                      <th style={{ width: '220px' }}>
                        Obtained Marks
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {/* QUALITY */}
                    <tr>

                      <td>
                        <div className="fw-semibold">
                          Project Quality
                        </div>

                        <small className="text-muted">
                          Quality and functionality of project
                        </small>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark">
                          20
                        </span>
                      </td>

                      <td>

                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="20"
                          placeholder="0 - 20"
                          value={marks.quality}
                          onChange={(e) =>
                            handleMarks(
                              'quality',
                              e.target.value
                            )
                          }
                        />

                      </td>

                    </tr>

                    {/* TECHNICAL */}
                    <tr>

                      <td>
                        <div className="fw-semibold">
                          Technical Skills
                        </div>

                        <small className="text-muted">
                          Technical implementation and skills
                        </small>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark">
                          20
                        </span>
                      </td>

                      <td>

                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="20"
                          placeholder="0 - 20"
                          value={marks.technical}
                          onChange={(e) =>
                            handleMarks(
                              'technical',
                              e.target.value
                            )
                          }
                        />

                      </td>

                    </tr>

                    {/* DOCUMENTATION */}
                    <tr>

                      <td>
                        <div className="fw-semibold">
                          Documentation
                        </div>

                        <small className="text-muted">
                          Report quality and documentation
                        </small>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark">
                          20
                        </span>
                      </td>

                      <td>

                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="20"
                          placeholder="0 - 20"
                          value={marks.documentation}
                          onChange={(e) =>
                            handleMarks(
                              'documentation',
                              e.target.value
                            )
                          }
                        />

                      </td>

                    </tr>

                    {/* PRESENTATION */}
                    <tr>

                      <td>
                        <div className="fw-semibold">
                          Presentation
                        </div>

                        <small className="text-muted">
                          Project presentation and explanation
                        </small>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark">
                          20
                        </span>
                      </td>

                      <td>

                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="20"
                          placeholder="0 - 20"
                          value={marks.presentation}
                          onChange={(e) =>
                            handleMarks(
                              'presentation',
                              e.target.value
                            )
                          }
                        />

                      </td>

                    </tr>

                    {/* VIVA */}
                    <tr>

                      <td>
                        <div className="fw-semibold">
                          Project Viva
                        </div>

                        <small className="text-muted">
                          Viva performance and understanding
                        </small>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark">
                          20
                        </span>
                      </td>

                      <td>

                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="20"
                          placeholder="0 - 20"
                          value={marks.viva}
                          onChange={(e) =>
                            handleMarks(
                              'viva',
                              e.target.value
                            )
                          }
                        />

                      </td>

                    </tr>

                    {/* TOTAL */}
                    <tr
                      style={{
                        background: '#f8fafc'
                      }}
                    >

                      <td className="fw-bold">
                        Total
                      </td>

                      <td className="fw-bold">
                        100
                      </td>

                      <td>

                        <span
                          className="badge text-bg-primary"
                          style={{
                            padding: '9px 14px',
                            fontSize: '14px'
                          }}
                        >
                          {total} / 100
                        </span>

                      </td>

                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

            {/* RESULT PREVIEW */}
            {total > 0 && (

              <div
                className="p-4 mb-4"
                style={{
                  background: '#eef2ff',
                  borderRadius: '12px'
                }}
              >

                <h5 className="fw-bold mb-3">
                  📈 Evaluation Result
                </h5>

                <div className="row g-3">

                  <div className="col-md-4">

                    <div
                      className="bg-white p-3"
                      style={{
                        borderRadius: '10px'
                      }}
                    >
                      <small className="text-muted">
                        TOTAL MARKS
                      </small>

                      <h4 className="fw-bold text-primary mt-2 mb-0">
                        {total}/100
                      </h4>
                    </div>

                  </div>

                  <div className="col-md-4">

                    <div
                      className="bg-white p-3"
                      style={{
                        borderRadius: '10px'
                      }}
                    >
                      <small className="text-muted">
                        PERCENTAGE
                      </small>

                      <h4 className="fw-bold mt-2 mb-0">
                        {percentage}%
                      </h4>
                    </div>

                  </div>

                  <div className="col-md-4">

                    <div
                      className="bg-white p-3"
                      style={{
                        borderRadius: '10px'
                      }}
                    >
                      <small className="text-muted">
                        GRADE
                      </small>

                      <h4 className="fw-bold text-success mt-2 mb-0">
                        {getGrade()}
                      </h4>
                    </div>

                  </div>

                </div>

              </div>

            )}

            {/* REMARKS */}
            <div className="mb-4">

              <label className="form-label fw-semibold">
                Teacher Remarks
              </label>

              <textarea
                className="form-control"
                rows="5"
                placeholder="Enter your remarks and suggestions for the student..."
                value={remarks}
                onChange={(e) => {
                  setRemarks(e.target.value)
                  setSubmitted(false)
                }}
              ></textarea>

            </div>

            {/* SUBMIT */}
            <div className="d-flex align-items-center">

              <button
                type="submit"
                className="btn btn-primary px-4 py-2"
                style={{
                  borderRadius: '8px',
                  fontWeight: '600'
                }}
              >
                ⭐ Submit Evaluation
              </button>

              {submitted && (
                <span className="text-success ms-3 fw-semibold">
                  ✓ Evaluation submitted successfully
                </span>
              )}

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Evaluation