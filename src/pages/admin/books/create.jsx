import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createBook } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { prepareImageFile } from "../../../_services/image";

const initialFormData = {
  title: "",
  description: "",
  price: "",
  stock: "",
  image: null,
  cover_path: "",
  genre_id: "",
  author_id: "",
};

export default function BookCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setIsLoadingOptions(true);
        const [genresData, authorsData] = await Promise.all([getGenres(), getAuthors()]);
        setGenres(genresData);
        setAuthors(authorsData);
      } catch (error) {
        console.error("Failed to load options:", error);
        setErrorMessage("Failed to load genres or authors");
      } finally {
        setIsLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "file" ? files?.[0] ?? null : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Validate all required fields
    if (!formData.title?.trim()) {
      setErrorMessage("Title is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.description?.trim()) {
      setErrorMessage("Description is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setErrorMessage("Price must be greater than 0");
      setIsSubmitting(false);
      return;
    }
    if (!formData.stock || parseInt(formData.stock, 10) < 0) {
      setErrorMessage("Stock must be a valid number");
      setIsSubmitting(false);
      return;
    }
    if (!formData.genre_id) {
      setErrorMessage("Genre is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.author_id) {
      setErrorMessage("Author is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.image && !formData.cover_path?.trim()) {
      setErrorMessage("Image file atau cover path wajib diisi");
      setIsSubmitting(false);
      return;
    }

    try {
      const imageFile = formData.image ? await prepareImageFile(formData.image) : null;

      if (formData.image && !imageFile) {
        setErrorMessage("Image file is invalid or too large");
        setIsSubmitting(false);
        return;
      }

      const payload = new FormData();
      payload.append("title", formData.title.trim());
      payload.append("description", formData.description.trim());
      payload.append("price", parseFloat(formData.price));
      payload.append("stock", parseInt(formData.stock, 10));
      payload.append("genre_id", formData.genre_id);
      payload.append("author_id", formData.author_id);
      if (imageFile) {
        payload.append("cover_photo", imageFile);
      } else {
        payload.append("cover_photo", formData.cover_path.trim().replace(/\\/g, "/"));
      }

      // Log payload contents
      console.log("FormData contents:");
      console.log("  title:", formData.title);
      console.log("  description:", formData.description);
      console.log("  price:", parseFloat(formData.price));
      console.log("  stock:", parseInt(formData.stock, 10));
      console.log("  genre_id:", formData.genre_id);
      console.log("  author_id:", formData.author_id);
      console.log("  image:", imageFile?.name, "size:", imageFile?.size);
      console.log("  cover_path:", formData.cover_path);

      await createBook(payload);
      navigate("/admin/books");
    } catch (error) {
      console.error("Failed to create book:", error);
      console.error("Error response:", error?.response?.data);
      console.error("Error response status:", error?.response?.status);
      
      let apiMessage = "";
      const responseData = error?.response?.data;
      
      if (responseData?.message) {
        apiMessage = responseData.message;
      } else if (responseData?.error) {
        apiMessage = responseData.error;
      } else if (responseData?.errors) {
        // Handle Laravel validation errors object
        if (typeof responseData.errors === 'object') {
          apiMessage = Object.entries(responseData.errors)
            .map(([field, errors]) => {
              const msgs = Array.isArray(errors) ? errors : [errors];
              return `${field}: ${msgs.join(", ")}`;
            })
            .join(" | ");
        }
      }
      
      setErrorMessage(apiMessage || "Gagal menyimpan product. Cek semua data yang diperlukan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 p-3 sm:p-5 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Add Product</h2>
        {errorMessage ? (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {errorMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Book title"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Book description"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="0"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Upload PNG, JPG, JPEG, atau WEBP. Atau isi path cover di bawah.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="cover_path">
              Cover Path (opsional)
            </label>
            <input
              id="cover_path"
              name="cover_path"
              type="text"
              value={formData.cover_path}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="contoh: ui/ux.jpg atau covers/ui/ux.jpg"
            />
            <p className="mt-1 text-xs text-gray-500">Gunakan jika file sudah tersedia di backend/public/covers.</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="genre_id">
              Genre
            </label>
            <div className="flex items-center gap-2">
              <select
              id="genre_id"
              name="genre_id"
              value={formData.genre_id}
              onChange={handleChange}
              disabled={isLoadingOptions}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-200 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-600"
              required
            >
              <option value="">{isLoadingOptions ? "Loading..." : "Select genre"}</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
              <div className="flex flex-col gap-1">
                <Link to="/admin/genres" className="text-xs text-indigo-600 hover:underline">Manage</Link>
                <Link to="/admin/genres/create" className="text-xs text-gray-600 hover:underline">Add</Link>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white" htmlFor="author_id">
              Author
            </label>
            <div className="flex items-center gap-2">
              <select
              id="author_id"
              name="author_id"
              value={formData.author_id}
              onChange={handleChange}
              disabled={isLoadingOptions}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-200 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-600"
              required
            >
              <option value="">{isLoadingOptions ? "Loading..." : "Select author"}</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
              <div className="flex flex-col gap-1">
                <Link to="/admin/authors" className="text-xs text-indigo-600 hover:underline">Manage</Link>
                <Link to="/admin/authors/create" className="text-xs text-gray-600 hover:underline">Add</Link>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : "Save Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/books")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
