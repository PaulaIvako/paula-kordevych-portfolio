document.documentElement.classList.add('js');

const topButton = document.querySelector('.scroll-top');
const revealItems = document.querySelectorAll('.reveal');
const homeLinks = document.querySelectorAll('.menu a[href$="#top"]');
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
