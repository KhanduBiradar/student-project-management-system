import { useEffect, useState } from 'react'

function Students() {

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch students from MySQL API
  const fetchStudents = async () => {

    try {

      setLoading(true)
      setError('')

      const response = await fetch(
        'http://localhost:5000/api/admin/students'
      )

      const data = await response.json()

      if (data.success) {
        setStudents(data.students)
      } else {
        setError('Unable to load students')
      }

    } catch (err) {

      console.error('Students fetch error:', err)
      setError('Backend server is not running')

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])


  return (
    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-1">
        Student Management
      </h2>

      <p className="text-muted mb-4">
        Manage registered students and their information.
      </p>


      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-bold mb-0">
              👨‍🎓 All Students
            </h5>

            <span className="badge text-bg-primary">
              {students.length} Students
            </span>

          </div>


          {/* Loading */}

          {loading && (
            <div className="text-center p-4">
              <div className="spinner-border text-primary"></div>

              <p className="mt-2 text-muted">
                Loading students...
              </p>
            </div>
          )}


          {/* Error */}

          {!loading && error && (
            <div className="alert alert-danger">
              ❌ {error}
            </div>
          )}


          {/* No students */}

          {!loading && !error && students.length === 0 && (
            <div className="alert alert-info">
              No students found in database.
            </div>
          )}


          {/* Students Table */}

          {!loading && !error && students.length > 0 && (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>

                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Roll No</th>
                    <th>Course</th>
                    <th>Year</th>
                    <th>Phone</th>
                    <th>Role</th>
                  </tr>

                </thead>


                <tbody>

                  {students.map((student, index) => (

                    <tr key={student.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td className="fw-semibold">
                        👨‍🎓 {student.name}
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        {student.roll_no}
                      </td>

                      <td>
                        {student.course}
                      </td>

                      <td>
                        {student.year}
                      </td>

                      <td>
                        {student.phone}
                      </td>

                      <td>
                        <span className="badge text-bg-success">
                          {student.role}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default Students