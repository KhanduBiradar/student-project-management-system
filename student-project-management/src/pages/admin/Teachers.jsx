import { useEffect, useState } from 'react'

function Teachers() {

  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [createdTeacher, setCreatedTeacher] = useState(null)

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    employee_id: '',
    department: '',
    phone: ''
  })


  // Fetch teachers from MySQL API
  const fetchTeachers = async () => {

    try {

      setLoading(true)
      setError('')

      const response = await fetch(
        'http://localhost:5000/api/admin/teachers'
      )

      const data = await response.json()

      if (data.success) {
        setTeachers(data.teachers)
      } else {
        setError('Unable to load teachers')
      }

    } catch (err) {

      console.error('Teachers fetch error:', err)
      setError('Backend server is not running')

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {
    fetchTeachers()
  }, [])


  // Handle input changes
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleDeleteTeacher = async (teacherId, teacherName) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${teacherName}?`
  )

  if (!confirmDelete) {
    return
  }

  try {
    setError('')
    setSuccess('')

    const response = await fetch(
      `http://localhost:5000/api/admin/teachers/${teacherId}`,
      {
        method: 'DELETE'
      }
    )

    const data = await response.json()

    if (!response.ok) {
      setError(data.message || 'Failed to delete teacher')
      return
    }

    setSuccess('Teacher deleted successfully.')

    fetchTeachers()

  } catch (err) {
    console.error('Delete teacher error:', err)
    setError('Unable to connect to backend server')
  }
}


  // Add new teacher
  const handleAddTeacher = async (e) => {

    e.preventDefault()

    setError('')
    setSuccess('')


    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.employee_id
    ) {

      setError(
        'Name, email, password and employee ID are required'
      )

      return
    }


    try {

      const response = await fetch(
        'http://localhost:5000/api/admin/teachers',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(formData)
        }
      )


      const data = await response.json()


      if (!response.ok) {

        setError(
          data.message || 'Failed to add teacher'
        )

        return
      }


      setCreatedTeacher({
  name: formData.name,
  email: formData.email,
  password: formData.password,
  employee_id: formData.employee_id
})

setSuccess('Teacher added successfully. Share these login details with the teacher.')

setFormData({
  name: '',
  email: '',
  password: '',
  employee_id: '',
  department: '',
  phone: ''
})

setShowForm(false)

fetchTeachers()
    } catch (err) {

      console.error('Add teacher error:', err)

      setError(
        'Unable to connect to backend server'
      )

    }

  }


  return (

    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-1">
        Teacher Management
      </h2>

      <p className="text-muted mb-4">
        Manage teachers and project guides.
      </p>


      {/* Success Message */}

      {success && (

        <div className="alert alert-success">

          ✅ {success}

        </div>

      )}
      {createdTeacher && (
  <div className="card border-success mb-4">
    <div className="card-body">
      <h5 className="fw-bold text-success">
        👨‍🏫 Teacher Login Details
      </h5>

      <p className="mb-2">
        <strong>Name:</strong> {createdTeacher.name}
      </p>

      <p className="mb-2">
        <strong>Email:</strong> {createdTeacher.email}
      </p>

      <p className="mb-2">
        <strong>Password:</strong> {createdTeacher.password}
      </p>

      <p className="mb-2">
        <strong>Employee ID:</strong> {createdTeacher.employee_id}
      </p>

      <div className="alert alert-info mt-3 mb-0">
        ℹ️ Give these login details to the teacher.
        The teacher should select <strong>Teacher</strong> role while logging in.
      </div>
    </div>
  </div>
)}


      {/* Error Message */}

      {error && (

        <div className="alert alert-danger">

          ❌ {error}

        </div>

      )}


      <div className="card shadow-sm border-0">

        <div className="card-body p-4">


          {/* Header */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h5 className="fw-bold mb-0">

              👨‍🏫 All Teachers

            </h5>


            <div>

              <span className="badge text-bg-primary me-2">

                {teachers.length} Teachers

              </span>


              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowForm(!showForm)
                  setError('')
                  setSuccess('')
                }}
              >

                {showForm
                  ? 'Close'
                  : '+ Add Teacher'}

              </button>

            </div>

          </div>


          {/* Add Teacher Form */}

          {showForm && (

            <div className="card border-primary mb-4">

              <div className="card-body">

                <h5 className="fw-bold mb-3">

                  ➕ Add New Teacher

                </h5>


                <form onSubmit={handleAddTeacher}>

                  <div className="row">


                    {/* Name */}

                    <div className="col-md-6 mb-3">

                      <label className="form-label">

                        Full Name *

                      </label>

                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter teacher name"
                        value={formData.name}
                        onChange={handleChange}
                      />

                    </div>


                    {/* Email */}

                    <div className="col-md-6 mb-3">

                      <label className="form-label">

                        Email *

                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter teacher email"
                        value={formData.email}
                        onChange={handleChange}
                      />

                    </div>


                    {/* Password */}

                    <div className="col-md-6 mb-3">

                      <label className="form-label">

                        Password *

                      </label>

                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                      />

                    </div>


                    {/* Employee ID */}

                    <div className="col-md-6 mb-3">

                      <label className="form-label">

                        Employee ID *

                      </label>

                      <input
                        type="text"
                        name="employee_id"
                        className="form-control"
                        placeholder="Example: EMP003"
                        value={formData.employee_id}
                        onChange={handleChange}
                      />

                    </div>


                    {/* Department */}

                    <div className="col-md-6 mb-3">

                      <label className="form-label">

                        Department

                      </label>

                      <input
                        type="text"
                        name="department"
                        className="form-control"
                        placeholder="Example: Computer Science"
                        value={formData.department}
                        onChange={handleChange}
                      />

                    </div>


                    {/* Phone */}

                    <div className="col-md-6 mb-3">

                      <label className="form-label">

                        Phone

                      </label>

                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                    </div>


                  </div>


                  <button
                    type="submit"
                    className="btn btn-success"
                  >

                    Create Teacher Account

                  </button>


                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setShowForm(false)}
                  >

                    Cancel

                  </button>

                </form>

              </div>

            </div>

          )}


          {/* Loading */}

          {loading && (

            <div className="text-center p-4">

              <div className="spinner-border text-primary"></div>

              <p className="mt-2 text-muted">

                Loading teachers...

              </p>

            </div>

          )}


          {/* No teachers */}

          {!loading &&
            !error &&
            teachers.length === 0 && (

              <div className="alert alert-info">

                No teachers found in database.

              </div>

            )}


          {/* Teachers Table */}

          {!loading &&
            teachers.length > 0 && (

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead>

                    <tr>

                      <th>#</th>

                      <th>Teacher</th>

                      <th>Email</th>

                      <th>Employee ID</th>

                      <th>Department</th>

                      <th>Phone</th>

                      <th>Role</th>

                      <th>Action</th>

                    </tr>

                  </thead>


                  <tbody>

                    {teachers.map(
                      (teacher, index) => (

                        <tr key={teacher.id}>

                          <td>
                            {index + 1}
                          </td>


                          <td className="fw-semibold">

                            👨‍🏫 {teacher.name}

                          </td>


                          <td>
                            {teacher.email}
                          </td>


                          <td>
                            {teacher.employee_id}
                          </td>


                          <td>
                            {teacher.department}
                          </td>


                          <td>
                            {teacher.phone}
                          </td>


                          <td>

                            <span className="badge text-bg-success">

                              {teacher.role}

                            </span>

                          </td>

                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDeleteTeacher(teacher.id, teacher.name)
                              }
                            >
                              🗑️ Delete
                            </button>
                          </td>

                        </tr>

                      )
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

export default Teachers