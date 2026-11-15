import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [contact, setContact] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // ================= GET OTP =================

  const handleGetOtp = (e) => {
    e.preventDefault()

    if (!contact.trim()) {
      alert('Please enter your email address')
      return
    }

    // Email validation
    const isEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)

    if (!isEmail) {
      alert('Please enter a valid email address')
      return
    }

    const otpCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString()

    setGeneratedOtp(otpCode)

    console.log('Demo OTP:', otpCode)

    alert(`Your OTP is: ${otpCode}`)

    setStep(2)
  }

  // ================= VERIFY OTP =================

  const handleVerifyOtp = (e) => {
    e.preventDefault()

    if (!otp) {
      alert('Please enter OTP')
      return
    }

    if (otp.length !== 6) {
      alert('Please enter a 6-digit OTP')
      return
    }

    if (otp !== generatedOtp) {
      alert('Invalid OTP. Please try again.')
      return
    }

    setStep(3)
  }

  // ================= RESET PASSWORD =================

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (!newPassword || !confirmPassword) {
      alert('Please enter new password and confirm password')
      return
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/reset-password',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: contact,
            newPassword: newPassword
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      alert('Password reset successful! Please login again.')

      navigate('/')
    } catch (error) {
      console.error('Reset password error:', error)

      alert(
        'Server connection failed. Please check backend.'
      )
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">

        {/* ================= HEADER ================= */}

        <div className="login-header">
          <div className="logo">
            🔐
          </div>

          <h1>Reset Password</h1>

          <p>
            Reset your Student Project Management System password
          </p>
        </div>

        {/* ================= STEP 1 ================= */}

        {step === 1 && (
          <form onSubmit={handleGetOtp}>

            <div className="mb-3">
              <label className="form-label">
                Email Address
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your registered email"
                value={contact}
                onChange={(e) =>
                  setContact(e.target.value.trimStart())
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 login-btn"
            >
              📩 Get OTP
            </button>

            <div className="text-center mt-3">
              <Link to="/">
                ← Back to Login
              </Link>
            </div>

          </form>
        )}

        {/* ================= STEP 2 ================= */}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>

            <div className="mb-3">
              <label className="form-label">
                Enter OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                className="form-control text-center"
                placeholder="Enter 6-digit OTP"
                value={otp}
                maxLength="6"
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, '')
                  )
                }
              />

              <small className="text-muted">
                Enter the OTP shown in the demo message.
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 login-btn"
            >
              ✅ Verify OTP
            </button>

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => {
                  setOtp('')
                  setGeneratedOtp('')
                  setStep(1)
                }}
              >
                ← Change Email
              </button>
            </div>

          </form>
        )}

        {/* ================= STEP 3 ================= */}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>

            <div className="mb-3">
              <label className="form-label">
                New Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Confirm Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 login-btn"
            >
              🔑 Reset Password
            </button>

          </form>
        )}

      </section>
    </main>
  )
}

export default ForgotPassword