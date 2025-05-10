// Apply saved theme to all pages
document.addEventListener('DOMContentLoaded', function() {
  // Add theme toggle to all pages that don't have it
  if (!document.getElementById('theme-toggle')) {
    const navbar = document.querySelector('.navbar-links');
    if (navbar) {
      // Create theme toggle button
      const themeToggle = document.createElement('button');
      themeToggle.id = 'theme-toggle';
      themeToggle.className = 'theme-toggle';
      themeToggle.setAttribute('aria-label', 'Toggle dark mode');
      
      // Create icons
      const darkIcon = document.createElement('i');
      darkIcon.className = 'fas fa-moon dark-icon';
      
      const lightIcon = document.createElement('i');
      lightIcon.className = 'fas fa-sun light-icon';
      
      // Append to DOM
      themeToggle.appendChild(darkIcon);
      themeToggle.appendChild(lightIcon);
      
      // Insert before the last child (usually the demo button)
      if (navbar.lastChild) {
        navbar.insertBefore(themeToggle, navbar.lastChild);
      } else {
        navbar.appendChild(themeToggle);
      }
      
      // Add event listener
      themeToggle.addEventListener('click', toggleTheme);
    }
  }
  
  // Check and apply saved theme
  applyTheme();
});

// Toggle between light and dark themes
function toggleTheme() {
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
}

// Apply the saved theme or system preference
function applyTheme() {
  const savedTheme = localStorage.getItem('checkmet-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
}
