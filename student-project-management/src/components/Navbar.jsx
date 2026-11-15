function Navbar({ role = 'Student' }) {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null')

  const displayName =
    user?.name ||
    (role === 'Teacher'
      ? 'Teacher'
      : role === 'Admin'
      ? 'Admin'
      : 'Student')

  const initial = displayName.charAt(0).toUpperCase()

  return (
    <nav
      style={{
        height: '70px',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 28px'
      }}
    >

      {/* LEFT */}
      <div>

        <h1
          style={{
            margin: 0,
            fontSize: '32px',
            lineHeight: '1.1',
            fontWeight: '800',
            color: '#111827'
          }}
        >
          Student Project Management System
        </h1>

        <div
          style={{
            marginTop: '2px',
            fontSize: '14px',
            color: '#64748b'
          }}
        >
          {role} Dashboard
        </div>

      </div>

      {/* RIGHT */}
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >

        <div
          style={{
            textAlign: 'right'
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#111827'
            }}
          >
            {displayName}
          </div>

          <div
            style={{
              fontSize: '14px',
              color: '#64748b'
            }}
          >
            {role}
          </div>
        </div>

        <div
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            background:
              'linear-gradient(135deg, #4f46e5, #7c3aed)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: '700'
          }}
        >
          {initial}
        </div>

      </div>

    </nav>
  )
}

export default Navbar