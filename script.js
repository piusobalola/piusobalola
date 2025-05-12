document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

function animateSkills() {
    const skillsSection = document.getElementById('skills');
    const skillItems = skillsSection.querySelectorAll('ul > li > ul > li[data-level]');
    const sectionTop = skillsSection.offsetTop - window.innerHeight * 0.6; // Trigger earlier
    const sectionBottom = sectionTop + skillsSection.offsetHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + window.innerHeight;

    if (windowBottom > sectionTop && windowTop < sectionBottom) {
        skillItems.forEach(item => {
            const level = item.getAttribute('data-level');
            item.style.setProperty('--skill-level-scale', level / 100); // Scale for dynamic effect
            requestAnimationFrame(() => {
                item.classList.add('animated');
            });
        });
    } else {
        skillItems.forEach(item => {
            item.classList.remove('animated');
            item.style.setProperty('--skill-level-scale', 0); // Reset scale
        });
    }
}

function checkVisibility() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0; // Trigger even earlier

        if (isVisible && !section.classList.contains('visible')) {
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 120); // Slightly slower staggered delay
        }
    });
}

// Parallax effect on background
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    document.body.style.backgroundPositionY = `${scrollPosition * 0.3}px`; // Adjust multiplier for intensity
    animateSkills();
    checkVisibility();
});

window.addEventListener('resize', () => {
    animateSkills();
    checkVisibility();
});

window.addEventListener('load', () => {
    animateSkills();
    checkVisibility();
});