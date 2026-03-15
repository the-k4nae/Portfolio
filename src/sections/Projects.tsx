import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { 
  ExternalLink, Github, Bot, Globe, Database, Code2, Star, FolderOpen, 
  ArrowUpRight, Zap, Calendar, TrendingUp, Award, Filter, X
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  icon: React.ElementType;
  github?: string;
  demo?: string;
  featured?: boolean;
  year?: string;
  status?: 'completed' | 'in-progress' | 'maintenance';
}

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: 'Discord Bot Manager',
      description: 'Bot completo para gerenciamento de servidores Discord com moderação automática, sistema de níveis, música e integrações com APIs externas.',
      tags: ['Node.js', 'Discord.js', 'MongoDB', 'TypeScript'],
      category: 'bot',
      icon: Bot,
      github: 'https://github.com/the-k4nae',
      featured: true,
      year: '2025',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Portfolio Dashboard',
      description: 'Dashboard interativo para visualização de estatísticas de projetos, com gráficos em tempo real e integração com GitHub.',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'PostgreSQL'],
      category: 'web',
      icon: Globe,
      github: 'https://github.com/the-k4nae',
      demo: 'https://demo.com',
      year: '2026',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Bot Ticket',
      description: 'Bot para gerenciamento de tickets em servidores Discord com sistema de categorização, atribuição e histórico completo.',
      tags: ['Node.js', 'Discord.js', 'TypeScript'],
      category: 'bot',
      icon: Bot,
      github: 'https://github.com/the-k4nae',
      year: '2025',
      status: 'completed',
    },
    {
      id: 4,
      title: 'Anúncios de Contas Minecraft',
      description: 'Plataforma web + Bot Discord para anunciar e comercializar contas Minecraft com sistema de verificação e segurança.',
      tags: ['React', 'TypeScript', 'Node.js'],
      category: 'web',
      icon: Globe,
      github: 'https://github.com/the-k4nae',
      demo: 'https://demo.com',
      featured: true,
      year: '2025',
      status: 'completed',
    },
    {
      id: 5,
      title: 'Painel Otimizador de PC',
      description: 'Aplicação desktop para otimização e limpeza de computador com análise de performance em tempo real.',
      tags: ['Python', 'TypeScript', 'Electron'],
      category: 'web',
      icon: Code2,
      github: 'https://github.com/the-k4nae',
      featured: true,
      year: '2025',
      status: 'completed',
    },
    {
      id: 6,
      title: 'Bot de Fazer Missões Orbs Discord',
      description: 'Bot automatizado para completar missões e ganhar Orbs em servidores Discord com sistema inteligente.',
      tags: ['Node.js', 'Discord.js', 'TypeScript'],
      category: 'bot',
      icon: Zap,
      github: 'https://github.com/the-k4nae',
      year: '2025',
      status: 'completed',
    },
    {
      id: 7,
      title: 'Bot Agente IA — Contas Minecraft',
      description: 'Agente de IA especializado em compra, venda e verificação de contas Minecraft. Usa LLM para responder dúvidas, validar contas e gerenciar transações de forma autônoma.',
      tags: ['Python', 'SQLite', 'AI Agent', 'LLM'],
      category: 'bot',
      icon: Bot,
      github: 'https://github.com/the-k4nae',
      featured: true,
      year: '2025',
      status: 'completed',
    },
    {
      id: 8,
      title: 'Bot Synq — Memória & Comportamento',
      description: 'Bot que aprende o comportamento do usuário ao longo do tempo, guarda memórias persistentes, adapta sua linguagem e cria uma personalidade única para cada pessoa.',
      tags: ['Node.js', 'JavaScript', 'Discord.js'],
      category: 'bot',
      icon: Bot,
      github: 'https://github.com/the-k4nae',
      featured: true,
      year: '2025',
      status: 'completed',
    },
    {
      id: 9,
      title: 'Gerador de Nicks Minecraft',
      description: 'Ferramenta que gera nicks únicos e criativos para Minecraft com base em preferências do usuário, verificando disponibilidade e exportando listas em JSON.',
      tags: ['Python', 'JSON'],
      category: 'web',
      icon: Code2,
      github: 'https://github.com/the-k4nae',
      year: '2025',
      status: 'completed',
    },
    {
      id: 10,
      title: 'Bot de Vendas Discord',
      description: 'Bot de vendas completo para Discord com sistema de carrinho, pagamento e integração com APIs de pagamento.',
      tags: ['Node.js', 'Discord.js', 'TypeScript'],
      category: 'bot',
      icon: Bot,
      github: 'https://github.com/the-k4nae',
      year: '2026',
      status: 'in-progress',
    },
    {
      id: 11,
      title: 'Site Wrapped de Relacionamento Estilo Spotify',
      description: 'Plataforma web para criar wrapped personalizados sobre relacionamentos, estilo Spotify, com compartilhamento social.',
      tags: ['React', 'TypeScript', 'Node.js'],
      category: 'web',
      icon: Globe,
      github: 'https://github.com/the-k4nae',
      demo: 'https://demo.com',
      featured: true,
      year: '2026',
      status: 'in-progress',
    },
  ], []);

  const filters = useMemo(() => [
    { id: 'all', label: 'Todos', count: projects.length },
    { id: 'web', label: 'Web', count: projects.filter(p => p.category === 'web').length },
    { id: 'bot', label: 'Bots', count: projects.filter(p => p.category === 'bot').length },
    { id: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length },
  ], [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [projects, activeFilter]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleProjects);
  }, [filteredProjects, visibleProjects]);

  const stats = useMemo(() => [
    { icon: FolderOpen, value: projects.length,                                        label: 'No Portfólio', color: 'from-white to-white/60', iconColor: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20'   },
    { icon: Star,       value: projects.filter(p => p.featured).length,                label: 'Destaques',    color: 'from-white to-white/60', iconColor: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
    { icon: TrendingUp, value: projects.filter(p => p.status === 'completed').length,  label: 'Finalizados',  color: 'from-white to-white/60', iconColor: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20' },
  ], [projects]);

  const getStatusBadge = useCallback((status: string) => {
    const badges = {
      completed:    { label: 'Completo',     color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
      'in-progress':{ label: 'Em Andamento', color: 'bg-blue-500/10    border-blue-500/30    text-blue-400'    },
      maintenance:  { label: 'Manutenção',   color: 'bg-amber-500/10   border-amber-500/30   text-amber-400'   },
    };
    return badges[status as keyof typeof badges] || badges.completed;
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleProjects(prev => Math.min(prev + 2, filteredProjects.length));
  }, [filteredProjects.length]);

  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilter(filterId);
    setVisibleProjects(4);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 bg-black overflow-hidden unified-bg"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
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

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10 mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10">
                <FolderOpen size={16} className="sm:w-5 sm:h-5 text-white/60" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-black text-white/40 uppercase tracking-[0.3em] sm:tracking-[0.4em]">
                Trabalhos Recentes
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 tracking-tighter"
            >
              Projetos em{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
                Destaque
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
            >
              Uma seleção dos meus trabalhos onde aplico tecnologias modernas para resolver problemas reais com foco em performance.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-auto"
          >
            <a
              href="https://github.com/the-k4nae"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver perfil no GitHub (abre em nova aba)"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black rounded-xl sm:rounded-2xl hover:bg-white/90 transition-all shadow-xl hover:shadow-white/10 text-sm sm:text-base"
            >
              <Github size={20} />
              Ver GitHub
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 text-white/40 mr-2">
            <Filter size={16} />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Filtrar:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all border ${
                activeFilter === filter.id
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {filter.label}
              <span className={`ml-2 ${activeFilter === filter.id ? 'text-black/40' : 'text-white/20'}`}>
                {filter.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => {
              const Icon = project.icon;
              const badge = getStatusBadge(project.status || 'completed');
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group relative flex flex-col rounded-2xl sm:rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all overflow-hidden card-contrast"
                >
                  {/* Project Image/Icon Area */}
                  <div className="relative h-48 sm:h-64 md:h-72 bg-white/[0.02] flex items-center justify-center overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                    <motion.div
                      animate={hoveredProject === project.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10 p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 shadow-2xl group-hover:border-white/20 transition-all"
                    >
                      <Icon size={48} className="sm:w-16 sm:h-16 text-white/70" />
                    </motion.div>
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-wrap gap-2">
                      {project.featured && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-[9px] font-black uppercase tracking-wider shadow-lg">
                          <Star size={10} fill="currentColor" />
                          Destaque
                        </div>
                      )}
                      <div className={`px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-wider backdrop-blur-md ${badge.color}`}>
                        {badge.label}
                      </div>
                    </div>

                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                      <div className="px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-white/60 text-[9px] font-black uppercase tracking-wider backdrop-blur-md">
                        {project.year}
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 sm:p-8 md:p-10 flex-grow flex flex-col">
                    <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all tracking-tight">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-wider group-hover:border-white/20 group-hover:text-white/60 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-3 sm:gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver código do projeto ${project.title} no GitHub`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white/70 font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/30 hover:text-white transition-all"
                        >
                          <Github size={16} />
                          Código
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver demonstração do projeto ${project.title}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-black font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white/90 transition-all shadow-lg"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {visibleProjects < filteredProjects.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 sm:mt-16 md:mt-20 text-center"
          >
            <button
              onClick={handleLoadMore}
              aria-label="Carregar mais projetos"
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm sm:text-base uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all"
            >
              Carregar Mais Projetos
              <Zap size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
