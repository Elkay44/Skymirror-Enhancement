/**
 * CheckMet - Main JavaScript
 * Handles interactive elements and animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
  const navbarLinks = document.querySelector('.navbar-links');
  
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      navbarLinks.classList.toggle('active');
      mobileMenuButton.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navbarLinks && navbarLinks.classList.contains('active')) {
      if (!navbarLinks.contains(event.target) && !mobileMenuButton.contains(event.target)) {
        navbarLinks.classList.remove('active');
        mobileMenuButton.classList.remove('active');
      }
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Accounting for fixed header
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Scroll animations
  function handleScrollAnimations() {
    const elements = document.querySelectorAll('.section, .feature-card, .step, .hero-feature, .testimonial');
    
    elements.forEach(function(element) {
      const position = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if(position < screenPosition) {
        element.classList.add('fade-in');
      }
    });
  }
  
  // Run once on load
  handleScrollAnimations();
  
  // Then on scroll
  window.addEventListener('scroll', handleScrollAnimations);
  
  // Demo form validation
  const demoForm = document.querySelector('.demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let isValid = true;
      const requiredFields = demoForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (isValid) {
        // In a real implementation, this would submit the form data
        // For now, show a success message
        const formContainer = demoForm.parentElement;
        demoForm.style.display = 'none';
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success); margin-bottom: 1rem;"></i>
          <h3>Thank You!</h3>
          <p>Your demo request has been received. One of our team members will contact you shortly to schedule your personalized demo.</p>
        `;
        
        formContainer.appendChild(successMessage);
      }
    });
  }
  
  // Add responsive class to navbar on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
});
