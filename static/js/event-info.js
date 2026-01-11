document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметр event из URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');
    
    // Данные мероприятий
    const eventsData = {
        'titans': {
            title: 'Просмотр фильма "Атака титанов: Заключительная глава"',
            date: '18.06.2025',
            time: '18:30 - 21:00',
            location: 'Санкт-Петербург, кинотеатр "Аврора"',
            participants: '18 из 25',
            image: 'img/titan-event.png',
            description: {
                program: [
                    'Открытие мероприятия',
                    'Просмотр фильма',
                    'Обсуждение после просмотра',
                    'Фотосессия с тематическими декорациями'
                ],
                additional: [
                    'Фудкорт с японскими блюдами',
                    'Фотозона с тематическими декорациями',
                    'Розыгрыш призов'
                ]
            }
        },
        'immortal': {
            title: 'Встреча фанатов "Путешествия к бессмертию"',
            date: '18.07.2025',
            time: '18:00 - 22:27',
            location: 'Екатеринбург, Кафе "МАЛО САХАРА"',
            participants: '7 из 10',
            image: 'img/immortal-event.png',
            description: {
                program: [
                    'Знакомство участников',
                    'Обсуждение последних глав',
                    'Викторина по сюжету',
                    'Косплей-дефиле'
                ],
                additional: [
                    'Чайная церемония',
                    'Мастер-класс по каллиграфии',
                    'Фотозона в стиле аниме'
                ]
            }
        },
        'aniworld': {
            title: 'Аниме-фестиваль Aniworld',
            date: '21.06.2025',
            time: '12:00 - 21:00',
            location: 'Москва, Новый Арбат, 21',
            participants: '320 (ограничений нет)',
            image: 'img/aniworld-event.png',
            description: {
                program: [
                    'Открытие мероприятия. Объявление программы.',
                    'Первая часть дефиле.',
                    'Конкурс "найди сердечко" от Aniworld (Приз - фигурка).',
                    'Джаст денс (Участникам наборы стикеров).',
                    'Викторина по разным аниме (С призами).',
                    'Вторая часть дефиле.',
                    'Конкурсы по разным аниме (С призами).',
                    'Объявление победителей дефиле.'
                ],
                awards: [
                    '1 место - Кубок + Диплом + Фигурка + Подарки от мастеров маркета',
                    '2 место - Диплом + Набор стикеров + Набор значков + Подарки от мастеров маркета',
                    '3 место - Диплом + Набор стикеров + Подарки от мастеров маркета'
                ],
                additional: [
                    'Различные игры.',
                    'Стенды и фотозоны.',
                    'Маркет с различными товарами.',
                    'Фудкорт зона с различными кафешками.'
                ]
            }
        },
        'cosplay': {
            title: 'Мастер-класс по косплею',
            date: '12.07.2025',
            time: '15:00 - 17:30',
            location: 'Москва, Творческая студия "Акика"',
            participants: '20 из 20 (мест нет)',
            image: 'img/cosplay-event.png',
            description: {
                program: [
                    'Введение в косплей',
                    'Основы работы с материалами',
                    'Создание аксессуаров',
                    'Грим и укладка париков',
                    'Фотосессия участников'
                ],
                additional: [
                    'Индивидуальные консультации',
                    'Разбор портфолио',
                    'Чайная пауза'
                ]
            }
        },
        'naruto': {
            title: 'Встреча фанатов Наруто',
            date: '18.06.2025',
            time: '14:00 - 16:00',
            location: 'Санкт-Петербург, кафе "Акихабара"',
            participants: '10 из 15',
            image: 'img/naruto-event.png',
            description: {
                program: [
                    'Знакомство участников',
                    'Викторина по вселенной Наруто',
                    'Обсуждение любимых моментов',
                    'Косплей-дефиле',
                    'Настольные игры по мотивам аниме'
                ],
                additional: [
                    'Фотозона с тематическим фоном',
                    'Дегустация рамэна',
                    'Розыгрыш манги'
                ]
            }
        }
    };

    // Загружаем данные мероприятия
    if (eventId && eventsData[eventId]) {
        const event = eventsData[eventId];
        loadEventData(event);
    } else {
        // Если мероприятие не найдено, перенаправляем на страницу мероприятий
        window.location.href = 'meets.html';
    }

    // Функция загрузки данных мероприятия на страницу
    function loadEventData(event) {
        // Основная информация
        document.querySelector('.event-image img').src = event.image;
        document.querySelector('.event-details h3').textContent = event.title;
        
        // Мета-данные
        const metaItems = document.querySelectorAll('.event-meta-item');
        metaItems[0].querySelector('span').textContent = event.date;
        metaItems[1].querySelector('span').textContent = event.time;
        metaItems[2].querySelector('span').textContent = event.location;
        
        // Участники
        document.querySelector('.event-participants span').textContent = `Участников: ${event.participants}`;
        
        // Описание мероприятия
        const programList = document.querySelector('.program-list');
        programList.innerHTML = event.description.program.map(item => `<li>${item}</li>`).join('');
        
        // Обработка раздела "Вручения" (только для AniWorld)
        const awardsTitle = document.querySelector('.awards-title');
        const awardsList = document.querySelector('.awards-list');
        
        if (eventId === 'aniworld' && event.description.awards) {
            awardsList.innerHTML = event.description.awards.map(item => `<li>${item}</li>`).join('');
            awardsTitle.style.display = 'block';
            awardsList.style.display = 'block';
        } else {
            awardsTitle.style.display = 'none';
            awardsList.style.display = 'none';
        }
        
        // Дополнительная информация
        const additionalList = document.querySelector('.additional-list');
        additionalList.innerHTML = event.description.additional.map(item => `<li>${item}</li>`).join('');
        
        // Обработчик кнопки "Записаться"
        const registerBtn = document.getElementById('event-register-btn');
        if (registerBtn) {
            registerBtn.addEventListener('click', function() {
                const isRegistered = this.classList.toggle('registered');
                this.textContent = isRegistered ? 'Вы записаны' : 'Записаться';
            });
        }
    }

    // Общие элементы для всех страниц (header/footer)
    const userData = {
        nickname: 'Spanimeike',
        fullName: 'Кирилл Скуратов',
        avatar: 'img/kartinka.png'
    };

    // Инициализация header
    initHeader(userData);
    
    // Инициализация footer
    initFooter();

    function initHeader(userData) {
        // Установка никнейма
        const nicknameElement = document.querySelector('.nickname p');
        if (nicknameElement) {
            nicknameElement.textContent = userData.nickname;
        }

        // Установка аватара в header
        const headerAvatar = document.querySelector('.verh li:last-child a img');
        if (headerAvatar) {
            headerAvatar.src = userData.avatar;
        }

        // Обработчики для выпадающих меню
        setupDropdowns();
    }

    function initFooter() {
        // Добавляем девочку в футер, если её нет
        if (!document.querySelector('.footer-girl')) {
            const copyrightDiv = document.querySelector('.footer-copyright');
            if (copyrightDiv) {
                copyrightDiv.innerHTML += `<img src="img/girl.png" alt="Девочка" class="footer-girl">`;
            }
        }
    }

    function setupDropdowns() {
        // Уведомления
        const notificationsBtn = document.querySelector('.notifications-icon');
        const notificationsDropdown = document.querySelector('.notifications-dropdown');
        
        if (notificationsBtn && notificationsDropdown) {
            notificationsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                notificationsDropdown.classList.toggle('show');
            });
        }

        // Профиль
        const nickname = document.querySelector('.nickname');
        const profileDropdown = document.querySelector('.profile-dropdown');
        
        if (nickname && profileDropdown) {
            nickname.addEventListener('click', function(e) {
                e.stopPropagation();
                profileDropdown.classList.toggle('show');
            });
        }

        // Закрытие при клике вне меню
        document.addEventListener('click', function() {
            if (notificationsDropdown) notificationsDropdown.classList.remove('show');
            if (profileDropdown) profileDropdown.classList.remove('show');
        });

        // Предотвращение закрытия при клике внутри меню
        if (notificationsDropdown) {
            notificationsDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
        
        if (profileDropdown) {
            profileDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
});