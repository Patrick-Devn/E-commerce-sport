/**
 * Product Detail Page JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // If we have a product ID, fetch the product details
    if (productId) {
        fetchProductDetails(productId);
    }
    
    // Image Gallery Functionality
    initImageGallery();
    
    // Product Options Functionality
    initProductOptions();
    
    // Quantity Selector Functionality
    initQuantitySelector();
    
    // Tabs Functionality
    initTabs();
    
    // Review Form Functionality
    initReviewForm();
    
    // Load Related Products
    loadRelatedProducts();
});

/**
 * Fetch product details from "database" (simulated)
 */
function fetchProductDetails(productId) {
    // In a real application, this would be an API call
    // For now, we'll simulate with a product database
    const products = {
        '1': {
            name: 'Performance Training Tee',
            price: 49.99,
            originalPrice: 59.99,
            description: 'Our Performance Training Tee is designed for maximum comfort and functionality during your workouts. Made with moisture-wicking fabric to keep you dry and comfortable, this tee features a regular fit that allows for a full range of motion.',
            features: [
                'Moisture-wicking fabric keeps you dry',
                '4-way stretch construction moves better in every direction',
                'Anti-odor technology prevents the growth of odor-causing microbes',
                'Lightweight, durable materials',
                'Ergonomic seams for added comfort'
            ],
            images: [
                '/placeholder.svg?height=600&width=600&text=Training+Tee+1',
                '/placeholder.svg?height=600&width=600&text=Training+Tee+2',
                '/placeholder.svg?height=600&width=600&text=Training+Tee+3',
                '/placeholder.svg?height=600&width=600&text=Training+Tee+4'
            ],
            colors: ['Black', 'Blue', 'Red', 'Gray'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            category: 'Men',
            subcategory: 'T-Shirts',
            rating: 4.5,
            reviewCount: 24
        },
        '2': {
            name: 'Training Shorts',
            price: 39.99,
            originalPrice: null,
            description: 'These Training Shorts are perfect for any workout. With a comfortable elastic waistband and quick-drying fabric, they provide the comfort and mobility you need for your training sessions.',
            features: [
                'Lightweight, quick-drying fabric',
                'Elastic waistband with drawcord for a secure fit',
                'Side pockets for convenient storage',
                'Mesh panels for enhanced ventilation',
                'Reflective details for visibility in low light'
            ],
            images: [
                '/placeholder.svg?height=600&width=600&text=Training+Shorts+1',
                '/placeholder.svg?height=600&width=600&text=Training+Shorts+2',
                '/placeholder.svg?height=600&width=600&text=Training+Shorts+3',
                '/placeholder.svg?height=600&width=600&text=Training+Shorts+4'
            ],
            colors: ['Black', 'Blue', 'Gray'],
            sizes: ['S', 'M', 'L', 'XL'],
            category: 'Men',
            subcategory: 'Shorts',
            rating: 4.2,
            reviewCount: 18
        }
    };
    
    // Get the product data
    const product = products[productId];
    
    if (product) {
        // Update page title
        document.title = `${product.name} - BOTGYM`;
        
        // Update breadcrumb
        document.getElementById('product-breadcrumb').textContent = product.name;
        
        // Update product details
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        
        // Show/hide original price
        const originalPriceElement = document.getElementById('product-original-price');
        if (product.originalPrice) {
            originalPriceElement.textContent = `$${product.originalPrice.toFixed(2)}`;
            originalPriceElement.style.display = 'inline';
        } else {
            originalPriceElement.style.display = 'none';
        }
        
        // Update description
        document.getElementById('product-description').textContent = product.description;
        
        // Update features
        const featuresElement = document.getElementById('product-features');
        featuresElement.innerHTML = '';
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresElement.appendChild(li);
        });
        
        // Update images
        updateProductImages(product.images);
    }
}


/**
 * Initialize product options (size, color)
 */
function initProductOptions() {
    // Size selection
    const sizeButtons = document.querySelectorAll('.size-options button');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Color selection
    const colorButtons = document.querySelectorAll('.color-options .color-btn');
    const selectedColorText = document.querySelector('.selected-color');
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            colorButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            
            // Update selected color text
            if (selectedColorText) {
                selectedColorText.textContent = this.getAttribute('data-color');
            }
        });
    });
}

/**
 * Initialize quantity selector
 */
function initQuantitySelector() {
    const decreaseBtn = document.querySelector('.quantity-decrease');
    const increaseBtn = document.querySelector('.quantity-increase');
    const quantityInput = document.querySelector('.quantity-controls input');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
        
        // Ensure quantity is always valid
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
        });
    }
}

/**
 * Initialize tabs functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show active tab content
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

/**
 * Initialize review form functionality
 */
function initReviewForm() {
    const ratingStars = document.querySelectorAll('.rating-select i');
    let selectedRating = 0;
    
    // Star rating selection
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        star.addEventListener('mouseout', function() {
            highlightStars(selectedRating);
        });
        
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            highlightStars(selectedRating);
        });
    });
    
    function highlightStars(rating) {
        ratingStars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.remove('far');
                star.classList.add('fas');
                star.classList.add('active');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
                star.classList.remove('active');
            }
        });
    }
    
    // Form submission
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (selectedRating === 0) {
                alert('Please select a rating');
                return;
            }
            
            // In a real application, this would submit to a server
            // For now, just show a success message
            alert('Thank you for your review! It will be published after moderation.');
            
            // Reset form
            this.reset();
            selectedRating = 0;
            highlightStars(0);
        });
    }
}



