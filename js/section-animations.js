document.addEventListener('DOMContentLoaded', function() {
    // Animate section titles when they come into view
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });
    
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
    
    // Add staggered animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    // Add hover effect for mobile devices
    if (window.innerWidth <= 768) {
        serviceCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 300);
            });
        });
    }
    
    // Add section background animations
    const sections = document.querySelectorAll('.services-section, .why-us-section, .contact-section, .location-section, .dpi-guide-section');
    
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.classList.add('section-hover');
        });
        
        section.addEventListener('mouseleave', function() {
            this.classList.remove('section-hover');
        });
    });
});