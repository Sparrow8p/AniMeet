const chatData = {
    titan: {
        title: "Смотр Атаки Титанов",
        isGroup: true,
        avatar: "img/avatars/user2.jpg",
        participants: [
            { id: 1, name: "Spanimeike", avatar: "img/avatars/user1.jpg" },
            { id: 2, name: "Nadezhda007", avatar: "img/avatars/user5.jpg" }
        ],
        messages: [
            { userId: 2, text: 'Привет! Кто идёт на просмотр завтра?', time: '15:30', read: true },
            { userId: 1, text: 'Я буду! Уже билеты купил', time: '15:32', read: true }
        ],
        lastActive: "Сегодня, 15:45"
    },
    aniworld: {
        title: "Aniworld Fest",
        isGroup: true,
        avatar: "img/avatars/user3.jpg",
        participants: [
            { id: 1, name: "Spanimeike", avatar: "img/avatars/user1.jpg" },
            { id: 3, name: "AniFan42", avatar: "img/avatars/user3.jpg" }
        ],
        messages: [
            { userId: 3, text: 'Кто будет на фестивале в субботу?', time: '10:20', read: true },
            { userId: 1, text: 'Я планирую прийти после 14:00', time: '10:25', read: false }
        ],
        lastActive: "Вчера, 22:40"
    },
    animevibe: {
        title: "AnimeVibeEvening 18.07",
        isGroup: true,
        avatar: "img/avatars/user4.jpg",
        participants: [
            { id: 1, name: "Spanimeike", avatar: "img/avatars/user1.jpg" },
            { id: 4, name: "OtakuLover", avatar: "img/avatars/user4.jpg" }
        ],
        messages: [
            { userId: 4, text: 'Готовите что-то особенное на вечер?', time: '18:50', read: true },
            { userId: 1, text: 'Да, будет сюрприз!', time: '18:55', read: false }
        ],
        lastActive: "17.05.2025, 18:57"
    },
    nadezhda: {
        title: "Nadezhda007",
        isGroup: false,
        avatar: "img/avatars/user5.jpg",
        participants: [
            { id: 1, name: "Spanimeike", avatar: "img/avatars/user1.jpg" },
            { id: 2, name: "Nadezhda007", avatar: "img/avatars/user5.jpg" }
        ],
        messages: [
            { userId: 1, text: 'Завтра же здесь встречаемся?', time: '20:28', read: true },
            { userId: 2, text: 'Да, встречаемся у входа в 18:15', time: '20:30', read: false },
            { userId: 1, text: 'Ок. Также я хотел бы предложить пойти после кино в Хагакурэ. Еда там вкуснее и дешевле', time: '20:28', read: true }
        ],
        lastActive: "16.05.2025, 19:50"
    }
};

let currentChatId = null;
let replyingTo = null;

document.addEventListener('DOMContentLoaded', function() {
    renderChatList();
    loadChat('titan');
    setupEventListeners();
});

function renderChatList() {
    const chatList = document.getElementById('chat-list');
    chatList.innerHTML = '';

    Object.entries(chatData).forEach(([chatId, chat]) => {
        const lastMessage = chat.messages[chat.messages.length - 1];
        const chatItem = document.createElement('div');
        chatItem.className = `chat-item ${currentChatId === chatId ? 'active' : ''}`;
        chatItem.dataset.chat = chatId;
        
        chatItem.innerHTML = `
            <img src="${chat.avatar}" alt="Аватар" class="chat-avatar">
            <div class="chat-info">
                <div class="chat-name">${chat.title}</div>
                <div class="chat-preview">
                    ${lastMessage.userId === 1 ? 'Вы: ' : ''}
                    ${lastMessage.text.substring(0, 30)}${lastMessage.text.length > 30 ? '...' : ''}
                </div>
                <div class="chat-time">${chat.lastActive}</div>
            </div>
        `;
        
        chatList.appendChild(chatItem);
    });
}

