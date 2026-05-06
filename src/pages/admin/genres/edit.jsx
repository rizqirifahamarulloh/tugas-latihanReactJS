import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenre, updateGenre } from "../../../_services/genres";

export default function GenreEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getGenre(id);
        setForm({ name: data?.name || "", description: data?.description || "" });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleChange = (e) => setForm((c) => ({ ...c, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      setSubmitting(true);
      await updateGenre(id, {
        name: form.name.trim(),
        description: form.description.trim(),
      });
      navigate("/admin/genres");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to update genre");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <section className="bg-gray-50 p-3 sm:p-5 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Edit Genre</h2>
        {error && <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Genre name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Genre description"
            />
          </div>

          <div className="flex gap-3">
            <button disabled={submitting} className="rounded-lg bg-indigo-700 px-4 py-2 text-white">
              {submitting ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => navigate("/admin/genres")} className="rounded-lg border px-4 py-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
