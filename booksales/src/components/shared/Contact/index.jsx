export default function Contact() {
    return (
<>
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
</>
    )
}