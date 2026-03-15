import { useEffect, useState, useMemo, useCallback } from 'react';
import { 
  Code, Github, Twitter, Linkedin, Instagram, ArrowUp, Mail, Heart, 
  Coffee, Zap, Star, TrendingUp, Send, Check, MapPin, Clock
} from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubscribe = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const response = await fetch('https://formspree.io/f/xgolkloj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, _subject: 'Nova inscrição na newsletter — K4NAE' }),
      });
      if (response.ok) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
      }
    } catch (err) {
      console.error('Newsletter error:', err);
    } finally {
      setIsSubscribing(false);
    }
  }, [email]);

  const socialLinks = useMemo(() => [
    { icon: Github,    href: 'https://github.com/the-k4nae',                            label: 'GitHub',    className: 'text-white/50 hover:text-white       hover:bg-white/10      hover:border-white/30'      },
    { icon: Twitter,   href: 'https://twitter.com/thek4nae',                            label: 'Twitter',   className: 'text-white/50 hover:text-sky-400     hover:bg-sky-500/10    hover:border-sky-500/40'    },
    { icon: Linkedin,  href: 'https://www.linkedin.com/in/daniel-bernardes-b010703b1/', label: 'LinkedIn',  className: 'text-white/50 hover:text-blue-400    hover:bg-blue-500/10   hover:border-blue-500/40'   },
    { icon: Instagram, href: 'https://instagram.com/thek4nae',                          label: 'Instagram', className: 'text-white/50 hover:text-pink-400    hover:bg-pink-500/10   hover:border-pink-500/40'   },
  ], []);

  const footerLinks = useMemo(() => [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Contato', href: '#contato' },
  ], []);

  const stats = useMemo(() => [
    { icon: Coffee, value: '500+', label: 'Cafés',     color: 'from-white/10 to-white/5', iconColor: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
    { icon: Zap,    value: '20+',  label: 'Projetos',  color: 'from-white/10 to-white/5', iconColor: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20'   },
    { icon: Star,   value: '5.0',  label: 'Avaliação', color: 'from-white/10 to-white/5', iconColor: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  ], []);

  const quickInfo = useMemo(() => [
    { icon: MapPin, text: 'Campinas, SP - Brasil',   iconColor: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20'    },
    { icon: Clock,  text: 'Seg-Sex: 9h-18h',         iconColor: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { icon: Mail,   text: 'blessedzzwr@gmail.com',   iconColor: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'    },
  ], []);

  return (
    <footer className="bg-black pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 border-t border-white/5 relative overflow-hidden unified-bg">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all text-center group"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon size={18} className={stat.iconColor} />
                </div>
                <div className={`text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-white/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20">
          
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="md:col-span-5 space-y-6 sm:space-y-8 md:space-y-10"
          >
            <a href="#inicio" className="flex items-center gap-3 sm:gap-4 group w-fit">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 shadow-lg group-hover:shadow-white/20 transition-all group-hover:scale-110">
                <Code size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tighter transition-all">
                K4NAE
              </span>
            </a>
            
            <p className="text-white/40 text-sm sm:text-base md:text-lg leading-relaxed max-w-sm">
              Desenvolvedor focado em criar experiências digitais de alto impacto, unindo performance, design e inovação.
            </p>

            {/* Quick Info */}
            <div className="space-y-3">
              {quickInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 text-white/50 hover:text-white/70 transition-colors group"
                  >
                    <div className={`p-1.5 rounded-lg border ${info.bg} ${info.border} ${info.iconColor} flex-shrink-0`}>
                      <Icon size={12} className="sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{info.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.1, y: -2 }}
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 transition-all ${social.className}`}
                    aria-label={social.label}
                  >
                    <Icon size={18} className="sm:w-5 sm:h-5 transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="md:col-span-3 space-y-6 sm:space-y-8 md:space-y-10"
          >
            <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/70">
              Navegação
            </h4>
            <nav className="flex flex-col gap-4 sm:gap-5">
              {footerLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: prefersReducedMotion ? 0 : 5 }}
                  className="text-white/40 hover:text-white/70 font-bold transition-all w-fit text-base sm:text-lg group flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-white/40 transition-all duration-300" />
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter + Status Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="md:col-span-4 space-y-6 sm:space-y-8"
          >
            {/* Newsletter */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/70">
                Newsletter
              </h4>
              <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
                Receba atualizações sobre novos projetos e conteúdos exclusivos.
              </p>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  disabled={isSubscribing || subscribed}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 pr-12 sm:pr-14 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/10 focus:bg-white/[0.08] transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubscribing || subscribed || !email}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <AnimatePresence mode="wait">
                    {subscribed ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check size={16} className="sm:w-5 sm:h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Send size={16} className="sm:w-5 sm:h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>

            {/* Status Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Status Atual</span>
                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                  <span className="text-[8px] font-black text-white/60 uppercase tracking-wider">Online</span>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-white/50 leading-relaxed">
                Atualmente focado em <span className="text-white/80 font-bold">Desenvolvimento Web</span> e <span className="text-white/80 font-bold">Automações</span>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 sm:pt-10 md:pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            className="text-[10px] sm:text-xs font-bold text-white/20 uppercase tracking-[0.2em] text-center sm:text-left"
          >
            © {currentYear} K4NAE. Todos os direitos reservados.
          </motion.p>

          <div className="flex items-center gap-6 sm:gap-8">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all shadow-lg"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
