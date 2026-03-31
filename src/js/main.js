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

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

const getTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
};

setTheme(getTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});