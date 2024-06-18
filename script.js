document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    appendMessage('user', userInput);
    document.getElementById('user-input').value = '';

    setTimeout(() => {
        const botResponse = generateBotResponse(userInput);
        appendMessage('bot', botResponse);
    }, 1000);
});

function appendMessage(sender, message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message', `${sender}-message`);
    messageBox.innerHTML = `<p>${message}</p>`;
    document.getElementById('chat-box').appendChild(messageBox);
    messageBox.scrollIntoView();
}

function generateBotResponse(userInput) {
    // Aquí puedes implementar una lógica más avanzada o integrar con un API de IA
    const responses = [
        "Lamento que te sientas así. Estoy aquí para escucharte.",
        "Eso suena difícil. ¿Quieres hablar más sobre eso?",
        "Entiendo. A veces, solo hablar puede ayudar.",
        "Gracias por compartirlo conmigo. Estoy aquí para ti.",
        "No estás solo. Estoy aquí para apoyarte."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
