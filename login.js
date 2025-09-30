// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Set dark theme as default
document.documentElement.setAttribute('data-theme', 'dark');
updateThemeIcon('dark');

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

// Password visibility toggle
const passwordToggle = document.getElementById('password-toggle');
const passwordInput = document.getElementById('password');

passwordToggle.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  
  const icon = passwordToggle.querySelector('i');
  icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});

// Form submission
const loginForm = document.getElementById('login-form');
const loginBtn = document.querySelector('.login-btn');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Show loading state
  btnText.style.display = 'none';
  btnLoader.classList.remove('hidden');
  loginBtn.disabled = true;
  
  // Simulate login process
  try {
    await simulateLogin(email, password);
    
    // Success - redirect to main app
    showToast('Login successful! Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
    
  } catch (error) {
    // Error handling
    showToast(error.message, 'error');
  } finally {
    // Reset button state
    btnText.style.display = 'inline';
    btnLoader.classList.add('hidden');
    loginBtn.disabled = false;
  }
});

// Simulate login API call
function simulateLogin(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation
      if (email === 'demo@buzzmeet.com' && password === 'demo123') {
        resolve({ success: true });
      } else if (!email || !password) {
        reject(new Error('Please fill in all fields'));
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 2000);
  });
}

// Social login handlers
document.querySelector('.google-btn').addEventListener('click', () => {
  showToast('Google login coming soon...', 'info');
});

document.querySelector('.microsoft-btn').addEventListener('click', () => {
  showToast('Microsoft login coming soon...', 'info');
});

// Sign up handlers
document.querySelector('.email-signup').addEventListener('click', () => {
  showToast('Email signup coming soon...', 'info');
});

document.querySelector('.phone-signup').addEventListener('click', () => {
  showToast('Phone signup coming soon...', 'info');
});

document.querySelector('.google-signup').addEventListener('click', () => {
  showToast('Google signup coming soon...', 'info');
});

document.querySelector('.apple-signup').addEventListener('click', () => {
  showToast('Apple signup coming soon...', 'info');
});

document.querySelector('.facebook-signup').addEventListener('click', () => {
  showToast('Facebook signup coming soon...', 'info');
});

document.querySelector('.twitter-signup').addEventListener('click', () => {
  showToast('X (Twitter) signup coming soon...', 'info');
});

document.querySelector('.linkedin-signup').addEventListener('click', () => {
  showToast('LinkedIn signup coming soon...', 'info');
});

document.querySelector('.yahoo-signup').addEventListener('click', () => {
  showToast('Yahoo signup coming soon...', 'info');
});

document.querySelector('.microsoft-signup').addEventListener('click', () => {
  showToast('Microsoft signup coming soon...', 'info');
});

document.querySelector('.github-signup').addEventListener('click', () => {
  showToast('GitHub signup coming soon...', 'info');
});

// Toast notification system
function showToast(message, type = 'info') {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  // Toast styles
  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    zIndex: '9999',
    transform: 'translateX(400px)',
    transition: 'transform 0.3s ease',
    maxWidth: '300px',
    wordWrap: 'break-word'
  });
  
  // Set background color based on type
  switch (type) {
    case 'success':
      toast.style.background = '#10B981';
      break;
    case 'error':
      toast.style.background = '#EF4444';
      break;
    case 'warning':
      toast.style.background = '#F59E0B';
      break;
    default:
      toast.style.background = '#6B7280';
  }
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, 4000);
}

// Form validation
const inputs = document.querySelectorAll('input[required]');
inputs.forEach(input => {
  input.addEventListener('blur', validateInput);
  input.addEventListener('input', clearValidation);
});

function validateInput(e) {
  const input = e.target;
  const value = input.value.trim();
  
  // Remove existing error styling
  input.classList.remove('error');
  
  if (!value) {
    showInputError(input, 'This field is required');
  } else if (input.type === 'email' && !isValidEmail(value)) {
    showInputError(input, 'Please enter a valid email address');
  }
}

function clearValidation(e) {
  const input = e.target;
  input.classList.remove('error');
  
  // Remove error message
  const errorMsg = input.parentNode.querySelector('.error-message');
  if (errorMsg) {
    errorMsg.remove();
  }
}

function showInputError(input, message) {
  input.classList.add('error');
  
  // Remove existing error message
  const existingError = input.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #EF4444;
    font-size: 12px;
    margin-top: 4px;
  `;
  
  input.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add error styling to CSS
const style = document.createElement('style');
style.textContent = `
  .form-group input.error {
    border-color: #EF4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Enter key to submit form
  if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
    e.preventDefault();
    loginForm.dispatchEvent(new Event('submit'));
  }
  
  // Escape key to clear form
  if (e.key === 'Escape') {
    loginForm.reset();
    clearAllValidations();
  }
});

function clearAllValidations() {
  inputs.forEach(input => {
    input.classList.remove('error');
    const errorMsg = input.parentNode.querySelector('.error-message');
    if (errorMsg) {
      errorMsg.remove();
    }
  });
}

// Auto-focus first input
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('email').focus();
});