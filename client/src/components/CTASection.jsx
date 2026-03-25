import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { fadeUp, staggerContainer } from '../animations/variants';
import { useReveal } from '../hooks/useReveal';
import PremiumButton from './PremiumButton';

const initialForm = {
  name: '',
  email: '',
  company: '',
  message: '',
  notes: '',
};

function CTASection({ content, apiOnline, inquiryStatus, submitInquiry }) {
  const { ref, isVisible } = useReveal();
  const [formValues, setFormValues] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitted = await submitInquiry(formValues);

    if (submitted) {
      setFormValues(initialForm);
    }
  };

  const statusTone =
    inquiryStatus.state === 'success'
      ? 'text-emerald-400'
      : inquiryStatus.state === 'error'
        ? 'text-rose-400'
        : 'text-white/70';

  return (
    <section id="join" ref={ref} className="section-shell pb-20 pt-28">
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.94),rgba(8,145,178,0.86),rgba(16,185,129,0.82))] px-6 py-10 text-white shadow-premium sm:px-10 sm:py-12 lg:px-12"
      >
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-white/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-black/20 blur-[120px]" />

        <div className="relative z-[1] grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-7">
            <motion.div variants={fadeUp} className="section-tag border-white/20 bg-white/10 text-white">
              <span className="status-dot" />
              <span>Concierge Access</span>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5">
              <h2 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">{content.title}</h2>
              <p className="max-w-xl text-base leading-8 text-white/80 sm:text-lg">{content.description}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              {[
                'Structured full-stack MERN foundation with premium design tokens',
                'Animated, reusable UI components with graceful mobile behavior',
                'Express + MongoDB architecture ready for live submissions and extensions',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-white/82 sm:text-base">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-white" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-[26px] border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                {apiOnline ? 'API status' : 'Setup note'}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/82">
                {apiOnline
                  ? 'The frontend is connected to the Express API. If MongoDB is configured, form submissions will persist through Mongoose.'
                  : 'The UI is running with fallback showcase data. Start the backend and configure MongoDB to enable live submission storage.'}
              </p>
            </motion.div>
          </div>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="rounded-[32px] border border-white/18 bg-white/10 p-6 backdrop-blur-2xl sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-white/82">Name</span>
                <input
                  required
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="Ava Chen"
                  className="field-input border-white/10 bg-white/12 text-white placeholder:text-white/45"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/82">Work email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="ava@lumina.io"
                  className="field-input border-white/10 bg-white/12 text-white placeholder:text-white/45"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-white/82">Company</span>
                <input
                  name="company"
                  value={formValues.company}
                  onChange={handleChange}
                  placeholder="Northstar Labs"
                  className="field-input border-white/10 bg-white/12 text-white placeholder:text-white/45"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/82">Focus</span>
                <input
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder="Premium launch systems"
                  className="field-input border-white/10 bg-white/12 text-white placeholder:text-white/45"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2">
              <span className="text-sm font-medium text-white/82">What should this product feel like?</span>
              <textarea
                rows="5"
                name="notes"
                value={formValues.notes}
                onChange={handleChange}
                placeholder="Describe the workflows, brand tone, or launch experience you want to build."
                className="field-textarea border-white/10 bg-white/12 text-white placeholder:text-white/45"
              />
            </label>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <PremiumButton type="submit">
                {inquiryStatus.state === 'loading' ? 'Sending request...' : 'Join the concierge beta'}
              </PremiumButton>

              <p className={['text-sm leading-7', statusTone].join(' ')}>
                {inquiryStatus.message || 'A clean POST endpoint is ready to receive submissions.'}
              </p>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}

export default CTASection;

