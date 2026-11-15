import Navbar from './Navbar'
import TeacherSidebar from './teacherSidebar'

function TeacherLayout({ children }) {
  return (
    <div
      className="d-flex"
      style={{ minHeight: '100vh' }}
    >

      {/* LEFT SIDEBAR */}
      <TeacherSidebar />

      {/* RIGHT SIDE CONTENT */}
      <div
        className="flex-grow-1"
        style={{
          background: '#f5f7fb',
          minWidth: 0
        }}
      >

        {/* TOP HEADER */}
        <Navbar role="Teacher" />

        {/* PAGE CONTENT */}
        <main>
          {children}
        </main>

      </div>

    </div>
  )
}

export default TeacherLayout