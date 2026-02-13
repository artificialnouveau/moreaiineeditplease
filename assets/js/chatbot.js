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
        'introvert': ['Social Battery Monitor', 'Excuse Generator Pro', 'Emotional Support Bot'],
        'shy': ['Practice Conversation Partner', 'Confidence Boost Sessions', 'Personal Hype Person'],
        'networking': ['Small Talk Generator', 'AI Politician', 'Self-Esteem Projector'],
        'small talk': ['Small Talk Generator', 'AI Customer Service', 'AI Cousin'],

        // Emotional support
        'confidence': ['Confidence Boost Sessions', 'Personal Hype Person', 'Imposter Syndrome Fighter'],
        'sad': ['Emotional Support Bot', 'Victory Lap Narrator', 'Confidence Boost Sessions'],
        'anxious': ['Perspective Checker', 'Emotional Support Bot', 'Reality Check Suppressor'],
        'stressed': ['Perspective Checker', 'Emotional Support Bot', 'Time Perception Adjuster'],
        'motivated': ['Personal Hype Person', 'Victory Lap Narrator', 'Difficulty Level Changer'],
        'depressed': ['Emotional Support Bot', 'Victory Lap Narrator', 'Perspective Checker'],
        'lonely': ['Emotional Support Bot', 'AI Cousin', 'Friend Date Arranger'],
        'overwhelmed': ['Perspective Checker', 'Time Perception Adjuster', 'Social Battery Monitor'],
        'insecure': ['Self-Esteem Projector', 'Imposter Syndrome Fighter', 'Compliment Amplifier'],
        'jealous': ['Perspective Checker', 'Compliment Amplifier', 'Memory Editor'],
        'angry': ['Perspective Checker', 'Sleep Arguments Winner', 'Emotional Support Bot'],

        // Productivity & Work
        'productive': ['Time Perception Adjuster', 'Procrastination Optimizer', 'Difficulty Level Changer'],
        'work': ['Time Perception Adjuster', 'AI Politician', 'Practice Conversation Partner'],
        'meeting': ['AI Politician', 'Personal Hype Person', 'Throat Clearing Service'],
        'procrastinate': ['Procrastination Optimizer', 'Difficulty Level Changer', 'Personal Hype Person'],
        'lazy': ['Procrastination Optimizer', 'Personal Hype Person', 'Difficulty Level Changer'],
        'boring': ['Time Perception Adjuster', 'Procrastination Optimizer', 'Main Character Syndrome AI'],
        'focus': ['Time Perception Adjuster', 'Reality Check Suppressor', 'Procrastination Optimizer'],
        'boss': ['AI Politician', 'Practice Conversation Partner', 'Sleep Arguments Winner'],
        'interview': ['Practice Conversation Partner', 'Personal Hype Person', 'AI Actress'],
        'presentation': ['Personal Hype Person', 'AI Actress', 'Confidence Boost Sessions'],
        'job': ['Practice Conversation Partner', 'AI Politician', 'Self-Esteem Projector'],

        // Apologies & Conflict
        'sorry': ['Auto-Sorry Bot', 'Excuse Generator Pro', 'AI Politician'],
        'apology': ['Demand Apology AI', 'Auto-Sorry Bot', 'AI Politician'],
        'argue': ['Sleep Arguments Winner', 'AI Politician', 'Perspective Checker'],
        'fight': ['Sleep Arguments Winner', 'AI Politician', 'Compliment Amplifier'],
        'conflict': ['AI Politician', 'Perspective Checker', 'Practice Conversation Partner'],
        'confrontation': ['Practice Conversation Partner', 'AI Politician', 'Personal Hype Person'],
        'difficult conversation': ['Practice Conversation Partner', 'AI Politician', 'Perspective Checker'],

        // Relationships & Dating
        'dating': ['AI Cousin', 'Text Back Timer', 'Confidence Boost Sessions'],
        'text': ['Text Back Timer', 'Sleep Arguments Winner', 'Excuse Generator Pro'],
        'crush': ['Text Back Timer', 'AI Cousin', 'Confidence Boost Sessions'],
        'breakup': ['Emotional Support Bot', 'Practice Conversation Partner', 'Memory Editor'],
        'relationship': ['Text Back Timer', 'Practice Conversation Partner', 'Perspective Checker'],
        'ex': ['Memory Editor', 'Embarrassment Eraser', 'Emotional Support Bot'],
        'flirt': ['AI Cousin', 'Confidence Boost Sessions', 'Text Back Timer'],
        'rejection': ['Emotional Support Bot', 'Perspective Checker', 'Confidence Boost Sessions'],

        // Daily Life & Habits
        'morning': ['Personal Hype Person', 'Victory Lap Narrator', 'Main Character Syndrome AI'],
        'excuse': ['Excuse Generator Pro', 'AI Politician', 'Reality Check Suppressor'],
        'late': ['Excuse Generator Pro', 'Time Perception Adjuster', 'AI Politician'],
        'cancel': ['Excuse Generator Pro', 'AI Politician', 'Social Battery Monitor'],
        'leave': ['Social Battery Monitor', 'Excuse Generator Pro', 'AI Cousin'],
        'tired': ['Social Battery Monitor', 'Excuse Generator Pro', 'Time Perception Adjuster'],
        'sleep': ['Sleep Arguments Winner', 'Time Perception Adjuster', 'Emotional Support Bot'],
        'exercise': ['Personal Hype Person', 'Difficulty Level Changer', 'Victory Lap Narrator'],
        'diet': ['Reality Check Suppressor', 'Difficulty Level Changer', 'Victory Lap Narrator'],

        // Reality & Self-Perception
        'reality': ['Reality Check Suppressor', 'Memory Editor', 'Life Filter'],
        'memory': ['Memory Editor', 'Embarrassment Eraser', 'AI Cousin'],
        'embarrass': ['Embarrassment Eraser', 'Memory Editor', 'Perspective Checker'],
        'cringe': ['Embarrassment Eraser', 'Memory Editor', 'Perspective Checker'],
        'past': ['Memory Editor', 'Embarrassment Eraser', 'Perspective Checker'],
        'regret': ['Memory Editor', 'Perspective Checker', 'Emotional Support Bot'],
        'mistake': ['Embarrassment Eraser', 'Perspective Checker', 'Memory Editor'],
        'fail': ['Perspective Checker', 'Victory Lap Narrator', 'Compliment Amplifier'],
        'success': ['Victory Lap Narrator', 'Success Rate Inflator', 'Main Character Syndrome AI'],

        // Performance & Image
        'perform': ['AI Actress', 'Personal Hype Person', 'Self-Esteem Projector'],
        'fake': ['Self-Esteem Projector', 'AI Actress', 'Life Filter'],
        'pretend': ['AI Actress', 'Self-Esteem Projector', 'AI Politician'],
        'lie': ['AI Politician', 'Excuse Generator Pro', 'Memory Editor'],
        'impress': ['AI Actress', 'Self-Esteem Projector', 'Main Character Syndrome AI'],
        'cool': ['Main Character Syndrome AI', 'Self-Esteem Projector', 'Life Filter'],
        'popular': ['Life Filter', 'Main Character Syndrome AI', 'Self-Esteem Projector'],

        // Entertainment & Fun
        'fun': ['Main Character Syndrome AI', 'Victory Lap Narrator', 'Life Filter'],
        'dramatic': ['AI Actress', 'Main Character Syndrome AI', 'Life Filter'],
        'famous': ['AI Actress', 'Main Character Syndrome AI', 'Self-Esteem Projector'],
        'movie': ['AI Actress', 'Main Character Syndrome AI', 'Life Filter'],
        'celebrity': ['AI Actress', 'Main Character Syndrome AI', 'Self-Esteem Projector'],
        'attention': ['Main Character Syndrome AI', 'AI Actress', 'Self-Esteem Projector'],

        // Specific Scenarios
        'family': ['AI Cousin', 'Excuse Generator Pro', 'Memory Editor'],
        'parents': ['AI Politician', 'Excuse Generator Pro', 'AI Cousin'],
        'wedding': ['Social Battery Monitor', 'AI Cousin', 'Small Talk Generator'],
        'funeral': ['Emotional Support Bot', 'AI Customer Service', 'Perspective Checker'],
        'holiday': ['Social Battery Monitor', 'Excuse Generator Pro', 'AI Cousin'],
        'reunion': ['Memory Editor', 'Small Talk Generator', 'Self-Esteem Projector'],
        'gym': ['Personal Hype Person', 'Self-Esteem Projector', 'Difficulty Level Changer'],
        'restaurant': ['AI Customer Service', 'Demand Apology AI', 'Confidence Boost Sessions'],
        'shopping': ['AI Customer Service', 'Demand Apology AI', 'Excuse Generator Pro'],

        // Customer Service & Complaints
        'complain': ['AI Customer Service', 'Demand Apology AI', 'AI Politician'],
        'customer service': ['AI Customer Service', 'Demand Apology AI', 'AI Politician'],
        'refund': ['AI Customer Service', 'Demand Apology AI', 'AI Politician'],
        'karen': ['AI Customer Service', 'Demand Apology AI', 'Perspective Checker'],
        'manager': ['AI Customer Service', 'Demand Apology AI', 'AI Politician']
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

    // Generate response with personality
    if (recommendations.size > 0) {
        const serviceList = Array.from(recommendations).slice(0, 4); // Limit to 4 recommendations

        const intros = [
            'Perfect! I found exactly what you need:',
            'Great news! These services are perfect for you:',
            'I know just what you need! Check these out:',
            'Based on what you told me, here are your best matches:',
            'You\'re in luck! These AI services are made for this:'
        ];

        const intro = intros[Math.floor(Math.random() * intros.length)];
        let response = `${intro}<br><br>`;

        serviceList.forEach(service => {
            response += `<strong>✨ ${service}</strong><br>`;
        });

        const outros = [
            '<br>Need more recommendations? Tell me more about your situation!',
            '<br>Want to explore other options? Just let me know what else you need!',
            '<br>These should help! Need anything else?',
            '<br>Try these out! What else can I help you find?'
        ];

        response += outros[Math.floor(Math.random() * outros.length)];
        return response;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return `Hey there! 👋 I'm here to help you find the perfect AI services. Tell me what you need!<br><br>
        Try things like:<br>
        • "I'm anxious about a job interview"<br>
        • "Need help with awkward family gatherings"<br>
        • "I keep procrastinating"<br>
        • "Help me get over my ex"<br>
        • "I need to cancel plans without feeling guilty"`;
    } else if (lowerMessage.includes('thank')) {
        const responses = [
            'You\'re welcome! Happy to help! 😊',
            'No problem! That\'s what I\'m here for! 🎉',
            'Anytime! Feel free to ask me anything else!',
            'My pleasure! Let me know if you need more recommendations!'
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    } else if (lowerMessage.includes('help')) {
        return `I can help you find AI services for all kinds of situations! Try asking about:<br><br>
        <strong>😰 Emotional stuff:</strong> confidence, anxiety, stress, loneliness<br>
        <strong>👥 Social situations:</strong> parties, networking, conversations, dating<br>
        <strong>💼 Work life:</strong> meetings, interviews, procrastination, bosses<br>
        <strong>💔 Relationships:</strong> breakups, texting, conflicts, family drama<br>
        <strong>🎭 Daily life:</strong> excuses, apologies, embarrassing moments<br><br>
        Just tell me what you're dealing with!`;
    } else {
        return `Hmm, I'm not sure I caught that. Can you tell me more specifically what you need?<br><br>
        For example:<br>
        • "I'm stressed about work"<br>
        • "Help me be less awkward at parties"<br>
        • "I need an excuse to leave early"<br>
        • "Boost my confidence"<br>
        • "I can't stop thinking about something embarrassing"<br><br>
        What's going on? I'm here to help! 💪`;
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
