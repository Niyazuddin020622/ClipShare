import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-128px)] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-gray-200">404</p>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Page not found
        </h1>

        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white"
        >
          <ArrowLeft size={17} />
          Back Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;