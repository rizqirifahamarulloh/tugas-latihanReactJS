const teamMembers = [
  {
    id: 1,
    name: 'Alya Prameswari',
    role: 'Project Manager',
    bio: 'Memastikan semua fitur berjalan tepat waktu dengan fokus kualitas produk.',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    name: 'Raka Aditya',
    role: 'Frontend Engineer',
    bio: 'Membangun antarmuka yang cepat, responsif, dan nyaman digunakan.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    name: 'Nadia Putri',
    role: 'UI/UX Designer',
    bio: 'Merancang pengalaman visual yang estetis dan berorientasi pengguna.',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
  },
]

function Team() {
  return (
    <section className="page-section">
      <h2 className="page-title">Tim</h2>
      <p className="page-subtitle">Orang-orang di balik pengembangan BookSales.</p>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <article className="team-card" key={member.id}>
            <img src={member.avatar} alt={member.name} className="team-avatar" />
            <h3>{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <p>{member.bio}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Team
