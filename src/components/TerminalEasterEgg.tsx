import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

interface Line {
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'blank';
  content: string;
}

const PROJECTS = [
  { name: 'discord-bot-manager',   lang: 'TypeScript',  status: '✓ completed' },
  { name: 'bot-ticket',            lang: 'TypeScript',  status: '✓ completed' },
  { name: 'bot-agente-ia-mc',      lang: 'Python',      status: '✓ completed' },
  { name: 'bot-synq',              lang: 'JavaScript',  status: '✓ completed' },
  { name: 'nick-generator-mc',     lang: 'Python',      status: '✓ completed' },
  { name: 'bot-vendas-discord',    lang: 'TypeScript',  status: '⟳ in-progress' },
  { name: 'relationship-wrapped',  lang: 'React',       status: '⟳ in-progress' },
  { name: 'portfolio-dashboard',   lang: 'Next.js',     status: '⟳ in-progress' },
];

const SKILLS = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Tailwind', 'SQLite', 'Figma'];

const HELP_LINES = [
  { cmd: 'help',       desc: 'mostrar comandos disponíveis' },
  { cmd: 'about',      desc: 'sobre o K4NAE' },
  { cmd: 'projects',   desc: 'listar projetos' },
  { cmd: 'skills',     desc: 'stack tecnológica' },
  { cmd: 'contact',    desc: 'formas de contato' },
  { cmd: 'hire',       desc: 'informações para contratação' },
  { cmd: 'clear',      desc: 'limpar terminal' },
  { cmd: 'exit',       desc: 'fechar terminal' },
  { cmd: 'whoami',     desc: 'descobrir quem você é' },
  { cmd: 'sudo rm -rf /','desc': 'não tente isso em casa' },
];

function processCommand(cmd: string): Line[] {
  const trimmed = cmd.trim().toLowerCase();

  if (!trimmed) return [];

  switch (trimmed) {
    case 'help':
      return [
        { type: 'info',  content: 'Comandos disponíveis:' },
        { type: 'blank', content: '' },
        ...HELP_LINES.map(({ cmd: c, desc }) => ({
          type: 'output' as const,
          content: `  ${c.padEnd(20)} ${desc}`,
        })),
        { type: 'blank', content: '' },
      ];

    case 'about':
      return [
        { type: 'success', content: '▶ K4NAE — Desenvolvedor Fullstack' },
        { type: 'blank',   content: '' },
        { type: 'output',  content: '  Localização   Campinas, SP — Brasil' },
        { type: 'output',  content: '  Experiência   3+ anos' },
        { type: 'output',  content: '  Especialidade Bots Discord, Automação, Web' },
        { type: 'output',  content: '  Status        Disponível para projetos' },
        { type: 'blank',   content: '' },
        { type: 'info',    content: '  "Transformando visão em realidade digital."' },
        { type: 'blank',   content: '' },
      ];

    case 'projects': {
      const maxLen = Math.max(...PROJECTS.map(p => p.name.length));
      return [
        { type: 'info',  content: `${PROJECTS.length} projetos encontrados:` },
        { type: 'blank', content: '' },
        ...PROJECTS.map(p => ({
          type: 'output' as const,
          content: `  ${p.name.padEnd(maxLen + 2)} [${p.lang.padEnd(10)}]  ${p.status}`,
        })),
        { type: 'blank', content: '' },
        { type: 'output', content: `  github.com/the-k4nae` },
        { type: 'blank',  content: '' },
      ];
    }

    case 'skills':
      return [
        { type: 'info',  content: 'Stack tecnológica:' },
        { type: 'blank', content: '' },
        { type: 'output', content: `  ${SKILLS.join('  ·  ')}` },
        { type: 'blank',  content: '' },
        { type: 'output', content: '  Sempre aprendendo novas tecnologias.' },
        { type: 'blank',  content: '' },
      ];

    case 'contact':
      return [
        { type: 'info',   content: 'Formas de contato:' },
        { type: 'blank',  content: '' },
        { type: 'output', content: '  Email      blessedzzwr@gmail.com' },
        { type: 'output', content: '  Discord    @thek4nae' },
        { type: 'output', content: '  GitHub     github.com/the-k4nae' },
        { type: 'output', content: '  LinkedIn   linkedin.com/in/daniel-bernardes-b010703b1' },
        { type: 'blank',  content: '' },
      ];

    case 'hire':
      return [
        { type: 'success', content: '✓ Disponível para novos projetos!' },
        { type: 'blank',   content: '' },
        { type: 'output',  content: '  Tipos de projeto   Bots, Automação, Web, IA' },
        { type: 'output',  content: '  Resposta           < 24 horas' },
        { type: 'output',  content: '  Satisfação         100% garantida' },
        { type: 'blank',   content: '' },
        { type: 'info',    content: '  Use o formulário em #contato ou mande email.' },
        { type: 'blank',   content: '' },
      ];

    case 'whoami':
      return [
        { type: 'output', content: '  Você é alguém com bom gosto.' },
        { type: 'output', content: '  (poucos chegam até aqui)' },
        { type: 'blank',  content: '' },
      ];

    case 'sudo rm -rf /':
    case 'sudo rm -rf':
    case 'rm -rf /':
      return [
        { type: 'error', content: 'sudo: permissão negada.' },
        { type: 'error', content: 'essa já tentei uma vez. não terminou bem.' },
        { type: 'blank', content: '' },
      ];

    case 'exit':
    case 'quit':
    case 'close':
      return [{ type: 'info', content: '__EXIT__' }];

    case 'clear':
      return [{ type: 'info', content: '__CLEAR__' }];

    default:
      return [
        { type: 'error', content: `comando não encontrado: ${trimmed}` },
        { type: 'output', content: "  digite 'help' para ver os comandos." },
        { type: 'blank',  content: '' },
      ];
  }
}

