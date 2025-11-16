// ============================================
// Product Page JavaScript
// ============================================

// ============================================
// Scroll to Top Button
// ============================================
function initScrollTopButton() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (!scrollTopBtn) return;

    window.addEventListener("scroll", () => {
        const scrollThreshold = 300;
        if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ============================================
// Color Picker Functionality
// ============================================
// Color picker removed for products. Placeholder retained to avoid reference errors.

// ============================================
// Add to Cart Handler
// ============================================
function initAddToCart() {
    const addToCartBtn = document.getElementById("addToCartBtn");
    if (!addToCartBtn) return;

    addToCartBtn.addEventListener("click", handleAddToCart);
}

function handleAddToCart(e) {
    const cartCountElement = document.querySelector(".cart-count");
    if (!cartCountElement) return;

    let currentCount = parseInt(cartCountElement.textContent) || 0;

    if (currentCount === 0) {
        cartCountElement.style.display = "inline-block";
    }

    cartCountElement.textContent = currentCount + 1;

    // Add animation effect
    const btn = e.currentTarget;
    btn.style.transform = "scale(1.1)";
    setTimeout(() => {
        btn.style.transform = "scale(1)";
    }, 200);

    // Show feedback message
    showNotification("Item added to cart!");
}

// ============================================
// Notification System
// ============================================
function showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Add animation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
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

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// Image Zoom (Optional)
// ============================================
function initImageZoom() {
    const productImage = document.getElementById("productImage");
    if (!productImage) return;

    productImage.addEventListener("click", () => {
        if (productImage.requestFullscreen) {
            productImage.requestFullscreen();
        }
    });
}

// ============================================
// Initialize All Functions
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    initScrollTopButton();
    initAddToCart();
    initImageZoom();
});
