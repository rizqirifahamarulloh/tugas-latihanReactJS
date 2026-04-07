import { NavLink } from "react-router";

export default function Footer() {
    const footerLinkClassName = ({ isActive }) =>
        `nav-link px-2 text-body-secondary footer-nav__link${isActive ? " active" : ""}`

    return (
<>
<div className="container">
    <footer className="site-footer py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><NavLink to="/" end className={footerLinkClassName}>Beranda</NavLink></li>
        <li className="nav-item"><NavLink to="/books" className={footerLinkClassName}>Buku</NavLink></li>
        <li className="nav-item"><NavLink to="/team" className={footerLinkClassName}>Tim</NavLink></li>
        <li className="nav-item"><NavLink to="/contact" className={footerLinkClassName}>Kontak</NavLink></li>
      </ul>
      <p className="text-center text-body-secondary">Hak Cipta 2026 Toko Buku</p>
    </footer>
  </div>
</>
    )
}