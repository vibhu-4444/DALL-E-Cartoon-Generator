import { motion } from 'framer-motion';
import { useMouseGlow } from '../hooks/useMouseGlow';

function CursorGlow() {
  const { x, y } = useMouseGlow();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[6] hidden h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,_rgba(125,211,252,0.24),_rgba(52,211,153,0.14)_32%,_transparent_70%)] blur-3xl lg:block dark:bg-[radial-gradient(circle,_rgba(14,165,233,0.28),_rgba(52,211,153,0.18)_32%,_transparent_70%)]"
      style={{ x, y }}
    />
  );
}

export default CursorGlow;

