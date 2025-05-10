/**
 * Universal Dark Mode Implementation for CheckMet
 * This script fixes the dark mode issues across all pages
 */

// Immediately apply the theme to prevent flash of unstyled content
(function() {
  const savedTheme = localStorage.getItem('checkmet-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark-theme');
    document.documentElement.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.documentElement.classList.add('light-theme');
    document.documentElement.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  }
})();

// Main functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Make sure the theme toggle exists in the navigation
  ensureThemeToggle();
  
  // Set up event listeners
  setupThemeToggle();
  
  // Listen for system preference changes
  watchSystemPreference();
});

// Make sure theme toggle exists on every page
function ensureThemeToggle() {
  // If toggle doesn't exist yet, create it
  if (!document.getElementById('theme-toggle')) {
    const navbar = document.querySelector('.navbar-links');
    if (navbar) {
      // Find the demo button to insert before
      const demoButton = navbar.querySelector('.btn-demo');
      
      // Create toggle button
      const toggle = document.createElement('button');
      toggle.id = 'theme-toggle';
      toggle.className = 'theme-toggle';
      toggle.setAttribute('aria-label', 'Toggle dark mode');
      
      // Create icons
      const moonIcon = document.createElement('i');
      moonIcon.className = 'fas fa-moon dark-icon';
      
      const sunIcon = document.createElement('i');
      sunIcon.className = 'fas fa-sun light-icon';
      
      // Assemble the button
      toggle.appendChild(moonIcon);
      toggle.appendChild(sunIcon);
      
      // Add to navbar
      if (demoButton) {
        navbar.insertBefore(toggle, demoButton);
      } else {
        navbar.appendChild(toggle);
      }
    }
  }
}

// Set up the theme toggle click handler
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (document.body.classList.contains('light-theme')) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    });
  }
}

// Set dark theme
function setDarkTheme() {
  document.documentElement.classList.add('dark-theme');
  document.documentElement.classList.remove('light-theme');
  document.body.classList.add('dark-theme');
  document.body.classList.remove('light-theme');
  localStorage.setItem('checkmet-theme', 'dark');
}

// Set light theme
function setLightTheme() {
  document.documentElement.classList.add('light-theme');
  document.documentElement.classList.remove('dark-theme');
  document.body.classList.add('light-theme');
  document.body.classList.remove('dark-theme');
  localStorage.setItem('checkmet-theme', 'light');
}

// Watch for system preference changes
function watchSystemPreference() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('checkmet-theme')) {
      if (e.matches) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    }
  });
}
