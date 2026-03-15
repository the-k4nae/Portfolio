import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Zap, Code, Database, Palette, Server, TrendingUp, Award, Star, Filter, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { 
  SiJavascript, 
  SiTypescript, 
  SiNodedotjs, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiReact, 
  SiPython,
  SiFigma,
  SiSqlite,
} from 'react-icons/si';

interface Technology {
  name: string;
  icon: any;
  color: string;
  level: string;
  proficiency: number;
  category: string;
  years: number;
}

const Technologies = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const technologies: Technology[] = useMemo(() => [
    // Frontend
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 'Especialista', proficiency: 95, category: 'frontend', years: 3 },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 'Avançado', proficiency: 90, category: 'frontend', years: 2 },
    { name: 'React', icon: SiReact, color: '#61DAFB', level: 'Avançado', proficiency: 90, category: 'frontend', years: 2 },
    { name: 'Next.js', icon: SiNextdotjs, color: 'var(--theme-text, #ffffff)', level: 'Avançado', proficiency: 85, category: 'frontend', years: 2 },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 'Especialista', proficiency: 95, category: 'frontend', years: 3 },
    
    // Backend
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 'Especialista', proficiency: 95, category: 'backend', years: 3 },
    { name: 'Python', icon: SiPython, color: '#3776AB', level: 'Avançado', proficiency: 85, category: 'backend', years: 2 },
    
    // Database
    { name: 'SQLite', icon: SiSqlite, color: '#003B57', level: 'Avançado', proficiency: 80, category: 'database', years: 2 },
    
    // Tools
    { name: 'Figma', icon: SiFigma, color: '#F24E1E', level: 'Avançado', proficiency: 85, category: 'tools', years: 2 },
  ], []);

  const categories = useMemo(() => [
    { id: 'all',      label: 'Todas',    icon: Zap,      count: technologies.length,                                           activeColor: 'bg-white text-black',           inactiveIcon: 'text-white/50'    },
    { id: 'frontend', label: 'Frontend', icon: Palette,  count: technologies.filter(t => t.category === 'frontend').length,  activeColor: 'bg-pink-500 text-white',        inactiveIcon: 'text-pink-400'    },
    { id: 'backend',  label: 'Backend',  icon: Server,   count: technologies.filter(t => t.category === 'backend').length,   activeColor: 'bg-emerald-500 text-white',     inactiveIcon: 'text-emerald-400' },
    { id: 'database', label: 'Database', icon: Database, count: technologies.filter(t => t.category === 'database').length,  activeColor: 'bg-blue-500 text-white',        inactiveIcon: 'text-blue-400'    },
    { id: 'tools',    label: 'Tools',    icon: Code,     count: technologies.filter(t => t.category === 'tools').length,     activeColor: 'bg-amber-500 text-black',       inactiveIcon: 'text-amber-400'   },
  ], [technologies]);

  const filteredTechnologies = useMemo(() => {
    if (activeFilter === 'all') return technologies;
    return technologies.filter(t => t.category === activeFilter);
  }, [technologies, activeFilter]);

  const stats = useMemo(() => {
    const avgProficiency = Math.round(
      technologies.reduce((acc, tech) => acc + tech.proficiency, 0) / technologies.length
    );
    const specialistCount = technologies.filter(t => t.level === 'Especialista').length;
    const totalYears = Math.max(...technologies.map(t => t.years));

    return [
      { icon: TrendingUp, value: `${avgProficiency}%`, label: 'Proficiência Média', color: 'from-white to-white/60', iconColor: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
      { icon: Award,      value: specialistCount,        label: 'Especialista',       color: 'from-white to-white/60', iconColor: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20'  },
      { icon: Star,       value: `${totalYears}+`,       label: 'Anos de Exp',        color: 'from-white to-white/60', iconColor: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
    ];
  }, [technologies]);

  const getLevelColor = useCallback((level: string) => {
    return 'from-white/60 to-white/20';
  }, []);

  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilter(filterId);
  }, []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }), []);

  return (
    <section
      ref={sectionRef}
      id="tecnologias"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 bg-black overflow-hidden unified-bg"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Stats Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, type: "spring" }}
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

        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.1, rotate: 360 }}
            transition={{ duration: 0.3 }}
            className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 mb-6 sm:mb-8 border border-white/10"
          >
            <Zap size={24} className="sm:w-7 sm:h-7 text-white/70" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 tracking-tighter"
          >
            Stack{' '}
            <span className="text-white/80">
              Tecnológica
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4"
          >
            Ferramentas e tecnologias que domino para construir aplicações robustas, escaláveis e com foco total na experiência do usuário final.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 text-white/40">
            <Filter size={16} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-bold hidden sm:inline">Categoria:</span>
          </div>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
                  activeFilter === category.id
                    ? `${category.activeColor} font-bold shadow-lg`
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Icon size={14} className={`sm:w-4 sm:h-4 ${activeFilter === category.id ? 'opacity-90' : category.inactiveIcon}`} />
                <span className="relative z-10">{category.label}</span>
                <span className={`hidden sm:inline opacity-60`}>
                  ({category.count})
                </span>
              </motion.button>
            );
          })}
          {activeFilter !== 'all' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => handleFilterChange('all')}
              className="p-2 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
              title="Limpar filtro"
            >
              <X size={14} />
            </motion.button>
          )}
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechnologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8 }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  whileHover={{ y: prefersReducedMotion ? 0 : -10 }}
                  className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer card-contrast"
                >
                  <div className="flex flex-col items-center gap-4 sm:gap-6">
                    <div className="relative">
                      <Icon 
                        size={40} 
                        className="sm:w-12 sm:h-12 transition-all duration-500 group-hover:scale-110" 
                        style={{ color: tech.color }}
                      />
                      <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: tech.color }} />
                    </div>
                    <div className="text-center space-y-1">
                      <h3 className="text-sm sm:text-base font-black text-white tracking-tight group-hover:text-white transition-all">
                        {tech.name}
                      </h3>
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[9px] sm:text-[10px] text-white/40 font-bold uppercase tracking-wider">
                          {tech.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Details */}
                  <AnimatePresence>
                    {hoveredTech === tech.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 -bottom-2 translate-y-full z-20 p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-none"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-wider">Proficiência</span>
                            <span className="text-[10px] font-black text-white">{tech.proficiency}%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${tech.proficiency}%` }}
                              className="h-full bg-white/40 rounded-full"
                            />
                          </div>
                          <div className="flex items-center justify-between text-[10px] font-black">
                            <span className="text-white/40 uppercase tracking-wider">Experiência</span>
                            <span className="text-white">{tech.years} {tech.years === 1 ? 'Ano' : 'Anos'}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 sm:mt-20 md:mt-24 text-center"
        >
          <p className="text-white/40 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-6">
            Sempre aprendendo novas tecnologias
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 opacity-30 grayscale">
            {/* Adicionar mais ícones pequenos aqui se desejar */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
