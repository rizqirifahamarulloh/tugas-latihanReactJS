export default function Team() {
    return (
<>
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
</>
    )
}