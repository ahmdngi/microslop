/* ============================================================================
   MICROSLOP — JAVASCRIPT INTERACTIVITY
   Slop Counter: Simulates rapidly incrementing gallons of AI slop per second
   Form Logic: Formspree integration for report submissions
   ============================================================================ */

// ============================================================================
// SLOP COUNTER
// ============================================================================

/**
 * Initialize the slop counter with rapid increments
 * Starts at a high number and increments to simulate ongoing slop generation
 */
function initializeSlopCounter() {
    const counterElement = document.getElementById('slopCounter');
    
    // Starting value (high number to suggest ongoing problem)
    let currentCount = 8_472_000;
    
    // Increment speed (milliseconds between updates)
    const incrementInterval = 50;
    
    // Random increment between 100-500 per update
    function getRandomIncrement() {
        return Math.floor(Math.random() * 400) + 100;
    }
    
    // Format large numbers with commas
    function formatNumber(num) {
        return num.toLocaleString('en-US');
    }
    
    // Update counter display
    function updateCounter() {
        currentCount += getRandomIncrement();
        counterElement.textContent = formatNumber(currentCount);
    }
    
    // Start the counter
    setInterval(updateCounter, incrementInterval);
    
    // Initial display
    counterElement.textContent = formatNumber(currentCount);
}

// ============================================================================
// FORM HANDLING
// ============================================================================

/**
 * Set up form submission with Formspree
 * Note: Replace YOUR_FORM_ID with actual Formspree form ID
 */
function initializeForm() {
    const form = document.querySelector('.report-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        // Formspree handles submission automatically
        // This is just for potential custom validation or feedback
        
        // Optional: Add custom validation
        const email = form.querySelector('input[name="email"]');
        const description = form.querySelector('textarea[name="description"]');
        
        if (!email.value || !description.value) {
            e.preventDefault();
            alert('Please fill in all required fields.');
            return;
        }
        
        // Optional: Show submission feedback
        const submitButton = form.querySelector('.form-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'SUBMITTING...';
        submitButton.disabled = true;
        
        // Re-enable after submission (Formspree will handle the redirect)
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    });
}

// ============================================================================
// SMOOTH SCROLL NAVIGATION
// ============================================================================

/**
 * Add smooth scroll behavior to navigation links
 */
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

/**
 * Add keyboard shortcuts for navigation
 * - 'm' for manifest
 * - 't' for tracker
 * - 'r' for report
 */
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Only trigger if not typing in input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            return;
        }
        
        switch(e.key.toLowerCase()) {
            case 'm':
                document.getElementById('manifest').scrollIntoView({ behavior: 'smooth' });
                break;
            case 't':
                document.getElementById('tracker').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'r':
                document.getElementById('report').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    });
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

/**
 * Add subtle animations to cards as they enter viewport
 */
function initializeScrollAnimations() {
    const cards = document.querySelectorAll('.manifest-card, .tracker-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ============================================================================
// UTILITY: Update Last Modified Date
// ============================================================================

/**
 * Update the "last updated" date in footer
 */
function updateLastModifiedDate() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        lastUpdatedElement.textContent = formattedDate;
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Run all initialization functions when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeSlopCounter();
    initializeForm();
    initializeSmoothScroll();
    initializeKeyboardShortcuts();
    initializeScrollAnimations();
    updateLastModifiedDate();
    
    console.log('MICROSLOP initialized. The slop counter is running.');
});

// ============================================================================
// ANALYTICS & TRACKING (Optional)
// ============================================================================

/**
 * Track page views and user interactions (if analytics service is available)
 * This is a placeholder for future analytics integration
 */
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    // Example: Send to Plausible, Umami, or similar service
    console.log(`[Analytics] Event: ${eventName}`, eventData);
}

// Track when user scrolls to each section
const sections = ['manifest', 'tracker', 'report'];
sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('section_viewed', { section: sectionId });
                }
            });
        });
        observer.observe(section);
    }
});
