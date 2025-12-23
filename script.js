// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    cursorDot.style.opacity = '1';
});

function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = `${outlineX - 20}px`;
    cursorOutline.style.top = `${outlineY - 20}px`;
    cursorOutline.style.opacity = '0.5';
    
    requestAnimationFrame(animateOutline);
}

animateOutline();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '0.5';
});

// Cursor interaction effects
const interactiveElements = document.querySelectorAll('a, button, .nav-link');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'scale(1)';
    });
});

// Active navigation based on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Smooth scroll for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections with delay
document.addEventListener('DOMContentLoaded', () => {
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Hover effect for cards
const cards = document.querySelectorAll('.motivation-card, .trait-card, .experience-item, .goal-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Parallax effect for content
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.section-content');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.05;
        const yPos = -(scrolled * speed);
        // Subtle parallax effect
    });
});

// Mouse trail effect
const trailDots = [];
const maxTrailDots = 20;

function createTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    document.body.appendChild(dot);
    
    trailDots.push(dot);
    
    if (trailDots.length > maxTrailDots) {
        const oldDot = trailDots.shift();
        oldDot.remove();
    }
    
    setTimeout(() => {
        dot.style.opacity = '0';
        setTimeout(() => dot.remove(), 500);
    }, 500);
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add CSS for trail dots
const style = document.createElement('style');
style.textContent = `
    .trail-dot {
        position: fixed;
        width: 4px;
        height: 4px;
        background-color: var(--green);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.5;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

// Set initial active nav
setActiveNav();

// Prevent default drag behavior
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToNextSection();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToPreviousSection();
    }
});

function scrollToNextSection() {
    const currentScroll = window.scrollY;
    let nextSection = null;
    
    sections.forEach(section => {
        if (section.offsetTop > currentScroll + 100 && !nextSection) {
            nextSection = section;
        }
    });
    
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPreviousSection() {
    const currentScroll = window.scrollY;
    let previousSection = null;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop < currentScroll - 100) {
            previousSection = sections[i];
            break;
        }
    }
    
    if (previousSection) {
        previousSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add focus styles for accessibility
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--green)';
        this.style.outlineOffset = '4px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.querySelectorAll('*').forEach(element => {
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
}