// Pure JS cursor — no React, no lifecycle issues, runs once before React mounts
export function initCursor() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Create elements
  const dot  = document.createElement('div');
  const ring = document.createElement('div');

  const base: Partial<CSSStyleDeclaration> = {
    position:      'fixed',
    top:           '0',
    left:          '0',
    borderRadius:  '50%',
    pointerEvents: 'none',
    opacity:       '0',
    willChange:    'transform',
  };

  Object.assign(dot.style, base, {
    width:           '7px',
    height:          '7px',
    backgroundColor: '#ffffff',
    zIndex:          '999999',
    transition:      'width .1s, height .1s, opacity .15s',
  });

  Object.assign(ring.style, base, {
    width:       '32px',
    height:      '32px',
    border:      '1px solid rgba(255,255,255,0.45)',
    background:  'transparent',
    zIndex:      '999998',
    transition:  'width .16s, height .16s, opacity .15s, border-color .15s',
  });

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  let visible  = false;
  let hovering = false;
  let clicking = false;

  const syncDot = () => {
    const s = clicking ? 3 : 7;
    dot.style.width     = s + 'px';
    dot.style.height    = s + 'px';
    dot.style.opacity   = visible ? '1' : '0';
    dot.style.transform = `translate(${mx - s / 2}px,${my - s / 2}px)`;
  };

  const syncRing = () => {
    const s = clicking ? 18 : hovering ? 44 : 32;
    ring.style.width       = s + 'px';
    ring.style.height      = s + 'px';
    ring.style.opacity     = visible ? '1' : '0';
    ring.style.borderColor = hovering
      ? 'rgba(139,92,246,0.85)'
      : 'rgba(255,255,255,0.45)';
    ring.style.transform   = `translate(${rx - s / 2}px,${ry - s / 2}px)`;
  };

  const loop = () => {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    syncRing();
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    visible = true;
    syncDot();
  }, { passive: true });

  document.addEventListener('mouseleave', () => { visible = false; syncDot(); });
  document.addEventListener('mouseenter', () => { visible = true;  syncDot(); });
  document.addEventListener('mousedown',  () => { clicking = true;  syncDot(); });
  document.addEventListener('mouseup',    () => { clicking = false; syncDot(); });

  document.addEventListener('mouseover', (e) => {
    const hit = !!(e.target as Element).closest(
      'a,button,[role="button"],input,textarea,select,label,[tabindex]'
    );
    if (hit !== hovering) { hovering = hit; syncDot(); }
  }, { passive: true });
}
