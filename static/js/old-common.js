document.addEventListener('DOMContentLoaded', function() {
    // Данные пользователя
    const userData = {
        nickname: 'Spanimeike',
        fullName: 'Кирилл Скуратов',
        avatar: 'img/kartinka.png'
    };

    // Инициализация header
    initHeader(userData);
    
    // Инициализация footer
    initFooter();
    
    // Инициализация активного пункта меню
    initActiveMenuItem();
});

function initHeader(userData) {
    // Установка никнейма
    const nicknameElements = document.querySelectorAll('.nickname p');
    nicknameElements.forEach(el => {
        if (el.textContent === 'Загрузка...') {
            el.textContent = userData.nickname;
        }
    });

    // Установка аватара в header
    const headerAvatars = document.querySelectorAll('.verh li:last-child a img');
    headerAvatars.forEach(el => {
        el.src = userData.avatar;
    });

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

function initActiveMenuItem() {
    // Определяем текущую страницу
    const currentPage = window.location.pathname.split('/').pop();
    const pageMap = {
        'lk kalendar.html': 'Календарь мероприятий',
        'meets.html': 'Мероприятия',
        'chats.html': 'Чаты',
        'настройки.html': 'Настройки пользователя'
    };
    
    // Находим соответствующий пункт меню
    const menuItems = document.querySelectorAll('.nav-menu li a');
    menuItems.forEach(item => {
        const pageName = item.textContent.trim();
        const pageHref = item.getAttribute('href');
        
        if (pageMap[currentPage] === pageName || 
            currentPage === pageHref ||
            (currentPage === '' && pageHref === 'Главная.html')) {
            item.parentElement.classList.add('active');
        } else {
            item.parentElement.classList.remove('active');
        }
    });
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