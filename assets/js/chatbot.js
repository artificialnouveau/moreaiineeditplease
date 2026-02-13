/**
 * AI Service Advisor Chatbot
 * Helps users find the right AI services for their needs
 */

// ============================================
// Chatbot State
// ============================================

const ChatbotState = {
    isOpen: false,
    messages: []
};

// ============================================
// Service Recommendations Database
// ============================================

const ServiceRecommendations = {
    // Keywords mapped to service recommendations
    keywords: {
        // Social situations
        'social': ['AI Cousin', 'Social Battery Monitor', 'Small Talk Generator', 'Friend Date Arranger'],
        'awkward': ['Throat Clearing Service', 'Auto-Sorry Bot', 'Small Talk Generator', 'Social Battery Monitor'],
        'conversation': ['Small Talk Generator', 'Practice Conversation Partner', 'AI Customer Service'],
        'friends': ['Friend Date Arranger', 'Text Back Timer', 'AI Cousin'],
        'party': ['Social Battery Monitor', 'Excuse Generator Pro', 'AI Cousin'],

        // Emotional support
        'confidence': ['Confidence Boost Sessions', 'Personal Hype Person', 'Imposter Syndrome Fighter'],
        'sad': ['Emotional Support Bot', 'Victory Lap Narrator', 'Confidence Boost Sessions'],
        'anxious': ['Perspective Checker', 'Emotional Support Bot', 'Reality Check Suppressor'],
        'stressed': ['Perspective Checker', 'Emotional Support Bot', 'Time Perception Adjuster'],
        'motivated': ['Personal Hype Person', 'Victory Lap Narrator', 'Difficulty Level Changer'],

        // Productivity
        'productive': ['Time Perception Adjuster', 'Procrastination Optimizer', 'Difficulty Level Changer'],
        'work': ['Time Perception Adjuster', 'AI Politician', 'Practice Conversation Partner'],
        'meeting': ['AI Politician', 'Personal Hype Person', 'Throat Clearing Service'],
        'procrastinate': ['Procrastination Optimizer', 'Difficulty Level Changer', 'Personal Hype Person'],

        // Apologies & conflict
        'sorry': ['Auto-Sorry Bot', 'Excuse Generator Pro', 'AI Politician'],
        'apology': ['Demand Apology AI', 'Auto-Sorry Bot', 'AI Politician'],
        'argue': ['Sleep Arguments Winner', 'AI Politician', 'Perspective Checker'],
        'fight': ['Sleep Arguments Winner', 'AI Politician', 'Compliment Amplifier'],

        // Daily life
        'morning': ['Personal Hype Person', 'Victory Lap Narrator', 'Main Character Syndrome AI'],
        'dating': ['AI Cousin', 'Text Back Timer', 'Confidence Boost Sessions'],
        'text': ['Text Back Timer', 'Sleep Arguments Winner', 'Excuse Generator Pro'],
        'excuse': ['Excuse Generator Pro', 'AI Politician', 'Reality Check Suppressor'],

        // Reality & perception
        'reality': ['Reality Check Suppressor', 'Memory Editor', 'Life Filter'],
        'memory': ['Memory Editor', 'Embarrassment Eraser', 'AI Cousin'],
        'embarrass': ['Embarrassment Eraser', 'Memory Editor', 'Perspective Checker'],
        'confidence': ['Self-Esteem Projector', 'Confidence Boost Sessions', 'Main Character Syndrome AI'],

        // Entertainment
        'fun': ['Main Character Syndrome AI', 'Victory Lap Narrator', 'Life Filter'],
        'dramatic': ['AI Actress', 'Main Character Syndrome AI', 'Life Filter'],
        'famous': ['AI Actress', 'Main Character Syndrome AI', 'Self-Esteem Projector']
    }
};

// ============================================
// Initialize Chatbot
// ============================================

function initChatbot() {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotInput = document.getElementById('chatbot-input');

    if (!chatbotButton) return;

    // Toggle chatbot window
    chatbotButton.addEventListener('click', () => {
        toggleChatbot();
    });

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            toggleChatbot();
        });
    }

    // Send message
    if (chatbotSend) {
        chatbotSend.addEventListener('click', () => {
            sendMessage();
        });
    }

    // Send on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// ============================================
// Chatbot Functions
// ============================================

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotButton = document.getElementById('chatbot-button');

    if (!chatbotWindow || !chatbotButton) return;

    ChatbotState.isOpen = !ChatbotState.isOpen;

    if (ChatbotState.isOpen) {
        chatbotWindow.classList.remove('hidden');
        chatbotButton.classList.add('minimized');
    } else {
        chatbotWindow.classList.add('hidden');
        chatbotButton.classList.remove('minimized');
    }
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');

    // Clear input
    input.value = '';

    // Generate bot response
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';

    if (sender === 'bot') {
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';
        messageDiv.appendChild(avatar);
    }

    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = text;
    messageDiv.appendChild(content);

    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Store message
    ChatbotState.messages.push({ text, sender });
}

function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Find matching keywords
    let recommendations = new Set();
    let matchedKeywords = [];

    for (const [keyword, services] of Object.entries(ServiceRecommendations.keywords)) {
        if (lowerMessage.includes(keyword)) {
            matchedKeywords.push(keyword);
            services.forEach(service => recommendations.add(service));
        }
    }

    // Generate response
    if (recommendations.size > 0) {
        const serviceList = Array.from(recommendations).slice(0, 4); // Limit to 4 recommendations
        let response = `Based on what you're looking for, I recommend these AI services:<br><br>`;

        serviceList.forEach(service => {
            response += `<strong>• ${service}</strong><br>`;
        });

        response += `<br>Would you like to know more about any of these? Just ask!`;
        return response;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return `Hello! Tell me what you need help with. For example:<br>
        - "I need help with social situations"<br>
        - "I want to feel more confident"<br>
        - "Help me be more productive"<br>
        - "I need an excuse to leave a party"`;
    } else if (lowerMessage.includes('thank')) {
        return `You're welcome! Feel free to ask me anything else. I'm here to help you find the perfect AI services! 😊`;
    } else {
        return `I'm here to help! Try telling me about:<br><br>
        • Social situations you need help with<br>
        • Emotional support you're looking for<br>
        • Productivity goals<br>
        • Daily life challenges<br><br>
        For example: "I need confidence for a job interview" or "Help me with awkward conversations"`;
    }
}

// ============================================
// Initialize on Load
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
