import { useState } from 'react'

function Documents() {
  const [selectedFile, setSelectedFile] = useState(null)

  const [documents, setDocuments] = useState([
    {
      name: 'Project Report',
      type: 'PDF',
      status: 'Uploaded',
      icon: '📄'
    },
    {
      name: 'Project Synopsis',
      type: 'PDF',
      status: 'Uploaded',
      icon: '📑'
    },
    {
      name: 'Project Presentation',
      type: 'PPT',
      status: 'Pending',
      icon: '📊'
    },
    {
      name: 'Source Code',
      type: 'ZIP',
      status: 'Pending',
      icon: '💻'
    }
  ])

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first.')
      return
    }

    const extension =
      selectedFile.name.split('.').pop().toUpperCase()

    const newDocument = {
      name: selectedFile.name,
      type: extension,
      status: 'Uploaded',
      icon: '📄'
    }

    setDocuments([...documents, newDocument])
    setSelectedFile(null)

    alert('Document uploaded successfully!')
  }

  const handleDelete = (name) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(
        documents.filter((document) => document.name !== name)
      )
    }
  }

  const uploadedCount = documents.filter(
    (doc) => doc.status === 'Uploaded'
  ).length

  const pendingCount = documents.filter(
    (doc) => doc.status === 'Pending'
  ).length

  return (
    <div className="container-fluid p-4">

      {/* PAGE HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          📄 Documents
        </h2>

        <p className="text-muted mb-0">
          Upload and manage your project documents.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">

        {/* Total */}
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderTop: '4px solid #4f46e5',
              borderRadius: '15px'
            }}
          >
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <small className="text-muted">
                    TOTAL DOCUMENTS
                  </small>

                  <h3 className="fw-bold mt-2 mb-1">
                    {documents.length}
                  </h3>

                  <span className="text-muted small">
                    Project files
                  </span>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '55px',
                    height: '55px',
                    background: '#eef2ff',
                    fontSize: '25px'
                  }}
                >
                  📁
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Uploaded */}
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderTop: '4px solid #10b981',
              borderRadius: '15px'
            }}
          >
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <small className="text-muted">
                    UPLOADED
                  </small>

                  <h3 className="fw-bold mt-2 mb-1 text-success">
                    {uploadedCount}
                  </h3>

                  <span className="text-muted small">
                    Successfully uploaded
                  </span>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '55px',
                    height: '55px',
                    background: '#d1fae5',
                    fontSize: '25px'
                  }}
                >
                  ✅
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="col-md-4">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderTop: '4px solid #f59e0b',
              borderRadius: '15px'
            }}
          >
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <small className="text-muted">
                    PENDING
                  </small>

                  <h3 className="fw-bold mt-2 mb-1 text-warning">
                    {pendingCount}
                  </h3>

                  <span className="text-muted small">
                    Documents required
                  </span>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '55px',
                    height: '55px',
                    background: '#fef3c7',
                    fontSize: '25px'
                  }}
                >
                  ⏳
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      {/* UPLOAD CARD */}
      <div
        className="card border-0 shadow-sm mb-4"
        style={{ borderRadius: '15px' }}
      >

        <div className="card-body p-4">

          <div className="d-flex align-items-center mb-4">

            <div
              className="rounded-circle me-3 d-flex align-items-center justify-content-center"
              style={{
                width: '45px',
                height: '45px',
                background: '#eef2ff',
                fontSize: '22px'
              }}
            >
              ⬆️
            </div>

            <div>
              <h4 className="fw-bold mb-0">
                Upload Document
              </h4>

              <small className="text-muted">
                Add project-related files
              </small>
            </div>

          </div>

          <div className="row g-3 align-items-end">

            <div className="col-md-8">

              <label className="form-label fw-semibold">
                Select File
              </label>

              <input
                type="file"
                className="form-control form-control-lg"
                onChange={handleFileChange}
              />

              {selectedFile && (
                <div className="mt-2">
                  <small className="text-success">
                    ✅ Selected: {selectedFile.name}
                  </small>
                </div>
              )}

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-primary btn-lg w-100"
                onClick={handleUpload}
                style={{
                  borderRadius: '8px',
                  fontWeight: '600'
                }}
              >
                ⬆️ Upload Document
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* DOCUMENT TABLE */}
      <div
        className="card border-0 shadow-sm"
        style={{ borderRadius: '15px' }}
      >

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h4 className="fw-bold mb-1">
                📂 My Documents
              </h4>

              <small className="text-muted">
                View and manage your project files.
              </small>
            </div>

            <span
              className="badge bg-primary"
              style={{
                padding: '10px 14px',
                borderRadius: '8px'
              }}
            >
              {uploadedCount} Uploaded
            </span>

          </div>

          <div className="table-responsive">

            <table className="table align-middle mb-0">

              <thead>
                <tr>
                  <th>Document</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {documents.map((document, index) => (
                  <tr key={`${document.name}-${index}`}>

                    <td>

                      <div className="d-flex align-items-center">

                        <div
                          className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: '42px',
                            height: '42px',
                            background: '#f1f5f9',
                            fontSize: '20px'
                          }}
                        >
                          {document.icon}
                        </div>

                        <span className="fw-semibold">
                          {document.name}
                        </span>

                      </div>

                    </td>

                    <td>
                      <span
                        className="badge bg-light text-dark"
                        style={{
                          padding: '7px 10px'
                        }}
                      >
                        {document.type}
                      </span>
                    </td>

                    <td>

                      <span
                        className={
                          document.status === 'Uploaded'
                            ? 'badge text-bg-success'
                            : 'badge text-bg-warning'
                        }
                      >
                        {document.status}
                      </span>

                    </td>

                    <td>

                      {document.status === 'Uploaded' ? (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            handleDelete(document.name)
                          }
                          style={{
                            borderRadius: '7px'
                          }}
                        >
                          🗑️ Delete
                        </button>
                      ) : (
                        <span className="text-muted small">
                          No file uploaded
                        </span>
                      )}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      </div>

    </div>
  )
}

export default Documents