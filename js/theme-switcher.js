// Theme Switcher

// Check if theme toggle button exists
const themeToggle = document.getElementById('theme-toggle');
if (!themeToggle) {
    console.error('Theme toggle button not found!');
    return;
}

const body = document.body;
if (!body) {
    console.error('Body element not found!');
    return;
}

console.log('Theme switcher initialized');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
console.log('Saved theme:', savedTheme);

// Set initial theme
if (savedTheme === 'dark-theme') {
    console.log('Setting dark theme from localStorage');
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    console.log('Setting light theme');
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    console.log('Theme toggle clicked');
    if (body.classList.contains('light-theme')) {
        console.log('Switching to dark theme');
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        console.log('Switching to light theme');
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Listen for system preference changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
console.log('System prefers dark mode:', mediaQuery.matches);

mediaQuery.addEventListener('change', e => {
    console.log('System theme changed:', e.matches ? 'dark' : 'light');
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            console.log('Switching to dark theme based on system preference');
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            console.log('Switching to light theme based on system preference');
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light-theme');
        }
    }
});
});
