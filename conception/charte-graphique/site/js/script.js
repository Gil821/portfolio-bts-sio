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
    // Form Submission (placeholder)
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            
            // Show success message (you can integrate with a backend service)
            alert(`Merci ${name} ! Votre message a été envoyé.`);
            this.reset();
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
