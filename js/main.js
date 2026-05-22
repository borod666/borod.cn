/**
 * BOROD Website - Main JS
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

    /* ---- Active Nav Link ---- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
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
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    /* ---- Smooth Scroll ---- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---- Hero Button ---- */
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            const target = document.getElementById('about');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

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
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }
});
// Language Switcher
document.querySelectorAll('.lang-switch a').forEach(link => {
    link.addEventListener('click', () => {
        const isEn = link.classList.contains('lang-en');
        document.querySelectorAll('.lang-switch a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
        document.querySelectorAll('.en').forEach(el => el.style.display = isEn ? '' : 'none');
        document.querySelectorAll('.zh').forEach(el => el.style.display = isEn ? 'none' : '');
    });
});
