import { Clipboard } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-2">
          <Clipboard size={18} className="text-gray-700" />

          <span className="font-semibold text-gray-900">
            ClipShare
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Share text, files and images with a simple code.
        </p>

        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} ClipShare
        </p>
      </div>
    </footer>
  );
}

export default Footer;