import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthors, deleteAuthor } from "../../../_services/authors";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getAuthors();
        setAuthors(data || []);
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Authors</h2>
          <Link
            to="create"
            className="rounded-lg bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800"
          >
            Create Author
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
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {authors.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-3 py-4 text-sm text-gray-500">
                      No authors found.
                    </td>
                  </tr>
                ) : (
                  authors.map((a, idx) => (
                    <tr key={a.id} className="border-b last:border-b-0">
                      <td className="px-3 py-2 align-top">{idx + 1}</td>
                      <td className="px-3 py-2 align-top">{a.name}</td>
                      <td className="px-3 py-2 align-top">
                        <div className="flex items-center gap-2">
                          <a href={`/admin/authors/${a.id}`} className="text-xs text-indigo-600 hover:underline">View</a>
                          <a href={`/admin/authors/${a.id}/edit`} className="text-xs text-green-600 hover:underline">Edit</a>
                          <button
                            onClick={async () => {
                              const ok = window.confirm('Hapus author ini dari database?');
                              if (!ok) return;
                              try {
                                await deleteAuthor(a.id);
                                setAuthors((cur) => cur.filter((it) => it.id !== a.id));
                              } catch (err) {
                                console.error(err);
                                alert('Gagal menghapus author');
                              }
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
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
