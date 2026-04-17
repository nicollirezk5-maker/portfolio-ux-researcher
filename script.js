document.addEventListener('DOMContentLoaded', () => {
    // Editorial Studio Cursor & Interaction
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        if(cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }
        if(follower) {
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;
        }
        
        requestAnimationFrame(animate);
    }
    animate();

    // Magnetic & Scale Hover Effects
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .exp-card, .hamburger');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(follower) {
                follower.style.width = '80px';
                follower.style.height = '80px';
                follower.style.backgroundColor = 'var(--text-primary)';
                follower.style.opacity = '0.05';
                follower.style.borderColor = 'transparent';
            }
            if(cursor) {
                cursor.style.width = '12px';
                cursor.style.height = '12px';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if(follower) {
                follower.style.width = '30px';
                follower.style.height = '30px';
                follower.style.backgroundColor = 'transparent';
                follower.style.opacity = '1';
                follower.style.borderColor = 'var(--text-primary)';
            }
            if(cursor) {
                cursor.style.width = '6px';
                cursor.style.height = '6px';
            }
        });
    });

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Navbar & Menu Logic
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
            
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (!navLinks.classList.contains('active')) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
                if(currentScroll > 50) {
                    navbar.style.backgroundColor = 'var(--bg-primary)';
                    navbar.style.borderBottom = '1px solid var(--border-color)';
                } else {
                    navbar.style.backgroundColor = 'transparent';
                    navbar.style.borderBottom = 'none';
                }
            }
        }
        lastScroll = currentScroll;
    });
});