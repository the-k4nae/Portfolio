import { motion } from 'framer-motion';

interface ScrollSpyProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

const ScrollSpy = ({ sections, activeSection, onNavigate }: ScrollSpyProps) => {
  return (
    <nav
      aria-label="Navegação por seções"
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
      }}
      className="hidden xl:flex"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            aria-label={`Ir para ${section.label}`}
            title={section.label}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}
            className="group"
          >
            {/* Label tooltip on hover */}
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              whileHover={{ opacity: 1, x: 0 }}
              style={{
                position: 'absolute',
                right: '20px',
                whiteSpace: 'nowrap',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                pointerEvents: 'none',
              }}
            >
              {section.label}
            </motion.span>

            {/* Dot */}
            <motion.div
              animate={{
                width:           isActive ? 20  : 6,
                height:          isActive ? 6   : 6,
                backgroundColor: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)',
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              style={{ borderRadius: '99px' }}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default ScrollSpy;
