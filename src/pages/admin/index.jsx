import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <section className="bg-gray-50 p-3 sm:p-5 dark:bg-gray-900">
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-semibold">Authors</h3>
                        <p className="text-sm text-gray-600 mt-2">Manage book authors.</p>
                        <div className="mt-4 flex gap-2">
                            <Link to="authors" className="rounded bg-indigo-600 px-3 py-1 text-sm text-white">View</Link>
                            <Link to="authors/create" className="rounded border px-3 py-1 text-sm">Create</Link>
                        </div>
                    </div>

                    <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-semibold">Genres</h3>
                        <p className="text-sm text-gray-600 mt-2">Manage book genres.</p>
                        <div className="mt-4 flex gap-2">
                            <Link to="genres" className="rounded bg-indigo-600 px-3 py-1 text-sm text-white">View</Link>
                            <Link to="genres/create" className="rounded border px-3 py-1 text-sm">Create</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}