function loadChat(chatId) {
    if (!chatData[chatId]) return;
    
    currentChatId = chatId;
    const chat = chatData[chatId];
    
    document.querySelector('.chat-header-avatar').src = chat.avatar;
    document.querySelector('.chat-title').textContent = chat.title;
    
    const organizerBlock = document.querySelector('.chat-header-right');
    if (chat.isGroup) {
        const organizer = chat.participants.find(p => p.id !== 1);
        organizerBlock.innerHTML = `
            <div class="organizer-info">
                <div class="organizer-name">${organizer.name}</div>
                <div class="organizer-label">Организатор</div>
            </div>
            <button class="write-button">Написать</button>
            <img src="${organizer.avatar}" alt="Организатор" class="organizer-avatar">
        `;
    } else {
        organizerBlock.innerHTML = '';
    }
    
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '';
    
    chat.messages.forEach(msg => {
        const user = chat.participants.find(p => p.id === msg.userId) || { avatar: chat.avatar };
        const isOutgoing = msg.userId === 1;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isOutgoing ? 'message-outgoing' : ''}`;
        messageDiv.innerHTML = `
            ${msg.replyTo ? `
            <div class="message-reply">
                ↪ ${msg.replyTo.userName}: ${msg.replyTo.text.substring(0, 50)}${msg.replyTo.text.length > 50 ? '...' : ''}
            </div>
            ` : ''}
            <img src="${user.avatar}" class="message-avatar">
            <div class="message-content">
                <div class="message-text">${msg.text}</div>
                <div class="message-time">${msg.time}</div>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
    });
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    renderChatList();
}

function setupEventListeners() {
    // Переключение чатов
    document.getElementById('chat-list').addEventListener('click', function(e) {
        const chatItem = e.target.closest('.chat-item');
        if (chatItem) {
            replyingTo = null; // Сбрасываем ответ при переключении
            document.querySelector('.reply-preview')?.remove();
            loadChat(chatItem.dataset.chat);
        }
    });

    // Кнопка "Написать" организатору
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('write-button')) {
            replyingTo = null;
            document.querySelector('.reply-preview')?.remove();
            loadChat('nadezhda');
        }
        
        if (e.target.classList.contains('cancel-reply')) {
            replyingTo = null;
            document.querySelector('.reply-preview')?.remove();
        }
    });

    // Ответ на сообщение (теперь с проверкой активного чата)
    document.getElementById('chat-messages').addEventListener('click', function(e) {
        const messageElement = e.target.closest('.message:not(.message-outgoing)');
        if (!messageElement || !currentChatId) return;

        const chat = chatData[currentChatId];
        const messageIndex = Array.from(this.children).indexOf(messageElement);
        
        // Проверяем, что сообщение принадлежит текущему чату
        if (messageIndex >= 0 && messageIndex < chat.messages.length) {
            const message = chat.messages[messageIndex];
            const sender = chat.participants.find(p => p.id === message.userId);
            
            replyingTo = {
                userId: message.userId,
                text: message.text,
                userName: sender.name,
                chatId: currentChatId // Добавляем привязку к чату
            };
            
            updateReplyPreview();
        }
    });

    // Отправка сообщения с проверкой чата
    document.getElementById('message-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '' && currentChatId) {
            // Проверяем, что ответ не из другого чата
            if (replyingTo && replyingTo.chatId !== currentChatId) {
                replyingTo = null;
                document.querySelector('.reply-preview')?.remove();
            }
            
            const chat = chatData[currentChatId];
            const newMessage = {
                userId: 1,
                text: replyingTo ? `↪ ${replyingTo.userName}: ${this.value.trim()}` : this.value.trim(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                read: true,
                replyTo: replyingTo ? {
                    userId: replyingTo.userId,
                    text: replyingTo.text,
                    userName: replyingTo.userName
                } : null
            };
            
            chat.messages.push(newMessage);
            chat.lastActive = "Только что";
            loadChat(currentChatId);
            this.value = '';
            replyingTo = null;
        }
    });
}

// Новая функция для обновления превью ответа
function updateReplyPreview() {
    document.querySelector('.reply-preview')?.remove();
    
    if (!replyingTo) return;
    
    const replyPreview = document.createElement('div');
    replyPreview.className = 'reply-preview';
    replyPreview.innerHTML = `
        <div class="reply-block">
            <div class="reply-line"></div>
            <div class="reply-content">
                <div class="reply-username">${replyingTo.userName}</div>
                <div class="reply-text">${replyingTo.text.substring(0, 50)}${replyingTo.text.length > 50 ? '...' : ''}</div>
            </div>
            <button class="cancel-reply">×</button>
        </div>
    `;
    
    document.querySelector('.chat-input-area').prepend(replyPreview);
}