// Mobile Menu Toggle and other functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    // Add close button to mobile menu
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        const closeBtn = document.createElement('div');
        closeBtn.className = 'mobile-menu-close';
        closeBtn.textContent = '';
        mainNav.prepend(closeBtn);
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenuToggle && mainNav) {
        // Toggle menu
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking the close button
        const closeBtn = document.querySelector('.mobile-menu-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
        
        // Close menu when clicking a nav link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Mobile Filter Toggle
    const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
    const productFilters = document.querySelector('.product-filters');
    
    if (mobileFilterToggle && productFilters) {
        mobileFilterToggle.addEventListener('click', function() {
            productFilters.classList.toggle('active');
        });
        
        // Close filters when clicking outside
        document.addEventListener('click', function(event) {
            if (!productFilters.contains(event.target) && event.target !== mobileFilterToggle) {
                productFilters.classList.remove('active');
            }
        });
    }
    
    // Price Range Slider
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = `$${this.value}`;
        });
    }
    
    // Quick View Modal
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const modal = document.getElementById('quick-view-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (quickViewBtns.length > 0 && modal && closeModal) {
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Quantity Controls
    const quantityDecrease = document.querySelector('.quantity-decrease');
    const quantityIncrease = document.querySelector('.quantity-increase');
    const quantityInput = document.querySelector('.quantity-controls input');
    
    if (quantityDecrease && quantityIncrease && quantityInput) {
        quantityDecrease.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        quantityIncrease.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
    }
    
    // Add to Cart Animation
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    
    if (addToCartBtns.length > 0 && cartCount) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update cart count
                let count = parseInt(cartCount.textContent);
                cartCount.textContent = count + 1;
                
                // Add animation class
                cartCount.classList.add('pulse');
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    cartCount.classList.remove('pulse');
                }, 300);
                
                // Show added to cart message
                const productCard = this.closest('.product-card');
                if (productCard) {
                    const notification = document.createElement('div');
                    notification.className = 'added-to-cart-notification';
                    notification.textContent = 'Added to cart!';
                    productCard.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.remove();
                    }, 2000);
                }
            });
        });
    }
    
    // Wishlist Toggle
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    if (wishlistBtns.length > 0) {
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        icon.style.color = '#e74c3c';
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        icon.style.color = '';
                    }
                }
            });
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Simulate form submission
                emailInput.value = '';
                
                // Show success message
                const formContainer = this.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for subscribing!';
                
                // Replace form with success message
                this.style.display = 'none';
                formContainer.appendChild(successMessage);
                
                // Restore form after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                    this.style.display = 'flex';
                }, 3000);
            }
        });
    }
});

// Add CSS for new animations and notifications
const style = document.createElement('style');
style.textContent = `
    .pulse {
        animation: pulse-animation 0.3s ease-in-out;
    }
    
    @keyframes pulse-animation {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); }
    }
    
    .added-to-cart-notification {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #2ecc71;
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        font-size: 0.8em;
        z-index: 5;
        animation: fade-in-out 2s ease-in-out;
    }
    
    @keyframes fade-in-out {
        0% { opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    .newsletter-success {
        color: #2ecc71;
        font-weight: 600;
        text-align: center;
        padding: 10px;
        margin-top: 10px;
    }
    
    .newsletter-success i {
        margin-right: 5px;
    }
`;
document.head.appendChild(style);