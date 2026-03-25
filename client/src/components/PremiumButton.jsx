import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

function buildClassName(variant, className) {
  const baseClass = variant === 'secondary' ? 'secondary-button' : 'premium-button';
  return [baseClass, className].filter(Boolean).join(' ');
}

function PremiumButton({
  href,
  children,
  variant = 'primary',
  className = '',
  icon = true,
  type = 'button',
  onClick,
}) {
  const classes = buildClassName(variant, className);
  const content = (
    <>
      <span>{children}</span>
      {icon ? <ArrowRight className="h-4 w-4" /> : null}
    </>
  );

  if (href) {
    return (
      <motion.a
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        href={href}
        onClick={onClick}
        className={classes}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={classes}
    >
      {content}
    </motion.button>
  );
}

export default PremiumButton;

