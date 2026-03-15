(function() {
  const DOMAIN_WHITELIST = ["k4nae.dev", "www.k4nae.dev", "localhost", "127.0.0.1"];
  const REDIRECT_URL = "https://k4nae.dev";

  const preventDefaultAndStop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const checkDomain = () => {
    const h = window.location.hostname;
    if (!DOMAIN_WHITELIST.includes(h)) {
      document.body.style.display = 'none';
      window.location.replace(REDIRECT_URL);
    }
  };
  checkDomain();

  // Right-click
  document.addEventListener('contextmenu', preventDefaultAndStop);
  // Text selection
  document.addEventListener('selectstart', preventDefaultAndStop);
  // Copy
  document.addEventListener('copy', preventDefaultAndStop);
  // Drag images
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') preventDefaultAndStop(e);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    const ctrl = e.ctrlKey || e.metaKey;
    // F12
    if (e.key === 'F12') { preventDefaultAndStop(e); return; }
    // Ctrl+Shift+I / J (DevTools)
    if (ctrl && e.shiftKey && ['i','I','j','J'].includes(e.key)) { preventDefaultAndStop(e); return; }
    // Ctrl+U (source), Ctrl+S (save), Ctrl+P (print)
    if (ctrl && ['u','U','s','S','p','P'].includes(e.key)) { preventDefaultAndStop(e); return; }
  });

  console.log('%c✅ Proteção ativada — K4NAE', 'color:#a78bfa;font-weight:bold;');
})();
