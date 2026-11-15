function DashboardCard({ title, value, description, icon, color }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <h6 className="text-muted">{title}</h6>
              <h2 className="fw-bold">{value}</h2>
              <span className={`text-${color}`}>
                {description}
              </span>
            </div>

            <div style={{ fontSize: '30px' }}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard