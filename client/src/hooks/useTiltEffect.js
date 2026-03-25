import { useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

const springConfig = {
  stiffness: 180,
  damping: 18,
  mass: 0.6,
};

export function useTiltEffect({ intensity = 14 } = {}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const rotateXRaw = useTransform(pointerY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateYRaw = useTransform(pointerX, [-0.5, 0.5], [-intensity, intensity]);

  const rotateX = useSpring(rotateXRaw, springConfig);
  const rotateY = useSpring(rotateYRaw, springConfig);

  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.18), transparent 42%)`;

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    pointerX.set(x - 0.5);
    pointerY.set(y - 0.5);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return {
    tiltStyle: {
      rotateX,
      rotateY,
      transformPerspective: 1200,
      transformStyle: 'preserve-3d',
    },
    shineStyle: {
      backgroundImage: spotlight,
    },
    handleMouseMove,
    handleMouseLeave,
  };
}

