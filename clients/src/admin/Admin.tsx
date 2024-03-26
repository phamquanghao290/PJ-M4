import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Admin.css'


type Props = {}

const Admin = (props: Props) => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}")
  const navigate = useNavigate()
  React.useEffect(() => {
    document.title = "admin"
    if (userLogin.active == 0) {
      navigate("/")
    } else {
      if (userLogin.email != "admin@gmail.com") {
        navigate("/admin")
      }
    }
  }, [])

  const handleLogout = () => {
    if (window.confirm("Admin muốn đăng xuất?")) {
      localStorage.removeItem("userLogin")
      navigate("/login")
      return
    }
  }
  return (
    <div>
      <nav
        className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
        id="navbarVertical"
      >
        <div className=" container-fluid">
          {/* Toggler */}
          <button
            className="navbar-toggler ms-n2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapse"
            aria-controls="sidebarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          <a
            className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0"
            href="#"
          >
            <div className="flex gap-6 text-yellow-400 font-bold text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={29}
                height={25}
                viewBox="0 0 25 29"
                fill="none"
                style={{ fontSize: 50 }}
              >
                <path
                  d="M3.56348 22.9H24.5V0.5H3.5057C1.57228 0.506417 0.00635613 2.08725 0 4.03908V24.6646H0.00057783C0.00057783 24.6733 0 24.6821 0 24.6908C0 26.7558 1.60521 28.5 3.5057 28.5H24.5V26.6333H3.5057C2.63895 26.6333 1.84906 25.7076 1.84906 24.6908C1.84906 23.7202 2.63433 22.9 3.56348 22.9ZM5.54717 2.38592H11.0943V12.4671L8.29764 9.9885L5.54717 12.4525V2.38592ZM1.84906 4.05367C1.84617 3.12617 2.58695 2.37192 3.5057 2.36667H3.69811H5.54717H3.69811V14.9667H5.52637L8.30458 12.4782L11.1117 14.9667H12.9434V2.36667H22.6509V21.0333H5.55179H3.70274H3.56348C2.96196 21.0333 2.37141 21.192 1.84963 21.493V4.05367H1.84906Z"
                  fill="#FFCA42"
                />
              </svg>
              <p>FUTURER BOOK</p>
            </div>
          </a>
          {/* Collapse */}
          <div
            className="navbar-collapse"
            id="sidebarCollapse"
          >
            {/* Navigation */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/admin">
                  <i className="bi bi-house px-lg-6" /> User
                </Link>
              </li>
              <li className="nav-item" id="addProduct">
                <Link to="adminProduct">
                  <i className="bi bi-bar-chart px-lg-6" /> Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="adminOrder">
                  <i className="bi bi-people px-lg-6" /> List Order
                </Link>
              </li>
              <li className="nav-item">
                <Link to="adminCategory">
                  <i className="bi bi-people px-lg-6" /> Category
                </Link>
              </li>
            </ul>
            {/* Divider */}
            <hr className="navbar-divider my-5 opacity-20" />
            <div className="mt-auto" />
            {/* User (md) */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-person-square" />{" "}
                  Account
                </a>
              </li>
              <li className="nav-item" onClick={() => handleLogout()}>
                <Link to='/login' className="nav-link">
                  <i className="bi bi-box-arrow-left" />{" "}
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Admin
