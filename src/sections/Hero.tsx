import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { 
  ArrowRight, Sparkles, Briefcase, Code, Zap, 
  Star, Award, TrendingUp, Layers, Palette, Cpu, Download
} from 'lucide-react';
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true });

  const roles = useMemo(() => [
    'Desenvolvedor de Bots',
    'Criador de Interfaces Web',
    'Especialista em Automação',
    'Solucionador de Problemas',
  ], []);

  // Typing animation effect
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText('Developer');
      return;
    }

    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    const pauseTime = isDeleting ? 500 : 3000;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setTypedText(
          isDeleting
            ? currentRole.substring(0, typedText.length - 1)
            : currentRole.substring(0, typedText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentRoleIndex, roles, prefersReducedMotion]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => [
    { value: '20+',  label: 'Projetos Realizados', icon: Briefcase, color: 'from-white to-white/60', iconColor: 'text-violet-400', bg: 'bg-violet-500/10',  border: 'border-violet-500/20',  glow: 'group-hover:from-violet-500/10 group-hover:via-violet-500/5'  },
    { value: '20K+', label: 'Linhas de Código',    icon: Code,      color: 'from-white to-white/60', iconColor: 'text-cyan-400',   bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20',    glow: 'group-hover:from-cyan-500/10 group-hover:via-cyan-500/5'    },
    { value: '3+',   label: 'Anos de Experiência', icon: Zap,       color: 'from-white to-white/60', iconColor: 'text-amber-400',  bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   glow: 'group-hover:from-amber-500/10 group-hover:via-amber-500/5'  },
  ], []);

  const particlePositions = useMemo(() =>
    [...Array(15)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    })),
  []);

  const skills = useMemo(() => [
    { icon: Layers, label: 'Fullstack',  iconColor: 'text-cyan-400',   borderColor: 'border-cyan-500/20',   bgColor: 'bg-cyan-500/5 hover:bg-cyan-500/10' },
    { icon: Palette, label: 'UI/UX',     iconColor: 'text-pink-400',   borderColor: 'border-pink-500/20',   bgColor: 'bg-pink-500/5 hover:bg-pink-500/10' },
    { icon: Cpu, label: 'Automação',     iconColor: 'text-orange-400', borderColor: 'border-orange-500/20', bgColor: 'bg-orange-500/5 hover:bg-orange-500/10' },
  ], []);

  const badges = useMemo(() => [
    { icon: Star,       text: 'Top Rated',       iconColor: 'text-yellow-400', borderColor: 'border-yellow-500/20', bgColor: 'bg-yellow-500/5 hover:bg-yellow-500/10' },
    { icon: Award,      text: '100% Satisfação',  iconColor: 'text-blue-400',   borderColor: 'border-blue-500/20',   bgColor: 'bg-blue-500/5 hover:bg-blue-500/10' },
    { icon: TrendingUp, text: 'Alta Performance', iconColor: 'text-purple-400', borderColor: 'border-purple-500/20', bgColor: 'bg-purple-500/5 hover:bg-purple-500/10' },
  ], []);

  const handleScrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden bg-black"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black" />
        
        {/* Subtle Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
          }}
        />

        {/* Single Subtle Animated blob */}
        <motion.div 
          animate={prefersReducedMotion ? {} : { 
            opacity: [0.05, 0.08, 0.05],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" 
        />

        {/* Floating particles */}
        {!prefersReducedMotion && particlePositions.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badges row */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            {/* Available badge */}
            <motion.div 
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-green-500/5 border border-green-500/20 hover:bg-green-500/10 transition-all cursor-default"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-[10px] sm:text-xs text-green-400 font-bold uppercase tracking-wider">
                Disponível
              </span>
            </motion.div>

            {/* Additional badges */}
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                  className={`hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border transition-all cursor-default ${badge.bgColor} ${badge.borderColor}`}
                >
                  <Icon size={12} className={badge.iconColor} />
                  <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">
                    {badge.text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Terminal header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 font-mono group relative"
            title="Tente digitar: k4nae"
          >
            <span className="text-xs sm:text-base flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">&gt;_</span>
              <span className="text-white/50">~/hello_world</span>
              <span className="inline-block w-[2px] h-[14px] bg-emerald-400 animate-pulse rounded-sm" />
            </span>
          </motion.div>

          {/* Main heading with typing effect */}
          <div className="mb-6 sm:mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-4 sm:mb-6"
            >
              K4NAE<br />
              <span className="text-white/80 inline-block">
                {typedText}
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
              </span>
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-white/60 leading-relaxed mb-8 sm:mb-10 md:mb-12 px-4"
          >
            Especialista em criar soluções digitais de alto impacto. 
            Desenvolvedor de <span className="text-white font-bold">bots inteligentes</span> e{' '}
            <span className="text-white font-bold">interfaces web</span> modernas e performáticas.
          </motion.p>

          {/* Skills pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.1, y: -2 }}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all group ${skill.bgColor} ${skill.borderColor}`}
                >
                  <Icon size={14} className={`sm:w-4 sm:h-4 ${skill.iconColor} group-hover:scale-110 transition-transform`} />
                  <span className="text-white/70 text-xs sm:text-sm font-bold group-hover:text-white transition-colors">
                    {skill.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14 md:mb-16 px-4"
          >
            <motion.button
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo('projetos')}
              aria-label="Ver projetos"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-black font-black rounded-xl sm:rounded-2xl hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] text-sm sm:text-base"
            >
              Ver Projetos
              <ArrowRight size={18} className="sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo('sobre')}
              aria-label="Ir para seção Sobre Mim"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white/5 text-white font-black rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-sm sm:text-base"
            >
              <Sparkles size={18} className="sm:w-5 sm:h-5 text-white/70" />
              Sobre Mim
            </motion.button>

            <motion.a
              href="/cv.pdf"
              download="K4NAE-CV.pdf"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Baixar currículo em PDF"
              className="hidden md:inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all shadow-lg border border-white/10"
            >
              <Download size={20} />
              Download CV
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-10 sm:pt-12 border-t border-white/10"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="flex flex-col items-center gap-3 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all">
                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${stat.bg} border ${stat.border} group-hover:scale-110 transition-transform`}>
                      <Icon size={24} className={`sm:w-7 sm:h-7 ${stat.iconColor}`} />
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-transparent via-transparent to-transparent ${stat.glow} blur-xl transition-all duration-500 -z-10`} />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
        onClick={() => handleScrollTo('sobre')}
      >
        <motion.div 
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
          <span className="text-[9px] sm:text-[10px] text-white uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
