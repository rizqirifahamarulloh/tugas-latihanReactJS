import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/public/index.jsx"
import PublicLayout from "./layouts/public.jsx"
import Books from "./pages/public/books/index.jsx"
import Login from "./pages/auth/login.jsx"
import Register from "./pages/auth/register.jsx"
import AdminLayout from "./layouts/admin.jsx"
import Dashboard from "./pages/admin/index.jsx"
import AdminBooks from "./pages/admin/books/index.jsx"
import BookCreate from "./pages/admin/books/create.jsx"
import BookEdit from "./pages/admin/books/edit.jsx"
import BookShow from "./pages/admin/books/show.jsx"
import AdminAuthors from "./pages/admin/authors/index.jsx"
import AuthorCreate from "./pages/admin/authors/create.jsx"
import AuthorShow from "./pages/admin/authors/show.jsx"
import AdminGenres from "./pages/admin/genres/index.jsx"
import GenreCreate from "./pages/admin/genres/create.jsx"
import GenreShow from "./pages/admin/genres/show.jsx"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />
          </Route>

          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="books">
              <Route index element={<AdminBooks />} />
              <Route path="create" element={<BookCreate />} />
              <Route path=":id" element={<BookShow />} />
              <Route path=":id/edit" element={<BookEdit />} />
            </Route>

            <Route path="authors">
              <Route index element={<AdminAuthors />} />
              <Route path="create" element={<AuthorCreate />} />
              <Route path=":id" element={<AuthorShow />} />
            </Route>

            <Route path="genres">
              <Route index element={<AdminGenres />} />
              <Route path="create" element={<GenreCreate />} />
              <Route path=":id" element={<GenreShow />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
