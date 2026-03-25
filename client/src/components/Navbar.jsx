import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar({ links, theme, mounted, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (href) => (event) => {
    event.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="section-shell rounded-full border border-white/10 bg-white/10 px-4 py-3 shadow-premium backdrop-blur-xl dark:bg-white/[0.04]"
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#hero" onClick={handleNavigate('#hero')} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(37,99,235,0.95),rgba(8,145,178,0.95))] text-lg font-bold text-white shadow-halo">
              L
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted">Lumina</p>
              <p className="text-sm text-ink/80">Signal orchestration studio</p>
            </div>
          </a>

          <div className="hidden items-center gap-2 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavigate(link.href)}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-muted transition duration-300 hover:text-ink"
              >
                <span>{link.label}</span>
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(37,99,235,0.95),rgba(16,185,129,0.95))] transition duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} mounted={mounted} toggleTheme={toggleTheme} />
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-ink backdrop-blur-xl transition duration-300 hover:bg-white/20 lg:hidden dark:bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-4 space-y-2 rounded-[28px] border border-white/10 bg-white/10 p-3 backdrop-blur-xl dark:bg-white/5">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavigate(link.href)}
                    className={joinClasses(
                      'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-muted transition duration-300',
                      'hover:bg-white/10 hover:text-ink',
                    )}
                  >
                    <span>{link.label}</span>
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-400" />
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

export default Navbar;
