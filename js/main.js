/**
 * BOROD Website V2 - Main JS
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Loading Finish ---- */
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 2800);
        });
    }

    /* ---- Mobile Nav Toggle ---- */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ---- Navbar scroll effect ---- */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ---- Hero Particles ---- */
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (8 + Math.random() * 12) + 's';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
            particlesContainer.appendChild(particle);
        }
    }

    /* ---- Active Nav Link ---- */
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinkEls.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    /* ---- Scroll Animations (Intersection Observer) ---- */
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    /* ---- Smooth Scroll ---- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---- Stats Counter Animation ---- */
    function animateCounters() {
        document.querySelectorAll('.stat-item .num').forEach(el => {
            const target = el.getAttribute('data-count');
            if (!target || el.classList.contains('counted')) return;

            const end = parseInt(target);
            const duration = 1800;
            const step = end / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= end) {
                    current = end;
                    clearInterval(timer);
                    el.classList.add('counted');
                }
                el.textContent = Math.floor(current);
            }, 16);
        });
    }

    const statsSection = document.getElementById('about');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        }, { threshold: 0.4 });
        statsObserver.observe(statsSection);
    }

    /* ---- Back to Top ---- */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});