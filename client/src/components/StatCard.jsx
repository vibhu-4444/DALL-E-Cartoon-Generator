import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';
import { useReveal } from '../hooks/useReveal';

function formatValue(value, decimals, suffix) {
  return `${value.toFixed(decimals)}${suffix}`;
}

function StatCard({ stat, index }) {
  const { ref, isVisible } = useReveal({ threshold: 0.35 });
  const animatedValue = useAnimatedCounter(stat.value, isVisible, stat.decimals);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ delay: index * 0.08 }}
      className="glass-panel gradient-ring p-6 text-left"
    >
      <p className="text-sm uppercase tracking-[0.28em] text-muted">{stat.label}</p>
      <p className="mt-5 text-4xl font-semibold sm:text-5xl">
        {formatValue(animatedValue, stat.decimals, stat.suffix)}
      </p>
    </motion.div>
  );
}

export default StatCard;

