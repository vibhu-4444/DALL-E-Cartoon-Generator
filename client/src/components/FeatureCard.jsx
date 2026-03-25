import { motion } from 'framer-motion';
import { Radar, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { fadeUp } from '../animations/variants';
import { useReveal } from '../hooks/useReveal';
import { useTiltEffect } from '../hooks/useTiltEffect';

const iconMap = {
  Sparkles,
  Radar,
  Workflow,
  ShieldCheck,
};

function FeatureCard({ feature, index }) {
  const { ref, isVisible } = useReveal();
  const { tiltStyle, shineStyle, handleMouseMove, handleMouseLeave } = useTiltEffect({ intensity: 10 });
  const Icon = iconMap[feature.icon] || Sparkles;

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -10, scale: 1.015 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="group glass-panel gradient-ring min-h-[18rem] p-6 sm:p-7"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={shineStyle}
      />

      <div className="relative z-[1] flex h-full flex-col justify-between">
        <div className="space-y-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 via-cyan-400/20 to-emerald-400/20 text-sky-300 shadow-insetGlow">
            <Icon className="h-7 w-7" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">{feature.title}</h3>
            <p className="text-sm leading-7 text-muted">{feature.description}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted backdrop-blur-xl dark:bg-white/[0.04]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default FeatureCard;

