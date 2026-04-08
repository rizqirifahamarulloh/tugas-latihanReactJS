import { useState } from 'react'
import booksData from './Utils/books'
import Home from './pages/Home'
import Book from './pages/Book'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [books, setBooks] = useState(booksData)

  const navItems = ['home', 'book', 'tim', 'contact', 'login', 'register']

  const renderPage = () => {
    if (activePage === 'home') {
      return <Home books={books} onExploreBooks={() => setActivePage('book')} />
    }

    if (activePage === 'book') {
      return <Book books={books} setBooks={setBooks} />
    }

    if (activePage === 'tim') {
      return <Team />
    }

    if (activePage === 'contact') {
      return <Contact />
    }

    if (activePage === 'login') {
      return <Login />
    }

    return <Register />
  }

  return (
    <main className="app-container">
      <header className="app-header glass-panel">
        <h1>BookSales</h1>
        <p>Platform katalog buku modern untuk membaca, berbagi, dan bertumbuh.</p>
      </header>

      <nav className="nav-tabs glass-panel" aria-label="Halaman">
        {navItems.map((item) => (
          <button
            key={item}
            type="button"
            className={activePage === item ? 'active' : ''}
            onClick={() => setActivePage(item)}
          >
            {item === 'tim' ? 'Tim' : item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>

      {renderPage()}

      <footer className="app-footer glass-panel">
        <p>BookSales © 2026. Crafted with React JS.</p>
        <p>Total Buku Saat Ini: {books.length}</p>
      </footer>
    </main>
  )
}

export default App
