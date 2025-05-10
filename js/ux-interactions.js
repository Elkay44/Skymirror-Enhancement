// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Smooth scrolling
const smoothScroll = (target) => {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Navigation improvements
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navbarLinks = document.querySelector('.navbar-links');
  
  if (mobileMenuToggle && navbarLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      smoothScroll(this.getAttribute('href'));
    });
  });

  // Lazy loading images
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  });

  // Interactive hover effects
  const interactiveElements = document.querySelectorAll('.interactive');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.classList.add('hovered');
    });
    element.addEventListener('mouseleave', () => {
      element.classList.remove('hovered');
    });
  });

  // Chart animations
  const charts = document.querySelectorAll('.chart');
  charts.forEach(chart => {
    const animateChart = () => {
      const values = chart.dataset.values.split(',').map(Number);
      const labels = chart.dataset.labels.split(',');
      
      // Simple bar chart animation
      const bars = document.createElement('div');
      bars.className = 'chart-bars';
      
      values.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${value}%`;
        bar.style.animation = `chartGrow ${value/10}s ease-out forwards`;
        bar.dataset.label = labels[index];
        bars.appendChild(bar);
      });
      
      chart.appendChild(bars);
    };

    // Animate when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateChart();
          observer.unobserve(chart);
        }
      });
    });
    
    observer.observe(chart);
  });

  // Performance monitoring
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach(entry => {
        console.log(`Performance: ${entry.name} - ${entry.duration}ms`);
      });
    });
    
    observer.observe({ entryTypes: ['paint', 'measure'] });
  }
});

// Chart animation keyframes
@keyframes chartGrow {
  from {
    height: 0;
  }
  to {
    height: var(--height);
  }
}

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = `${scrollPercentage}%`;
});
