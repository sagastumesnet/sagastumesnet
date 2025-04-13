// Step dots functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
    const stepsContainer = document.querySelector('.steps-container');
    const stepDots = document.querySelectorAll('.step-dot');
    const stepItems = document.querySelectorAll('.step-item');
    
    if (stepsContainer && stepDots.length > 0) {
        // Initial check for visible step
        updateActiveDot();
        
        stepsContainer.addEventListener('scroll', function() {
            updateActiveDot();
        });
        
        // Make dots clickable to navigate to steps
        stepDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                if (stepItems[index]) {
                    stepItems[index].scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            });
        });
        
        // Function to update active dot based on scroll position
        function updateActiveDot() {
            const scrollPosition = stepsContainer.scrollLeft;
            const containerWidth = stepsContainer.offsetWidth;
            const totalWidth = stepsContainer.scrollWidth;
            
            // Calculate which step is most visible
            let activeIndex = 0;
            let maxVisibility = 0;
            
            stepItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const containerRect = stepsContainer.getBoundingClientRect();
                
                // Calculate how much of the item is visible in the container
                const leftEdge = Math.max(rect.left, containerRect.left);
                const rightEdge = Math.min(rect.right, containerRect.right);
                const visibleWidth = Math.max(0, rightEdge - leftEdge);
                
                if (visibleWidth > maxVisibility) {
                    maxVisibility = visibleWidth;
                    activeIndex = index;
                }
            });
            
            // Update active dot
            stepDots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }
});