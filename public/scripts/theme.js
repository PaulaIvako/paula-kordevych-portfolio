// Dark mode and scroll functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const scrollTopBtn = document.getElementById('scroll-top');
const html = document.documentElement;

// Get theme from localStorage or system preference
const getTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Set theme
const setTheme = (theme) => {
  if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
};

// Initialize theme
setTheme(getTheme());

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Scroll to top functionality
const toggleScrollTop = () => {
  if (!scrollTopBtn) return;
  if (window.scrollY > 280) {
    scrollTopBtn.classList.remove('opacity-0', 'invisible');
    scrollTopBtn.classList.add('opacity-100', 'visible');
  } else {
    scrollTopBtn.classList.add('opacity-0', 'invisible');
    scrollTopBtn.classList.remove('opacity-100', 'visible');
  }
};

if (scrollTopBtn) {
  window.addEventListener('scroll', toggleScrollTop);
  scrollTopBtn.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

// Reveal animations
const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && revealItems.length > 0) {
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
  
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in'));
}
