export default function Book() {
    return (
<>
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
</>
    )
}