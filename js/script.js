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
