import { NavLink, useNavigate } from 'react-router-dom'

function AdminSidebar() {
  const navigate = useNavigate()

  const menuItems = [
    {
      name: 'Dashboard',
      icon: '📊',
      path: '/admin/dashboard'
    },
    {
      name: 'Students',
      icon: '👨‍🎓',
      path: '/admin/students'
    },
    {
      name: 'Teachers',
      icon: '👨‍🏫',
      path: '/admin/teachers'
    },
    {
      name: 'Projects',
      icon: '📁',
      path: '/admin/projects'
    },
    {
      name: 'Teams',
      icon: '👥',
      path: '/admin/teams'
    },
    {
      name: 'Submissions',
      icon: '📄',
      path: '/admin/submissions'
    },
    {
      name: 'Deadlines',
      icon: '📅',
      path: '/admin/deadlines'
    },
    {
      name: 'Reports',
      icon: '📈',
      path: '/admin/reports'
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/')
  }

  return (
    <aside
      style={{
        width: '250px',
        minHeight: '100vh',
        background: '#0f172a',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: '1px solid #1e293b'
      }}
    >

      {/* ================= BRAND ================= */}
      <div
        style={{
          padding: '24px 18px',
          borderBottom: '1px solid #1e293b'
        }}
      >
        <div
          className="d-flex align-items-center"
          style={{
            gap: '12px'
          }}
        >

          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background:
                'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow:
                '0 8px 20px rgba(79,70,229,0.3)'
            }}
          >
            🛡️
          </div>

          <div>
            <div
              style={{
                fontSize: '21px',
                fontWeight: '800',
                letterSpacing: '0.5px'
              }}
            >
              SPMS
            </div>

            <div
              style={{
                color: '#94a3b8',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              ADMIN CONTROL
            </div>
          </div>

        </div>
      </div>

      {/* ================= MENU TITLE ================= */}
      <div
        style={{
          padding: '22px 18px 10px',
          color: '#64748b',
          fontSize: '11px',
          fontWeight: '800',
          letterSpacing: '1.5px'
        }}
      >
        MANAGEMENT
      </div>

      {/* ================= MENU ================= */}
      <nav style={{ padding: '0 10px' }}>

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '13px',
              textDecoration: 'none',
              color: isActive
                ? '#ffffff'
                : '#cbd5e1',
              padding: '12px 14px',
              marginBottom: '5px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: isActive ? '700' : '500',
              background: isActive
                ? 'linear-gradient(90deg, #2563eb, #4f46e5)'
                : 'transparent',
              boxShadow: isActive
                ? '0 6px 16px rgba(37,99,235,0.22)'
                : 'none',
              transition: 'all 0.2s ease'
            })}
          >
            <span
              style={{
                width: '24px',
                textAlign: 'center',
                fontSize: '17px'
              }}
            >
              {item.icon}
            </span>

            <span>{item.name}</span>

          </NavLink>

        ))}

      </nav>

      {/* ================= SYSTEM STATUS ================= */}
      <div
        style={{
          margin: '18px 10px',
          padding: '13px',
          background: '#111c35',
          border: '1px solid #24324d',
          borderRadius: '12px'
        }}
      >

        <div
          style={{
            fontSize: '11px',
            color: '#64748b',
            fontWeight: '700',
            letterSpacing: '1px',
            marginBottom: '8px'
          }}
        >
          SYSTEM STATUS
        </div>

        <div className="d-flex align-items-center">

          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: '#22c55e',
              marginRight: '8px'
            }}
          ></span>

          <span
            style={{
              fontSize: '13px',
              color: '#bbf7d0',
              fontWeight: '600'
            }}
          >
            System Online
          </span>

        </div>

      </div>

      {/* ================= PROFILE ================= */}
      <div
        style={{
          marginTop: 'auto',
          marginLeft: '10px',
          marginRight: '10px',
          marginBottom: '10px',
          padding: '12px',
          borderRadius: '12px',
          background: '#111c35',
          border: '1px solid #24324d'
        }}
      >

        <div className="d-flex align-items-center">

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
              fontWeight: '800',
              marginRight: '10px'
            }}
          >
            A
          </div>

          <div>

            <div
              style={{
                fontSize: '14px',
                fontWeight: '700'
              }}
            >
              Admin
            </div>

            <small
              style={{
                color: '#94a3b8'
              }}
            >
              Administrator
            </small>

          </div>

        </div>

      </div>

      {/* ================= LOGOUT ================= */}
      <div
        style={{
          padding: '0 10px 14px'
        }}
      >

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            border: '1px solid #7f1d1d',
            background: '#2a1013',
            color: '#fca5a5',
            padding: '10px',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  )
}

export default AdminSidebar