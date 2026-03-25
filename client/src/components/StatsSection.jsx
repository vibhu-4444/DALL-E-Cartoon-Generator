import { motion } from 'framer-motion';
import { staggerContainer } from '../animations/variants';
import { useReveal } from '../hooks/useReveal';
import SectionHeading from './SectionHeading';
import StatCard from './StatCard';

function StatsSection({ stats }) {
  const { ref, isVisible } = useReveal();

  return (
    <section id="metrics" ref={ref} className="section-shell pt-28">
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="glass-panel gradient-ring overflow-hidden px-6 py-10 sm:px-10 sm:py-12"
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
        <div className="relative z-[1]">
          <SectionHeading
            eyebrow="Measured Impact"
            title="Minimal metrics, presented with the confidence of a product worth showing."
            description="The numbers stay crisp, restrained, and motion-enhanced only when they add clarity. This keeps the section premium instead of noisy."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default StatsSection;
