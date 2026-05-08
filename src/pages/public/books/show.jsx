import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../../../_services/books";
import BookCover from "../../../components/book-cover";

function formatPrice(value) {
  if (value === null || value === undefined || value === "") return "-";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
}

export default function ShowBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getBook(id);
        if (mounted) setBook(data || null);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading book...</div>;
  if (!book) return <div className="text-center py-20 text-gray-500">Book not found.</div>;

  const avgRating = book.avg_rating || book.rating || 0;
  const reviewsCount = (book.reviews && book.reviews.length) || book.reviews_count || 0;

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <div className="h-96 w-full mb-4 flex items-center justify-center overflow-hidden bg-white">
              {book.cover_photo ? (
                <BookCover
                  path={book.cover_photo}
                  alt={book.title}
                  className="object-contain h-full"
                  fallbackClassName="h-full w-full flex items-center justify-center bg-gray-100"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-100">No image</div>
              )}
            </div>
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">{book.title}</h1>
            <p className="text-sm text-gray-500 mt-2">by {book.author?.name || book.author_name || "Unknown"}</p>

            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">{formatPrice(book.price)}</p>

              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < Math.round(avgRating) ? "text-yellow-300" : "text-gray-300"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .587l3.668 7.568L23.4 9.75l-5.6 5.356L19.335 24 12 19.897 4.665 24l1.535-8.894L0.6 9.75l7.732-1.595z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">({avgRating.toFixed(1)})</p>
                <button onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium leading-none text-gray-900 underline dark:text-white">{reviewsCount} Reviews</button>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border rounded-md overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(0, q - 1))} className="px-3 py-2">-</button>
                <div className="px-4 py-2 bg-gray-50">{qty}</div>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2">+</button>
              </div>

              <button onClick={() => alert('Added to cart: ' + qty)} className="bg-indigo-700 text-white px-4 py-2 rounded-md">+ Add</button>
              <button onClick={() => navigate('/checkout', { state: { book, qty } })} className="bg-green-600 text-white px-4 py-2 rounded-md">Buy / Checkout</button>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">{book.description || book.summary || 'No description.'}</p>

            <div id="reviews-section" className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reviews</h3>
              {reviewsCount === 0 ? (
                <p className="text-gray-500 mt-2">No reviews yet.</p>
              ) : (
                <ul className="mt-2 space-y-4">
                  {(book.reviews || []).map((r) => (
                    <li key={r.id} className="border rounded p-3 bg-white dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{r.user?.name || r.user_name || 'Anonymous'}</div>
                        <div className="text-sm text-gray-500">{new Date(r.created_at || r.createdAt || r.date || Date.now()).toLocaleDateString()}</div>
                      </div>
                      <div className="mt-2 text-gray-700 dark:text-gray-300">{r.comment || r.message || ''}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
