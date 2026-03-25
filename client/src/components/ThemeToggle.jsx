import { MoonStar, SunMedium } from 'lucide-react';
import { motion } from 'framer-motion';

function ThemeToggle({ theme, mounted, toggleTheme }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={toggleTheme}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-ink shadow-halo backdrop-blur-xl transition duration-300 hover:bg-white/20 dark:bg-white/5"
      aria-label="Toggle theme"
    >
      {mounted && theme === 'dark' ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
    </motion.button>
  );
}

export default ThemeToggle;

