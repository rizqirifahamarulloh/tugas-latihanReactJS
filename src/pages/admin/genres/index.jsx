import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../../_services/genres";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getGenres();
        setGenres(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="bg-gray-50 p-3 sm:p-5 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Genres</h2>
          <Link
            to="create"
            className="rounded-lg bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800"
          >
            Create Genre
          </Link>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {genres.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-3 py-4 text-sm text-gray-500">
                      No genres found.
                    </td>
                  </tr>
                ) : (
                  genres.map((g, idx) => (
                    <tr key={g.id} className="border-b last:border-b-0">
                      <td className="px-3 py-2 align-top">{idx + 1}</td>
                      <td className="px-3 py-2 align-top">{g.name}</td>
                      <td className="px-3 py-2 align-top text-sm text-gray-600">{g.description || '-'}</td>
                      <td className="px-3 py-2 align-top">
                        <a href={`/admin/genres/${g.id}`} className="text-xs text-indigo-600 hover:underline">View</a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
