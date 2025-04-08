document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const termsModal = document.getElementById('termsModal');
    const privacyModal = document.getElementById('privacyModal');
    const legalModal = document.getElementById('legalModal');
    
    // Get link elements
    const termsLink = document.getElementById('terms-link');
    const privacyLink = document.getElementById('privacy-link');
    const legalLink = document.getElementById('legal-link');
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Function to open modal
    function openModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }
    
    // Function to close modal
    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Event listeners for opening modals
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(termsModal);
    });
    
    privacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(privacyModal);
    });
    
    legalLink.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(legalModal);
    });
    
    // Event listeners for closing modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.legal-modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('legal-modal')) {
            closeModal(event.target);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.legal-modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
});