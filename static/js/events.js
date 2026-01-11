document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для уведомлений и профиля
    const notificationsIcon = document.querySelector('.notifications-icon');
    const notificationsDropdown = document.querySelector('.notifications-dropdown');
    const nickname = document.querySelector('.nickname');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (notificationsIcon && notificationsDropdown) {
        notificationsIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationsDropdown.classList.toggle('show');
        });
    }
    
    if (nickname && profileDropdown) {
        nickname.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });
    }
    
    document.addEventListener('click', function() {
        if (notificationsDropdown) notificationsDropdown.classList.remove('show');
        if (profileDropdown) profileDropdown.classList.remove('show');
    });
    
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

    // Поиск мероприятий
    // const searchInput = document.getElementById('event-search');
    const searchButton = document.querySelector('.search-button');
    
    const performSearch = () => {
        const searchText = searchInput.value.trim().toLowerCase();
        const city = document.getElementById('city-input').value.trim().toLowerCase();
        const category = document.getElementById('category-select').value.toLowerCase();
        
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const location = card.querySelector('.event-meta div:nth-child(3) span').textContent.toLowerCase();
            const matchesSearch = title.includes(searchText) || searchText === '';
            const matchesCity = location.includes(city) || city === '';
            const matchesCategory = category === '' || 
                                   (category === 'viewing' && title.includes('просмотр')) ||
                                   (category === 'meetup' && title.includes('встреча')) ||
                                   (category === 'cosplay' && (title.includes('косплей') || title.includes('мастер-класс'))) ||
                                   (category === 'festival' && title.includes('фестиваль'));
            
            if (matchesSearch && matchesCity && matchesCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && performSearch());
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // // Обработчики для кнопок "Подробнее"
    // document.querySelectorAll('.event-button').forEach(button => {
    //     button.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const eventId = this.getAttribute('href').split('=')[1];
    //         window.location.href = `event-info.html?event=${eventId}`;
    //     });
    // });
});