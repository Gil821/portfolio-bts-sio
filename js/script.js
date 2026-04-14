// ========================================
// Theme Toggle (dark / light)
// ========================================
(function() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
})();

function initThemeToggle() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Changer le thème');
    updateThemeBtn(btn);
    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeBtn(btn);
    });
    sidebar.appendChild(btn);
}

function updateThemeBtn(btn) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark
        ? '<i class="fas fa-sun"></i> Mode clair'
        : '<i class="fas fa-moon"></i> Mode sombre';
}

// ========================================
// Back To Top Button
// ========================================
function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.setAttribute('aria-label', 'Retour en haut');
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
}

// ========================================
// Reading Progress Bar
// ========================================
function initReadingProgress() {
    if (!document.querySelector('.projet-detail')) return;

    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
        const doc = document.documentElement;
        const scrolled = doc.scrollTop || document.body.scrollTop;
        const total = doc.scrollHeight - doc.clientHeight;
        bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    }, { passive: true });
}

// ========================================
// Subtitle Fade Toggle
// ========================================
function initSubtitleFade() {
    const el = document.getElementById('subtitle-anim');
    if (!el) return;

    const phrases = ['Étudiant BTS SIO — Option SISR', 'Alternant chez Lynxmedia Informatique'];
    let index = 0;

    setInterval(() => {
        el.style.transition = 'opacity 0.6s ease';
        el.style.opacity = '0';
        setTimeout(() => {
            index = (index + 1) % phrases.length;
            el.textContent = phrases[index];
            el.style.opacity = '1';
        }, 600);
    }, 3000);
}

// ========================================
// Skill Bars Animation
// ========================================
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
}

// ========================================
// PDF Document Modal
// ========================================
function openDocModal(title, pdfUrl) {
    const existing = document.getElementById('pdf-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'pdf-modal-overlay';
    overlay.className = 'pdf-modal-overlay';
    overlay.innerHTML = `
        <div class="pdf-modal" role="dialog" aria-modal="true">
            <div class="pdf-modal-header">
                <i class="fas fa-file-pdf"></i>
                <h3>${title}</h3>
                <button class="pdf-modal-close" onclick="closeDocModal()" aria-label="Fermer">&times;</button>
            </div>
            <div class="pdf-modal-preview">
                <iframe src="${pdfUrl}" title="${title}"></iframe>
            </div>
            <div class="pdf-modal-footer">
                <a href="${pdfUrl}" target="_blank" class="btn-modal-view" onclick="closeDocModal()">
                    <i class="fas fa-external-link-alt"></i> Ouvrir dans un nouvel onglet
                </a>
                <a href="${pdfUrl}" download class="btn-modal-download">
                    <i class="fas fa-download"></i> Télécharger
                </a>
            </div>
        </div>
    `;

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeDocModal();
    });

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

function closeDocModal() {
    const overlay = document.getElementById('pdf-modal-overlay');
    if (overlay) overlay.remove();
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDocModal();
});

// ========================================
// Share Button
// ========================================
function initShareButton() {
    const header = document.querySelector('.section-header');
    if (!header) return;

    const btn = document.createElement('button');
    btn.className = 'btn-share';
    btn.innerHTML = '<i class="fas fa-share-alt"></i> Partager ce profil';
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('<i class="fas fa-check"></i> Lien copié dans le presse-papiers !');
        }).catch(() => {
            showToast('<i class="fas fa-link"></i> ' + window.location.href);
        });
    });
    header.appendChild(btn);
}

function showToast(message) {
    const existing = document.querySelector('.share-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.innerHTML = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('visible'));
    });

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ========================================
// Mobile Menu Toggle
// ========================================
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar when clicking outside
document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (sidebar && menuBtn && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// ========================================
// Certifications Filter
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.certification-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            certCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ========================================
    // Form Submission (Formspree)
    // ========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const btn = document.getElementById('btn-submit');
            const feedback = document.getElementById('form-feedback');

            if (typeof hcaptcha !== 'undefined' && !hcaptcha.getResponse()) {
                feedback.className = 'form-feedback form-error';
                feedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Veuillez cocher la case "Je ne suis pas un robot".';
                feedback.style.display = 'block';
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    feedback.className = 'form-feedback form-success';
                    feedback.innerHTML = '<i class="fas fa-check-circle"></i> Message envoyé ! Je vous répondrai dès que possible.';
                    feedback.style.display = 'block';
                    contactForm.reset();
                    if (typeof hcaptcha !== 'undefined') hcaptcha.reset();
                    btn.innerHTML = '<i class="fas fa-check"></i> Envoyé';
                } else {
                    throw new Error();
                }
            } catch {
                feedback.className = 'form-feedback form-error';
                feedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Une erreur est survenue. Merci de me contacter directement par email.';
                feedback.style.display = 'block';
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
            }
        });
    }

    // ========================================
    // Add animation classes on load
    // ========================================
    const animateElements = () => {
        const elements = document.querySelectorAll('.timeline-item, .project-card, .experience-card, .certification-card, .veille-article');
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };

    animateElements();

    initThemeToggle();
    initBackToTop();
    initReadingProgress();
    initSubtitleFade();
    initSkillBars();
    initShareButton();
});
