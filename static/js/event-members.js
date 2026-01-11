document.addEventListener('DOMContentLoaded', function() {
    // Данные участников
    const membersData = {
        1: {
            nickname: "Nadezhda007",
            firstName: "Надежда",
            lastName: "Петрова",
            about: "Любительница всего японского: аниме, книги, древний язык стихий. Изучая язык секунды, нечто о путешествии в страну восходящего солнца.",
            city: "Москва",
            email: "example1@gmail.com",
            phone: "12345678910"
        },
        2: {
            nickname: "NyaKawaiiOniChan",
            firstName: "Анна",
            lastName: "Смирнова",
            about: "Фанат косплея и японской культуры. Участвую в аниме-фестивалях с 2018 года.",
            city: "Санкт-Петербург",
            email: "nyakawaii@example.com",
            phone: "9876543210"
        },
        3: {
            nickname: "Xlazy",
            firstName: "Ярослав",
            lastName: "Лейко",
            about: "Создаю аниме-арты и участвую в тематических мероприятиях.",
            city: "Екатеринбург",
            email: "xlazy@mail.ru",
            phone: "5551234567"
        },
        4: {
            nickname: "Spanimeike",
            firstName: "Кирилл",
            lastName: "Скуратов",
            about: "Организатор аниме-встреч и просмотров. Люблю обсуждать новые сезоны аниме с единомышленниками.",
            city: "Екатеринбург",
            email: "spanimeike@gmail.ru",
            phone: "79123456789"
        },
        5: {
            nickname: "Bilweav",
            firstName: "Александр",
            lastName: "Кабаков",
            about: "Обожаю играть в компьютерные игры, люблю аниме, фильмы и мультфильмы.",
            city: "Екатеринбург",
            email: "bilweav@mail.ru",
            phone: "79001234567"
        },
        6: {
            nickname: "Sparrow8p",
            firstName: "Алексей",
            lastName: "Никонов",
            about: "Увлекаюсь японским языком и культурой. Посещаю языковые встречи и аниме-клубы.",
            city: "Екатеринбург",
            email: "sparrow8p@mail.ru",
            phone: "79241234567"
        },
        7: {
            nickname: "Lunara",
            firstName: "Эля",
            lastName: "Федотова",
            about: "Ответственная, руковожу всеми!",
            city: "Екатеринбург",
            email: "lunara@mail.ru",
            phone: "1526676910"
        }
    };

    // Элементы модального окна
    const modal = document.getElementById('member-modal');
    const modalAvatar = document.querySelector('.modal-avatar');
    const modalNickname = document.querySelector('.modal-nickname');
    const modalFirstName = document.querySelector('.modal-firstname');
    const modalLastName = document.querySelector('.modal-lastname');
    const modalAbout = document.querySelector('.member-about');
    const modalCity = document.querySelector('.member-city');
    const modalEmail = document.querySelector('.member-email');
    const modalPhone = document.querySelector('.member-phone');
    const closeBtn = document.querySelector('.close-modal');
    const writeButton = document.querySelector('.write-button');

    // Обработчики кликов на участников
    document.querySelectorAll('.participant').forEach(participant => {
        participant.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            const member = membersData[memberId];
            
            // Заполняем модальное окно данными
            modalAvatar.src = `img/avatars/member${memberId}.jpg`;
            modalNickname.textContent = member.nickname;
            modalFirstName.textContent = member.firstName;
            modalLastName.textContent = member.lastName;
            modalAbout.textContent = member.about;
            modalCity.textContent = member.city;
            modalEmail.textContent = member.email;
            modalPhone.textContent = member.phone;
            
            // Показываем модальное окно
            modal.style.display = "block";
        });
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Обработчик кнопки "Написать"
    writeButton.addEventListener('click', function() {
        alert('Функция "Написать" будет реализована в будущем обновлении');
    });
});