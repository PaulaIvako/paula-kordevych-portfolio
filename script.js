document.documentElement.classList.add('js');

const topButton = document.querySelector('.scroll-top');
const revealItems = document.querySelectorAll('.reveal');
const homeLinks = document.querySelectorAll('.menu a[href$="#top"]');
const hero = document.querySelector('.hero-gradient-mode');
const pageGradient = document.querySelector('.page-gradient');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const toggleTopButton = () => {
  if (window.scrollY > 280) {
    topButton.classList.add('visible');
  } else {
    topButton.classList.remove('visible');
  }
};

if (topButton) {
  window.addEventListener('scroll', toggleTopButton);
  toggleTopButton();

  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

homeLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = new URL(link.href, window.location.href);
    const samePage = target.pathname === window.location.pathname;
    if (samePage) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

if (!prefersReducedMotion) {
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in'));
}

if (pageGradient && !prefersReducedMotion) {
  const gradientScope = document.documentElement;

  const setGradientPosition = (x, y) => {
    gradientScope.style.setProperty('--hero-gx', `${Math.max(12, Math.min(88, x))}%`);
    gradientScope.style.setProperty('--hero-gy', `${Math.max(12, Math.min(82, y))}%`);
  };

  const updatePageGradient = (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    setGradientPosition(x, y);
  };

  const resetPageGradient = () => {
    setGradientPosition(74, 26);
  };

  window.addEventListener('mousemove', updatePageGradient);
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    updatePageGradient(event);
  });
  document.addEventListener('mouseleave', resetPageGradient);

  resetPageGradient();
} else if (pageGradient || hero) {
  document.documentElement.style.setProperty('--hero-gx', '74%');
  document.documentElement.style.setProperty('--hero-gy', '26%');
}
