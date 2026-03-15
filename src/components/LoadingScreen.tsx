import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [phase, setPhase] = useState<'typing' | 'pause' | 'done'>('typing');
  const [text, setText]   = useState('');
  const [show, setShow]   = useState(true);

  const FULL_TEXT = 'K4NAE';

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setText(FULL_TEXT.slice(0, i));
      if (i === FULL_TEXT.length) {
        clearInterval(typeInterval);
        setPhase('pause');
        setTimeout(() => {
          setPhase('done');
          setTimeout(() => setShow(false), 500);
        }, 600);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000',
            zIndex: 99990,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {/* Name */}
          <motion.div
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(52px, 10vw, 100px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {FULL_TEXT.split('').map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={text.length > idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.65,
                repeat: phase === 'typing' ? Infinity : 0,
                repeatType: 'loop',
              }}
              style={{
                display: 'inline-block',
                width: '3px',
                height: '0.8em',
                backgroundColor: 'rgba(255,255,255,0.7)',
                marginLeft: '6px',
                borderRadius: '2px',
                opacity: phase === 'done' ? 0 : 1,
                transition: 'opacity 0.3s',
              }}
            />
          </motion.div>

          {/* Subtitle fades in after name is typed */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={phase !== 'typing' ? { opacity: 0.4, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.35em',
              color: '#fff',
              textTransform: 'uppercase',
            }}
          >
            Desenvolvedor
          </motion.p>

          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.7)',
              width: '100%',
              originX: 0,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === 'done' ? 1 : text.length / FULL_TEXT.length }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
