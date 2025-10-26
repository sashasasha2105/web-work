<?php
// Пример данных вакансий (в реальном проекте это была бы база данных)
$vacancies = [
    [
        'id' => 1,
        'title' => 'Senior PHP Developer',
        'company' => 'Tech Solutions Inc.',
        'location' => 'Москва',
        'salary' => '200 000 - 300 000 руб.',
        'category' => 'development',
        'description' => 'Ищем опытного PHP разработчика для работы над enterprise проектами.',
        'posted' => '2025-10-20'
    ],
    [
        'id' => 2,
        'title' => 'Frontend Developer',
        'company' => 'Digital Agency',
        'location' => 'Санкт-Петербург',
        'salary' => '150 000 - 200 000 руб.',
        'category' => 'development',
        'description' => 'Требуется специалист по React и Vue.js для коммерческих проектов.',
        'posted' => '2025-10-22'
    ],
    [
        'id' => 3,
        'title' => 'UX/UI Designer',
        'company' => 'Creative Studio',
        'location' => 'Москва',
        'salary' => '120 000 - 180 000 руб.',
        'category' => 'design',
        'description' => 'Ищем креативного дизайнера с опытом работы в Figma.',
        'posted' => '2025-10-21'
    ],
    [
        'id' => 4,
        'title' => 'Project Manager',
        'company' => 'IT Consulting',
        'location' => 'Удаленно',
        'salary' => '180 000 - 250 000 руб.',
        'category' => 'management',
        'description' => 'Требуется опытный менеджер для управления IT проектами.',
        'posted' => '2025-10-19'
    ],
    [
        'id' => 5,
        'title' => 'QA Engineer',
        'company' => 'Software Company',
        'location' => 'Новосибирск',
        'salary' => '100 000 - 150 000 руб.',
        'category' => 'testing',
        'description' => 'Ищем тестировщика для автоматизации тестирования.',
        'posted' => '2025-10-23'
    ],
    [
        'id' => 6,
        'title' => 'DevOps Engineer',
        'company' => 'Cloud Systems',
        'location' => 'Москва',
        'salary' => '220 000 - 280 000 руб.',
        'category' => 'development',
        'description' => 'Требуется специалист по настройке CI/CD и облачной инфраструктуре.',
        'posted' => '2025-10-24'
    ],
    [
        'id' => 7,
        'title' => 'Marketing Manager',
        'company' => 'E-commerce Platform',
        'location' => 'Казань',
        'salary' => '130 000 - 170 000 руб.',
        'category' => 'marketing',
        'description' => 'Ищем маркетолога для продвижения онлайн-платформы.',
        'posted' => '2025-10-25'
    ],
    [
        'id' => 8,
        'title' => 'Data Scientist',
        'company' => 'Analytics Corp',
        'location' => 'Москва',
        'salary' => '250 000 - 350 000 руб.',
        'category' => 'analytics',
        'description' => 'Требуется специалист по машинному обучению и анализу данных.',
        'posted' => '2025-10-26'
    ]
];

// Обработка поискового запроса
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$category = isset($_GET['category']) ? $_GET['category'] : '';
$location = isset($_GET['location']) ? trim($_GET['location']) : '';

// Фильтрация вакансий
$filteredVacancies = array_filter($vacancies, function($vacancy) use ($search, $category, $location) {
    $matchSearch = empty($search) ||
                   stripos($vacancy['title'], $search) !== false ||
                   stripos($vacancy['company'], $search) !== false ||
                   stripos($vacancy['description'], $search) !== false;

    $matchCategory = empty($category) || $vacancy['category'] === $category;

    $matchLocation = empty($location) || stripos($vacancy['location'], $location) !== false;

    return $matchSearch && $matchCategory && $matchLocation;
});

// Получение уникальных категорий
$categories = [
    'development' => 'Разработка',
    'design' => 'Дизайн',
    'management' => 'Менеджмент',
    'testing' => 'Тестирование',
    'marketing' => 'Маркетинг',
    'analytics' => 'Аналитика'
];

