import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { User, Code, Cpu, Globe, ChevronRight, Zap, Award, TrendingUp, Sparkles } from 'lucide-react';
import { motion, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [statsCount, setStatsCount] = useState({ projects: 0, experience: 0, clients: 0 });
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('sobre');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Animated counter for stats
  useEffect(() => {
    if (!isStatsInView) return;

    const stats = { projects: 20, experience: 3, clients: 15 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStatsCount({
        projects: Math.floor(stats.projects * progress),
        experience: Math.min(Math.floor(stats.experience * progress), stats.experience),
        clients: Math.floor(stats.clients * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStatsCount(stats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isStatsInView]);

  const features = useMemo(() => [
    {
      icon: <Code className="text-cyan-400" size={24} />,
      title: "Desenvolvimento Fullstack",
      description: "Código limpo, escalável e de alta performance utilizando as melhores práticas do mercado.",
      gradient: "from-cyan-500/10 to-cyan-500/5",
      iconBg: "bg-cyan-500/10 border-cyan-500/20"
    },
    {
      icon: <Cpu className="text-violet-400" size={24} />,
      title: "Bots & Automação",
      description: "Especialista em criar bots complexos para Discord e sistemas que otimizam processos.",
      gradient: "from-violet-500/10 to-violet-500/5",
      iconBg: "bg-violet-500/10 border-violet-500/20"
    },
    {
      icon: <Globe className="text-emerald-400" size={24} />,
      title: "Web Experience",
      description: "Interfaces responsivas e experiências de usuário fluidas com tecnologias de ponta.",
      gradient: "from-emerald-500/10 to-emerald-500/5",
      iconBg: "bg-emerald-500/10 border-emerald-500/20"
    }
  ], []);

  const achievements = useMemo(() => [
    { icon: <Zap size={20} className="text-amber-400" />,    label: "Foco em Performance", bg: "bg-amber-500/10",   border: "border-amber-500/20"  },
    { icon: <Award size={20} className="text-blue-400" />,   label: "Código Escalável",    bg: "bg-blue-500/10",    border: "border-blue-500/20"   },
    { icon: <TrendingUp size={20} className="text-pink-400" />, label: "Design Moderno",   bg: "bg-pink-500/10",    border: "border-pink-500/20"   },
    { icon: <Sparkles size={20} className="text-violet-400" />, label: "UX/UI Intuitivo",  bg: "bg-violet-500/10",  border: "border-violet-500/20" }
  ], []);

  const getColorClass = useCallback((color: string) => {
    return 'bg-white/10 text-white/70 group-hover:bg-white/20';
  }, []);

  const animationProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: isVisible ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6 }
  };

  return (
    <section 
      id="sobre" 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 relative overflow-hidden bg-black unified-bg"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ y: prefersReducedMotion ? 0 : y }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Title & Text */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 md:space-y-10">
            <div className="space-y-4 sm:space-y-6">
              <motion.div 
                {...animationProps}
                className="flex items-center gap-2 sm:gap-3"
              >
                <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10">
                  <User size={16} className="sm:w-5 sm:h-5 text-white/70" />
                </div>
                <span className="text-white/70 font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[9px] sm:text-[10px]">
                  Minha História
                </span>
              </motion.div>

              <motion.h2 
                {...animationProps}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tighter"
              >
                Transformando visão em <br className="hidden sm:block" />
                <span className="text-white/80">
                  realidade digital.
                </span>
              </motion.h2>

              <motion.div 
                {...animationProps}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 sm:space-y-6 text-white/60 text-base sm:text-lg md:text-xl leading-relaxed"
              >
                <p>
                  Olá! Eu sou o{' '}
                  <span className="text-white font-bold underline decoration-white/30 underline-offset-4 hover:decoration-white/60 transition-colors">
                    K4NAE
                  </span>
                  . Desenvolvedor apaixonado por criar soluções inovadoras e funcionais para o ecossistema digital.
                </p>
                <p>
                  Com{' '}
                  <span className="text-white font-bold">
                    {statsCount.experience}+ anos de experiência
                  </span>
                  , foco na criação de sistemas inteligentes e interfaces modernas, sempre aplicando arquiteturas sólidas.
                </p>
                
                {/* Achievements Grid - Responsivo */}
                <div className="pt-4 grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  {achievements.map((item, index) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
                    >
                      <div className={`p-1 sm:p-1.5 rounded-full border transition-all duration-300 ${item.bg} ${item.border}`}>
                        {item.icon}
                      </div>
                      <span className="text-white/80 font-bold text-xs sm:text-sm tracking-tight group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats Cards - Novo recurso */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6"
            >
              {[
                { value: `${statsCount.projects}+`, label: 'Projetos', color: 'white' },
                { value: `${statsCount.experience}+`, label: 'Anos', color: 'white' },
                { value: `${statsCount.clients}+`, label: 'Clientes', color: 'white' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isStatsInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group card-contrast text-center"
                >
                  <div className={`text-2xl sm:text-3xl md:text-4xl font-black text-white/90 mb-1 sm:mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mission Card - Melhorado */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-white/20 relative overflow-hidden group card-contrast transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
                    <Sparkles size={20} className="text-white/70" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">Minha Missão</h4>
                </div>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                  Simplificar a complexidade tecnológica, entregando produtos que não apenas funcionam, 
                  mas que também <span className="text-white font-semibold">encantam e transformam</span> a experiência do usuário.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-all duration-500" />
              <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-all duration-500" />
            </motion.div>
          </div>

          {/* Right Column: Features - Melhor responsividade */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: prefersReducedMotion ? 0 : -10 }}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all group relative overflow-hidden card-contrast"
              >
                <div className="relative z-10 flex items-start gap-4 sm:gap-6">
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border group-hover:scale-110 transition-transform duration-500 ${feature.iconBg}`}>
                    {feature.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="text-white/20" size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;