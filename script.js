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
// Color picker removed: no-op placeholder kept to avoid errors if referenced.

// ============================================
// Shopping Cart Counter
// ============================================
function initCartCounter() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons.length === 0) return;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
}

function handleAddToCart(e) {
    const cartCountElement = document.querySelector('.cart-count');
    if (!cartCountElement) return;

    let currentCount = parseInt(cartCountElement.textContent) || 0;

    if (currentCount === 0) {
        cartCountElement.style.display = 'inline-block';
    }

    cartCountElement.textContent = currentCount + 1;

    // Add animation effect
    const btn = e.currentTarget;
    btn.style.transform = "scale(1.2)";
    setTimeout(() => {
        btn.style.transform = "scale(1)";
    }, 200);
}

// ============================================
// Initialize All Functions
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollTopButton();
    initCartCounter();
});
