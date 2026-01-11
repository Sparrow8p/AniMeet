document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для уведомлений и профиля (как в calendar.js)
    const notificationsIcon = document.querySelector('.notifications-icon');
    const notificationsDropdown = document.querySelector('.notifications-dropdown');
    const nickname = document.querySelector('.nickname');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    notificationsIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationsDropdown.classList.toggle('show');
    });
    
    nickname.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', function() {
        notificationsDropdown.classList.remove('show');
        profileDropdown.classList.remove('show');
    });
    
    notificationsDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    profileDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Поиск мероприятий
    const searchInput = document.getElementById('event-search');
    const searchButton = document.querySelector('.search-button');
    
    const performSearch = () => {
        const searchText = searchInput.value.trim();
        const city = document.getElementById('city-input').value.trim();
        const category = document.getElementById('category-select').value;
        
        console.log('Ищем:', { searchText, city, category });
        // Здесь будет реальная логика поиска
    };
    
    searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && performSearch());
    searchButton.addEventListener('click', performSearch);
    
    // Обработчики для карточек мероприятий
    document.querySelectorAll('.event-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const eventTitle = this.closest('.event-card').querySelector('h3').textContent;
            alert(`Открываем мероприятие: ${eventTitle}`);
        });
    });
});