import { useState } from 'react'

function Login() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('Login berhasil (simulasi).')
    event.currentTarget.reset()
  }

  return (
    <section className="page-section auth-wrapper">
      <h2 className="page-title">Login</h2>
      <p className="page-subtitle">Masuk ke akun Anda untuk mengelola katalog buku.</p>

      <form className="book-form auth-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Masuk</button>
      </form>

      {status ? <p className="info-message">{status}</p> : null}
    </section>
  )
}

export default Login
