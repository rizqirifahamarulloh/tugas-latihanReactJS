import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../../_services/books";
import BookCover from "../../../components/book-cover";

function formatPrice(value) {
  if (value === null || value === undefined || value === "") return "-";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
}

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getBooks();
        if (mounted) setBooks(data || []);
      } catch (err) {
        console.error("Failed to load books:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {loading ? (
            <div className="text-center py-20">Loading books...</div>
          ) : books.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No books found.</div>
          ) : (
            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((b) => (
                <div key={b.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="h-56 w-full mb-4 flex items-center justify-center overflow-hidden">
                    {b.cover_photo ? (
                      <BookCover
                        path={b.cover_photo}
                        alt={b.title}
                        className="object-contain h-full"
                        fallbackClassName="h-full w-full flex items-center justify-center bg-gray-100"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-100">No image</div>
                    )}
                  </div>
                  <div className="pt-6">
                    <Link to={`/books/${b.id}`} className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                      {b.title}
                    </Link>

                    <ul className="mt-2 flex items-center gap-4">
                      <li className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
                      </li>

                      <li className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                      </li>
                    </ul>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                        {formatPrice(b.price)}
                      </p>

                      <Link to={`/books/${b.id}`} className="inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4  focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
