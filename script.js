document.addEventListener('DOMContentLoaded', () => {
    // Background Slider Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 6000; // 6 seconds per slide

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);

    // Subtle Particles Generation
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Randomize size, position, and duration
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.top = `${posY}vh`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }

    // Parallax effect on mouse move
    const heroContent = document.querySelector('.content-wrapper');
    const tags = document.querySelectorAll('.tag');

    document.addEventListener('mousemove', (e) => {
        // Prevent parallax on small screens or touch devices where mousemove is unreliable
        if (window.innerWidth > 768) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 60;

            heroContent.style.transform = `translate(${xAxis}px, ${yAxis}px)`;

            tags.forEach((tag, index) => {
                const factor = (index + 2) * 20;
                const tX = (window.innerWidth / 2 - e.pageX) / factor;
                const tY = (window.innerHeight / 2 - e.pageY) / factor;
                // Add base animation transform by not overwriting it completely, or keep simple translate
                tag.style.transform = `translate(${tX}px, ${tY}px)`;
            });
        }
    });

    // Reset transform when mouse leaves window
    document.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            heroContent.style.transform = 'translate(0, 0)';
            tags.forEach(tag => {
                tag.style.transform = 'translate(0, 0)';
            });
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Scroll Indicator Visibility — uses IntersectionObserver for accurate hero detection
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.querySelector('.hero-content');

    if (scrollIndicator && heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hero is in view — show the scroll indicator
                    scrollIndicator.classList.remove('hidden');
                } else {
                    // Hero left the viewport — hide the scroll indicator
                    scrollIndicator.classList.add('hidden');
                }
            });
        }, {
            // Trigger when less than 30% of the hero is still visible
            threshold: 0.3
        });

        observer.observe(heroSection);
    }

    // Lazy Load Background Images
    const lazyBackgrounds = document.querySelectorAll('.lazy-bg');
    if (lazyBackgrounds.length > 0) {
        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const bgUrl = el.getAttribute('data-bg');
                    if (bgUrl) {
                        el.style.backgroundImage = `url('${bgUrl}')`;
                        el.removeAttribute('data-bg');
                    }
                    el.classList.remove('lazy-bg');
                    observer.unobserve(el);
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px',
            threshold: 0
        });

        lazyBackgrounds.forEach(bg => {
            bgObserver.observe(bg);
        });
    }
});
