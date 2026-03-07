// HiDe Project Page - Interactive JavaScript (Light Theme)

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavbar();
    initScrollAnimations();
    initSmoothScroll();
    initCodeCopy();
    initParticles();
    initMobileMenu();
});

// ============================================
// Navbar Scroll Effect
// ============================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Observe method blocks with stagger
    const methodBlocks = document.querySelectorAll('.method-block');
    methodBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateX(-30px)';
        block.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(block);
    });
    
    // Observe highlight cards
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe figure containers
    const figures = document.querySelectorAll('.figure-container, .method-figure, .visual-card, .gallery-item');
    figures.forEach((fig, index) => {
        fig.style.opacity = '0';
        fig.style.transform = 'translateY(20px)';
        fig.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(fig);
    });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Code Copy Functionality
// ============================================
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('.code-block pre');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = 'Copy code';
        copyBtn.style.cssText = `
            position: absolute;
            top: 50px;
            right: 16px;
            background: rgba(79, 70, 229, 0.3);
            border: 1px solid rgba(79, 70, 229, 0.4);
            color: #e2e8f0;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.85rem;
        `;
        
        // Make parent relative
        block.parentElement.style.position = 'relative';
        block.parentElement.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', async () => {
            const code = block.textContent;
            try {
                await navigator.clipboard.writeText(code);
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyBtn.style.color = '#10b981';
                copyBtn.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                    copyBtn.style.color = '#e2e8f0';
                    copyBtn.style.borderColor = 'rgba(79, 70, 229, 0.4)';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
        
        // Hover effect
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = 'rgba(79, 70, 229, 0.4)';
        });
        
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = 'rgba(79, 70, 229, 0.3)';
        });
    });
}

// ============================================
// Particle Background Effect (Light version)
// ============================================
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    hero.insertBefore(canvas, hero.firstChild);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.color = Math.random() > 0.5 ? '79, 70, 229' : '5, 150, 105';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.1;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Stop animation when not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) animate();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        });
    });
    
    observer.observe(hero);
}

// ============================================
// Counter Animation for Stats
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    }
    
    updateCounter();
}

// Initialize counter animation on scroll
const statsSection = document.querySelector('.results-highlights');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.highlight-number');
                counters.forEach(counter => {
                    const text = counter.textContent;
                    if (text.includes('%')) {
                        const value = parseInt(text);
                        if (!isNaN(value)) {
                            animateCounter(counter, value);
                        }
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(statsSection);
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: #1e293b;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(menuBtn);
    
    // Show menu button on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMediaChange(e) {
        if (e.matches) {
            menuBtn.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            menuBtn.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    }
    
    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);
    
    menuBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'none') {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
            navLinks.style.padding = '20px';
            navLinks.style.borderRadius = '0 0 16px 16px';
            navLinks.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// ============================================
// Image Lazy Loading
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

console.log('HiDe Project Page initialized successfully! 🚀');