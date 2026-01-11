// Общие элементы для всех страниц (header/footer)
document.addEventListener('DOMContentLoaded', function() {
    // Данные пользователя (можно заменить на fetch)
    const userData = {
        nickname: 'Spanimeike',
        fullName: 'Кирилл Скуратов',
        avatar: 'img/kartinka.png'
    };

    // Инициализация header
    initHeader(userData);
    
    // Инициализация footer
    initFooter();
});

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

document.addEventListener('DOMContentLoaded', function() {
    // Обработчик кнопки "Записаться"
    const registerBtn = document.getElementById('event-register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            const isRegistered = this.classList.toggle('registered');
            this.textContent = isRegistered ? 'Вы записаны' : 'Записаться';
        });
    }
    
    // Обработчики для ссылок действий
    document.querySelectorAll('.event-action').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`Переход к: ${this.textContent}`);
        });
    });

    // Проверяем, загружен ли common.js
    if (typeof window.commonMenuHandlersInitialized === 'undefined') {
        // Инициализация выпадающих меню
        const initDropdowns = () => {
            const nickname = document.querySelector('.nickname');
            const profileDropdown = document.querySelector('.profile-dropdown');
            const notificationsIcon = document.querySelector('.notifications-icon');
            const notificationsDropdown = document.querySelector('.notifications-dropdown');

            // Профиль
            if (nickname && profileDropdown) {
                nickname.addEventListener('click', function(e) {
                    e.stopPropagation();
                    profileDropdown.classList.toggle('show');
                });
            }

            // Уведомления
            if (notificationsIcon && notificationsDropdown) {
                notificationsIcon.addEventListener('click', function(e) {
                    e.stopPropagation();
                    notificationsDropdown.classList.toggle('show');
                });
            }

            // Закрытие при клике вне меню
            document.addEventListener('click', function() {
                if (profileDropdown) profileDropdown.classList.remove('show');
                if (notificationsDropdown) notificationsDropdown.classList.remove('show');
            });

            // Предотвращение закрытия при клике внутри меню
            if (profileDropdown) {
                profileDropdown.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }

            if (notificationsDropdown) {
                notificationsDropdown.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }
        };

        initDropdowns();
        window.commonMenuHandlersInitialized = true;
    }
});