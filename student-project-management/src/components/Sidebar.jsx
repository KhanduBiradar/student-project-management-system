import { NavLink } from 'react-router-dom'

function AdminSidebar() {
  const menuItems = [
    {
      name: 'Dashboard',
      icon: '🏠',
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
      icon: '📊',
      path: '/admin/reports'
    }
  ]

  return (
    <aside className="sidebar bg-white border-end d-flex flex-column">

      <div className="sidebar-title p-3 flex-shrink-0">
        <small className="text-muted">
          ADMIN MENU
        </small>
      </div>

      {/* Scrollable Menu */}
      <nav className="nav flex-column px-2 sidebar-menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link sidebar-link ${
                isActive ? 'active' : ''
              }`
            }
          >
            <span className="me-2">
              {item.icon}
            </span>

            {item.name}
          </NavLink>
        ))}

      </nav>

      {/* Logout stays at bottom */}
      <div className="p-3 flex-shrink-0 sidebar-logout">
        <button className="btn btn-outline-danger w-100">
          🚪 Logout
        </button>
      </div>

    </aside>
  )
}

export default AdminSidebar