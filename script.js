
(function() {
    'use strict';



    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }


    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });




    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });


    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            input.classList.add('error');
        }
    }

    function clearError(input) {
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            input.classList.remove('error');
        }
    }

    function validateName(name) {
        if (!name || name.trim().length < 2) {
            showError(nameInput, 'Пожалуйста, введите ваше имя (минимум 2 символа)');
            return false;
        }
        clearError(nameInput);
        return true;
    }

    function validateEmail(email) {
        if (!email || email.trim() === '') {
            showError(emailInput, 'Пожалуйста, введите ваш email');
            return false;
        }
        if (!isValidEmail(email)) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    function validateMessage(message) {
        if (!message || message.trim().length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            return false;
        }
        clearError(messageInput);
        return true;
    }

    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            validateName(this.value);
        });

        nameInput.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearError(this);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this.value);
        });

        emailInput.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearError(this);
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            validateMessage(this.value);
        });

        messageInput.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearError(this);
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            const isNameValid = validateName(name);
            const isEmailValid = validateEmail(email);
            const isMessageValid = validateMessage(message);

            if (isNameValid && isEmailValid && isMessageValid) {
                openModal();

                contactForm.reset();

                clearError(nameInput);
                clearError(emailInput);
                clearError(messageInput);
            } else {
                if (!isNameValid) {
                    nameInput.focus();
                } else if (!isEmailValid) {
                    emailInput.focus();
                } else if (!isMessageValid) {
                    messageInput.focus();
                }
            }
        });
    }


    const modal = document.getElementById('success-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });


    document.addEventListener('DOMContentLoaded', function() {
        console.log('TechCore Digital - Website initialized successfully');

        window.scrollTo(0, 0);
    });

    window.addEventListener('load', function() {
        console.log('All resources loaded');

        window.scrollTo(0, 0);
    });

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

})();
