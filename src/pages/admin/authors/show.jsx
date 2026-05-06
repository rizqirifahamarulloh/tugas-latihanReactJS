import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAuthor, deleteAuthor } from "../../../_services/authors";

export default function AuthorShow() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getAuthor(id);
        setAuthor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!author) return <div>Author not found.</div>;

  return (
    <section className="bg-gray-50 p-3 sm:p-5 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Author: {author.name}</h2>
          <div className="flex items-center gap-3">
            <Link to="/admin/authors" className="text-sm text-indigo-600 hover:underline">Back</Link>
            <Link to={`/admin/authors/${author.id}/edit`} className="text-sm text-green-600 hover:underline">Edit</Link>
            <button
              onClick={async () => {
                if (!window.confirm('Hapus author ini dari database?')) return;
                try {
                  await deleteAuthor(author.id);
                  window.location.href = '/admin/authors';
                } catch (err) {
                  console.error(err);
                  alert('Gagal menghapus author');
                }
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          <p><strong>ID:</strong> {author.id}</p>
          <p className="mt-2"><strong>Name:</strong> {author.name}</p>
          <p className="mt-2"><strong>Created at:</strong> {author.created_at || '-'}</p>
        </div>
      </div>
    </section>
  );
}
