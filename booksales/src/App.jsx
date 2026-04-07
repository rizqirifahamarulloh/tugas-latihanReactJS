import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import Home from "./Pages"
import Books from "./Pages/books"
import Team from "./Pages/team"
import Contact from "./Pages/contact"
import Login from "./Pages/auth/login"
import Register from "./Pages/auth/register"
import SiteLayout from "./components/shared/Layout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
