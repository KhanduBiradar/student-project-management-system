import { useEffect, useState } from 'react'

function Projects() {

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch projects from MySQL API
  const fetchProjects = async () => {

    try {

      setLoading(true)
      setError('')

      const response = await fetch(
        'http://localhost:5000/api/admin/projects'
      )

      const data = await response.json()

      if (data.success) {
        setProjects(data.projects)
      } else {
        setError('Unable to load projects')
      }

    } catch (err) {

      console.error('Projects fetch error:', err)
      setError('Backend server is not running')

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])


  return (
    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-1">
        Project Management
      </h2>

      <p className="text-muted mb-4">
        View and manage all student projects.
      </p>


      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-bold mb-0">
              📁 All Projects
            </h5>

            <span className="badge text-bg-primary">
              {projects.length} Projects
            </span>

          </div>


          {/* Loading */}

          {loading && (
            <div className="text-center p-4">

              <div className="spinner-border text-primary"></div>

              <p className="mt-2 text-muted">
                Loading projects...
              </p>

            </div>
          )}


          {/* Error */}

          {!loading && error && (
            <div className="alert alert-danger">
              ❌ {error}
            </div>
          )}


          {/* No Projects */}

          {!loading && !error && projects.length === 0 && (
            <div className="alert alert-info">
              No projects found in database.
            </div>
          )}


          {/* Projects Table */}

          {!loading && !error && projects.length > 0 && (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>

                  <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Student</th>
                    <th>Guide</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>


                <tbody>

                  {projects.map((project, index) => (

                    <tr key={project.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td className="fw-semibold">
                        📁 {project.title}
                      </td>

                      <td>
                        {project.student_name}
                      </td>

                      <td>
                        {project.teacher_name || 'Not Assigned'}
                      </td>

                      <td style={{ minWidth: '150px' }}>

                        <div className="d-flex justify-content-between mb-1">

                          <small>
                            {project.progress}%
                          </small>

                        </div>

                        <div
                          className="progress"
                          style={{ height: '8px' }}
                        >

                          <div
                            className="progress-bar"
                            style={{
                              width: `${project.progress}%`
                            }}
                          ></div>

                        </div>

                      </td>


                      <td>

                        <span
                          className={
                            project.status === 'Completed'
                              ? 'badge text-bg-success'
                              : project.status === 'Pending'
                              ? 'badge text-bg-warning'
                              : 'badge text-bg-primary'
                          }
                        >
                          {project.status}
                        </span>

                      </td>


                      <td>

                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() =>
                            alert(
                              `Project: ${project.title}\nStudent: ${project.student_name}\nGuide: ${project.teacher_name || 'Not Assigned'}\nProgress: ${project.progress}%\nStatus: ${project.status}`
                            )
                          }
                        >
                          👁 View
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

    </div>
  )
}

export default Projects