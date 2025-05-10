// Preloader
$(window).on('load', function() {
    $('.preloader').fadeOut(500);
});

// Mobile Menu
$('.mobile-menu').on('click', function() {
    $('.mainmenu').slideToggle();
});

// Header Scroll Effect
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.header-area').addClass('header-scrolled');
    } else {
        $('.header-area').removeClass('header-scrolled');
    }
});

// Smooth Scroll
$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
            return false;
        }
    }
});

// Counter Up
$('.counter').counterUp({
    delay: 10,
    time: 2000
});

// Magnific Popup
$('.image-popup').magnificPopup({
    type: 'image',
    gallery: {
        enabled: true
    }
});

// Owl Carousel
$('.testimonial-slider').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        992: {
            items: 3
        }
    }
});

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
}

// Contact Form
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Here you would typically send the form data to your server
            // For now, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Thank you for your message!</h3>
                <p>We will get back to you within 24 hours.</p>
            `;
            this.parentNode.insertBefore(successMessage, this);
            this.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `
                <div class="error-icon"><i class="fas fa-exclamation-circle"></i></div>
                <h3>Oops! Something went wrong</h3>
                <p>Please try again later.</p>
            `;
            this.parentNode.insertBefore(errorMessage, this);
            
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}
