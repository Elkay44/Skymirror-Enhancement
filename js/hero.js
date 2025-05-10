// Hero Section Animations and Interactions

document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    const particles = [];
    const particleContainer = document.querySelector('.hero-particles');
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random size and speed
        const size = Math.random() * 2 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color
        const colors = ['#1a56db', '#00a39d', '#f53838'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Add animation
        particle.style.animationDuration = Math.random() * 2 + 3 + 's';
        
        particleContainer.appendChild(particle);
        particles.push(particle);
    }

    // Update particle positions
    function updateParticles() {
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.left > window.innerWidth) {
                particle.style.left = `-${rect.width}px`;
                particle.style.top = Math.random() * window.innerHeight + 'px';
            }
        });
    }

    // Start particle animation
    setInterval(updateParticles, 1000);

    // Stats animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        
        const updateStat = () => {
            current += Math.ceil(target / 20);
            if (current > target) current = target;
            stat.textContent = current;
            if (current < target) requestAnimationFrame(updateStat);
        };

        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateStat();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(stat);
    });

    // Parallax effect
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Add hover effects to tech stack
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1)';
            item.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            item.style.boxShadow = 'none';
        });
    });
});
