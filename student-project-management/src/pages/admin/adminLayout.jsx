import AdminSidebar from './Sidebar'
import Navbar from './Navbar'

function AdminLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">

      <Navbar role="Principal / Admin" />

      <div className="d-flex flex-grow-1">

        <AdminSidebar />

        <main className="flex-grow-1">
          {children}
        </main>

      </div>

    </div>
  )
}

export default AdminLayout