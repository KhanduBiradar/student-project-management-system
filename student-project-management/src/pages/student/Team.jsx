import { useEffect, useState } from 'react'

function Teams() {
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)

  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Khandu Biradar',
      role: 'Team Leader'
    }
  ])

  const [newMember, setNewMember] = useState('')

  // Demo team data
  useEffect(() => {
    const teamData = {
      id: 1,
      teamName: 'SPMS Development Team',
      project: 'Student Project Management System',
      leader: 'Khandu Biradar'
    }

    setTeam(teamData)
    setLoading(false)
  }, [])

  // Add member
  const addMember = () => {
    if (!newMember.trim()) {
      alert('Please enter student name')
      return
    }

    const member = {
      id: Date.now(),
      name: newMember.trim(),
      role: 'Team Member'
    }

    setMembers([...members, member])
    setNewMember('')

    alert('Team member added successfully!')
  }

  // Delete member
  const deleteMember = (id) => {
    const member = members.find((m) => m.id === id)

    if (member?.role === 'Team Leader') {
      alert('Team Leader cannot be deleted')
      return
    }

    if (window.confirm('Are you sure you want to remove this member?')) {
      setMembers(
        members.filter((m) => m.id !== id)
      )

      alert('Team member removed successfully!')
    }
  }

  if (loading) {
    return (
      <div className="container-fluid p-4">

        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>

          <p className="text-muted mt-3">
            Loading team...
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
          👥 My Team
        </h2>

        <p className="text-muted mb-0">
          View and manage your project team members.
        </p>

      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">

        {/* TEAM */}
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
                    TEAM NAME
                  </small>

                  <h5 className="fw-bold mt-2 mb-1">
                    {team.teamName}
                  </h5>

                  <span className="text-muted small">
                    Project development team
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
                  👥
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PROJECT */}
        <div className="col-md-4">

          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderTop: '4px solid #7c3aed',
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
                    {team.project}
                  </h6>

                  <span className="text-muted small">
                    Team project
                  </span>

                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '55px',
                    height: '55px',
                    background: '#f3e8ff',
                    fontSize: '25px'
                  }}
                >
                  📁
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* MEMBERS */}
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
                    TEAM MEMBERS
                  </small>

                  <h2 className="fw-bold mt-2 mb-1">
                    {members.length}
                  </h2>

                  <span className="text-success small">
                    Active members
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
                  👤
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TEAM INFORMATION */}
      <div
        className="card border-0 shadow-sm mb-4"
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
              📋
            </div>

            <div>

              <h4 className="fw-bold mb-0">
                Team Information
              </h4>

              <small className="text-muted">
                Details of your project team
              </small>

            </div>

          </div>

          <div className="row g-4">

            <div className="col-md-4">

              <div
                className="p-3"
                style={{
                  background: '#f8fafc',
                  borderRadius: '10px'
                }}
              >

                <small className="text-muted">
                  TEAM NAME
                </small>

                <h6 className="fw-bold mt-2 mb-0">
                  👥 {team.teamName}
                </h6>

              </div>

            </div>

            <div className="col-md-4">

              <div
                className="p-3"
                style={{
                  background: '#f8fafc',
                  borderRadius: '10px'
                }}
              >

                <small className="text-muted">
                  PROJECT
                </small>

                <h6 className="fw-bold mt-2 mb-0">
                  📁 {team.project}
                </h6>

              </div>

            </div>

            <div className="col-md-4">

              <div
                className="p-3"
                style={{
                  background: '#f8fafc',
                  borderRadius: '10px'
                }}
              >

                <small className="text-muted">
                  TEAM LEADER
                </small>

                <h6 className="fw-bold mt-2 mb-0">
                  👑 {team.leader}
                </h6>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ADD MEMBER */}
      <div
        className="card border-0 shadow-sm mb-4"
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
                background: '#d1fae5',
                fontSize: '22px'
              }}
            >
              ➕
            </div>

            <div>

              <h4 className="fw-bold mb-0">
                Add Team Member
              </h4>

              <small className="text-muted">
                Add a student to your project team.
              </small>

            </div>

          </div>

          <div className="row g-3">

            <div className="col-md-8">

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter student name"
                value={newMember}
                onChange={(e) =>
                  setNewMember(e.target.value)
                }
              />

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={addMember}
                style={{
                  borderRadius: '8px',
                  fontWeight: '600'
                }}
              >
                ➕ Add Member
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* TEAM MEMBERS TABLE */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: '15px'
        }}
      >

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h4 className="fw-bold mb-1">
                👥 Team Members
              </h4>

              <small className="text-muted">
                All members are working on the same project.
              </small>

            </div>

            <span
              className="badge bg-primary"
              style={{
                padding: '10px 14px',
                borderRadius: '8px'
              }}
            >
              {members.length} Members
            </span>

          </div>

          <div className="table-responsive">

            <table className="table align-middle mb-0">

              <thead className="table-light">

                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Project</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {members.map((member, index) => (

                  <tr key={member.id}>

                    <td>
                      <span className="fw-semibold">
                        {index + 1}
                      </span>
                    </td>

                    <td>

                      <div className="d-flex align-items-center">

                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: '#eef2ff'
                          }}
                        >
                          👤
                        </div>

                        <span className="fw-semibold">
                          {member.name}
                        </span>

                      </div>

                    </td>

                    <td>
                      <span className="text-muted">
                        📁 {team.project}
                      </span>
                    </td>

                    <td>

                      {member.role === 'Team Leader' ? (

                        <span className="badge text-bg-success">
                          👑 Team Leader
                        </span>

                      ) : (

                        <span className="badge text-bg-secondary">
                          Team Member
                        </span>

                      )}

                    </td>

                    <td>

                      {member.role === 'Team Leader' ? (

                        <button
                          className="btn btn-sm btn-secondary"
                          disabled
                          style={{
                            borderRadius: '7px'
                          }}
                        >
                          🔒 Leader
                        </button>

                      ) : (

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            deleteMember(member.id)
                          }
                          style={{
                            borderRadius: '7px'
                          }}
                        >
                          🗑 Delete
                        </button>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Teams