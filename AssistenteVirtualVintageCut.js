// ASSISTENTE VIRTUAL E PERSONA DO CHATBOT (VINTAGE & CUT) //
document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
});

function initChatbot() {
    // Vai criar os elementos do chat no HTML dinamicamente
    const chatHTML = `
        <div id="vintage-chat-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Poppins', sans-serif;">
            <div id="chat-box" style="display: none; width: 320px; height: 400px; background: #FFFFFF; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); flex-direction: column; overflow: hidden; border: 1px solid #E9ECEF;">
                <div style="background: #1A1A1A; color: #C59B27; padding: 14px; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
                    <span><i class="fas fa-scissors"></i> Assistente Vintage & Cut</span>
                    <button id="close-chat" style="background:none; border:none; color:#FFF; cursor:pointer; font-size: 1.2rem;">&times;</button>
                </div>
                <div id="chat-messages" style="flex: 1; padding: 12px; overflow-y: auto; font-size: 0.85rem; background: #F8F9FA; display: flex; flex-direction: column; gap: 8px;">
                    <div style="background: #E9ECEF; padding: 8px 12px; border-radius: 8px; align-self: flex-start; max-width: 80%;">
                        Olá! Sou o assistente virtual da Vintage & Cut. Como posso ajudar com seu agendamento ou dúvidas sobre nossos cortes?
                    </div>
                </div>
                <div style="padding: 10px; background: #FFF; border-top: 1px solid #E9ECEF; display: flex; gap: 6px;">
                    <input type="text" id="chat-input" placeholder="Digite sua dúvida..." style="flex: 1; padding: 8px; border: 1px solid #CED4DA; border-radius: 6px; font-size: 0.85rem; outline: none;">
                    <button id="chat-send" style="background: #C59B27; color: #FFF; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer;"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
            <button id="open-chat" style="background: #C59B27; color: #FFF; border: none; width: 55px; height: 55px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.2); cursor: pointer; font-size: 1.4rem; display: flex; align-items: center; justify-content: center; transition: transform 0.3s;">
                <i class="fas fa-comment-dots"></i>
            </button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    const openBtn = document.getElementById('open-chat');
    const closeBtn = document.getElementById('close-chat');
    const chatBox = document.getElementById('chat-box');
    const sendBtn = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    openBtn.addEventListener('click', () => {
        chatBox.style.display = 'flex';
        openBtn.style.display = 'none';
    });

    closeBtn.addEventListener('click', () => {
        chatBox.style.display = 'none';
        openBtn.style.display = 'flex';
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.style.padding = '8px 12px';
        msgDiv.style.borderRadius = '8px';
        msgDiv.style.maxWidth = '80%';
        msgDiv.style.fontSize = '0.85rem';
        
        if (sender === 'user') {
            msgDiv.style.background = '#C59B27';
            msgDiv.style.color = '#FFF';
            msgDiv.style.alignSelf = 'flex-end';
        } else {
            msgDiv.style.background = '#E9ECEF';
            msgDiv.style.color = '#212529';
            msgDiv.style.alignSelf = 'flex-start';
        }
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        // Resposta baseada na Persona e regras da Barbearia
        setTimeout(() => {
            let resposta = "Para agendar, basta preencher o formulário na nossa seção de Agendamento aqui no site! Temos cortes clássicos por R$ 45,00 e o Combo Master por R$ 70,00.";
            
            const lower = text.toLowerCase();
            if (lower.includes('horario') || lower.includes('funcionamento') || lower.includes('horas')) {
                resposta = "Funcionamos de Segunda a Sábado, das 09:00 às 20:00.";
            } else if (lower.includes('preco') || lower.includes('valor') || lower.includes('corte')) {
                resposta = "O Corte Clássico custa R$ 45,00 e a Barboterapia R$ 35,00. Nosso combo sai por R$ 70,00!";
            } else if (lower.includes('endereco') || lower.includes('onde') || lower.includes('local')) {
                resposta = "Estamos localizados na Av. Frei Serafim, 1500 - Centro, Teresina - PI.";
            }

            addMessage(resposta, 'bot');
        }, 600);
    }

    sendBtn.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });
}