// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect with progress bar
const navbar = document.querySelector('.navbar');
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = `${scrollPercent}%`;
    
    if (scrollTop > lastScrollTop) {
        navbar.style.top = '-100px';
    } else {
        navbar.style.top = '0';
    }
    
    if (scrollTop > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.backgroundColor = 'transparent';
    }
    
    lastScrollTop = scrollTop;
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typing effect to hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText);
    }
});

// Animate elements on scroll with intersection observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('count-up')) {
                startCountAnimation(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.aboutimage, .Hobby1, .service-box, .info-about, .info-hobby').forEach(el => {
    observer.observe(el);
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.body;
    background.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Interactive hover effects for project cards
const projectCards = document.querySelectorAll('.aboutimage');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) rotate(2deg)';
        card.style.transition = 'all 0.3s ease';
        card.style.zIndex = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) rotate(0deg)';
        card.style.zIndex = '0';
    });
});

// Add particle background effect
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

setInterval(createParticle, 300);

// Dynamic service box hover effect
const serviceBoxes = document.querySelectorAll('.service-box');
serviceBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-10px)';
        box.style.backgroundColor = '#2a2a2a';
        box.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
    
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'translateY(0)';
        box.style.backgroundColor = '#444';
        box.style.boxShadow = 'none';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mobile menu toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-button';
mobileMenuButton.innerHTML = '☰';
navbar.insertBefore(mobileMenuButton, navbar.firstChild);

mobileMenuButton.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    document.querySelectorAll('.animate-on-load').forEach(el => {
        el.classList.add('animate');
    });
});

// Form validation for message form (if exists)
const messageForm = document.querySelector('form');
if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Message sent successfully!');
        messageForm.reset();
    });
} 