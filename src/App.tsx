import React, { Suspense, useEffect, useRef, useState } from 'react';
import { CvHero, CvSolucoes } from './components/CvHome';
import { ProcessSection } from './components/ProcessSection';
import { ProjectsTestimonialsSection } from './components/ProjectsTestimonialsSection';

const FAQSection = React.lazy(() => import('./components/FAQSection'));
const Footer = React.lazy(() => import('./components/Footer'));

const useNearViewport = <T extends HTMLElement,>() => {
  const sectionRef = useRef<T>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '0px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return [sectionRef, shouldLoad] as const;
};

const DeferredFAQ: React.FC = () => {
  const [sectionRef, shouldLoad] = useNearViewport<HTMLDivElement>();

  return (
    <div id="faq" ref={sectionRef} style={{ minHeight: 1 }}>
      {shouldLoad && (
        <Suspense fallback={null}>
          <FAQSection />
        </Suspense>
      )}
    </div>
  );
};

const DeferredFooter: React.FC = () => {
  const [sectionRef, shouldLoad] = useNearViewport<HTMLDivElement>();

  return (
    <div ref={sectionRef} style={{ minHeight: 1 }}>
      {shouldLoad && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

export const App: React.FC = () => (
  <div className="min-h-screen bg-[#0241ff] text-white selection:bg-white selection:text-[#0241ff] flex flex-col">
    <main className="flex-grow">
      <CvHero />
      <CvSolucoes />
      <ProcessSection />
        <ProjectsTestimonialsSection />
      <DeferredFAQ />
    </main>
    <DeferredFooter />
  </div>
);

export default App;
