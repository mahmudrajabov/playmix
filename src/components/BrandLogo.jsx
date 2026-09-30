import { Link } from "react-router-dom";

export default function BrandLogo({ showName = true }) {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Mahmud Rajabov — home">
      <img
        src="/m-cat-emblem.svg"
        alt="M cat emblem"
        className="w-7 h-7 md:w-8 md:h-8 object-contain"
      />
      {showName && (
        <span className="font-display font-bold text-xl tracking-tight">
          Mahmud <span className="text-gradient">Rajabov</span>
        </span>
      )}
    </Link>
  );
}