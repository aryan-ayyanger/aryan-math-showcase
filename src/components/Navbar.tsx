import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Articles', to: '/articles' },
  { label: 'About Me', to: '/about' },
];

const countApiHosts = ['https://api.countapi.xyz', 'https://countapi.xyz'];

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const countedVisitKey = 'aa_global_visit_counted';
    const namespace = 'aryan-ayyanger-math-showcase';
    const key = 'site-views';
    let isMounted = true;

    const requestCountApi = async (mode: 'get' | 'hit'): Promise<number> => {
      const directUrls = countApiHosts.map((host) => `${host}/${mode}/${namespace}/${key}`);
      const proxyUrls = countApiHosts.map(
        (host) => `https://api.allorigins.win/raw?url=${encodeURIComponent(`${host}/${mode}/${namespace}/${key}`)}`
      );
      const urlsToTry = [...directUrls, ...proxyUrls];

      for (const url of urlsToTry) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            continue;
          }

          const payload = await response.text();
          const data = JSON.parse(payload) as { value?: number };
          if (typeof data.value === 'number') {
            return data.value;
          }
        } catch {
          continue;
        }
      }

      throw new Error('CountAPI unavailable');
    };

    const syncGlobalViews = async (): Promise<void> => {
      try {
        const hasCountedVisit = sessionStorage.getItem(countedVisitKey) === 'true';
        const value = await requestCountApi(hasCountedVisit ? 'get' : 'hit');

        if (isMounted) {
          setViewCount(value);
        }

        if (!hasCountedVisit) {
          sessionStorage.setItem(countedVisitKey, 'true');
        }
      } catch {
        if (isMounted) {
          setViewCount(null);
        }
      }
    };

    void syncGlobalViews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AA
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors text-sm font-medium ${
                  location.pathname === link.to
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {viewCount !== null && <span className="text-xs text-slate-500">Views: {viewCount}</span>}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-slate-200"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block py-2 transition-colors ${
                  location.pathname === link.to
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {viewCount !== null && <div className="pt-2 text-xs text-slate-500">Views: {viewCount}</div>}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
