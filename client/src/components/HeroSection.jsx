import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, CircleDashed, Play } from 'lucide-react';
import { fadeUp, scaleIn, staggerContainer } from '../animations/variants';
import PremiumButton from './PremiumButton';

function HeroSection({ hero, heroPreview, apiOnline, isLoading }) {
  const [leadTitle = hero.title, accentTitle = ''] = hero.title.split('premium.');

  return (
    <section id="hero" className="section-shell pt-10 sm:pt-14">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="gradient-ring relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.06] px-6 py-10 shadow-premium backdrop-blur-xl sm:px-10 sm:py-14 lg:px-14 lg:py-16 dark:bg-white/[0.03]"
      >
        <div className="absolute left-[-6rem] top-[-6rem] h-64 w-64 rounded-full bg-sky-400/25 blur-[120px]" />
        <div className="absolute bottom-[-10rem] right-[-4rem] h-72 w-72 rounded-full bg-emerald-400/20 blur-[130px]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-white/10 lg:block" />

        <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <motion.div variants={fadeUp} className="section-tag">
              <span className="status-dot" />
              <span>{hero.eyebrow}</span>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-[5.4rem]">
                <span className="block">{leadTitle}</span>
                <span className="text-gradient">{accentTitle ? `premium.${accentTitle}` : 'premium.'}</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                {hero.description}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4 sm:flex-row">
              <PremiumButton href={hero.primaryCta.href}>{hero.primaryCta.label}</PremiumButton>
              <PremiumButton href={hero.secondaryCta.href} variant="secondary" className="group">
                <span className="flex items-center gap-2">
                  <Play className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5" />
                  {hero.secondaryCta.label}
                </span>
              </PremiumButton>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {hero.badges.map((badge) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-muted backdrop-blur-xl dark:bg-white/[0.04]"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-muted">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-sky-500 to-cyan-400 text-xs font-semibold text-white"
                    >
                      {String.fromCharCode(64 + item)}
                    </div>
                  ))}
                </div>
                <p>{hero.trustLine}</p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl dark:bg-white/[0.04]">
                <span className="status-dot" />
                <span>{isLoading ? 'Syncing showcase data...' : apiOnline ? 'Live API connected' : 'Preview dataset active'}</span>
              </div>
            </motion.div>
          </div>

          <motion.div variants={scaleIn} className="relative mx-auto w-full max-w-2xl lg:mr-0">
            <div className="glass-panel gradient-ring min-h-[30rem] p-6 sm:p-7">
              <div className="relative z-[1] flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Orchestration cockpit</p>
                  <h3 className="mt-2 text-2xl font-semibold">Pulse overview</h3>
                </div>
                <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                  Stable
                </div>
              </div>

              <div className="relative z-[1] mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl dark:bg-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted">{heroPreview[0].title}</p>
                      <p className="mt-3 text-4xl font-semibold">{heroPreview[0].value}</p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-400/20 p-3 text-sky-300">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{heroPreview[0].subtitle}</p>
                  <div className="mt-6 flex h-36 items-end gap-2">
                    {[42, 64, 58, 86, 74, 98, 82].map((height, index) => (
                      <motion.div
                        key={height}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height, opacity: 1 }}
                        transition={{ delay: index * 0.08 + 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 rounded-t-full bg-gradient-to-t from-sky-500/30 via-cyan-400/40 to-emerald-300/60"
                      />
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 dark:bg-white/[0.04]">
                    <span className="text-sm text-muted">{heroPreview[0].detail}</span>
                    <CircleDashed className="h-4 w-4 text-muted" />
                  </div>
                </div>

                <div className="space-y-4">
                  {heroPreview.slice(1).map((card, index) => (
                    <motion.div
                      key={card.title}
                      animate={{ y: [0, index === 0 ? -10 : -6, 0] }}
                      transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-[26px] border border-white/10 bg-white/10 p-5 shadow-premium backdrop-blur-xl dark:bg-white/[0.04]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted">{card.title}</p>
                          <p className="mt-2 text-3xl font-semibold">{card.value}</p>
                        </div>
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-400/20" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted">{card.subtitle}</p>
                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs uppercase tracking-[0.28em] text-muted dark:bg-white/[0.03]">
                        {card.detail}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -16, 0], rotate: [0, -1.5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-8 top-10 hidden w-48 rounded-[24px] border border-white/10 bg-white/10 p-4 shadow-premium backdrop-blur-xl xl:block dark:bg-white/[0.04]"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Insight lane</p>
              <div className="mt-4 space-y-3">
                <div className="mock-line h-3 w-24" />
                <div className="mock-line h-3 w-36" />
                <div className="mock-line h-16 w-full rounded-[20px]" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;

