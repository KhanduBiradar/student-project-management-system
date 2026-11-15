import { NavLink, useNavigate } from 'react-router-dom'

function TeacherSidebar() {
  const navigate = useNavigate()

  const menuItems = [
    {
      name: 'Dashboard',
      icon: '🏠',
      path: '/teacher/dashboard'
    },
    {
      name: 'Students',
      icon: '👨‍🎓',
      path: '/teacher/students'
    },
    {
      name: 'Projects',
      icon: '📁',
      path: '/teacher/projects'
    },
    {
      name: 'Submissions',
      icon: '📄',
      path: '/teacher/submission'
    },
    {
      name: 'Feedback',
      icon: '📝',
      path: '/teacher/feedback'
    },
    {
      name: 'Evaluation',
      icon: '⭐',
      path: '/teacher/evaluation'
    }
  ]

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <aside
      className="d-flex flex-column"
      style={{
        width: '235px',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #111827, #1e3a8a)',
        color: 'white',
        flexShrink: 0
      }}
    >

      {/* BRAND */}
      <div
        className="text-center"
        style={{
          padding: '22px 10px',
          borderBottom: '1px solid rgba(255,255,255,0.15)'
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center mx-auto mb-2"
          style={{
            width: '62px',
            height: '62px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            fontSize: '30px'
          }}
        >
          🎓
        </div>

        <h3
          className="fw-bold mb-0"
          style={{
            letterSpacing: '1px'
          }}
        >
          SPMS
        </h3>

        <small
          style={{
            color: '#cbd5e1'
          }}
        >
          Teacher Panel
        </small>
      </div>

      {/* MENU TITLE */}
      <div
        className="px-3 pt-4 pb-2"
        style={{
          color: '#93c5fd',
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '1.5px'
        }}
      >
        TEACHER MENU
      </div>

      {/* MENU ITEMS */}
      <nav className="px-2">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'white',
              padding: '13px 16px',
              marginBottom: '7px',
              borderRadius: '12px',
              fontWeight: isActive ? '700' : '500',
              background: isActive
                ? 'linear-gradient(90deg, #2563eb, #7c3aed)'
                : 'transparent',
              boxShadow: isActive
                ? '0 5px 15px rgba(79,70,229,0.35)'
                : 'none',
              transition: '0.2s'
            })}
          >
            <span
              style={{
                width: '30px',
                fontSize: '18px'
              }}
            >
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* PROFILE */}
      <div
        className="mt-auto mx-2 mb-2"
        style={{
          padding: '12px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.12)'
        }}
      >
        <div className="d-flex align-items-center">

          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{
              width: '40px',
              height: '40px',
              background: '#818cf8',
              fontWeight: '700'
            }}
          >
            T
          </div>

          <div>
            <div className="fw-bold">
              Teacher
            </div>

            <small
              style={{
                color: '#cbd5e1'
              }}
            >
              Project Guide
            </small>
          </div>

        </div>
      </div>

      {/* LOGOUT */}
      <div className="px-2 pb-3">

        <button
          className="btn w-100"
          onClick={handleLogout}
          style={{
            color: '#fecaca',
            border: '1px solid #ef4444',
            borderRadius: '10px',
            padding: '11px',
            fontWeight: '600',
            background: 'rgba(127,29,29,0.15)'
          }}
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  )
}

export default TeacherSidebar