import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthor } from "../../../_services/authors";

const initial = { name: "" };

export default function AuthorCreate() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      await createAuthor({ name: form.name.trim() });
      navigate("/admin/authors");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create author");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 p-3 sm:p-5 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Create Author</h2>
        {error && <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              placeholder="Author name"
            />
          </div>

          <div className="flex gap-3">
            <button disabled={submitting} className="rounded-lg bg-indigo-700 px-4 py-2 text-white">
              {submitting ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => navigate("/admin/authors")} className="rounded-lg border px-4 py-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
