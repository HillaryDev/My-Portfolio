/* ===================================
   HILLARY PORTFOLIO — script.js
=================================== */

const typedEl = document.getElementById('typed-text');
const phrases = [
  'Web Developer',
  'Frontend Developer',
  'Problem Solver',
  'Tech Enthusiast',
  'Team Player',
  'Open to Opportunities',
  'Information Systems Graduate',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === current.length) {
    // Pause at end
    isDeleting = true;
    typingSpeed = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

type();


// ----- NAVBAR SCROLL EFFECT -----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightNav();
});


// ----- ACTIVE NAV LINK HIGHLIGHT -----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}


// ----- MOBILE HAMBURGER MENU ----- 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ----- SCROLL REVEAL (data-aos) -----
const aoElements = document.querySelectorAll('[data-aos]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children slightly
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

aoElements.forEach(el => revealObserver.observe(el));


// ----- SKILL BAR ANIMATION -----
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);

skillFills.forEach(fill => skillObserver.observe(fill));


// ----- CONTACT FORM -----
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = '⚠ Please fill in all required fields.';
    formStatus.style.color = '#ff6b6b';
    return;
  }

  // Simulate send — replace this block with EmailJS / Formspree integration
  formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
  formStatus.style.color = 'var(--accent2)';
  contactForm.reset();

  setTimeout(() => { formStatus.textContent = ''; }, 5000);
});


// ----- FOOTER YEAR -----
document.getElementById('year').textContent = new Date().getFullYear();


// ----- SMOOTH SCROLL for all hash links -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});