import { Link, NavLink } from "react-router";

export default function Header() {
  const navLinkClassName = ({ isActive }) =>
    `nav-link px-2 site-nav__link${isActive ? " active" : ""}`

  return (
    <>
    <div className="container">
  <header className="site-header d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <div className="col-md-3 mb-2 mb-md-0">
      <Link to="/" className="d-inline-flex align-items-center link-body-emphasis text-decoration-none">
        <i className="fa-solid fa-book fa-2xl" style={{color: "rgb(116, 192, 252)",}}></i>
        <span className="fs-4 fw-bold ms-2">BookSales</span>
      </Link>
    </div>

    <ul className="nav site-nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><NavLink to="/" end className={navLinkClassName}>Beranda</NavLink></li>
        <li><NavLink to="/books" className={navLinkClassName}>Buku</NavLink></li>
        <li><NavLink to="/team" className={navLinkClassName}>Tim</NavLink></li>
        <li><NavLink to="/contact" className={navLinkClassName}>Kontak</NavLink></li>
      </ul>

      <div className="col-md-3 text-end site-actions">
        <Link to="/login" className="btn btn-outline-primary me-2 site-action-link">Masuk</Link>
        <Link to="/register" className="btn btn-primary site-action-link">Daftar</Link>
      </div>
    </header>
  </div>
    </>
  )
}