import { motion } from 'framer-motion';
import { staggerContainer } from '../animations/variants';
import { useReveal } from '../hooks/useReveal';
import InteractivePanel from './InteractivePanel';
import SectionHeading from './SectionHeading';

function InteractiveShowcase({ items }) {
  const { ref, isVisible } = useReveal();

  return (
    <section id="experience" ref={ref} className="section-shell pt-28">
      <motion.div initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={staggerContainer}>
        <SectionHeading
          eyebrow="Interactive Depth"
          title="Big-card storytelling with the feeling of a real product surface."
          description="Each panel behaves like a polished software view: responsive depth, expandable visual structure, subtle parallax, and clean information density that stays elegant on every screen."
        />

        <div className="mt-14 space-y-6">
          {items.map((item, index) => (
            <InteractivePanel key={item.id} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default InteractiveShowcase;

