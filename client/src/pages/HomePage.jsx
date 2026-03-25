import { motion } from 'framer-motion';
import AmbientBackground from '../components/AmbientBackground';
import CTASection from '../components/CTASection';
import CursorGlow from '../components/CursorGlow';
import FeaturesSection from '../components/FeaturesSection';
import HeroSection from '../components/HeroSection';
import InteractiveShowcase from '../components/InteractiveShowcase';
import Navbar from '../components/Navbar';
import StatsSection from '../components/StatsSection';
import { useShowcaseData } from '../hooks/useShowcaseData';
import { useTheme } from '../hooks/useTheme';

function HomePage() {
  const { theme, mounted, toggleTheme } = useTheme();
  const { data, isLoading, apiOnline, inquiryStatus, submitInquiry } = useShowcaseData();

  return (
    <div className="page-shell">
      <AmbientBackground />
      <CursorGlow />

      <Navbar
        links={data.navigation}
        theme={theme}
        mounted={mounted}
        toggleTheme={toggleTheme}
      />

      <main className="relative z-[1]">
        <HeroSection
          hero={data.hero}
          heroPreview={data.heroPreview}
          apiOnline={apiOnline}
          isLoading={isLoading}
        />
        <FeaturesSection features={data.features} />
        <InteractiveShowcase items={data.experiences} />
        <StatsSection stats={data.stats} />
        <CTASection
          content={data.cta}
          apiOnline={apiOnline}
          inquiryStatus={inquiryStatus}
          submitInquiry={submitInquiry}
        />
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="section-shell pb-10"
      >
        <div className="section-divider mb-8" />
        <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Lumina pairs a premium React experience with an Express and MongoDB-ready backend foundation.</p>
          <p>{apiOnline ? 'Live showcase API available' : 'Frontend preview mode ready'}</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default HomePage;
