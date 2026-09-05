import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Articles', to: '/articles' },
  { label: 'About', to: '/about' },
];

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-primary)] border-b-[3px] border-[var(--color-accent)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="group flex items-center justify-center w-14 h-14 rounded-md border border-white/25 hover:border-white/40 transition-colors"
            aria-label="Home"
          >
            <svg
              width="38"
              height="38"
              viewBox="1 5 18 18"
              fill="none"
              className="text-white group-hover:text-[var(--color-accent-soft)] transition-colors"
            >
              <path
                d="M3 21h5v-5h5v-5h5v-5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10.5" cy="18.5" r="1.3" fill="var(--color-accent-soft)" />
              <circle cx="15.5" cy="13.5" r="1.3" fill="var(--color-accent-soft)" />
            </svg>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm transition-colors ${
                    isActive
                      ? 'text-[var(--color-accent-soft)] font-semibold'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-3 border-t border-white/15">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-sm ${
                    isActive ? 'text-[var(--color-accent-soft)] font-semibold' : 'text-white/75'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