const BOOT_LINES: Line[] = [
  { type: 'success', content: 'K4NAE OS v2.0 — inicializando...' },
  { type: 'blank',   content: '' },
  { type: 'output',  content: '  Você encontrou o terminal secreto.' },
  { type: 'output',  content: "  Digite 'help' para ver o que dá pra fazer." },
  { type: 'blank',   content: '' },
];

export default function TerminalEasterEgg() {
  const [open, setOpen]       = useState(false);
  const [lines, setLines]     = useState<Line[]>(BOOT_LINES);
  const [input, setInput]     = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [keyBuffer, setKeyBuffer] = useState('');

  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Detect "k4nae" typed anywhere on the page
  useEffect(() => {
    const SECRET = 'k4nae';
    const onKey = (e: KeyboardEvent) => {
      if (open) return;
      if ((e.target as HTMLElement).tagName === 'INPUT' ||
          (e.target as HTMLElement).tagName === 'TEXTAREA') return;

      const next = (keyBuffer + e.key).slice(-SECRET.length);
      setKeyBuffer(next);
      if (next === SECRET) {
        setOpen(true);
        setKeyBuffer('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, keyBuffer]);

  // Focus input when terminal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  // Scroll to bottom on new lines
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const close = useCallback(() => {
    setOpen(false);
    setLines(BOOT_LINES);
    setInput('');
    setHistory([]);
    setHistIdx(-1);
  }, []);

  const submit = useCallback(() => {
    if (!input.trim()) return;

    const result = processCommand(input);

    if (result[0]?.content === '__EXIT__') {
      close();
      return;
    }
    if (result[0]?.content === '__CLEAR__') {
      setLines(BOOT_LINES);
      setInput('');
      return;
    }

    setLines(prev => [
      ...prev,
      { type: 'input', content: input },
      ...result,
    ]);
    setHistory(prev => [input, ...prev]);
    setHistIdx(-1);
    setInput('');
  }, [input, close]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { submit(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
    if (e.key === 'Escape') close();
  }, [submit, close, histIdx, history]);

  const lineColor = (type: Line['type']) => {
    switch (type) {
      case 'input':   return 'text-cyan-400';
      case 'success': return 'text-emerald-400';
      case 'error':   return 'text-red-400';
      case 'info':    return 'text-violet-400';
      default:        return 'text-white/70';
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={close}
          />

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed inset-x-4 top-[10vh] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[680px] max-h-[75vh] z-[101] flex flex-col rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1a] border-b border-white/10 flex-shrink-0">
              {/* Traffic lights */}
              <button onClick={close}   className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" aria-label="Fechar terminal" />
              <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-default" aria-label="" />
              <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-default" aria-label="" />
              <span className="flex-1 text-center text-xs text-white/40 font-mono select-none">
                k4nae — bash
              </span>
              <button onClick={close} className="text-white/30 hover:text-white/60 transition-colors" aria-label="Fechar">
                <X size={14} />
              </button>
            </div>

            {/* Output area */}
            <div
              className="flex-1 overflow-y-auto bg-[#0d0d0d] p-4 font-mono text-[13px] leading-relaxed"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i} className={`${lineColor(line.type)} whitespace-pre`}>
                  {line.type === 'input'
                    ? <><span className="text-emerald-400">❯ </span>{line.content}</>
                    : line.content}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0d0d] border-t border-white/10 flex-shrink-0">
              <span className="text-emerald-400 font-mono text-[13px] select-none">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Entrada do terminal"
                placeholder="digite um comando..."
                className="flex-1 bg-transparent font-mono text-[13px] text-white/90 outline-none placeholder-white/20 caret-emerald-400"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
