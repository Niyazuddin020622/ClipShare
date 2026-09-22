import { Link, NavLink } from "react-router-dom";
import { Clipboard, Send, Download } from "lucide-react";

function Navbar() {
  const navClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-gray-900 text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-white">
            <Clipboard size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            ClipShare
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink to="/send" className={navClass}>
            <Send size={16} />
            <span className="hidden sm:inline">Send</span>
          </NavLink>

          <NavLink to="/retrieve" className={navClass}>
            <Download size={16} />
            <span className="hidden sm:inline">Retrieve</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;