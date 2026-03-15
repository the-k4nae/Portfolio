import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { 
  Mail, MessageCircle, Send, Copy, Check, Loader2, CheckCircle, AlertCircle, 
  HandshakeIcon, ArrowRight, Github, Linkedin, Twitter, Clock, Zap, Users,
  MapPin, Star, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [charCount, setCharCount] = useState(0);
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

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText('blessedzzwr@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const validateEmail = useCallback((email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, []);

  const validateField = useCallback((field: string, value: string) => {
    switch (field) {
      case 'name':
        return value.length < 2 ? 'Nome muito curto' : '';
      case 'email':
        return !validateEmail(value) ? 'Email inválido' : '';
      case 'message':
        return value.length < 10 ? 'Mensagem muito curta (mín. 10 caracteres)' : '';
      default:
        return '';
    }
  }, [validateEmail]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'message') {
      setCharCount(value.length);
    }

    // Clear error when user starts typing
    if (fieldErrors[field as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [fieldErrors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setFieldErrors(errors);

    // Check if there are any errors
    if (Object.values(errors).some(error => error !== '')) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send data to Formspree
      const response = await fetch('https://formspree.io/f/xgolkloj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setCharCount(0);
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = useMemo(() => [
    {
      icon: Mail,
      label: 'Email Oficial',
      value: 'blessedzzwr@gmail.com',
      action: handleCopyEmail,
      actionLabel: copied ? 'Copiado!' : 'Copiar',
      actionIcon: copied ? Check : Copy,
      gradient: 'white/10'
    },
    {
      icon: MessageCircle,
      label: 'Discord Community',
      value: '@thek4nae',
      href: 'https://discord.com/users/1296576976286650460',
      actionLabel: 'Adicionar',
      gradient: 'white/10'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@thek4nae',
      href: 'https://github.com/the-k4nae',
      actionLabel: 'Seguir',
      gradient: 'white/10'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'thek4nae',
      href: 'https://www.linkedin.com/in/daniel-bernardes-b010703b1/',
      actionLabel: 'Conectar',
      gradient: 'white/10'
    },
  ], [copied, handleCopyEmail]);

  const stats = useMemo(() => [
    { icon: Clock, value: '< 24h', label: 'Tempo de Resposta', color: 'white', iconColor: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
    { icon: Users, value: '100%',  label: 'Taxa de Resposta',  color: 'white', iconColor: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { icon: Star,  value: '5.0',   label: 'Avaliação',         color: 'white', iconColor: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20'  },
  ], []);

  const quickInfo = useMemo(() => [
    { icon: MapPin, text: 'Campinas, SP - Brasil',    iconColor: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20'    },
    { icon: Clock,  text: 'Disponível para projetos', iconColor: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { icon: Zap,    text: 'Resposta rápida garantida',iconColor: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
  ], []);

  const animationProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: isVisible ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6 }
  };

  const getColorClasses = useCallback((color: string) => {
    return 'from-white to-white/60';
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 bg-black overflow-hidden unified-bg"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Text & Info */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-10 md:space-y-12">
            <div>
              <motion.div 
                {...animationProps}
                className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
              >
                <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10">
                  <HandshakeIcon size={16} className="sm:w-5 sm:h-5 text-white/70" />
                </div>
                <span className="text-white/70 font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[9px] sm:text-[10px]">
                  Contato
                </span>
              </motion.div>

              <motion.h2 
                {...animationProps}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 leading-[1.1] tracking-tighter"
              >
                Vamos criar algo <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                  extraordinário?
                </span>
              </motion.h2>

              <motion.p 
                {...animationProps}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-base sm:text-lg md:text-xl leading-relaxed"
              >
                Estou sempre em busca de novos desafios e parcerias inovadoras. 
                Se você tem uma ideia ou projeto, não hesite em me chamar.
              </motion.p>
            </div>

            {/* Quick Info Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-1 gap-3 sm:gap-4"
            >
              {quickInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className={`p-2 sm:p-2.5 rounded-lg border ${info.bg} ${info.border} ${info.iconColor} transition-all`}>
                      <Icon size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-white/70 text-sm sm:text-base font-medium group-hover:text-white transition-colors">
                      {info.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="grid grid-cols-3 gap-3 sm:gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isStatsInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                    className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all text-center group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon size={18} className={stat.iconColor} />
                    </div>
                    <div className={`text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r ${getColorClasses(stat.color)} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-white/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all relative overflow-hidden card-contrast"
            >
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="name" className="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-widest ml-1">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Como posso te chamar?"
                      className={`w-full px-5 sm:px-6 py-4 sm:py-5 bg-white/5 border ${fieldErrors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl sm:rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all`}
                    />
                    {fieldErrors.name && <span className="text-[10px] text-red-400 ml-1">{fieldErrors.name}</span>}
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="email" className="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-widest ml-1">Seu Melhor Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="exemplo@email.com"
                      className={`w-full px-5 sm:px-6 py-4 sm:py-5 bg-white/5 border ${fieldErrors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl sm:rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all`}
                    />
                    {fieldErrors.email && <span className="text-[10px] text-red-400 ml-1">{fieldErrors.email}</span>}
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center ml-1">
                    <label htmlFor="message" className="text-[10px] sm:text-xs font-black text-white/40 uppercase tracking-widest">Sua Mensagem</label>
                    <span className="text-[10px] text-white/20 font-bold">{charCount}/500</span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={500}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Conte-me sobre seu projeto ou ideia..."
                    className={`w-full px-5 sm:px-6 py-4 sm:py-5 bg-white/5 border ${fieldErrors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl sm:rounded-2xl text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all resize-none`}
                  />
                  {fieldErrors.message && <span className="text-[10px] text-red-400 ml-1">{fieldErrors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Enviar mensagem de contato"
                  className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 sm:py-6 bg-white text-black font-black rounded-xl sm:rounded-2xl hover:bg-white/90 transition-all shadow-2xl hover:shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="animate-spin" size={20} />
                        <span>Enviando...</span>
                      </motion.div>
                    ) : submitStatus === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle size={20} />
                        <span>Mensagem Enviada!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>Enviar Mensagem</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-xs font-bold justify-center"
                  >
                    <AlertCircle size={16} />
                    <span>Ocorreu um erro. Tente novamente.</span>
                  </motion.div>
                )}
              </form>

              {/* Decorative blurs */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
            </motion.div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                const ActionIcon = method.actionIcon;
                
                return (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all cursor-pointer card-contrast"
                    aria-label={`${method.label}: ${method.value}`}
                    onClick={() => method.href ? window.open(method.href, '_blank') : method.action?.()}
                  >
                    <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                        <Icon size={20} className="text-white/70" />
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[9px] font-black text-white/30 uppercase tracking-wider">{method.label}</span>
                        <span className="block text-[10px] sm:text-xs font-bold text-white/70 truncate max-w-[120px]">{method.value}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                        {ActionIcon && <ActionIcon size={10} />}
                        {method.actionLabel}
                        {!ActionIcon && <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;