document.getElementById('start-chat').addEventListener('click', function() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('chat-section').classList.remove('hidden');
});

document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage('user', userInput);
    document.getElementById('user-input').value = '';

    // Llama al backend para obtener la respuesta de la IA
    fetchBotResponse(userInput);
});

function appendMessage(sender, message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message', `${sender}-message`);
    messageBox.innerHTML = `<p>${message}</p>`;
    document.getElementById('chat-box').appendChild(messageBox);
    messageBox.scrollIntoView();
}

function fetchBotResponse(userInput) {
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.botResponse;
        appendMessage('bot', botResponse);
    })
    .catch(error => {
        console.error('Error al obtener respuesta de la IA:', error);
        appendMessage('bot', 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
    });
}
