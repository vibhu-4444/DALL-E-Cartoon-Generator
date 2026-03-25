import { useEffect, useState } from 'react';

export function useAnimatedCounter(target, isActive, decimals = 0, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    let frameId;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = target * eased;

      setValue(Number(nextValue.toFixed(decimals)));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [decimals, duration, isActive, target]);

  return value;
}

