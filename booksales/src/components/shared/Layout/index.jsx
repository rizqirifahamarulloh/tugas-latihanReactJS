import { Outlet } from "react-router"
import Footer from "../Footer"
import Header from "../Header"

export default function SiteLayout() {
  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}