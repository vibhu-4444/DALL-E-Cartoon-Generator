import { motion } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import { fadeUp } from '../animations/variants';
import { useReveal } from '../hooks/useReveal';
import { useTiltEffect } from '../hooks/useTiltEffect';

function InteractivePanel({ item, index }) {
  const { ref, isVisible } = useReveal({ threshold: 0.14 });
  const { tiltStyle, shineStyle, handleMouseMove, handleMouseLeave } = useTiltEffect({ intensity: 8 });

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -12, scale: 1.01 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="group glass-panel gradient-ring overflow-hidden p-6 sm:p-8"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={shineStyle}
      />

      <div className="relative z-[1] grid gap-8 lg:grid-cols-[1fr_0.92fr]">
        <div className="space-y-6" style={{ transform: 'translateZ(48px)' }}>
          <div className="flex items-center justify-between">
            <div className="section-tag">
              <span className="status-dot" />
              <span>{item.label}</span>
            </div>
            <div className="rounded-full border border-white/10 bg-white/10 p-3 backdrop-blur-xl dark:bg-white/[0.04]">
              <ArrowUpRight className="h-4 w-4 text-muted" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="max-w-xl text-3xl font-semibold leading-tight sm:text-[2.2rem]">{item.title}</h3>
            <p className="max-w-xl text-base leading-8 text-muted">{item.description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {item.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-muted backdrop-blur-xl dark:bg-white/[0.04]"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {item.metrics.map((metric) => (
              <div
                key={metric}
                className="rounded-[24px] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-xl dark:bg-white/[0.04]"
              >
                <p className="text-sm leading-7 text-muted">{metric}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[22rem] rounded-[30px] border border-white/10 bg-gradient-to-br from-slate-950/5 via-white/20 to-transparent p-5 backdrop-blur-xl dark:from-white/[0.02] dark:via-white/[0.04]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Interactive preview</p>
              <p className="mt-2 text-lg font-semibold">Adaptive scene graph</p>
            </div>
            <div className="rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-amber-400">
              Live
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl dark:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-400/20 text-sky-300">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Scene acceleration</p>
                    <p className="text-xs uppercase tracking-[0.24em] text-muted">Autonomous routing</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-emerald-400">+18%</p>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl dark:bg-white/[0.04]">
              <div className="flex h-40 items-end gap-2">
                {item.bars.map((bar) => (
                  <motion.div
                    key={bar}
                    whileHover={{ y: -4 }}
                    className="relative flex-1 rounded-t-[22px] bg-gradient-to-t from-sky-500/25 via-cyan-400/40 to-emerald-300/70"
                    style={{ height: `${bar}px` }}
                  >
                    <div className="absolute inset-x-1 top-2 h-1 rounded-full bg-white/30" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl dark:bg-white/[0.04]">
                <div className="mock-line h-3 w-20" />
                <div className="mt-4 text-3xl font-semibold">3.6s</div>
                <p className="mt-2 text-sm text-muted">Median orchestration response</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl dark:bg-white/[0.04]">
                <div className="mock-line h-3 w-24" />
                <div className="mt-4 text-3xl font-semibold">92%</div>
                <p className="mt-2 text-sm text-muted">Decision confidence score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default InteractivePanel;

