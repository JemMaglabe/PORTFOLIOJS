document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cardList = document.querySelector('.card-list');
    const cards = document.querySelectorAll('.card-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let resizeTimeout;

    let currentIndex = 0;
    const totalCards = cards.length;
    let cardsPerView = 3;
    let maxIndex = Math.max(0, totalCards - cardsPerView);
    let isTransitioning = false;

    // Update cards per view based on screen size
    function updateCardsPerView() {
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else if (window.innerWidth <= 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        maxIndex = Math.max(0, totalCards - cardsPerView);
        goToSlide(Math.min(currentIndex, maxIndex), false);
    }

    function updateNavButtons() {
        // Show/hide navigation buttons based on position
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }

    function goToSlide(index, smooth = true) {
        if (isTransitioning) return;
        
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        const translateX = -(currentIndex * (100 / cardsPerView));
        
        cardList.style.transition = smooth ? 'transform 0.5s ease' : 'none';
        cardList.style.transform = `translateX(${translateX}%)`;
        
        updateNavButtons();
        
        if (smooth) {
            isTransitioning = true;
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    function nextSlide() {
        if (!isTransitioning && currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (!isTransitioning && currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }

    // Event Listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isSwiping = true;
        cardList.style.transition = 'none';
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        touchEndX = e.touches[0].clientX;
        
        const diffX = touchEndX - touchStartX;
        const translateX = -(currentIndex * (100 / cardsPerView)) + (diffX / carousel.offsetWidth) * 100;
        cardList.style.transform = `translateX(${translateX}%)`;
    });

    carousel.addEventListener('touchend', () => {
        if (!isSwiping) return;
        
        cardList.style.transition = 'transform 0.5s ease';
        const touchDiff = touchStartX - touchEndX;
        
        if (Math.abs(touchDiff) > 50) {
            if (touchDiff > 0 && currentIndex < maxIndex) {
                nextSlide();
            } else if (touchDiff < 0 && currentIndex > 0) {
                prevSlide();
            } else {
                goToSlide(currentIndex);
            }
        } else {
            goToSlide(currentIndex);
        }
        
        isSwiping = false;
    });

    // Auto-play functionality
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentIndex >= maxIndex) {
                goToSlide(0);
            } else {
                nextSlide();
            }
        }, 4000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Start auto-play
    startAutoPlay();

    // Pause auto-play on hover or touch
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('touchstart', stopAutoPlay);
    
    // Resume auto-play when mouse leaves or touch ends
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('touchend', startAutoPlay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCardsPerView();
        }, 250);
    });

    // Initial setup
    updateCardsPerView();
    updateNavButtons();
}); 