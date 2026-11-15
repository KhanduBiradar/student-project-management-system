import { NavLink, Outlet, useLocation } from 'react-router-dom'

function StudentDashboard() {
  const location = useLocation()

    const loggedInUser = JSON.parse(
    localStorage.getItem('loggedInUser') || 'null'
  )

  const studentName = loggedInUser?.name || 'Student'
  const firstLetter = studentName.charAt(0).toUpperCase()

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/student/dashboard',
      icon: '🏠'
    },
    {
      name: 'My Project',
      path: '/student/project',
      icon: '📁'
    },
    {
      name: 'My Team',
      path: '/student/team',
      icon: '👥'
    },
    {
      name: 'Deadlines',
      path: '/student/deadline',
      icon: '📅'
    },
    {
      name: 'Submission',
      path: '/student/submission',
      icon: '📤'
    },
    {
      name: 'Evaluation',
      path: '/student/evaluation',
      icon: '📝'
    },
    {
      name: 'Feedback',
      path: '/student/feedback',
      icon: '💬'
    }
  ]

  const dashboard =
    location.pathname === '/student/dashboard'

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f4f7fc',
        fontFamily: 'Arial, sans-serif'
      }}
    >

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '250px',
          height: '100vh',
          background:
            'linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%)',
          color: 'white',
          padding: '22px 14px',
          zIndex: 1000,
          boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >

        {/* ================= BRAND ================= */}

        <div
          style={{
            textAlign: 'center',
            paddingBottom: '20px',
            borderBottom:
              '1px solid rgba(255,255,255,0.15)'
          }}
        >

          <div
            style={{
              width: '58px',
              height: '58px',
              margin: '0 auto 10px',
              borderRadius: '16px',
              background:
                'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              boxShadow:
                '0 8px 20px rgba(0,0,0,0.25)'
            }}
          >
            🎓
          </div>

          <h3
            style={{
              margin: 0,
              fontWeight: '800',
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
            Student Panel
          </small>

        </div>

        {/* ================= MENU TITLE ================= */}

        <div
          style={{
            marginTop: '24px',
            marginBottom: '10px',
            paddingLeft: '8px',
            fontSize: '11px',
            fontWeight: '800',
            color: '#93c5fd',
            letterSpacing: '1.5px'
          }}
        >
          STUDENT MENU
        </div>

        {/* ================= MENU ================= */}

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
          }}
        >

          {menuItems.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 13px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive ? '700' : '500',
                color: isActive
                  ? '#ffffff'
                  : '#dbeafe',
                background: isActive
                  ? 'linear-gradient(135deg, #2563eb, #7c3aed)'
                  : 'transparent',
                boxShadow: isActive
                  ? '0 6px 16px rgba(37,99,235,0.35)'
                  : 'none',
                transition:
                  'all 0.2s ease'
              })}
            >

              <span
                style={{
                  width: '28px',
                  textAlign: 'center',
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

        {/* ================= PROJECT STATUS ================= */}

        <div
          style={{
            margin: '18px 4px',
            padding: '12px',
            borderRadius: '11px',
            background:
              'rgba(255,255,255,0.08)',
            border:
              '1px solid rgba(255,255,255,0.12)'
          }}
        >

          <small
            style={{
              color: '#93c5fd',
              fontWeight: '700',
              fontSize: '10px',
              letterSpacing: '1px'
            }}
          >
            PROJECT STATUS
          </small>

          <div
            style={{
              marginTop: '7px',
              fontSize: '13px',
              fontWeight: '700'
            }}
          >
            🟢 In Progress
          </div>

          <div
            style={{
              marginTop: '8px',
              height: '6px',
              background:
                'rgba(255,255,255,0.15)',
              borderRadius: '10px',
              overflow: 'hidden'
            }}
          >

            <div
              style={{
                width: '65%',
                height: '100%',
                background: '#22c55e',
                borderRadius: '10px'
              }}
            />

          </div>

          <small
            style={{
              display: 'block',
              marginTop: '6px',
              color: '#bfdbfe',
              fontSize: '11px'
            }}
          >
            65% completed
          </small>

        </div>

        {/* ================= BOTTOM ================= */}

        <div
          style={{
            marginTop: 'auto'
          }}
        >

          {/* PROFILE */}

          <div
            style={{
              padding: '11px',
              borderRadius: '11px',
              background:
                'rgba(255,255,255,0.08)',
              border:
                '1px solid rgba(255,255,255,0.12)',
              marginBottom: '10px'
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
                    'linear-gradient(135deg, #60a5fa, #a78bfa)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '16px'
                }}
              >
                {firstLetter}
              </div>

              <div>

                <div
                  style={{
                    fontWeight: '700',
                    fontSize: '14px'
                  }}
                >
                  {studentName}
                </div>

                <small
                  style={{
                    color: '#bfdbfe',
                    fontSize: '11px'
                  }}
                >
                  Student
                </small>

              </div>

            </div>

          </div>

          {/* LOGOUT */}

          <NavLink
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              borderRadius: '9px',
              border:
                '1px solid rgba(248,113,113,0.7)',
              color: '#fecaca',
              textDecoration: 'none',
              fontWeight: '600',
              background:
                'rgba(220,38,38,0.12)'
            }}
          >
            🚪 Logout
          </NavLink>

        </div>

      </aside>

      {/* =====================================================
          MAIN AREA
      ===================================================== */}

      <main
        style={{
          marginLeft: '250px',
          minHeight: '100vh'
        }}
      >

        {/* ================= HEADER ================= */}

        <header
          style={{
            height: '78px',
            background: '#ffffff',
            borderBottom:
              '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            boxShadow:
              '0 3px 12px rgba(0,0,0,0.05)'
          }}
        >

          <div>

            <h2
              style={{
                margin: 0,
                fontWeight: '800',
                color: '#111827',
                fontSize: '22px'
              }}
            >
              Student Project Management System
            </h2>

            <small
              style={{
                color: '#64748b'
              }}
            >
              {dashboard
                ? 'Student Dashboard'
                : 'Student Panel'}
            </small>

          </div>

          {/* PROFILE HEADER */}

          <div
            style={{
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

              <strong
                style={{
                  color: '#111827'
                }}
              >
                {studentName}
              </strong>

              <br />

              <small
                style={{
                  color: '#64748b'
                }}
              >
                Student
              </small>

            </div>

            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, #2563eb, #7c3aed)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '18px'
              }}
            >
              {firstLetter}
            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}

        <section
          style={{
            padding: '30px'
          }}
        >

          {dashboard ? (

            <>
              {/* ================= WELCOME BANNER ================= */}

              <div
                style={{
                  background:
                    'linear-gradient(135deg, #2563eb, #4f46e5, #7c3aed)',
                  borderRadius: '20px',
                  padding: '30px',
                  color: 'white',
                  marginBottom: '25px',
                  boxShadow:
                    '0 12px 30px rgba(37,99,235,0.25)'
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >

                  <div>

                    <div
                      style={{
                        fontSize: '14px',
                        opacity: 0.85,
                        marginBottom: '5px',
                        fontWeight: '600'
                      }}
                    >
                      STUDENT DASHBOARD
                    </div>

                    <h2
                      style={{
                        fontWeight: '800',
                        marginBottom: '8px'
                      }}
                    >
                      Welcome back, {studentName.split(' ')[0]}! 👋
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        opacity: 0.9
                      }}
                    >
                      Manage your project, team, submissions
                      and feedback from one place.
                    </p>

                  </div>

                  <div
                    style={{
                      fontSize: '65px'
                    }}
                  >
                    🎓
                  </div>

                </div>

              </div>

              {/* ================= CARDS ================= */}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(210px, 1fr))',
                  gap: '18px',
                  marginBottom: '25px'
                }}
              >

                {/* PROJECT */}

                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '22px',
                    border: '1px solid #dbeafe',
                    boxShadow:
                      '0 6px 18px rgba(37,99,235,0.08)',
                    borderTop:
                      '4px solid #2563eb'
                  }}
                >

                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: '#dbeafe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '23px',
                      marginBottom: '15px'
                    }}
                  >
                    📁
                  </div>

                  <small
                    style={{
                      color: '#64748b'
                    }}
                  >
                    My Project
                  </small>

                  <h4
                    style={{
                      margin: '6px 0 0',
                      fontWeight: '800',
                      color: '#2563eb'
                    }}
                  >
                    1 Project
                  </h4>

                </div>

                {/* TEAM */}

                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '22px',
                    border: '1px solid #ede9fe',
                    boxShadow:
                      '0 6px 18px rgba(124,58,237,0.08)',
                    borderTop:
                      '4px solid #7c3aed'
                  }}
                >

                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: '#ede9fe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '23px',
                      marginBottom: '15px'
                    }}
                  >
                    👥
                  </div>

                  <small
                    style={{
                      color: '#64748b'
                    }}
                  >
                    My Team
                  </small>

                  <h4
                    style={{
                      margin: '6px 0 0',
                      fontWeight: '800',
                      color: '#7c3aed'
                    }}
                  >
                    SPMS Team
                  </h4>

                </div>

                {/* PROGRESS */}

                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '22px',
                    border: '1px solid #d1fae5',
                    boxShadow:
                      '0 6px 18px rgba(16,185,129,0.08)',
                    borderTop:
                      '4px solid #10b981'
                  }}
                >

                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: '#d1fae5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '23px',
                      marginBottom: '15px'
                    }}
                  >
                    📊
                  </div>

                  <small
                    style={{
                      color: '#64748b'
                    }}
                  >
                    Project Progress
                  </small>

                  <h4
                    style={{
                      margin: '6px 0 10px',
                      fontWeight: '800',
                      color: '#059669'
                    }}
                  >
                    65%
                  </h4>

                  <div
                    style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '20px',
                      overflow: 'hidden'
                    }}
                  >

                    <div
                      style={{
                        width: '65%',
                        height: '100%',
                        background:
                          'linear-gradient(90deg, #10b981, #059669)',
                        borderRadius: '20px'
                      }}
                    />

                  </div>

                </div>

                {/* SUBMISSION */}

                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '22px',
                    border: '1px solid #fef3c7',
                    boxShadow:
                      '0 6px 18px rgba(245,158,11,0.08)',
                    borderTop:
                      '4px solid #f59e0b'
                  }}
                >

                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: '#fef3c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '23px',
                      marginBottom: '15px'
                    }}
                  >
                    📤
                  </div>

                  <small
                    style={{
                      color: '#64748b'
                    }}
                  >
                    Submission
                  </small>

                  <h4
                    style={{
                      margin: '6px 0 0',
                      fontWeight: '800',
                      color: '#d97706'
                    }}
                  >
                    Pending
                  </h4>

                </div>

              </div>

              {/* ================= BOTTOM SECTION ================= */}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '20px'
                }}
              >

                {/* PROJECT OVERVIEW */}

                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '17px',
                    padding: '25px',
                    border: '1px solid #e5e7eb',
                    boxShadow:
                      '0 6px 18px rgba(0,0,0,0.05)'
                  }}
                >

                  <h5
                    style={{
                      fontWeight: '800',
                      marginBottom: '18px',
                      color: '#111827'
                    }}
                  >
                    📁 Project Overview
                  </h5>

                  <h6
                    style={{
                      color: '#2563eb',
                      fontWeight: '800'
                    }}
                  >
                    Student Project Management System
                  </h6>

                  <p
                    style={{
                      color: '#64748b',
                      lineHeight: '1.7',
                      fontSize: '14px'
                    }}
                  >
                    A web-based system to manage student
                    projects, teams, submissions, feedback
                    and evaluation.
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '18px'
                    }}
                  >

                    <span
                      style={{
                        background: '#dbeafe',
                        color: '#1d4ed8',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      IN PROGRESS
                    </span>

                    <strong
                      style={{
                        color: '#059669'
                      }}
                    >
                      65%
                    </strong>

                  </div>

                </div>

                {/* QUICK ACTIONS */}

                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: '17px',
                    padding: '25px',
                    border: '1px solid #e5e7eb',
                    boxShadow:
                      '0 6px 18px rgba(0,0,0,0.05)'
                  }}
                >

                  <h5
                    style={{
                      fontWeight: '800',
                      marginBottom: '18px'
                    }}
                  >
                    ⚡ Quick Actions
                  </h5>

                  <div
                    style={{
                      display: 'grid',
                      gap: '10px'
                    }}
                  >

                    <NavLink
                      to="/student/project"
                      className="btn btn-outline-primary text-start"
                    >
                      📁 View My Project
                    </NavLink>

                    <NavLink
                      to="/student/team"
                      className="btn btn-outline-primary text-start"
                    >
                      👥 View My Team
                    </NavLink>

                    <NavLink
                      to="/student/deadline"
                      className="btn btn-outline-primary text-start"
                    >
                      📅 View Deadlines
                    </NavLink>

                    <NavLink
                      to="/student/submission"
                      className="btn btn-outline-primary text-start"
                    >
                      📤 Manage Submission
                    </NavLink>

                    <NavLink
                      to="/student/evaluation"
                      className="btn btn-outline-primary text-start"
                    >
                      📝 View Evaluation
                    </NavLink>

                    <NavLink
                      to="/student/feedback"
                      className="btn btn-outline-primary text-start"
                    >
                      💬 View Feedback
                    </NavLink>

                  </div>

                </div>

              </div>

            </>

          ) : (

            <Outlet />

          )}

        </section>

      </main>

    </div>
  )
}

export default StudentDashboard