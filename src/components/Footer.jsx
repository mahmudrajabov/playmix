import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
          aria-label="Mahmud Rajabov — home"
        >
          <img src="/m-cat-emblem.svg" alt="" className="w-6 h-6 object-contain" />
          <span className="text-sm">© {new Date().getFullYear()} Mahmud Rajabov</span>
        </Link>
      </div>
    </footer>
  );
}