// Google Sheets API URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbz8dP0SSr0a4PU74oanspXYWBAowgUtmXTqeRAIJ6LzTASaDU77PU95R2BpsJR71qXZZw/exec';

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
        
        // Show success message
        alert('Hvala vam na poruci! Kontaktiraćemo vas uskoro.');
        
        // Reset form
        contactForm.reset();
    });
}

// Order Form submission with Google Sheets integration
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: orderForm.querySelector('[name="name"]').value,
            phone: orderForm.querySelector('[name="phone"]').value,
            email: orderForm.querySelector('[name="email"]')?.value || '',
            productType: orderForm.querySelector('[name="product-type"]').value,
            pickupDate: orderForm.querySelector('[name="pickup-date"]').value,
            notes: orderForm.querySelector('[name="notes"]').value,
            price: ''
        };
        
        // Show loading state
        const submitBtn = orderForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Šaljem...';
        submitBtn.disabled = true;
        
        try {
            // Send to Google Sheets
            await fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            // Show success message
            alert(`✅ Hvala ${formData.name}!\n\nVaša narudžba za ${formData.productType} je primljena.\nKontaktiraćemo vas na broj: ${formData.phone}\n\nOčekujte naš poziv uskoro!`);
            
            // Reset form
            orderForm.reset();
        } catch (error) {
            console.error('Greška:', error);
            alert('❌ Došlo je do greške. Molimo pokušajte ponovo ili nas kontaktirajte telefonom.');
        } finally {
            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
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
        const productName = button.closest('.product-card').querySelector('h4').textContent;
        alert(`Želite naručiti: ${productName}\n\nIdite na sekciju NARUČI SADA ili nas kontaktirajte telefonom.`);
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
                const scrollAmount = 100;
                let scrolled = 0;
                
                const scrollInterval = setInterval(() => {
                    if (scrolled < scrollAmount) {
                        scroll.scrollLeft += 2;
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
                        }, 800);
                    }
                }, 30);
            }, 2000 + (index * 1500));
        }
        
        // Mark as seen when user manually scrolls
        scroll.addEventListener('scroll', () => {
            sessionStorage.setItem(`scrollHint_${index}`, 'true');
        }, { once: true });
    });
});

// Console message
console.log('%c🎂 Sarah Kolači - Napravljeno sa ljubavlju! 💕', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