$vacancyCount = count($filteredVacancies);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>JobSearch - Поиск вакансий</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <script>
        // Блокировка масштабирования через Ctrl+/- и Command+/- (Mac)
        document.addEventListener('keydown', function(event) {
            // Блокировка Ctrl и Command (Meta) с +, -, =, 0
            if ((event.ctrlKey || event.metaKey) &&
                (event.key === '+' || event.key === '-' || event.key === '=' ||
                 event.key === '0' || event.keyCode === 187 || event.keyCode === 189 ||
                 event.keyCode === 48 || event.keyCode === 96)) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        }, { passive: false });

        // Блокировка масштабирования колесом мыши с зажатым Ctrl/Command
        document.addEventListener('wheel', function(event) {
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        }, { passive: false });

        // Дополнительная блокировка для старых браузеров
        document.addEventListener('DOMMouseScroll', function(event) {
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        }, { passive: false });

        // Блокировка жестов масштабирования на тачпадах и сенсорных экранах
        let lastTouchDistance = 0;

        document.addEventListener('touchstart', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
                event.stopPropagation();
            }
        }, { passive: false });

        document.addEventListener('touchmove', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            if (event.scale && event.scale !== 1) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        }, { passive: false });

        document.addEventListener('touchend', function(event) {
            if (event.touches.length > 0) {
                event.preventDefault();
                event.stopPropagation();
            }
        }, { passive: false });

        // Блокировка gesturestart, gesturechange, gestureend (Safari)
        document.addEventListener('gesturestart', function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }, { passive: false });

        document.addEventListener('gesturechange', function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }, { passive: false });

        document.addEventListener('gestureend', function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }, { passive: false });

        // Принудительная установка масштаба при загрузке
        window.addEventListener('load', function() {
            document.body.style.zoom = 1;
        });

        // Мониторинг изменения масштаба и принудительный сброс
        let initialWidth = window.innerWidth;
        window.addEventListener('resize', function() {
            if (window.innerWidth !== initialWidth && Math.abs(window.innerWidth - initialWidth) < 100) {
                // Возможно это изменение масштаба
                document.body.style.zoom = 1;
            }
        });
    </script>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <h1 class="logo">💼 JobSearch</h1>
                <nav class="nav">
                    <a href="index.php" class="nav-link active">Вакансии</a>
                    <a href="#" class="nav-link">Компании</a>
                    <a href="#" class="nav-link">О нас</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h2 class="hero-title">Найдите работу вашей мечты</h2>
            <p class="hero-subtitle">Более 1000+ вакансий от лучших компаний</p>

            <!-- Search Form -->
            <form method="GET" action="index.php" class="search-form">
                <div class="search-inputs">
                    <div class="search-group">
                        <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <input
                            type="text"
                            name="search"
                            class="search-input"
                            placeholder="Должность или компания"
                            value="<?php echo htmlspecialchars($search); ?>"
                        >
                    </div>

                    <div class="search-group">
                        <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" stroke-width="2"/>
                            <path d="M10 1c-4.418 0-8 3.134-8 7 0 5.5 8 11 8 11s8-5.5 8-11c0-3.866-3.582-7-8-7z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <input
                            type="text"
                            name="location"
                            class="search-input"
                            placeholder="Город"
                            value="<?php echo htmlspecialchars($location); ?>"
                        >
                    </div>

                    <select name="category" class="search-select">
                        <option value="">Все категории</option>
                        <?php foreach ($categories as $key => $label): ?>
                            <option value="<?php echo $key; ?>" <?php echo $category === $key ? 'selected' : ''; ?>>
                                <?php echo $label; ?>
                            </option>
                        <?php endforeach; ?>
                    </select>

                    <button type="submit" class="search-btn">Найти</button>
                </div>
            </form>
        </div>
    </section>

    <!-- Vacancies Section -->
    <section class="vacancies">
        <div class="container">
            <div class="vacancies-header">
                <h3 class="vacancies-title">
                    Найдено вакансий: <span class="count"><?php echo $vacancyCount; ?></span>
                </h3>

                <?php if ($search || $category || $location): ?>
                    <a href="index.php" class="reset-filters">Сбросить фильтры</a>
                <?php endif; ?>
            </div>

            <?php if (empty($filteredVacancies)): ?>
                <div class="no-results">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <h4>Вакансии не найдены</h4>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            <?php else: ?>
                <div class="vacancy-grid">
                    <?php foreach ($filteredVacancies as $vacancy): ?>
                        <div class="vacancy-card">
                            <div class="vacancy-header">
                                <h4 class="vacancy-title"><?php echo htmlspecialchars($vacancy['title']); ?></h4>
                                <span class="vacancy-badge"><?php echo $categories[$vacancy['category']]; ?></span>
                            </div>

                            <div class="vacancy-company">
                                <?php echo htmlspecialchars($vacancy['company']); ?>
                            </div>

                            <p class="vacancy-description">
                                <?php echo htmlspecialchars($vacancy['description']); ?>
                            </p>

                            <div class="vacancy-details">
                                <div class="vacancy-detail">
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" stroke-width="2"/>
                                        <path d="M10 1c-4.418 0-8 3.134-8 7 0 5.5 8 11 8 11s8-5.5 8-11c0-3.866-3.582-7-8-7z" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                    <?php echo htmlspecialchars($vacancy['location']); ?>
                                </div>

                                <div class="vacancy-detail">
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                        <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                    <?php echo htmlspecialchars($vacancy['salary']); ?>
                                </div>
                            </div>

                            <div class="vacancy-footer">
                                <span class="vacancy-date">
                                    <?php
                                    $date = new DateTime($vacancy['posted']);
                                    echo $date->format('d.m.Y');
                                    ?>
                                </span>
                                <a href="#" class="vacancy-btn">Подробнее</a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>JobSearch</h4>
                    <p>Лучшая платформа для поиска работы в IT</p>
                </div>
                <div class="footer-section">
                    <h4>Разделы</h4>
                    <ul>
                        <li><a href="#">Вакансии</a></li>
                        <li><a href="#">Компании</a></li>
                        <li><a href="#">О нас</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Контакты</h4>
                    <ul>
                        <li><a href="#">Email: info@jobsearch.ru</a></li>
                        <li><a href="#">Тел: +7 (999) 123-45-67</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 JobSearch. Все права защищены.</p>
            </div>
        </div>
    </footer>
</body>
</html>
