document.addEventListener('DOMContentLoaded', function() {
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    const initialTheme = savedTheme === 'dark' ? 'dark' : prefersDarkScheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', initialTheme);
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    
    // Add theme toggle to header
    const header = document.querySelector('.header-area');
    if (header) {
        header.appendChild(themeToggle);
    }
    
    // Update theme toggle icon
    function updateThemeToggleIcon() {
        const icon = document.createElement('svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            // Sun icon
            icon.innerHTML = `
                <path d="M12 2a10 10 0 0 0-3.16 19.69A10 10 0 0 0 12 22a10 10 0 0 0 3.16-2.31A10 10 0 0 0 12 2z"/>
                <path d="M12 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                <path d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            `;
        } else {
            // Moon icon
            icon.innerHTML = `
                <path d="M20.354 15.354a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-1.414-1.414l9-9z"/>
                <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/>
            `;
        }
        
        themeToggle.innerHTML = '';
        themeToggle.appendChild(icon);
    }
    
    // Handle theme toggle
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleIcon();
    });
    
    // Update theme toggle icon on page load
    updateThemeToggleIcon();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', event.matches ? 'dark' : 'light');
            updateThemeToggleIcon();
        }
    });
});
