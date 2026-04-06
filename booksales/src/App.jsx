
function App() {


  return (
    <>
      {/* Header */}
      <div className="container">
  <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    <div className="col-md-3 mb-2 mb-md-0">
      <a href="/" className="d-inline-flex align-items-center link-body-emphasis text-decoration-none">
        <i className="fa-solid fa-book fa-2xl" style={{color: "rgb(116, 192, 252)",}}></i>
        <span className="fs-4 fw-bold ms-2">BookSales</span>
      </a>
    </div>

    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" className="nav-link px-2">Beranda</a></li>
        <li><a href="/" className="nav-link px-2">Buku</a></li>
        <li><a href="/" className="nav-link px-2">Tim</a></li>
        <li><a href="/" className="nav-link px-2">Kontak</a></li>
      </ul>

      <div className="col-md-3 text-end">
        <button type="button" className="btn btn-outline-primary me-2">Masuk</button>
        <button type="button" className="btn btn-primary">Daftar</button>
      </div>
    </header>
  </div>

  <div className="container my-5">
    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Atomic Habits: Perubahan Kecil yang Membawa Hasil Besar</h1>
        <p className="lead">Pelajari cara membangun kebiasaan baik dan menghilangkan kebiasaan buruk dengan panduan dari James Clear. Buku ini memberikan strategi efektif untuk mengubah hidup Anda setiap hari.</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Beli Sekarang</button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">Detail Buku</button>
        </div>
      </div>
      <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
        <img className="rounded-lg-3" src="https://picsum.photos/720/480" alt="Sampul Buku Atomic Habits" width="720" />
      </div>
    </div>
  </div>

  <section className="py-5 text-center container">
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h2 className="fw-light">Buku Terpopuler</h2>
        <p className="lead text-body-secondary">Temukan koleksi buku pilihan kami yang banyak dicari oleh pembaca. Tambahkan wawasan baru melalui literatur berkualitas.</p>
        <p>
          <a href="/" className="btn btn-primary my-2 mx-1">Lihat Semua</a>
          <a href="/" className="btn btn-secondary my-2 mx-1">Kategori Lain</a>
        </p>
      </div>
    </div>
  </section>

  <div className="album py-5 bg-body-tertiary">
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div className="col">
          <div className="card shadow-sm">
            <img src="https://picsum.photos/400/200" className="card-img-top" alt="Sampul Filosofi Teras" />
            <div className="card-body">
              <p className="card-text">Filosofi Teras mengajarkan ketenangan dalam menghadapi tantangan hidup menggunakan prinsip stoisisme kuno yang relevan untuk masa kini.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Detail</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Beli</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm">
            <img src="https://picsum.photos/400/190" className="card-img-top" alt="Sampul Sapiens" />
            <div className="card-body">
              <p className="card-text">Sapiens menelusuri sejarah umat manusia dari zaman batu hingga abad modern untuk memahami asal usul perilaku dan peradaban kita.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Detail</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Beli</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow-sm">
            <img src="https://picsum.photos/400/180" className="card-img-top" alt="Sampul Bumi Manusia" />
            <div className="card-body">
              <p className="card-text">Kisah perjuangan Minke di era kolonial Belanda yang menggugah semangat kebangsaan dan menceritakan kompleksitas kelas sosial.</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Detail</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Beli</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section className="py-5 container text-center">
    <h2 className="fw-light mb-4">Tim Kami</h2>
    <div className="row">
      <div className="col-lg-4 mb-4">
        <img src="https://picsum.photos/130/150" className="rounded-circle mb-3" alt="Foto Andi" width="140" height="140" />
        <h3 className="fw-normal">Andi Saputra</h3>
        <p>Spesialis Kurator Buku</p>
      </div>
      <div className="col-lg-4 mb-4">
        <img src="https://picsum.photos/110/150" className="rounded-circle mb-3" alt="Foto Siti" width="140" height="140" />
        <h3 className="fw-normal">Siti Aminah</h3>
        <p>Manajer Pemasaran</p>
      </div>
      <div className="col-lg-4 mb-4">
        <img src="https://picsum.photos/120/150" className="rounded-circle mb-3" alt="Foto Budi" width="140" height="140" />
        <h3 className="fw-normal">Budi Santoso</h3>
        <p>Layanan Pelanggan</p>
      </div>
    </div>
  </section>

  <section className="py-5 bg-body-tertiary">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="fw-light text-center mb-4">Hubungi Kami</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Nama Lengkap</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Alamat Email</label>
              <input type="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Pesan Anda</label>
              <textarea className="form-control" rows="4"></textarea>
            </div>
            <button type="button" className="btn btn-primary w-100">Kirim Pesan</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <div className="container">
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Beranda</a></li>
        <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Buku</a></li>
        <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Tim</a></li>
        <li className="nav-item"><a href="/" className="nav-link px-2 text-body-secondary">Kontak</a></li>
      </ul>
      <p className="text-center text-body-secondary">Hak Cipta 2026 Toko Buku</p>
    </footer>
  </div>
</>
  )
}
export default App
