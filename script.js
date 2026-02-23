
const nav = document.getElementById('nav');
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const contactForm = document.querySelector('.contact-form');

function handleScroll() {
    const y = window.scrollY;

    if (y > 40) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    let current = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const height = section.offsetHeight;
        const start = top - 160;
        const end = start + height;

        if (y >= start && y < end) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        const id = link.getAttribute('data-section');
        if (id === current) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const navHeight = nav.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const finalY = targetTop - navHeight - 8;

    window.scrollTo({
        top: finalY,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', handleScroll);

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navList.classList.toggle('show');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const sectionId = link.getAttribute('data-section');
        smoothScroll(sectionId);
        navToggle.classList.remove('active');
        navList.classList.remove('show');
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        contactForm.reset();
        alert('Thank you for sharing your commute details.');
    });
}

handleScroll();
