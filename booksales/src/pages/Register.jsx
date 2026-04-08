import { useState } from 'react'

function Register() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('Registrasi berhasil (simulasi).')
    event.currentTarget.reset()
  }

  return (
    <section className="page-section auth-wrapper">
      <h2 className="page-title">Register</h2>
      <p className="page-subtitle">Buat akun baru untuk mulai menggunakan BookSales.</p>

      <form className="book-form auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nama lengkap" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Daftar</button>
      </form>

      {status ? <p className="info-message">{status}</p> : null}
    </section>
  )
}

export default Register
