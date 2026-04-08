import { useState } from 'react'

function Book({ books, setBooks }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    description: '',
    image: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newBook = {
      id: books.length ? Math.max(...books.map((book) => book.id)) + 1 : 1,
      title: formData.title,
      author: formData.author,
      year: Number(formData.year),
      description: formData.description,
      image: formData.image,
    }

    setBooks((prevBooks) => [...prevBooks, newBook])

    setFormData({
      title: '',
      author: '',
      year: '',
      description: '',
      image: '',
    })
  }

  return (
    <section className="page-section">
      <h2 className="page-title">Book</h2>
      <p className="page-subtitle">Tambah buku baru dan lihat daftar buku terbaru.</p>

      <form className="book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Judul buku"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Penulis"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Tahun"
          value={formData.year}
          onChange={handleChange}
          min="1000"
          max="9999"
          required
        />
        <input
          type="url"
          name="image"
          placeholder="URL gambar"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi buku"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          required
        />
        <button type="submit">Tambah Buku</button>
      </form>

      <div className="book-grid">
        {books.map((book) => (
          <article className="book-card" key={book.id}>
            <img className="book-image" src={book.image} alt={book.title} />
            <div className="book-content">
              <h3>{book.title}</h3>
              <p className="meta">
                {book.author} • {book.year}
              </p>
              <p>{book.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Book
