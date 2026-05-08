import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../_services/books";
import BookCover from "./book-cover";

function formatPrice(value) {
  if (value === null || value === undefined || value === "") return "-";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
}

export default function Hero() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getBooks();
        if (mounted) setBooks(data || []);
      } catch (err) {
        console.error("Failed to load books for hero:", err);
      }
    })();
    return () => (mounted = false);
  }, []);

  const items = books.slice(0, 4);

  return (
    <>
      <section className="w-full bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto w-full lg:py-16 lg:px-12">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Buku Terlaris</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Buku pilihan dari database saat ini</p>
              </div>
              <Link to="/books" className="text-sm text-indigo-600 hover:underline">Lihat semua</Link>
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4">
              {items.length === 0 ? (
                <div className="text-center text-gray-500">No books found.</div>
              ) : (
                items.map((b) => (
                  <div key={b.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="h-48 w-full mb-4 flex items-center justify-center overflow-hidden">
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{b.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate">{b.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{formatPrice(b.price)}</div>
                      <Link to={`/books/${b.id}`} className="rounded-lg bg-indigo-700 px-3 py-1 text-sm text-white">Detail</Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
