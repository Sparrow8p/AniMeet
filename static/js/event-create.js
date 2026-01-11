// event-create.js
document.addEventListener('DOMContentLoaded', function() {
    // Обновление превью при изменении полей
    const form = document.getElementById('event-form');
    const previewTitle = document.getElementById('preview-title');
    const previewImage = document.getElementById('preview-image');
    const previewDate = document.getElementById('preview-date');
    const previewTime = document.getElementById('preview-time');
    const previewLocation = document.getElementById('preview-location');
    const previewParticipants = document.getElementById('preview-participants');

    // Обработчики для загрузки изображений
    document.getElementById('event-image').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('event-image-name').textContent = file.name;
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImage.innerHTML = `<img src="${event.target.result}" alt="Изображение мероприятия">`;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('event-chat-image').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('event-chat-image-name').textContent = file.name;
        }
    });

    // Обновление превью в реальном времени
    form.addEventListener('input', function() {
        // Название
        const title = document.getElementById('event-title').value || 'Название мероприятия';
        previewTitle.textContent = title;

        // Дата и время
        const date = document.getElementById('event-date').value || 'Дата не указана';
        const start = document.getElementById('event-start').value || '--:--';
        const end = document.getElementById('event-end').value || '--:--';
        
        previewDate.textContent = date;
        previewTime.textContent = `${start} - ${end}`;

        // Место
        const location = document.getElementById('event-location').value || 'Адрес не указан';
        previewLocation.textContent = location;

        // Участники
        const participants = document.getElementById('event-participants').value || '0';
        if (participants === '0') {
            previewParticipants.textContent = 'Участников: 0';
        } else {
            previewParticipants.textContent = `Участников: 0 из ${participants}`;
        }
    });

    // // Обработка отправки формы
    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();
        
    //     // Проверка обязательных полей
    //     const title = document.getElementById('event-title').value;
    //     if (!title) {
    //         alert('Пожалуйста, укажите название мероприятия');
    //         return;
    //     }
        
    //     const date = document.getElementById('event-date').value;
    //     if (!date) {
    //         alert('Пожалуйста, укажите дату мероприятия');
    //         return;
    //     }
        
    //     const start = document.getElementById('event-start').value;
    //     if (!start) {
    //         alert('Пожалуйста, укажите время начала мероприятия');
    //         return;
    //     }
        
    //     const location = document.getElementById('event-location').value;
    //     if (!location) {
    //         alert('Пожалуйста, укажите место проведения');
    //         return;
    //     }
        
    //     // Здесь должна быть логика сохранения мероприятия
    //     // alert('Мероприятие успешно создано!');
    //     // window.location.href = 'meets.html';
    // });
});