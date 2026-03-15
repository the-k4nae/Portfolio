import { useState, useEffect, useCallback } from 'react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Technologies from './sections/Technologies';
import Projects from './sections/Projects';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import ScrollSpy from './components/ScrollSpy';

const SPY_SECTIONS = [
  { id: 'inicio',      label: 'Início'      },
  { id: 'sobre',       label: 'Sobre'       },
  { id: 'tecnologias', label: 'Tecnologias' },
  { id: 'projetos',    label: 'Projetos'    },
  { id: 'contato',     label: 'Contato'     },
];

function AppContent() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('inicio');

  // Sync activeSection from scroll (shared with Header internally, but ScrollSpy needs it too)
  useEffect(() => {
    const onScroll = () => {
      for (const { id } of SPY_SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen" data-theme={theme}>
      <LoadingScreen />
      <Header />
      <main>
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <ScrollSpy
        sections={SPY_SECTIONS}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

