import { useEffect, useState } from 'react'

function Teams() {

  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch teams from backend
  const loadTeams = () => {

    setLoading(true)
    setError('')

    fetch('http://localhost:5000/api/admin/teams')
      .then((response) => {

        if (!response.ok) {
          throw new Error('Failed to fetch teams')
        }

        return response.json()
      })
      .then((data) => {

        if (data.success) {
          setTeams(data.teams)
        } else {
          setError('Unable to load teams')
        }

        setLoading(false)
      })
      .catch((err) => {

        console.error('Teams fetch error:', err)
        setError('Server connection failed')
        setLoading(false)

      })
  }

  // Load teams when page opens
  useEffect(() => {
    loadTeams()
  }, [])

  // Remove Team
  const handleRemoveTeam = async (teamId, teamName) => {

    const confirmed = window.confirm(
      `Are you sure you want to remove "${teamName}"?`
    )

    if (!confirmed) {
      return
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/admin/team/${teamId}`,
        {
          method: 'DELETE'
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        alert(data.message || 'Failed to remove team')
        return
      }

      alert('Team removed successfully!')

      // Reload teams
      loadTeams()

    } catch (err) {

      console.error('Remove team error:', err)
      alert('Server connection failed')

    }
  }

  return (
    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-1">
        Team Management
      </h2>

      <p className="text-muted mb-4">
        View and manage all student project teams.
      </p>

      <div className="card shadow-sm border-0">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-bold mb-0">
              👥 All Teams
            </h5>

            <span className="badge text-bg-primary">
              {teams.length} Teams
            </span>

          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-4">

              <div className="spinner-border text-primary"></div>

              <p className="mt-2 text-muted">
                Loading teams...
              </p>

            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {/* Teams Table */}
          {!loading && !error && (

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Team Leader</th>
                    <th>Project</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {teams.length === 0 ? (

                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-muted py-4"
                      >
                        No teams found.
                      </td>
                    </tr>

                  ) : (

                    teams.map((team, index) => (

                      <tr key={team.id}>

                        <td>
                          {index + 1}
                        </td>

                        <td className="fw-semibold">
                          {team.team_name}
                        </td>

                        <td>
                          {team.team_leader_name}
                        </td>

                        <td>
                          {team.project_title}
                        </td>

                        <td>
                          {new Date(
                            team.created_at
                          ).toLocaleDateString()}
                        </td>

                        <td>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleRemoveTeam(
                                team.id,
                                team.team_name
                              )
                            }
                            title="Remove Team"
                          >
                            🗑 Remove
                          </button>

                        </td>

                      </tr>

                    ))

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

export default Teams