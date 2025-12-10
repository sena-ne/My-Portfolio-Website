// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', function() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Slideshow functionality
let slideIndices = [0, 0, 0];

document.addEventListener('DOMContentLoaded', function() {
    showSlides(0, 0);
    showSlides(0, 1);
    showSlides(0, 2);
});

function changeSlide(n, projectIndex) {
    showSlides(slideIndices[projectIndex] += n, projectIndex);
}

function showSlides(n, projectIndex) {
    let slides = document.querySelectorAll('.project-card')[projectIndex].querySelectorAll('.slide');
    
    if (n >= slides.length) {
        slideIndices[projectIndex] = 0;
    }
    if (n < 0) {
        slideIndices[projectIndex] = slides.length - 1;
    }
    
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    slides[slideIndices[projectIndex]].classList.add('active');
}

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
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
        }
    });
});

// Close mobile menu on link click
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : null;

        // prepare form data
        const formData = new FormData(form);

        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';
            }

            const res = await fetch('https://formspree.io/f/xqarylno', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (res.ok) {
                // success
                alert(`Thank you, ${formData.get('name') || 'there'}! Your message has been sent.`);
                form.reset();
            } else {
                // try to parse error message from response
                let errText = 'Submit failed. Please try again later.';
                try {
                    const data = await res.json();
                    if (data && data.error) errText = data.error;
                } catch (parseErr) {
                    // ignore parse error
                }
                alert(errText);
            }
        } catch (networkErr) {
            alert('Network error. Please check your connection and try again.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                if (originalBtnHtml) submitBtn.innerHTML = originalBtnHtml;
            }
        }
    });
}

    // Modal Slideshow Functionality
    const modal = document.getElementById('slideshowModal');
    const modalSlidesContainer = document.getElementById('modalSlides');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalBackdrop = document.getElementById('modalBackdrop');

    let modalSlideIndex = 0;
    let currentModalSlides = [];

    function openModalFromProject(slideshowContainer) {
        // collect slide content (prefer img tags, otherwise clone placeholder nodes)
        const slides = Array.from(slideshowContainer.querySelectorAll('.slide'));
        currentModalSlides = slides.map(s => {
            // try to find an img inside
            const img = s.querySelector('img');
            if (img) return { type: 'img', src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' };
            // otherwise, use inner HTML snapshot for placeholder nodes
            return { type: 'html', html: s.innerHTML };
        });

        if (currentModalSlides.length === 0) return;

        renderModalSlides();
        modalSlideIndex = 0;
        showModalSlide(0);
        openModal();
    }

    function renderModalSlides() {
        modalSlidesContainer.innerHTML = '';
        currentModalSlides.forEach((item, idx) => {
            const slideEl = document.createElement('div');
            slideEl.className = 'modal-slide';
            slideEl.setAttribute('data-index', idx);
            if (item.type === 'img') {
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.alt || '';
                slideEl.appendChild(img);
            } else {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = item.html;
                slideEl.appendChild(wrapper);
            }
            modalSlidesContainer.appendChild(slideEl);
        });
    }

    function openModal() {
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showModalSlide(n) {
        const slides = modalSlidesContainer.querySelectorAll('.modal-slide');
        if (!slides.length) return;
        if (n >= slides.length) modalSlideIndex = 0;
        if (n < 0) modalSlideIndex = slides.length - 1;

        slides.forEach(s => s.classList.remove('active'));
        slides[modalSlideIndex].classList.add('active');
    }

    modalPrev.addEventListener('click', () => { modalSlideIndex -= 1; showModalSlide(modalSlideIndex); });
    modalNext.addEventListener('click', () => { modalSlideIndex += 1; showModalSlide(modalSlideIndex); });
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') { modalSlideIndex -= 1; showModalSlide(modalSlideIndex); }
        if (e.key === 'ArrowRight') { modalSlideIndex += 1; showModalSlide(modalSlideIndex); }
    });

    // Attach handlers to each project's open button
    document.addEventListener('DOMContentLoaded', () => {
        const openBtns = document.querySelectorAll('.open-slideshow-btn');
        // Initialize thumbnail images for each project card
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const container = card.querySelector('.slideshow-container');
            const thumb = container ? container.querySelector('.card-thumb') : null;
            if (!thumb) return;

            // If card has data-thumb attribute, prefer it
            const dataThumb = card.getAttribute('data-thumb');
            if (dataThumb) {
                thumb.src = dataThumb;
                return;
            }

            // Otherwise, find first img inside slides
            const firstSlideImg = container.querySelector('.slide img');
            if (firstSlideImg && firstSlideImg.getAttribute('src')) {
                // Use a separate thumbnail image (keeps grid image independent)
                thumb.src = firstSlideImg.getAttribute('src');
                return;
            }

            // Fallback: leave existing placeholder data URI already set in HTML
        });

        openBtns.forEach(btn => {
            const container = btn.closest('.slideshow-container');
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModalFromProject(container);
            });
        });
    });

// Education section toggle
document.addEventListener('DOMContentLoaded', () => {
    const eduToggle = document.getElementById('educationToggle');
    const hiddenItem = document.getElementById('hidden-item');
    if (!eduToggle || !hiddenItem) return;
        const hideWrap = document.querySelector('.education-hide-wrap');
        const hideBtn = document.getElementById('educationHide');
        // ensure hide button is hidden initially
        if (hideWrap) hideWrap.style.display = 'none';

    eduToggle.addEventListener('click', () => {
        const isExpanded = eduToggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            // hide
            hiddenItem.classList.remove('revealed');
            hiddenItem.classList.add('hidden');
            eduToggle.setAttribute('aria-expanded', 'false');
            eduToggle.querySelector('.plus').textContent = '+';
            eduToggle.firstChild && (eduToggle.firstChild.nodeValue = eduToggle.firstChild.nodeValue);
                if (hideWrap) hideWrap.style.display = 'none';
        } else {
            // show
            hiddenItem.classList.remove('hidden');
            hiddenItem.classList.add('revealed');
            eduToggle.setAttribute('aria-expanded', 'true');
            eduToggle.querySelector('.plus').textContent = '-';
                if (hideWrap) hideWrap.style.display = 'flex';
        }
    });

        // Hide button handler: hide the hidden item and restore the 'Show me' button
        if (hideBtn) {
            hideBtn.addEventListener('click', () => {
                // hide the item
                hiddenItem.classList.remove('revealed');
                hiddenItem.classList.add('hidden');
                // update toggle state
                if (eduToggle) {
                    eduToggle.setAttribute('aria-expanded', 'false');
                    const plusEl = eduToggle.querySelector('.plus');
                    if (plusEl) plusEl.textContent = '+';
                }
                // hide the hide button wrapper
                if (hideWrap) hideWrap.style.display = 'none';
                // optionally scroll to the toggle position
                eduToggle && eduToggle.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }
});