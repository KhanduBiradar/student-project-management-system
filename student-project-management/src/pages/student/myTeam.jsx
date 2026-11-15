import { useState } from 'react'

function MyTeam() {
  const loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUser') || 'null'
  )

  const studentName = loggedInUser?.name || 'Student'

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: studentName,
      role: 'Team Leader',
      email: loggedInUser?.email || 'student@example.com'
    },
    {
      id: 2,
      name: 'Rahul Patil',
      role: 'Team Member',
      email: 'rahul@example.com'
    },
    {
      id: 3,
      name: 'Amit Shinde',
      role: 'Team Member',
      email: 'amit@example.com'
    },
    {
      id: 4,
      name: 'Sneha Jadhav',
      role: 'Team Member',
      email: 'sneha@example.com'
    }
  ])

  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')

  // Same project for the whole team
  const projectName = 'Student Project Management System'
  const teamName = 'SPMS Development Team'

  // Add Team Member
  const handleAddMember = () => {
    if (!newName.trim() || !newEmail.trim()) {
      alert('Please enter member name and email')
      return
    }

    const newMember = {
      id: Date.now(),
      name: newName,
      role: 'Team Member',
      email: newEmail
    }

    setTeamMembers([...teamMembers, newMember])

    setNewName('')
    setNewEmail('')

    alert('Team member added successfully!')
  }

  // Delete Team Member
  const handleDeleteMember = (id) => {
    const member = teamMembers.find((item) => item.id === id)

    if (member?.role === 'Team Leader') {
      alert('Team Leader cannot be deleted!')
      return
    }

    if (window.confirm('Are you sure you want to delete this member?')) {
      setTeamMembers(
        teamMembers.filter((item) => item.id !== id)
      )
    }
  }

  return (
    <div className="container-fluid p-4">

      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          My Team
        </h2>

        <p className="text-muted mb-0">
          View and manage your project team members.
        </p>
      </div>

      {/* Team Information */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">

          <h4 className="fw-bold mb-3">
            👥 {teamName}
          </h4>

          <div className="row">

            <div className="col-md-6 mb-3">
              <small className="text-muted">
                Project Name
              </small>

              <h5 className="fw-bold mt-1">
                📁 {projectName}
              </h5>
            </div>

            <div className="col-md-6 mb-3">
              <small className="text-muted">
                Total Members
              </small>

              <h5 className="fw-bold mt-1">
                👤 {teamMembers.length} Members
              </h5>
            </div>

          </div>

        </div>
      </div>

      {/* Add Member */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">

          <h5 className="fw-bold mb-3">
            ➕ Add Team Member
          </h5>

          <div className="row g-3">

            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Enter member name"
                value={newName}
                onChange={(e) =>
                  setNewName(e.target.value)
                }
              />
            </div>

            <div className="col-md-5">
              <input
                type="email"
                className="form-control"
                placeholder="Enter member email"
                value={newEmail}
                onChange={(e) =>
                  setNewEmail(e.target.value)
                }
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-primary w-100"
                onClick={handleAddMember}
              >
                ➕ Add
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Team Members */}
      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h5 className="fw-bold mb-1">
                Team Members
              </h5>

              <small className="text-muted">
                All members are working on the same project.
              </small>
            </div>

            <span className="badge bg-primary">
              {teamMembers.length} Members
            </span>

          </div>

          <div className="row g-4">

            {teamMembers.map((member) => (

              <div
                className="col-md-6 col-lg-3"
                key={member.id}
              >

                <div className="card h-100 shadow-sm border">

                  <div className="card-body text-center">

                    {/* Profile Icon */}
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: '70px',
                        height: '70px',
                        fontSize: '25px'
                      }}
                    >
                      👤
                    </div>

                    {/* Name */}
                    <h5 className="card-title">
                      {member.name}
                    </h5>

                    {/* Role */}
                    <p className="text-primary mb-2">
                      {member.role}
                    </p>

                    {/* Email */}
                    <p className="text-muted small mb-2">
                      📧 {member.email}
                    </p>

                    {/* Project */}
                    <p className="small mb-3">
                      📁 {projectName}
                    </p>

                    {/* Delete */}
                    {member.role === 'Team Leader' ? (
                      <button
                        className="btn btn-secondary btn-sm"
                        disabled
                      >
                        👑 Team Leader
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDeleteMember(member.id)
                        }
                      >
                        🗑 Delete
                      </button>
                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default MyTeam