document.addEventListener('DOMContentLoaded', function() {
    // Инициализация календаря с текущей датой
    let currentDate = new Date();
    
    const calendarBody = document.getElementById('calendar-body');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const cityInput = document.getElementById('city-input');
    const cityDropdown = document.getElementById('city-dropdown');
    const categorySelect = document.getElementById('category-select');
    
    // Модальное окно
    const eventModal = document.getElementById('event-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-event-title');
    const modalDate = document.getElementById('modal-event-date');
    const modalTime = document.getElementById('modal-event-time');
    const modalLocation = document.getElementById('modal-event-location');
    const modalParticipants = document.getElementById('modal-event-participants');
    const modalButton = document.getElementById('modal-event-button');
    const modalImage = document.getElementById('modal-event-image');
    const modalPrevBtn = document.createElement('button');
    const modalNextBtn = document.createElement('button');
    
    // Стилизация кнопок переключения
    modalPrevBtn.innerHTML = '&lt;';
    modalNextBtn.innerHTML = '&gt;';
    modalPrevBtn.className = 'modal-nav-btn modal-prev-btn';
    modalNextBtn.className = 'modal-nav-btn modal-next-btn';
    
    // Добавляем кнопки в модальное окно
    const modalImageContainer = document.querySelector('.modal-image-container');
    modalImageContainer.appendChild(modalPrevBtn);
    modalImageContainer.appendChild(modalNextBtn);
    
    // Данные событий (пример с несколькими событиями в один день)
    const eventsData = {
        '2025-6-18': [
            {
                title: 'Просмотр фильма "Атака титанов: Заключительная глава"',
                date: '18.06.2025',
                time: '18:30 - 21:00',
                location: 'Санкт-Петербург, кинотеатр "Аврора"',
                participants: '18 из 25',
                link: 'event-info.html?event=titans',
                image: 'img/titan-event.png'
            },
            {
                title: 'Встреча фанатов Наруто',
                date: '18.06.2025',
                time: '14:00 - 16:00',
                location: 'Санкт-Петербург, кафе "Акихабара"',
                participants: '10 из 15',
                link: 'event-info.html?event=naruto',
                image: 'img/naruto-event.png'
            }
        ],
        '2025-6-21': {
            title: 'Аниме-фестиваль Aniworld',
            date: '21.06.2025',
            time: '12:00 - 21:00',
            location: 'Москва, Новый Арбат, 21',
            participants: '320 (ограничений нет)',
            link: 'event-info.html?event=aniworld',
            isUserEvent: true,
            image: 'img/aniworld-event.png'
        }
    };
    
    // Переменные для хранения текущего события и списка событий в день
    let currentEventIndex = 0;
    let currentDayEvents = [];
    
    function generateCalendar() {
        calendarBody.innerHTML = '';
        
        const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
                          "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        currentMonthElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        let startingDay = firstDay.getDay();
        startingDay = startingDay === 0 ? 6 : startingDay - 1; // Пн=0, Вс=6
        
        let dayCount = 1;
        let nextMonthDayCount = 1;
        const weeks = Math.ceil((startingDay + daysInMonth) / 7);
        
        // Текущая дата для сравнения
        const today = new Date();
        const isCurrentMonth = currentDate.getMonth() === today.getMonth() && 
                              currentDate.getFullYear() === today.getFullYear();
        
        for (let i = 0; i < weeks; i++) {
            const row = document.createElement('tr');
            
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                
                if ((i === 0 && j < startingDay) || dayCount > daysInMonth) {
                    cell.textContent = dayCount > daysInMonth ? nextMonthDayCount++ : 
                                      (new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() - (startingDay - j - 1));
                    cell.classList.add('other-month');
                } else {
                    cell.textContent = dayCount;
                    
                    // Проверка событий
                    const eventKey = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${dayCount}`;
                    const hasEvent = eventsData[eventKey];
                    const isToday = isCurrentMonth && dayCount === today.getDate();
                    
                    if (isToday) cell.classList.add('today');
                    if (hasEvent) {
                        cell.classList.add('has-event');
                        
                        // Проверка на массив событий или одиночное событие
                        const isMultipleEvents = Array.isArray(hasEvent);
                        
                        if (isMultipleEvents) {
                            const userEvent = hasEvent.some(event => event.isUserEvent);
                            if (userEvent) cell.classList.add('user-event');
                        } else if (hasEvent.isUserEvent) {
                            cell.classList.add('user-event');
                        }
                        
                        // Обработчик клика на день с событием
                        cell.addEventListener('click', function() {
                            if (Array.isArray(hasEvent)) {
                                currentDayEvents = hasEvent;
                                currentEventIndex = 0;
                                showEventModal(currentDayEvents[currentEventIndex]);
                            } else {
                                currentDayEvents = [hasEvent];
                                currentEventIndex = 0;
                                showEventModal(hasEvent);
                            }
                        });
                    }
                    
                    dayCount++;
                }
                
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }
    
    function showEventModal(eventData) {
        modalTitle.textContent = eventData.title;
        modalDate.textContent = eventData.date;
        modalTime.textContent = eventData.time;
        modalLocation.textContent = eventData.location;
        modalParticipants.textContent = `Участников: ${eventData.participants}`;
        modalImage.src = eventData.image || 'img/event-placeholder.png';
        
        modalButton.onclick = function() {
            window.location.href = eventData.link;
        };
        
        // Показываем/скрываем кнопки навигации
        if (currentDayEvents.length > 1) {
            modalPrevBtn.style.display = 'block';
            modalNextBtn.style.display = 'block';
        } else {
            modalPrevBtn.style.display = 'none';
            modalNextBtn.style.display = 'none';
        }
        
        eventModal.style.display = 'flex';
    }
    
    // Обработчики кнопок навигации
    modalPrevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentEventIndex = (currentEventIndex - 1 + currentDayEvents.length) % currentDayEvents.length;
        showEventModal(currentDayEvents[currentEventIndex]);
    });
    
    modalNextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentEventIndex = (currentEventIndex + 1) % currentDayEvents.length;
        showEventModal(currentDayEvents[currentEventIndex]);
    });
    
    // Закрытие модального окна
    modalClose.addEventListener('click', function() {
        eventModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === eventModal) {
            eventModal.style.display = 'none';
        }
    });
    
    // Обработчики кнопок календаря
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });
    
    // Инициализация календаря при загрузке
    generateCalendar();
    
    // Обработчики для выпадающих меню (если common.js не подключен)
    if (typeof window.commonMenuHandlersInitialized === 'undefined') {
        const nickname = document.querySelector('.nickname');
        const profileDropdown = document.querySelector('.profile-dropdown');
        const notificationsIcon = document.querySelector('.notifications-icon');
        const notificationsDropdown = document.querySelector('.notifications-dropdown');
        
        if (nickname && profileDropdown) {
            nickname.addEventListener('click', function(e) {
                e.stopPropagation();
                profileDropdown.classList.toggle('show');
            });
        }
        
        if (notificationsIcon && notificationsDropdown) {
            notificationsIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                notificationsDropdown.classList.toggle('show');
            });
        }
        
        document.addEventListener('click', function() {
            if (profileDropdown) profileDropdown.classList.remove('show');
            if (notificationsDropdown) notificationsDropdown.classList.remove('show');
        });
        
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
        
        window.commonMenuHandlersInitialized = true;
    }
});