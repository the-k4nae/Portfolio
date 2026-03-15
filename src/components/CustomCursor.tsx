import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // State — plain vars, zero React re-renders
    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let visible  = false;
    let hovering = false;
    let clicking = false;
    let raf: number;

    // Direct DOM write
    const paintDot = () => {
      const s = clicking ? 3 : 7;
      dot.style.width     = `${s}px`;
      dot.style.height    = `${s}px`;
      dot.style.transform = `translate(${mx - s / 2}px,${my - s / 2}px)`;
      dot.style.opacity   = visible ? '1' : '0';
    };

    const paintRing = () => {
      const s = clicking ? 18 : hovering ? 44 : 32;
      ring.style.width     = `${s}px`;
      ring.style.height    = `${s}px`;
      ring.style.transform = `translate(${rx - s / 2}px,${ry - s / 2}px)`;
      ring.style.opacity   = visible ? '1' : '0';
      ring.style.borderColor = hovering
        ? 'rgba(139,92,246,0.8)'   // violet on interactive
        : 'rgba(255,255,255,0.4)';
      ring.style.borderWidth = hovering ? '1.5px' : '1px';
    };

    // RAF loop — ring lerps at 0.18, dot is instant via event
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      paintRing();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Events
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      visible = true;
      paintDot();
    };
    const onLeave  = () => { visible = false; paintDot(); };
    const onEnter  = () => { visible = true;  paintDot(); };
    const onDown   = () => { clicking = true;  paintDot(); };
    const onUp     = () => { clicking = false; paintDot(); };
    const onOver   = (e: MouseEvent) => {
      const hit = !!(e.target as Element).closest(
        'a,button,[role="button"],input,textarea,select,label,[tabindex]'
      );
      if (hit !== hovering) { hovering = hit; paintDot(); }
    };

    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseover',  onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseover',  onOver);
    };
  }, []);

  return (
    <>
      {/* Dot — instant, no lag */}
      <div ref={dotRef} aria-hidden="true" style={{
        position: 'fixed', top: 0, left: 0,
        width: 7, height: 7,
        borderRadius: '50%',
        backgroundColor: '#fff',
        pointerEvents: 'none',
        zIndex: 999999,
        opacity: 0,
        transition: 'width .1s, height .1s, opacity .12s',
        willChange: 'transform',
      }} />
      {/* Ring — lerp follow */}
      <div ref={ringRef} aria-hidden="true" style={{
        position: 'fixed', top: 0, left: 0,
        width: 32, height: 32,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.4)',
        backgroundColor: 'transparent',
        pointerEvents: 'none',
        zIndex: 999998,
        opacity: 0,
        transition: 'width .15s, height .15s, opacity .12s, border-color .15s, border-width .15s',
        willChange: 'transform',
      }} />
    </>
  );
};

export default CustomCursor;
