import { motion } from 'framer-motion';
import { staggerContainer } from '../animations/variants';
import { useReveal } from '../hooks/useReveal';
import FeatureCard from './FeatureCard';
import SectionHeading from './SectionHeading';

function FeaturesSection({ features }) {
  const { ref, isVisible } = useReveal();

  return (
    <section id="features" ref={ref} className="section-shell pt-28">
      <motion.div initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={staggerContainer}>
        <SectionHeading
          eyebrow="Capability Surface"
          title="Every detail is tuned to feel expensive, precise, and effortless."
          description="The experience leans into premium product cues: restrained motion, high-contrast hierarchy, sculpted glass cards, and layered depth that responds to every interaction."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default FeaturesSection;
