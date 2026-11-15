import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function AdminSignup() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all fields')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        'http://localhost:5000/api/admin/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        alert(
          data.message ||
          'Admin account creation failed'
        )
        return
      }

      alert(
        'Admin account created successfully!'
      )

      navigate('/')

    } catch (error) {
      console.error(
        'Admin Signup Error:',
        error
      )

      alert(
        'Server connection failed. Please check backend.'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <div className="logo">
            🛡️
          </div>

          <h1>
            Create Admin Account
          </h1>

          <p>
            Create your Secure Admin account
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 login-btn"
            disabled={loading}
          >

            {loading
              ? 'Creating Account...'
              : 'Create Admin Account'}

          </button>

        </form>

        <div className="text-center mt-4">

          <span className="text-muted">
            Already have an account?
          </span>{' '}

          <Link to="/">
            Admin Login
          </Link>

        </div>

      </div>

    </div>
    )
}

export default AdminSignup