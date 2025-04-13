// Step dots functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
    const stepsContainer = document.querySelector('.steps-container');
    const stepDots = document.querySelectorAll('.step-dot');
    
    if (stepsContainer && stepDots.length > 0) {
        stepsContainer.addEventListener('scroll', function() {
            const scrollPosition = stepsContainer.scrollLeft;
            const containerWidth = stepsContainer.offsetWidth;
            const totalWidth = stepsContainer.scrollWidth;
            const scrollPercentage = scrollPosition / (totalWidth - containerWidth);
            
            // Calculate which dot should be active
            const activeDotIndex = Math.min(
                Math.floor(scrollPercentage * stepDots.length),
                stepDots.length - 1
            );
            
            // Update active dot
            stepDots.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
        
        // Make dots clickable to navigate to steps
        stepDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                const stepItems = stepsContainer.querySelectorAll('.step-item');
                if (stepItems[index]) {
                    stepItems[index].scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            });
        });
    }
});