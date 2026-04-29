import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGenre } from "../../../_services/genres";

export default function GenreShow() {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getGenre(id);
        setGenre(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!genre) return <div>Genre not found.</div>;

  return (
    <section className="bg-gray-50 p-3 sm:p-5 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Genre: {genre.name}</h2>
          <Link to="/admin/genres" className="text-sm text-indigo-600 hover:underline">Back</Link>
        </div>

        <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          <p><strong>ID:</strong> {genre.id}</p>
          <p className="mt-2"><strong>Description:</strong> {genre.description || '-'}</p>
          <p className="mt-2"><strong>Created at:</strong> {genre.created_at || '-'}</p>
        </div>
      </div>
    </section>
  );
}
