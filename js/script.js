// Mobile Menu Toggle and other functionality
document.addEventListener("DOMContentLoaded", function () {
  // Create mobile menu overlay
  const overlay = document.createElement("div");
  overlay.className = "mobile-menu-overlay";
  document.body.appendChild(overlay);

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuToggle && mainNav) {
    // Toggle menu
    mobileMenuToggle.addEventListener("click", function () {
      mainNav.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("menu-open");
    });

    // Close menu when clicking the close button
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", function () {
        mainNav.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    }

    // Close menu when clicking overlay
    overlay.addEventListener("click", function () {
      mainNav.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    });

    // Handle dropdown menus on mobile
    const dropdownItems = document.querySelectorAll(".has-dropdown > a");

    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Only handle dropdown toggle on mobile
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = this.parentElement;

          // Close all other dropdowns
          dropdownItems.forEach((otherItem) => {
            if (otherItem !== this) {
              otherItem.parentElement.classList.remove("active");
            }
          });

          // Toggle current dropdown
          parent.classList.toggle("active");
        }
      });
    });

    // Close menu when window is resized to desktop size
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");

        // Reset all dropdowns
        document.querySelectorAll(".has-dropdown").forEach((item) => {
          item.classList.remove("active");
        });
      }
    });
  }

  // Search Toggle
  const searchToggle = document.querySelector(".search-toggle");
  const searchContainer = document.querySelector(".search-container");
  const searchClose = document.querySelector(".search-close");
  const searchInput = document.querySelector(".search-form input");

  if (searchToggle && searchContainer) {
    // Open search
    searchToggle.addEventListener("click", function () {
      searchContainer.classList.add("active");
      if (searchInput) {
        // Focus the input after a short delay to ensure it's visible
        setTimeout(() => {
          searchInput.focus();
        }, 100);
      }

      // Close mobile menu if open
      if (mainNav && mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });

    // Close search
    if (searchClose) {
      searchClose.addEventListener("click", function () {
        searchContainer.classList.remove("active");
      });
    }

    // Close search on ESC key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && searchContainer.classList.contains("active")) {
        searchContainer.classList.remove("active");
      }
    });

    // Close search when clicking outside
    document.addEventListener("click", function (e) {
      if (
        searchContainer.classList.contains("active") &&
        !searchContainer.contains(e.target) &&
        e.target !== searchToggle &&
        !searchToggle.contains(e.target)
      ) {
        searchContainer.classList.remove("active");
      }
    });
  }

  // Quick View Functionality
  const quickViewBtns = document.querySelectorAll(".quick-view-btn");

  if (quickViewBtns.length > 0) {
    quickViewBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        // Get product data from the card
        const productCard = this.closest(".product-card");
        const productName = productCard.querySelector("h3").textContent;
        const productPrice = productCard.querySelector(".price").textContent;
        const productImage = productCard.querySelector(".product-image").src;
        const productLink = productCard.querySelector("a.btn").href;

        // Create modal if it doesn't exist
        let modal = document.getElementById("quick-view-modal");
        if (!modal) {
          modal = document.createElement("div");
          modal.id = "quick-view-modal";
          modal.className = "modal";

          modal.innerHTML = `
                        <div class="modal-content">
                            <span class="close-modal">&times;</span>
                            <div class="product-quick-view">
                                <div class="product-quick-view-image">
                                    <img src="${productImage}" alt="${productName}">
                                </div>
                                <div class="product-quick-view-details">
                                    <h2>${productName}</h2>
                                    <div class="product-rating">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                        <span>(24 reviews)</span>
                                    </div>
                                    <p class="price">${productPrice}</p>
                                    <p class="product-description">
                                        This premium product is designed for maximum performance and comfort during your workouts.
                                        Made with high-quality materials that are both durable and lightweight.
                                    </p>
                                    <div class="product-options">
                                        <div class="size-options">
                                            <h4>Size:</h4>
                                            <div class="option-buttons">
                                                <button>S</button>
                                                <button class="selected">M</button>
                                                <button>L</button>
                                                <button>XL</button>
                                            </div>
                                        </div>
                                        <div class="color-options">
                                            <h4>Color:</h4>
                                            <div class="option-buttons">
                                                <button class="color-btn black selected"></button>
                                                <button class="color-btn blue"></button>
                                                <button class="color-btn red"></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="quantity-selector">
                                        <h4>Quantity:</h4>
                                        <div class="quantity-controls">
                                            <button class="quantity-decrease">-</button>
                                            <input type="number" value="1" min="1" max="10">
                                            <button class="quantity-increase">+</button>
                                        </div>
                                    </div>
                                    <div class="product-actions">
                                        <button class="btn btn-primary add-to-cart-btn">Add to Cart</button>
                                        <a href="${productLink}" class="btn btn-outline-dark">View Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

          document.body.appendChild(modal);

          // Add event listeners for the new modal
          const closeModal = modal.querySelector(".close-modal");
          closeModal.addEventListener("click", function () {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
          });

          window.addEventListener("click", function (event) {
            if (event.target === modal) {
              modal.style.display = "none";
              document.body.style.overflow = "auto";
            }
          });

          // Initialize quantity controls in the modal
          const quantityDecrease = modal.querySelector(".quantity-decrease");
          const quantityIncrease = modal.querySelector(".quantity-increase");
          const quantityInput = modal.querySelector(".quantity-controls input");

          quantityDecrease.addEventListener("click", function () {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
              quantityInput.value = value - 1;
            }
          });

          quantityIncrease.addEventListener("click", function () {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
              quantityInput.value = value + 1;
            }
          });

          // Size and color selection
          const sizeButtons = modal.querySelectorAll(".size-options button");
          sizeButtons.forEach((button) => {
            button.addEventListener("click", function () {
              sizeButtons.forEach((btn) => btn.classList.remove("selected"));
              this.classList.add("selected");
            });
          });

          const colorButtons = modal.querySelectorAll(
            ".color-options .color-btn"
          );
          colorButtons.forEach((button) => {
            button.addEventListener("click", function () {
              colorButtons.forEach((btn) => btn.classList.remove("selected"));
              this.classList.add("selected");
            });
          });

          // Add to cart functionality
          const addToCartBtn = modal.querySelector(".add-to-cart-btn");
          addToCartBtn.addEventListener("click", function () {
            const quantity = modal.querySelector(
              ".quantity-controls input"
            ).value;
            const size = modal.querySelector(
              ".size-options button.selected"
            ).textContent;

            // Update cart count
            const cartCount = document.querySelector(".cart-count");
            if (cartCount) {
              cartCount.textContent =
                parseInt(cartCount.textContent) + parseInt(quantity);
            }

            // Show confirmation
            alert(`Added to cart: ${quantity} x ${productName} (Size ${size})`);

            // Close modal
            modal.style.display = "none";
            document.body.style.overflow = "auto";
          });
        } else {
          // Update existing modal with new product data
          modal.querySelector(".product-quick-view-image img").src =
            productImage;
          modal.querySelector(".product-quick-view-image img").alt =
            productName;
          modal.querySelector(".product-quick-view-details h2").textContent =
            productName;
          modal.querySelector(
            ".product-quick-view-details .price"
          ).textContent = productPrice;
          modal.querySelector(".product-quick-view-details a.btn").href =
            productLink;
        }

        // Show the modal
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    });
  }

  // Add to Cart Animation
  const addToCartBtns = document.querySelectorAll(
    ".product-card .add-to-cart-btn"
  );
  const cartCount = document.querySelector(".cart-count");

  if (addToCartBtns.length > 0 && cartCount) {
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        // Get product data
        const productCard = this.closest(".product-card");
        const productName = productCard.querySelector("h3").textContent;

        // Update cart count
        let count = parseInt(cartCount.textContent);
        cartCount.textContent = count + 1;

        // Add animation class
        cartCount.classList.add("pulse");

        // Remove animation class after animation completes
        setTimeout(() => {
          cartCount.classList.remove("pulse");
        }, 300);

        // Show added to cart message
        alert(`Added to cart: 1 x ${productName}`);
      });
    });
  }

  // Wishlist Toggle
  const wishlistBtns = document.querySelectorAll(".wishlist-btn");

  if (wishlistBtns.length > 0) {
    wishlistBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const icon = this.querySelector("i");
        if (icon) {
          if (icon.classList.contains("far")) {
            icon.classList.remove("far");
            icon.classList.add("fas");
            icon.style.color = "#e74c3c";

            // Get product name
            const productCard = this.closest(".product-card");
            if (productCard) {
              const productName = productCard.querySelector("h3").textContent;
              alert(`${productName} added to your wishlist!`);
            }
          } else {
            icon.classList.remove("fas");
            icon.classList.add("far");
            icon.style.color = "";

            // Get product name
            const productCard = this.closest(".product-card");
            if (productCard) {
              const productName = productCard.querySelector("h3").textContent;
              alert(`${productName} removed from your wishlist!`);
            }
          }
        }
      });
    });
  }
});



// Add CSS for animations
const style = document.createElement("style");
style.textContent = `
    .pulse {
        animation: pulse-animation 0.3s ease-in-out;
    }
    
    @keyframes pulse-animation {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); }
    }
    
    .search-form input.error {
        border-color: #e74c3c;
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
    
    /* Modal Styles */
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 1100;
        overflow-y: auto;
    }
    
    .modal-content {
        background-color: #fff;
        margin: 50px auto;
        max-width: 900px;
        width: 90%;
        border-radius: 8px;
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 1.8em;
        cursor: pointer;
        color: #333;
        z-index: 1;
    }
    
    .product-quick-view {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        padding: 30px;
    }
    
    @media (max-width: 768px) {
        .product-quick-view {
            grid-template-columns: 1fr;
        }
    }
    
    .product-quick-view-image img {
        width: 100%;
        height: auto;
        border-radius: 5px;
    }
    
    .product-quick-view-details h2 {
        font-size: 1.8em;
        margin-bottom: 10px;
    }
    
    .product-quick-view-details .product-rating {
        color: #f39c12;
        margin-bottom: 15px;
    }
    
    .product-quick-view-details .price {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 15px;
    }
    
    .product-quick-view-details .product-description {
        margin-bottom: 20px;
        line-height: 1.6;
        color: #555;
    }
    
    .product-quick-view-details .product-options {
        margin-bottom: 20px;
    }
    
    .product-quick-view-details .size-options,
    .product-quick-view-details .color-options {
        margin-bottom: 15px;
    }
    
    .product-quick-view-details h4 {
        margin-bottom: 8px;
        font-size: 1em;
    }
    
    .product-quick-view-details .option-buttons {
        display: flex;
        gap: 10px;
    }
    
    .product-quick-view-details .option-buttons button {
        width: 40px;
        height: 40px;
        border: 1px solid #ddd;
        background-color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .product-quick-view-details .option-buttons button.selected {
        border-color: #333;
        background-color: #333;
        color: #fff;
    }
    
    .product-quick-view-details .color-btn {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid transparent;
    }
    
    .product-quick-view-details .color-btn.selected {
        border-color: #333;
    }
    
    .product-quick-view-details .color-btn.black {
        background-color: #000;
    }
    
    .product-quick-view-details .color-btn.blue {
        background-color: #3498db;
    }
    
    .product-quick-view-details .color-btn.red {
        background-color: #e74c3c;
    }
    
    .product-quick-view-details .quantity-selector {
        margin-bottom: 20px;
    }
    
    .product-quick-view-details .quantity-controls {
        display: flex;
        align-items: center;
        max-width: 150px;
    }
    
    .product-quick-view-details .quantity-controls button {
        width: 40px;
        height: 40px;
        background-color: #f8f9fa;
        border: 1px solid #ddd;
        cursor: pointer;
        font-size: 1.2em;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .product-quick-view-details .quantity-controls input {
        width: 60px;
        height: 40px;
        text-align: center;
        border: 1px solid #ddd;
        border-left: none;
        border-right: none;
    }
    
    .product-quick-view-details .product-actions {
        display: flex;
        gap: 15px;
    }
    
    .product-quick-view-details .product-actions button,
    .product-quick-view-details .product-actions a {
        flex: 1;
    }
`;
document.head.appendChild(style);




