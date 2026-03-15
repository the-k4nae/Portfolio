import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { ArrowRight, Sparkles, Zap, Star, Heart, Rocket, Code2, Palette } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = useMemo(() => [
    { icon: Zap,   text: 'Entrega Rápida', iconColor: 'text-amber-400',  border: 'border-amber-500/20',  bg: 'bg-amber-500/5  hover:bg-amber-500/10'  },
    { icon: Star,  text: 'Alta Qualidade', iconColor: 'text-yellow-400', border: 'border-yellow-500/20', bg: 'bg-yellow-500/5 hover:bg-yellow-500/10' },
    { icon: Heart, text: 'Suporte Total',  iconColor: 'text-rose-400',   border: 'border-rose-500/20',   bg: 'bg-rose-500/5   hover:bg-rose-500/10'   },
  ], []);

  const benefits = useMemo(() => [
    { icon: Code2,   label: 'Código Limpo', iconColor: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20'   },
    { icon: Rocket,  label: 'Performance',  iconColor: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { icon: Palette, label: 'Design Único', iconColor: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'border-pink-500/20'   },
  ], []);

  const handleScrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const animationProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, scale: 0.98 },
    animate: isVisible ? { opacity: 1, scale: 1 } : {},
    transition: { duration: 0.8 }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 bg-black overflow-hidden unified-bg"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ y: prefersReducedMotion ? 0 : y, opacity }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[200px]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div 
          {...animationProps}
          className="p-6 sm:p-8 md:p-12 lg:p-16 xl:p-24 rounded-2xl sm:rounded-3xl md:rounded-[3.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 relative overflow-hidden text-center card-contrast transition-all duration-500"
        >
          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  top: `${20 + i * 30}%`,
                  left: `${10 + i * 40}%`,
                }}
                animate={prefersReducedMotion ? {} : {
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-6 sm:mb-8 md:mb-10"
          >
            <Sparkles size={12} className="sm:w-3.5 sm:h-3.5" />
            <span>Vamos Iniciar</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black text-white mb-6 sm:mb-8 md:mb-10 leading-[1] tracking-tighter px-4"
          >
            Pronto para o <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              próximo nível?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/50 mb-8 sm:mb-10 md:mb-14 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Estou disponível para novos projetos e colaborações. Vamos transformar sua visão em uma solução digital poderosa.
          </motion.p>

          {/* Features pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all group ${feature.bg} ${feature.border}`}
                >
                  <Icon size={14} className={`sm:w-4 sm:h-4 ${feature.iconColor} group-hover:scale-110 transition-transform`} />
                  <span className="text-white/70 text-xs sm:text-sm font-bold group-hover:text-white transition-colors">
                    {feature.text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 px-4"
          >
            <button
              onClick={() => handleScrollTo('contato')}
              onMouseEnter={() => setHoveredButton('primary')}
              onMouseLeave={() => setHoveredButton(null)}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-white text-black font-black rounded-xl sm:rounded-2xl hover:bg-white/90 transition-all shadow-2xl hover:shadow-white/10 hover:scale-105 text-base sm:text-lg overflow-hidden"
            >
              <span className="relative z-10">Iniciar Conversa</span>
              <ArrowRight 
                size={20} 
                className="sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-1 transition-transform" 
              />
              {hoveredButton === 'primary' && (
                <motion.div
                  layoutId="button-hover"
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </button>
            
            <button
              onClick={() => handleScrollTo('projetos')}
              onMouseEnter={() => setHoveredButton('secondary')}
              onMouseLeave={() => setHoveredButton(null)}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 bg-white/5 text-white font-black rounded-xl sm:rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-base sm:text-lg overflow-hidden"
            >
              <span className="relative z-10">Ver Portfolio</span>
              {hoveredButton === 'secondary' && (
                <motion.div
                  layoutId="button-hover-secondary"
                  className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </button>
          </motion.div>

          {/* Benefits row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 pt-6 sm:pt-8 md:pt-10 border-t border-white/10"
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: prefersReducedMotion ? 0 : -5 }}
                  className="flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer"
                >
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${benefit.bg} ${benefit.border} group-hover:scale-110 transition-all`}>
                    <Icon size={20} className={`sm:w-6 sm:h-6 ${benefit.iconColor}`} />
                  </div>
                  <span className="text-white/60 text-xs sm:text-sm font-bold group-hover:text-white transition-colors">
                    {benefit.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Decorative blurs */}
          <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-white/5 blur-[100px] rounded-full" />
          <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-white/5 blur-[100px] rounded-full" />
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 text-white/40"
        >
          {[
            { label: 'Resposta em 24h', icon: Zap },
            { label: '20+ Projetos', icon: Star },
            { label: 'Satisfação Garantida', icon: Heart },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                className="flex items-center gap-2 group cursor-default"
              >
                <Icon size={16} className="sm:w-5 sm:h-5 text-white/30 group-hover:text-white/70 transition-colors" />
                <span className="text-xs sm:text-sm font-bold group-hover:text-white/60 transition-colors">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
