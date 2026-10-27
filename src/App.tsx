import React from 'react';
import { CvHero, CvSolucoes } from './components/CvHome';
import { ProcessSection } from './components/ProcessSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { FloatingAssistant } from './components/FloatingAssistant';
import { LanguageProvider } from './i18n';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0241ff] text-white selection:bg-white selection:text-[#0241ff] flex flex-col">
        <main className="flex-grow">
          <CvHero />
          <CvSolucoes />
          <ProcessSection />
          <FAQSection />
          <CTASection />
        </main>

        <Footer />
        <FloatingAssistant />
      </div>
    </LanguageProvider>
  );
};

export default App;
