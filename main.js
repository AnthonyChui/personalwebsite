document.addEventListener('DOMContentLoaded', () => {
    // Navbar hover effect
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            const navRect = navLinks.getBoundingClientRect();
            navLinks.style.setProperty('--left', `${rect.left - navRect.left}px`);
            navLinks.style.setProperty('--width', `${rect.width}px`);
            navLinks.style.setProperty('--opacity', '1');
        });
    });

    navLinks.addEventListener('mouseleave', () => {
        // Don't hide the indicator if we're on the current section
        const currentSection = document.querySelector('.nav-links a.active');
        if (currentSection) {
            const rect = currentSection.getBoundingClientRect();
            const navRect = navLinks.getBoundingClientRect();
            navLinks.style.setProperty('--left', `${rect.left - navRect.left}px`);
            navLinks.style.setProperty('--width', `${rect.width}px`);
            navLinks.style.setProperty('--opacity', '1');
        } else {
            navLinks.style.setProperty('--opacity', '0');
        }
    });

    // Scroll spy functionality
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
                const rect = item.getBoundingClientRect();
                const navRect = navLinks.getBoundingClientRect();
                navLinks.style.setProperty('--left', `${rect.left - navRect.left}px`);
                navLinks.style.setProperty('--width', `${rect.width}px`);
                navLinks.style.setProperty('--opacity', '1');
            }
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation
    gsap.from('.hero-content > *', {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Batch animations for better performance
    const batchAnimations = [
        {
            targets: '.about-content > *',
            vars: { x: -100 }
        },
        {
            targets: '.project-card',
            vars: { y: 100 }
        },
        {
            targets: '.experience-item',
            vars: { x: 100 }
        },
        {
            targets: '.blog-card',
            vars: { y: 50 }
        },
        {
            targets: '.contact-form, .contact-info',
            vars: { y: 50 }
        },
        {
            targets: '.section-title',
            vars: { y: 30 }
        }
    ];

    batchAnimations.forEach(animation => {
        const elements = document.querySelectorAll(animation.targets);
        if (elements.length) {
            gsap.set(elements, { opacity: 0, ...animation.vars }); // Set initial state
            
            ScrollTrigger.batch(elements, {
                start: "top bottom-=100",
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    ...animation.vars,
                    duration: 1,
                    stagger: 0.1,
                    x: 0,
                    y: 0,
                    ease: "power3.out"
                }),
                onLeave: batch => gsap.set(batch, {
                    opacity: 0,
                    ...animation.vars
                }),
                onEnterBack: batch => gsap.to(batch, {
                    opacity: 1,
                    ...animation.vars,
                    duration: 1,
                    stagger: 0.1,
                    x: 0,
                    y: 0,
                    ease: "power3.out"
                }),
                onLeaveBack: batch => gsap.set(batch, {
                    opacity: 0,
                    ...animation.vars
                }),
                markers: false,
                preventOverlaps: true,
                fastScrollEnd: true,
                toggleClass: "active"
            });
        }
    });

    const carousel = document.querySelector('.image-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    const slidesPerView = 3;
    const totalSlides = slides.length;
    let isScrolling = false;
    
    function updateCarousel(direction) {
        if (isScrolling) return;
        isScrolling = true;
        
        if (direction === 'next') {
            currentIndex += 1;
            if (currentIndex >= totalSlides - 2) {
                currentIndex = totalSlides - 3;
            }
        } else {
            currentIndex -= 1;
            if (currentIndex < 0) {
                currentIndex = 0;
            }
        }
        
        const offset = currentIndex * (carousel.offsetWidth / slidesPerView + 16);
        carousel.scrollTo({
            left: offset,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }
    
    // Click events for navigation buttons
    prevButton.addEventListener('click', () => updateCarousel('prev'));
    nextButton.addEventListener('click', () => updateCarousel('next'));

    // Background Image Cycler
    const backgroundImages = [
        'assets/images/hero-bg.jpg',
        'assets/images/hero-bg4.jpeg',
        'assets/images/hero-bg6.jpeg',
        'assets/images/hero-bg9.jpeg',
        'assets/images/hero-bg10.jpeg',
        'assets/images/hero-bg12.jpeg'
    ];
    
    let currentBgIndex = 0;
    const homeSection = document.getElementById('home');
    
    // Set initial background immediately without transition
    homeSection.style.transition = 'none';  // Disable transition initially
    homeSection.style.backgroundImage = `linear-gradient(
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
    ), url('${backgroundImages[0]}')`;
    homeSection.style.opacity = '1';
    
    // Re-enable transitions after initial load
    setTimeout(() => {
        homeSection.style.transition = 'opacity 0.3s ease';
    }, 100);
    
    // Preload all images
    backgroundImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    function cycleBackground() {
        currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
        
        homeSection.style.opacity = '0';
        
        setTimeout(() => {
            homeSection.style.backgroundImage = `linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
            ), url('${backgroundImages[currentBgIndex]}')`;
            homeSection.style.opacity = '1';
        }, 300);
    }
    
    // Add click event to home section
    homeSection.addEventListener('click', cycleBackground);

    // Particle effect configuration
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}); 

// Initialize EmailJS
(function() {
    emailjs.init("Z_nYm8iELKoJ9_bNE"); // Add your EmailJS public key here
})();

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Form submitted');
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    console.log('Form data:', formData);

    emailjs.send('service_uy48znv', 'template_xu0j88g', formData)
    .then(response => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
    })
    .catch(error => {
        console.error('FAILED...', error);
        alert('Failed to send message. Please try again.');
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});