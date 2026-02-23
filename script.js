// ONE STOP UTILITIES — Animation Engine 2026 (Light Theme)

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. NAVBAR SCROLL ──────────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });


    // ── 2. MOBILE MENU ────────────────────────────────────────
    const toggleBtn = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    let menuOpen = false;

    function closeMenu() {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('open', menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link =>
        link.addEventListener('click', closeMenu)
    );


    // ── 3. SMOOTH SCROLL ──────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const el = document.querySelector(id);
            if (!el) return;
            e.preventDefault();
            closeMenu();
            const top = el.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });


    // ── 4. REVEAL ON SCROLL ───────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const delay = Number(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add('active'), delay);
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    // ── 5. COUNTER ANIMATION ──────────────────────────────────
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function runCounter(numEl, target, isDecimal) {
        const duration = 2000;
        const start = performance.now();
        function step(now) {
            const p = Math.min((now - start) / duration, 1);
            const val = easeOut(p) * target;
            numEl.textContent = isDecimal ? val.toFixed(1) : Math.floor(val).toLocaleString();
            if (p < 1) requestAnimationFrame(step);
            else numEl.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
        }
        requestAnimationFrame(step);
    }

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;
            if (card.dataset.counted) return;
            card.dataset.counted = '1';

            const numEl = card.querySelector('.stat-number');
            const target = parseFloat(numEl.dataset.target);
            const decimal = !!numEl.dataset.decimal;

            runCounter(numEl, target, decimal);

            // Animate progress bar
            setTimeout(() => card.classList.add('counted'), 300);
            statObserver.unobserve(card);
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.stat-card').forEach(c => statObserver.observe(c));


    // ── 6. INTEREST TOGGLE LOGIC ──────────────────────────────
    document.querySelectorAll('.toggle-pill input').forEach(cb => {
        cb.addEventListener('change', () => {
            if (cb.value === 'all' && cb.checked) {
                document.querySelectorAll('.toggle-pill input').forEach(o => {
                    if (o !== cb) o.checked = false;
                });
            } else if (cb.checked) {
                const allCb = document.querySelector('.toggle-pill input[value="all"]');
                if (allCb) allCb.checked = false;
            }
        });
    });


    // ── 7. CONTACT FORM ───────────────────────────────────────
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const span = submitBtn.querySelector('span');
            const icon = submitBtn.querySelector('i');

            submitBtn.disabled = true;
            span.textContent = 'Submitting...';
            icon.className = 'fas fa-spinner fa-spin';

            setTimeout(() => {
                submitBtn.classList.add('success');
                span.textContent = "✓ Request Received — We'll Contact You Shortly";
                icon.className = 'fas fa-check';

                setTimeout(() => {
                    form.reset();
                    submitBtn.classList.remove('success');
                    span.textContent = 'Request Free Assessment';
                    icon.className = 'fas fa-arrow-right';
                    submitBtn.disabled = false;
                }, 5000);
            }, 1800);
        });
    }


    // ── 8. SERVICE CARD SUBTLE TILT ───────────────────────────
    document.querySelectorAll('.svc-card, .testi-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
            const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
            card.style.transform = `translateY(-10px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

});
