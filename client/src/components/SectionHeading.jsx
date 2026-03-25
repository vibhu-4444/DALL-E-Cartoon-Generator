import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto max-w-3xl text-center items-center' : 'max-w-2xl';

  return (
    <motion.div variants={fadeUp} className={['flex flex-col gap-5', alignment].join(' ')}>
      <div className="section-tag w-fit">
        <span className="status-dot" />
        <span>{eyebrow}</span>
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-[3.25rem]">{title}</h2>
        <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
      </div>
    </motion.div>
  );
}

export default SectionHeading;

