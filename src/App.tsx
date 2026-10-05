import { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkCards from './components/WorkCards';
import CircularTransition from './components/CircularTransition';
import About from './components/About';
import Hacks from './components/Hacks';
import SneakPeek from './components/SneakPeek';
import Footer from './components/Footer';
import CaseStudyModal from './components/CaseStudyModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Check URL pathname or hash on load
  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/work\/(havenspaces|agrilocal|lumiere|sunshine)/i);
    if (match) {
      setSelectedProject(match[1].toLowerCase());
    }

    const onPopState = () => {
      const p = window.location.pathname;
      const m = p.match(/\/work\/(havenspaces|agrilocal|lumiere|sunshine)/i);
      setSelectedProject(m ? m[1].toLowerCase() : null);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleSelectProject = (id: string) => {
    setSelectedProject(id);
    window.history.pushState(null, '', `/work/${id}`);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    window.history.pushState(null, '', '/');
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] selection:bg-black selection:text-white">
      {/* Lenis smooth inertial scrolling */}
      <SmoothScroll />

      {/* Floating navigation bar */}
      <Header onNavigateHome={handleCloseProject} />

      {/* Hero section */}
      <Hero />

      {/* 100vh spacer so the hero stays visible while beginning to scroll */}
      <div aria-hidden="true" className="h-screen pointer-events-none" />

      {/* Work section with sticky blur-to-focus statement and parallax project cards */}
      <main className="relative z-10">
        <WorkCards onSelectProject={handleSelectProject} />
      </main>

      {/* Signature circular expanding mask that iris-expands on scroll into deep black */}
      <CircularTransition />

      {/* Dark mode realm */}
      <div className="relative z-20 bg-black text-white">
        <About />
        <Hacks />
        <SneakPeek />
        <Footer />
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal projectId={selectedProject} onClose={handleCloseProject} />
    </div>
  );
}
