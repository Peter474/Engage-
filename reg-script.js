// ============================================
// Registration Form Validation & Logic
// ============================================

// ============================================
// Validation Patterns
// ============================================
const VALIDATION_PATTERNS = {
    name: {
        pattern: /^[a-zA-Z\s]{3,}$/,
        message: "Name must be more than 3 characters and contain only letters"
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address"
    },
    age: {
        check: (age) => age > 18,
        message: "You must be over 18 years old"
    },
    password: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
        message: "Password must be at least 9 characters with uppercase, lowercase, number, and special character"
    }
};

// ============================================
// Form Validation
// ============================================
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const password = document.getElementById("password").value;

    let isValid = true;

    // Validate name
    if (!VALIDATION_PATTERNS.name.pattern.test(name)) {
        setError("nameError", VALIDATION_PATTERNS.name.message);
        isValid = false;
    } else {
        clearError("nameError");
    }

    // Validate email
    if (!VALIDATION_PATTERNS.email.pattern.test(email)) {
        setError("emailError", VALIDATION_PATTERNS.email.message);
        isValid = false;
    } else {
        clearError("emailError");
    }

    // Validate age
    if (!VALIDATION_PATTERNS.age.check(age)) {
        setError("ageError", VALIDATION_PATTERNS.age.message);
        isValid = false;
    } else {
        clearError("ageError");
    }

    // Validate password
    if (!VALIDATION_PATTERNS.password.pattern.test(password)) {
        setError("passwordError", VALIDATION_PATTERNS.password.message);
        isValid = false;
    } else {
        clearError("passwordError");
    }

    return isValid;
}

// ============================================
// Error Handling
// ============================================
function setError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = "";
    }
}

// ============================================
// Save Form Data
// ============================================
function saveData() {
    if (validateForm()) {
        const userData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            age: parseInt(document.getElementById("age").value),
            signupDate: new Date().toLocaleDateString()
        };

        try {
            localStorage.setItem("userData", JSON.stringify(userData));
            console.log("User Data Saved:", userData);

            // Show success elements
            document.getElementById("gift").style.display = "inline-block";
            
            // Disable form
            disableForm();
        } catch (error) {
            console.error("Error saving data:", error);
            showNotification("Error saving data. Please try again.", "error");
        }
    }
}

// ============================================
// Disable Form After Submission
// ============================================
function disableForm() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.disabled = true;
        input.style.opacity = "0.6";
    });

    const button = document.querySelector(".button");
    if (button) {
        button.disabled = true;
        button.style.opacity = "0.6";
    }
}

// ============================================
// Show Success Message
// ============================================
function showMessage() {
    const messageElement = document.getElementById("message");
    if (messageElement.style.display === "none" || messageElement.style.display === "") {
        messageElement.style.display = "block";
    } else {
        messageElement.style.display = "none";
    }
}

// ============================================
// Toggle Password Visibility
// ============================================
function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleIcon = document.querySelector(".toggle-password");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: bold;
        animation: slideIn 0.3s ease;
        background-color: ${type === "error" ? "#dc3545" : "#28a745"};
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// Real-time Validation
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const ageInput = document.getElementById("age");
    const passwordInput = document.getElementById("password");

    // Name validation on blur
    if (nameInput) {
        nameInput.addEventListener("blur", () => {
            if (!nameInput.value.trim()) {
                clearError("nameError");
            } else if (!VALIDATION_PATTERNS.name.pattern.test(nameInput.value)) {
                setError("nameError", VALIDATION_PATTERNS.name.message);
            } else {
                clearError("nameError");
            }
        });
    }

    // Email validation on blur
    if (emailInput) {
        emailInput.addEventListener("blur", () => {
            if (!emailInput.value.trim()) {
                clearError("emailError");
            } else if (!VALIDATION_PATTERNS.email.pattern.test(emailInput.value)) {
                setError("emailError", VALIDATION_PATTERNS.email.message);
            } else {
                clearError("emailError");
            }
        });
    }

    // Age validation on blur
    if (ageInput) {
        ageInput.addEventListener("blur", () => {
            const age = parseInt(ageInput.value);
            if (!ageInput.value) {
                clearError("ageError");
            } else if (!VALIDATION_PATTERNS.age.check(age)) {
                setError("ageError", VALIDATION_PATTERNS.age.message);
            } else {
                clearError("ageError");
            }
        });
    }

    // Password validation on blur
    if (passwordInput) {
        passwordInput.addEventListener("blur", () => {
            if (!passwordInput.value) {
                clearError("passwordError");
            } else if (!VALIDATION_PATTERNS.password.pattern.test(passwordInput.value)) {
                setError("passwordError", VALIDATION_PATTERNS.password.message);
            } else {
                clearError("passwordError");
            }
        });
    }
});

// ============================================
// Enter Key Submission
// ============================================
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName === "INPUT") {
            saveData();
        }
    }
});
