import React from 'react';
import { CvHero, CvSolucoes } from './components/CvHome';
import { ProcessSection } from './components/ProcessSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => (
  <div className="min-h-screen bg-[#0241ff] text-white selection:bg-white selection:text-[#0241ff] flex flex-col">
    <main className="flex-grow">
      <CvHero />
      <CvSolucoes />
      <ProcessSection />
      <FAQSection />
    </main>
    <Footer />
  </div>
);

export default App;
