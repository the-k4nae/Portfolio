import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Menu, X, Code, Github, Mail, ChevronRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import DiscordStatusWidget from '../components/DiscordStatusWidget';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 20);
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        setScrollProgress(scrolled);

        const sections = ['inicio', 'sobre', 'tecnologias', 'projetos', 'contato'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const navLinks = useMemo(() => [
    { href: '#inicio', label: 'Início' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#tecnologias', label: 'Tecnologias' },
    { href: '#projetos', label: 'Projetos' },
    { href: '#contato', label: 'Contato' },
  ], []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white/40 z-[60] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 py-4 ${isScrolled ? 'py-3' : 'py-6'}`}>
        <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-2xl border ${isScrolled ? 'bg-black/70 backdrop-blur-2xl border-white/10 shadow-2xl px-6 py-3' : 'bg-transparent border-transparent px-4 py-0'}`}>
          <div className="flex items-center justify-between h-12">
            
            <motion.a 
              href="#inicio" 
              className="flex items-center gap-3 group"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
              onClick={(e) => { e.preventDefault(); handleNavClick('#inicio'); }}
            >
              <div className="flex items-center gap-3">
                {/* ESPAÇO DA FOTO CIRCULAR */}
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-white/30 transition-all shadow-lg">
                  <img 
                    src="/perfil.webp" 
                    alt="K4NAE" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Se não achar o .webp, tenta o .jpg, se não achar nada, mostra o avatar
                      if (!target.src.includes('.jpg')) {
                        target.src = '/perfil.jpg';
                      } else {
                        target.src = 'https://ui-avatars.com/api/?name=K4NAE&background=0D0D0D&color=fff';
                      }
                    }}
                  />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter">
                  K4NAE
                </span>
              </div>
            </motion.a>

            <nav className="hidden lg:flex items-center gap-1 relative">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`relative text-[11px] font-black px-5 py-2 rounded-xl uppercase tracking-widest transition-colors z-10 ${
                      isActive ? 'text-black' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white rounded-xl"
                        style={{ zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <DiscordStatusWidget userId="1296576976286650460" showActivity={true} />
              <div className="w-px h-6 bg-white/10" />
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              <motion.a 
                href="https://github.com/the-k4nae" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Perfil do GitHub"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="#contato"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contato'); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-black rounded-xl text-[11px] uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg"
              >
                <Mail size={16} />
                <span>Contato</span>
                <ChevronRight size={16} />
              </motion.a>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-4 right-4 mt-4 p-6 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl"
            >
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`relative text-sm font-black p-4 rounded-xl uppercase tracking-widest transition-colors z-10 ${
                      activeSection === link.href.slice(1) ? 'text-black' : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-center py-2">
                   <DiscordStatusWidget userId="1296576976286650460" showActivity={true} />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
