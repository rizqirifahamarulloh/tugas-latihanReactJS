import { useState } from 'react'

function Contact() {
  const [messageSent, setMessageSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessageSent(true)
    event.currentTarget.reset()
  }

  return (
    <section className="page-section">
      <h2 className="page-title">Contact</h2>
      <p className="page-subtitle">Hubungi tim kami untuk kolaborasi atau pertanyaan.</p>

      <form className="book-form contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nama lengkap" required />
        <input type="email" name="email" placeholder="Email aktif" required />
        <textarea name="message" rows="4" placeholder="Tulis pesan Anda" required />
        <button type="submit">Kirim Pesan</button>
      </form>

      {messageSent ? <p className="info-message">Pesan berhasil dikirim. Terima kasih.</p> : null}
    </section>
  )
}

export default Contact
