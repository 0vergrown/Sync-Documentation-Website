// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Logo Image Loader with Fallback
    function initLogoImage() {
        const logo = document.querySelector('.logo');
        const logoImage = logo.querySelector('.logo-image');

        if (!logoImage) return;

        // Set a timeout to show fallback if image takes too long
        const loadTimeout = setTimeout(() => {
            if (!logo.classList.contains('loaded')) {
                logo.classList.add('error');
                console.warn('Logo image took too long to load, falling back to text');
            }
        }, 3000); // 3 second timeout

        // Handle successful load
        logoImage.onload = function() {
            clearTimeout(loadTimeout);

            // Check if image is valid (not broken)
            if (this.naturalWidth === 0 || this.naturalHeight === 0) {
                logo.classList.add('error');
                console.warn('Logo image appears to be broken, falling back to text');
                return;
            }

            // Add loaded class with a small delay for smooth transition
            setTimeout(() => {
                logo.classList.add('loaded');
            }, 100);
        };

        // Handle load error
        logoImage.onerror = function() {
            clearTimeout(loadTimeout);
            logo.classList.add('error');
            console.warn('Failed to load logo image, falling back to text');
        };

        // Try loading the image programmatically
        const img = new Image();
        img.src = logoImage.src;

        // If image is already cached, trigger load event
        if (img.complete) {
            if (img.naturalWidth === 0 || img.naturalHeight === 0) {
                logoImage.onerror();
            } else {
                logoImage.onload();
            }
        }
    }

    // Call the function
    initLogoImage();
    
    // Theme Management
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Update active nav link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});