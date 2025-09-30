// Initialize AOS animations
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});

// Menu functionality removed since header was removed

// Navigation and expandable sections removed

// Parallax Effect for Images
function initParallaxEffect() {
    const images = document.querySelectorAll('.image-container');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        images.forEach((image, index) => {
            const rate = scrolled * (0.2 + index * 0.1);
            image.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Photo Gallery Side Animations
function initPhotoGalleryAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const photoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all photo items
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        photoObserver.observe(item);
    });
}

// Scroll-triggered Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const fadeElements = document.querySelectorAll('.section-title, .welcome-text, .detail-item, .party-section');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const slideLeftElements = document.querySelectorAll('.hero-text');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    const slideRightElements = document.querySelectorAll('.hero-images');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
}

// Google Calendar Integration
function initCalendarButton() {
    const calendarBtn = document.getElementById('addToCalendar');

    if (calendarBtn) {
        calendarBtn.addEventListener('click', function() {
            // Wedding event details
            const eventDetails = {
                title: 'Sambhu & Anagha Wedding',
                startDate: '20251123', // YYYYMMDD format
                startTime: '114500',   // HHMMSS format (11:45 AM)
                endTime: '180000',     // HHMMSS format (6:00 PM - covers both ceremony and reception)
                location: 'Fizaka Auditorium, Kulasekharapuram, Karunagappally',
                description: 'Wedding Ceremony of Sambhu Baburaj & Anagha R\\n\\nCeremony: 11:45 AM at Fizaka Auditorium, Kulasekharapuram, Karunagappally\\nReception: 6:00 PM at Celestia Convention Centre, Patharam\\n\\nWe look forward to celebrating with you!'
            };

            // Create Google Calendar URL
            const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}T${eventDetails.startTime}Z/${eventDetails.startDate}T${eventDetails.endTime}Z&location=${encodeURIComponent(eventDetails.location)}&details=${encodeURIComponent(eventDetails.description)}`;

            // Open Google Calendar in new tab
            window.open(googleCalendarUrl, '_blank');

            // Show notification
            showNotification('Opening Google Calendar to add the event!', 'success');
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#5A6650'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add notification animations
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Floating Botanical Elements Animation
function createFloatingBotanicals() {
    const container = document.createElement('div');
    container.className = 'floating-botanicals';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;

    // Create floating leaves
    for (let i = 0; i < 8; i++) {
        const leaf = document.createElement('div');
        leaf.innerHTML = '🍃';
        leaf.style.cssText = `
            position: absolute;
            font-size: ${12 + Math.random() * 8}px;
            opacity: ${0.1 + Math.random() * 0.2};
            animation: floatLeaf ${15 + Math.random() * 10}s infinite linear;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
            color: #7A8A6E;
        `;
        container.appendChild(leaf);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatLeaf {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(container);
}

// Image Hover Effects
function initImageHoverEffects() {
    const images = document.querySelectorAll('.image-container img, .photo-item img, .couple-photo img');

    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

// Photo Popup Functionality
function initPhotoPopup() {
    // Create popup modal
    const popup = document.createElement('div');
    popup.className = 'photo-popup';
    popup.innerHTML = `
        <div class="popup-backdrop"></div>
        <div class="popup-content">
            <img src="" alt="" class="popup-image">
            <button class="popup-close">&times;</button>
            <button class="popup-prev">❮</button>
            <button class="popup-next">❯</button>
        </div>
    `;
    document.body.appendChild(popup);

    const popupImage = popup.querySelector('.popup-image');
    const closeBtn = popup.querySelector('.popup-close');
    const prevBtn = popup.querySelector('.popup-prev');
    const nextBtn = popup.querySelector('.popup-next');
    const backdrop = popup.querySelector('.popup-backdrop');

    // Get all photo items
    const photoItems = document.querySelectorAll('.photo-item img');
    let currentIndex = 0;

    // Add click listeners to photos
    photoItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            showPopup(img.src, img.alt);
        });
        img.style.cursor = 'pointer';
    });

    function showPopup(src, alt) {
        popupImage.src = src;
        popupImage.alt = alt;
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hidePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % photoItems.length;
        const nextImg = photoItems[currentIndex];
        showPopup(nextImg.src, nextImg.alt);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + photoItems.length) % photoItems.length;
        const prevImg = photoItems[currentIndex];
        showPopup(prevImg.src, prevImg.alt);
    }

    // Event listeners
    closeBtn.addEventListener('click', hidePopup);
    backdrop.addEventListener('click', hidePopup);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (popup.classList.contains('active')) {
            if (e.key === 'Escape') hidePopup();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });
}

// Loading Screen
function initLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div class="spinner"></div>
        <p style="margin-top: 20px; color: #5A6650; font-family: 'Playfair Display', serif;">Loading...</p>
    `;
    document.body.appendChild(loading);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('fade-out');
            setTimeout(() => {
                if (document.body.contains(loading)) {
                    document.body.removeChild(loading);
                }
            }, 500);
        }, 1000);
    });
}

// Header Background on Scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(250, 248, 245, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(250, 248, 245, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Text Animation on Scroll
function initTextAnimations() {
    const textElements = document.querySelectorAll('.couple-names, .section-title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';
            }
        });
    }, { threshold: 0.5 });

    textElements.forEach(el => observer.observe(el));

    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Choose Design Button Functionality
function initChooseDesignButton() {
    const chooseBtn = document.querySelector('.choose-design-btn');

    if (chooseBtn) {
        chooseBtn.addEventListener('click', () => {
            showNotification('Design selected! Contact us to get started with your wedding website.', 'success');
        });
    }
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC to close menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.querySelector('.menu-toggle');
            const menuSpans = menuToggle.querySelectorAll('span');

            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuSpans[0].style.transform = 'none';
                menuSpans[1].style.opacity = '1';
                menuSpans[2].style.transform = 'none';
            }
        }
    });
}

// Mobile Touch Gestures
function initTouchGestures() {
    let startY = 0;
    let startX = 0;

    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
        const endY = e.changedTouches[0].clientY;
        const endX = e.changedTouches[0].clientX;
        const diffY = startY - endY;
        const diffX = startX - endX;

        // Swipe right to open menu (mobile)
        if (Math.abs(diffX) > Math.abs(diffY) && diffX < -100) {
            const navMenu = document.querySelector('.nav-menu');
            if (!navMenu.classList.contains('active') && window.innerWidth <= 768) {
                document.querySelector('.menu-toggle').click();
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initParallaxEffect();
    initScrollAnimations();
    initPhotoGalleryAnimations(); // Add photo gallery animations
    initCalendarButton();
    initImageHoverEffects();
    initPhotoPopup();
    initTextAnimations();
    addNotificationStyles();
    createFloatingBotanicals();

    console.log('Sambhu & Anagha wedding website initialized');
});

// Resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Handle responsive adjustments if needed
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    initParallaxEffect();
}, 16)); // ~60fps