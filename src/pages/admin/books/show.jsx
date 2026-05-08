import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getBook } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import BookCover from "../../../components/book-cover";

export default function AdminBookShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookData, genresData, authorsData] = await Promise.all([
          getBook(id),
          getGenres(),
          getAuthors(),
        ]);

        setBook(bookData);
        setGenres(genresData);
        setAuthors(authorsData);
      } catch (err) {
        console.error("Failed to fetch book details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getGenreName = (id) => {
    const genre = genres.find((g) => String(g.id) === String(id));
    return genre ? genre.name : "Unknown Genre";
  };

  const getAuthorName = (book) => {
    if (!book) return "Unknown Author";

    if (typeof book.author === "string" && book.author.trim()) {
      return book.author;
    }

    if (book.author?.name) {
      return book.author.name;
    }

    if (book.author_name) {
      return book.author_name;
    }

    const author = authors.find(
      (item) => String(item.id) === String(book.author_id) || item.name === book.author_id
    );

    return author ? author.name : book.author_id || "Unknown Author";
  };

  if (isLoading) {
    return (
      <section className="p-6">
        <div className="text-gray-600">Loading book...</div>
      </section>
    );
  }

  if (!book) {
    return (
      <section className="p-6">
        <div className="text-red-600">Book not found.</div>
        <button onClick={() => navigate(-1)} className="mt-4 px-3 py-2 bg-gray-200 rounded">Go back</button>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            {book.cover_photo ? (
              <BookCover
                path={book.cover_photo}
                alt={book.title}
                className="w-full h-auto rounded-md object-cover"
                fallbackClassName="w-full h-56 bg-gray-100 rounded-md flex items-center justify-center text-gray-400"
              />
              ) : (
              <div className="w-full h-56 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{book.title}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{getAuthorName(book)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Genre: {getGenreName(book.genre_id)}</p>

            <div className="mt-4 text-gray-700 dark:text-gray-200">
              {book.description || <em className="text-gray-400">No description provided.</em>}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-gray-500">Stock</div>
                <div className="text-base font-medium text-gray-900 dark:text-white">{book.stock}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Price</div>
                <div className="text-base font-medium text-gray-900 dark:text-white">{
                  (function formatPrice(value) {
                    if (value === null || value === undefined || value === "") return "-";
                    const num = Number(value);
                    if (Number.isNaN(num)) return String(value);
                    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
                  })(book.price)
                }</div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Link to="/admin/books" className="px-4 py-2 bg-gray-200 rounded text-sm">Back</Link>
              <button onClick={() => navigate(`/admin/books/${id}/edit`)} className="px-4 py-2 bg-indigo-600 text-white rounded text-sm">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
