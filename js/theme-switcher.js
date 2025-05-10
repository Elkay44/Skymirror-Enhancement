// Theme Switcher for CheckMet Website

// Immediately apply theme to prevent flash of wrong theme
function applyTheme() {
  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem('checkmet-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
}

// Apply theme immediately before DOM is fully loaded
applyTheme();

document.addEventListener('DOMContentLoaded', function() {
  // Find theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  
  // If theme toggle exists, add click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (document.body.classList.contains('light-theme')) {
        // Switch to dark theme
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('checkmet-theme', 'dark');
      } else {
        // Switch to light theme
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('checkmet-theme', 'light');
      }
    });
  } else {
    console.warn('Theme toggle button not found, dark mode switching disabled');
  }
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('checkmet-theme')) {
      if (e.matches) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
      }
    }
  });
});
