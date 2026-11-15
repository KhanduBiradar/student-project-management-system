import Navbar from './Navbar'
import { NavLink, useNavigate } from 'react-router-dom'

function AdminLayout({ children }) {
  const navigate = useNavigate()

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
    { name: 'Students', icon: '👨‍🎓', path: '/admin/students' },
    { name: 'Teachers', icon: '👨‍🏫', path: '/admin/teachers' },
    { name: 'Projects', icon: '📁', path: '/admin/projects' },
    { name: 'Teams', icon: '👥', path: '/admin/teams' },
    { name: 'Submissions', icon: '📄', path: '/admin/submissions' },
    { name: 'Deadlines', icon: '📅', path: '/admin/deadlines' },
    { name: 'Reports', icon: '📈', path: '/admin/reports' }
  ]

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/')
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh'
      }}
    >

      {/* ================= ADMIN SIDEBAR ================= */}
      <aside
        style={{
          width: '250px',
          minHeight: '100vh',
          background: '#0f172a',
          color: 'white',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        {/* BRAND */}
        <div
          style={{
            padding: '22px 18px',
            borderBottom: '1px solid #24324d'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background:
                  'linear-gradient(135deg, #2563eb, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '25px'
              }}
            >
              🛡️
            </div>

            <div>
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: '800'
                }}
              >
                SPMS
              </div>

              <small style={{ color: '#94a3b8' }}>
                Admin Panel
              </small>
            </div>
          </div>
        </div>

        {/* MENU TITLE */}
        <div
          style={{
            padding: '24px 18px 10px',
            color: '#60a5fa',
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '1.5px'
          }}
        >
          ADMIN MENU
        </div>

        {/* MENU */}
        <nav style={{ padding: '0 10px' }}>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '13px',
                padding: '13px 15px',
                marginBottom: '6px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'white',
                fontSize: '14px',
                fontWeight: isActive ? '700' : '500',
                background: isActive
                  ? 'linear-gradient(90deg, #2563eb, #7c3aed)'
                  : 'transparent'
              })}
            >
              <span style={{ width: '24px', fontSize: '18px' }}>
                {item.icon}
              </span>

              {item.name}
            </NavLink>
          ))}

        </nav>

        {/* SYSTEM STATUS */}
        <div
          style={{
            margin: '18px 10px',
            padding: '12px',
            borderRadius: '10px',
            background: '#111c35',
            border: '1px solid #24324d'
          }}
        >
          <small
            style={{
              color: '#64748b',
              fontWeight: '700'
            }}
          >
            SYSTEM STATUS
          </small>

          <div
            style={{
              marginTop: '7px',
              color: '#86efac',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            🟢 System Online
          </div>
        </div>

        {/* PUSH PROFILE TO BOTTOM */}
        <div style={{ marginTop: 'auto' }}>

          {/* PROFILE */}
          <div
            style={{
              margin: '0 10px 10px',
              padding: '12px',
              borderRadius: '10px',
              background: '#111c35',
              border: '1px solid #24324d'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >

              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700'
                }}
              >
                A
              </div>

              <div>
                <div style={{ fontWeight: '700' }}>
                  Admin User
                </div>

                <small style={{ color: '#94a3b8' }}>
                  Administrator
                </small>
              </div>

            </div>
          </div>

          {/* LOGOUT */}
          <div style={{ padding: '0 10px 14px' }}>

            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '9px',
                border: '1px solid #ef4444',
                background: '#2a1013',
                color: '#fca5a5',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </aside>

      {/* ================= RIGHT SIDE ================= */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          background: '#f5f7fb'
        }}
      >

        <Navbar role="Admin" />

        <main>
          {children}
        </main>

      </div>

    </div>
  )
}

export default AdminLayout