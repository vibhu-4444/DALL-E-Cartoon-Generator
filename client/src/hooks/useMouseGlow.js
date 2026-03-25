import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const springConfig = {
  stiffness: 90,
  damping: 20,
  mass: 0.5,
};

export function useMouseGlow() {
  const rawX = useMotionValue(-180);
  const rawY = useMotionValue(-180);

  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    const handlePointerMove = (event) => {
      rawX.set(event.clientX - 180);
      rawY.set(event.clientY - 180);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [rawX, rawY]);

  return { x, y };
}

