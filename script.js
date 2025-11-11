// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message (you can replace this with actual form submission logic)
        alert('Hvala vam na poruci! Kontaktiraćemo vas uskoro.');
        
        // Reset form
        contactForm.reset();
    });
}

// Order Form submission
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(orderForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const productType = formData.get('product-type');
        
        // Show success message with order details
        alert(`Hvala ${name}!\n\nVaša narudžba za ${productType} je primljena.\nKontaktiraćemo vas na broj: ${phone}\n\nOčekujte naš poziv uskoro!`);
        
        // Reset form
        orderForm.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe feature items
document.querySelectorAll('.feature').forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(30px)';
    feature.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(feature);
});

// Product card button interactions
document.querySelectorAll('.product-overlay .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = button.closest('.product-card').querySelector('h3').textContent;
        alert(`Želite naručiti: ${productName}\n\nKontaktirajte nas putem telefona ili email-a za narudžbu.`);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect removed - body should stay static during scrolling
// window.addEventListener('scroll', () => {
//     const hero = document.querySelector('.hero');
//     const scrolled = window.pageYOffset;
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Add hover effect to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Auto-scroll hint for products (only once, on first load)
document.addEventListener('DOMContentLoaded', () => {
    const productScrolls = document.querySelectorAll('.products-scroll');
    
    productScrolls.forEach((scroll, index) => {
        // Check if user has already seen the hint
        const hasSeenHint = sessionStorage.getItem(`scrollHint_${index}`);
        
        if (!hasSeenHint) {
            // Wait a bit before starting the hint animation
            setTimeout(() => {
                // Gentle auto-scroll to show it's scrollable
                const scrollAmount = 100; // Reduced from 150 to 100 for gentler effect
                let scrolled = 0;
                
                const scrollInterval = setInterval(() => {
                    if (scrolled < scrollAmount) {
                        scroll.scrollLeft += 2; // Reduced from 5 to 2 for slower, gentler scroll
                        scrolled += 2;
                    } else {
                        clearInterval(scrollInterval);
                        // Scroll back after showing the hint
                        setTimeout(() => {
                            scroll.scrollTo({
                                left: 0,
                                behavior: 'smooth'
                            });
                            // Mark as seen so it doesn't repeat
                            sessionStorage.setItem(`scrollHint_${index}`, 'true');
                        }, 800); // Increased from 500 to 800 for more pause time
                    }
                }, 30); // Increased from 20 to 30 for slower animation
            }, 2000 + (index * 1500)); // Increased delays for gentler experience
        }
        
        // Mark as seen when user manually scrolls
        scroll.addEventListener('scroll', () => {
            sessionStorage.setItem(`scrollHint_${index}`, 'true');
        }, { once: true });
    });
});

// Console message
console.log('%c🎂 Sarah Kolači - Napravljeno sa ljubavlju! 💕', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
