document.addEventListener('DOMContentLoaded', function() {
    // Add animation class to title words when they come into view
    const animateTitles = () => {
        const titles = document.querySelectorAll('.animated-title');
        
        titles.forEach(title => {
            const titlePosition = title.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (titlePosition < screenPosition) {
                title.classList.add('animate__animated', 'animate__fadeInUp');
                
                // Animate each word in the title
                const words = title.querySelectorAll('.title-word');
                words.forEach((word, index) => {
                    word.style.animationDelay = `${index * 0.2}s`;
                    word.classList.add('animate__animated', 'animate__fadeInUp');
                });
            }
        });
    };
    
    // Run on scroll
    window.addEventListener('scroll', animateTitles);
    
    // Run once on page load
    animateTitles();
});