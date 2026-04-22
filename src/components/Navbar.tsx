import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: "ph:house" },
  { to: "/find", label: "Find Eateries", icon: "ph:map-pin-simple" },
  { to: "/recipes", label: "Recipe Chat", icon: "ph:chat-circle-dots" },
  { to: "/explore", label: "Explore", icon: "ph:compass" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <Icon icon="ph:fire-simple" className="text-primary" width={20} />
          Eat Me
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-all ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon icon={link.icon} width={15} />
              {link.label}
            </Link>
          ))}
          <Link
            to="/find"
            className="ml-2 inline-flex items-center gap-1.5 h-9 px-4 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Icon icon="ph:crosshair" width={15} />
            Find near me
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-card text-foreground"
          aria-label="Toggle menu"
        >
          <Icon icon={open ? "ph:x" : "ph:list"} width={18} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                location.pathname === link.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
            >
              <Icon icon={link.icon} width={17} />
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
