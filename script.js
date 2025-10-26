/**
 * Профессиональный лендинг IT-компании
 * Vanilla JavaScript - без зависимостей
 * СТАТИЧНЫЙ ДИЗАЙН - компенсирует браузерный зум
 */

(function() {
    'use strict';

    /* ===================================
       СТАТИЧЕСКИЙ САЙТ
       Чистый HTML/CSS/JS без фреймворков
       =================================== */

    /* ===================================
       УТИЛИТЫ
       =================================== */

    /**
     * Debounce функция для оптимизации событий скролла
     * @param {Function} func - Функция для выполнения
     * @param {Number} wait - Задержка в миллисекундах
     * @returns {Function}
     */
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

    /* ===================================
       НАВИГАЦИЯ И BURGER MENU
       =================================== */

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    /**
     * Переключение мобильного меню
     */
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    /**
     * Плавная прокрутка к секциям при клике на навигацию
     */
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Закрываем мобильное меню
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');

                // Плавная прокрутка
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ===================================
       STICKY NAVIGATION - убрано для производительности
       =================================== */

    // Header остается fixed без дополнительных изменений при скролле

    /* ===================================
       АНИМАЦИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ
       =================================== */

    /**
     * Intersection Observer для анимации элементов
     */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Отключаем наблюдение после анимации
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Наблюдаем за всеми элементами с классом animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    /* ===================================
       ВАЛИДАЦИЯ ФОРМЫ
       =================================== */

    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    /**
     * Валидация email
     * @param {String} email - Email для проверки
     * @returns {Boolean}
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Показ ошибки валидации
     * @param {HTMLElement} input - Поле ввода
     * @param {String} message - Сообщение об ошибке
     */
    function showError(input, message) {
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            input.classList.add('error');
        }
    }

    /**
     * Очистка ошибки валидации
     * @param {HTMLElement} input - Поле ввода
     */
    function clearError(input) {
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
            input.classList.remove('error');
        }
    }

    /**
     * Валидация поля имени
     * @param {String} name - Имя для проверки
     * @returns {Boolean}
     */
    function validateName(name) {
        if (!name || name.trim().length < 2) {
            showError(nameInput, 'Пожалуйста, введите ваше имя (минимум 2 символа)');
            return false;
        }
        clearError(nameInput);
        return true;
    }

    /**
     * Валидация поля email
     * @param {String} email - Email для проверки
     * @returns {Boolean}
     */
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

    /**
     * Валидация поля сообщения
     * @param {String} message - Сообщение для проверки
     * @returns {Boolean}
     */
    function validateMessage(message) {
        if (!message || message.trim().length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            return false;
        }
        clearError(messageInput);
        return true;
    }

    // Валидация в реальном времени
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

    /**
     * Обработка отправки формы
     */
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Получаем значения полей
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // Валидация всех полей
            const isNameValid = validateName(name);
            const isEmailValid = validateEmail(email);
            const isMessageValid = validateMessage(message);

            // Если все поля валидны, показываем модальное окно
            if (isNameValid && isEmailValid && isMessageValid) {
                // Здесь можно отправить данные на сервер
                // В демо версии просто показываем модальное окно
                openModal();

                // Очищаем форму
                contactForm.reset();

                // Очищаем все ошибки
                clearError(nameInput);
                clearError(emailInput);
                clearError(messageInput);
            } else {
                // Фокусируемся на первом поле с ошибкой
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

    /* ===================================
       МОДАЛЬНОЕ ОКНО
       =================================== */

    const modal = document.getElementById('success-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');

    /**
     * Открытие модального окна
     */
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
    }

    /**
     * Закрытие модального окна
     */
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Восстанавливаем прокрутку
    }

    // Закрытие по клику на оверлей
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Закрытие по клику на кнопку закрытия
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Закрытие по нажатию Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* ===================================
       ИНИЦИАЛИЗАЦИЯ
       =================================== */

    /**
     * Инициализация при загрузке страницы
     */
    document.addEventListener('DOMContentLoaded', function() {
        console.log('TechCore Digital - Website initialized successfully');

        // Прокручиваем страницу к самому верху при загрузке
        window.scrollTo(0, 0);
    });

    /**
     * Обработка загрузки всех ресурсов
     */
    window.addEventListener('load', function() {
        console.log('All resources loaded');

        // Еще раз прокручиваем к верху после полной загрузки
        window.scrollTo(0, 0);
    });

    // Форсируем прокрутку к верху при обновлении страницы
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Немедленная прокрутка к верху (выполняется сразу)
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

})();
