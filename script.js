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

// Gradient is now static - no mouse-following effect

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or system preference
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

// Initialize theme
setTheme(getTheme());

// Toggle theme on button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Projects navigation
const projectsContainer = document.querySelector('.projects');
const prevBtn = document.querySelector('.projects-nav--prev');
const nextBtn = document.querySelector('.projects-nav--next');

if (projectsContainer && prevBtn && nextBtn) {
  const scrollAmount = 360; // width of card + gap

  prevBtn.addEventListener('click', () => {
    projectsContainer.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    projectsContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Hide/show navigation buttons based on scroll position
  const updateNavButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = projectsContainer;
    prevBtn.style.opacity = scrollLeft <= 0 ? '0.3' : '1';
    prevBtn.style.pointerEvents = scrollLeft <= 0 ? 'none' : 'auto';
    nextBtn.style.opacity = scrollLeft >= scrollWidth - clientWidth - 10 ? '0.3' : '1';
    nextBtn.style.pointerEvents = scrollLeft >= scrollWidth - clientWidth - 10 ? 'none' : 'auto';
  };

  projectsContainer.addEventListener('scroll', updateNavButtons);
  updateNavButtons();
}
