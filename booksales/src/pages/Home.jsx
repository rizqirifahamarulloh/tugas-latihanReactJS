function Home({ books, onExploreBooks }) {
  const featuredBooks = books.slice(0, 3)

  return (
    <section className="page-section">
      <section className="landing-hero glass-panel">
        <div className="hero-copy">
          <p className="hero-badge">Landing Page</p>
          <h2 className="hero-title">Temukan Buku Favoritmu di BookSales</h2>
          <p className="hero-subtitle">
            Jelajahi koleksi buku berkualitas, tambahkan buku baru, dan kelola katalog
            secara praktis dalam satu tampilan yang elegan.
          </p>
          <button type="button" className="hero-cta" onClick={onExploreBooks}>
            Jelajahi Halaman Book
          </button>
        </div>
        <div className="hero-stats">
          <article>
            <h3>{books.length}</h3>
            <p>Total Koleksi</p>
          </article>
          <article>
            <h3>6</h3>
            <p>Menu Navigasi</p>
          </article>
          <article>
            <h3>100%</h3>
            <p>Responsive</p>
          </article>
        </div>
      </section>

      <h2 className="page-title">Home</h2>
      <p className="page-subtitle">Daftar buku unggulan dari koleksi terbaru.</p>

      <div className="book-grid">
        {featuredBooks.map((book) => (
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

export default Home
