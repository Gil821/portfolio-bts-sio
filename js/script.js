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
});
