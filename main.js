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
        y: 50,
        duration: 1,
        stagger: 0.2,
        delay: 0.5
    });

    // About section animations
    gsap.from('.about-content > *', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.3
    });

    // Project cards animation
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.project-grid',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // Experience items animation
    gsap.from('.experience-item', {
        scrollTrigger: {
            trigger: '#experience',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3
    });

    // Blog cards animation
    gsap.from('.blog-card', {
        scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // Contact form animation
    gsap.from('.contact-form, .contact-info', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8
        });
    });

    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.children, {
            scrollTrigger: {
                trigger: section,
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });
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
        'assets/images/hero-bg.jpeg',
        'assets/images/hero-bg2.jpg',
        'assets/images/hero-bg4.jpeg',
        'assets/images/hero-bg5.JPG',
        'assets/images/hero-bg6.jpeg',
        'assets/images/hero-bg7.JPG',
        'assets/images/hero-bg9.jpeg',
        'assets/images/hero-bg10.jpeg',
        'assets/images/hero-bg12.jpeg'
    ];
    
    let currentBgIndex = 0;
    const homeSection = document.getElementById('home');
    
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
}); 