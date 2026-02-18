/* ============================================
   TIMETRAVEL AGENCY — app.js
   Stars | Navbar | Quiz | Form | Chatbot IA
   ============================================ */

// ===== INIT AOS =====
AOS.init({ duration: 700, once: true, offset: 80 });

// ===== STARS GENERATOR =====
(function generateStars() {
    const container = document.getElementById('stars');
    if (!container) return;
    const count = 180;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2.5 + 0.5;
        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            --dur: ${Math.random() * 4 + 2}s;
            --delay: ${Math.random() * 4}s;
            --min-op: ${Math.random() * 0.3 + 0.1};
            opacity: ${Math.random() * 0.5 + 0.1};
        `;
        container.appendChild(star);
    }
})();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
burger?.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    const cta = document.querySelector('.nav-cta');
    if (links) links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    if (cta) cta.style.display = cta.style.display === 'block' ? 'none' : 'block';
});

// ===== QUIZ =====
const quizData = {
    answers: [],
    currentStep: 1,
    totalSteps: 4,
};

const destinations = {
    paris: {
        icon: '🗼',
        title: 'Paris, 1889 — Belle Époque',
        desc: 'Votre profil correspond parfaitement à Paris en 1889. Vous êtes attiré par l\'élégance, la culture et l\'effervescence urbaine. Vous assisterez à l\'inauguration de la Tour Eiffel, flânerez sur les Grands Boulevards et vivrez la Belle Époque dans toute sa splendeur. Un voyage pour les âmes raffinées.',
    },
    cretace: {
        icon: '🦕',
        title: 'Le Crétacé — -65 millions d\'années',
        desc: 'Votre esprit d\'aventure et votre amour de la nature vous destinent au Crétacé. Vous observerez des dinosaures dans leur habitat naturel, respirerez un air pur vieux de 65 millions d\'années et vivrez une expérience que personne d\'autre sur Terre n\'a jamais vécue. Pour les vrais explorateurs.',
    },
    florence: {
        icon: '🎨',
        title: 'Florence, 1504 — La Renaissance',
        desc: 'Votre sensibilité artistique et votre passion pour l\'histoire de l\'art vous guident vers Florence en 1504. Vous côtoierez Michel-Ange, visiterez les ateliers des Médicis et assisterez à la naissance des chefs-d\'œuvre qui ont défini l\'art occidental. Un voyage pour les esprits cultivés.',
    },
};

// Scoring matrix: [paris, cretace, florence]
const scoreMap = {
    culture: [1, 0, 2], aventure: [0, 3, 0], elegance: [2, 0, 1],
    moderne: [3, 0, 0], prehistoire: [0, 3, 0], renaissance: [0, 0, 3],
    urbain: [2, 0, 1], nature: [0, 3, 0], art: [1, 0, 2],
    monuments: [2, 0, 1], faune: [0, 3, 0], musees: [1, 0, 2],
};

function getRecommendation() {
    let scores = { paris: 0, cretace: 0, florence: 0 };
    quizData.answers.forEach(answer => {
        const s = scoreMap[answer] || [0, 0, 0];
        scores.paris += s[0];
        scores.cretace += s[1];
        scores.florence += s[2];
    });
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function updateProgress() {
    const pct = ((quizData.currentStep - 1) / quizData.totalSteps) * 100;
    document.getElementById('quizProgress').style.width = pct + '%';
}

function showStep(step) {
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
    const target = document.querySelector(`.quiz-step[data-step="${step}"]`);
    if (target) target.classList.add('active');
    updateProgress();
}

function showResult() {
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
    document.getElementById('quizProgress').style.width = '100%';
    const key = getRecommendation();
    const dest = destinations[key];
    document.getElementById('resultIcon').textContent = dest.icon;
    document.getElementById('resultTitle').textContent = dest.title;
    document.getElementById('resultDesc').textContent = dest.desc;
    // Pre-select destination in form
    const sel = document.getElementById('destination');
    if (sel) {
        const map = { paris: 'paris-1889', cretace: 'cretace', florence: 'florence-1504' };
        sel.value = map[key];
    }
    const result = document.getElementById('quizResult');
    result.classList.add('active');
}

document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
        quizData.answers.push(btn.dataset.value);
        if (quizData.currentStep < quizData.totalSteps) {
            quizData.currentStep++;
            showStep(quizData.currentStep);
        } else {
            showResult();
        }
    });
});

document.getElementById('quizRetry')?.addEventListener('click', () => {
    quizData.answers = [];
    quizData.currentStep = 1;
    document.getElementById('quizResult').classList.remove('active');
    showStep(1);
});

updateProgress();

// ===== RESERVATION FORM =====
document.getElementById('reservationForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-submit');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;
    // Simulate async send
    setTimeout(() => {
        btn.style.display = 'none';
        const success = document.getElementById('formSuccess');
        success.classList.add('show');
        e.target.reset();
    }, 1500);
});

// ===== CHATBOT =====
// OpenRouter API
const OPENROUTER_API_KEY = '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';
const OPENROUTER_MODEL = 'arcee-ai/trinity-large-preview:free';

const SYSTEM_PROMPT = `Tu es ZGEG, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle principal : conseiller les clients sur les destinations temporelles. Mais tu es aussi un assistant intelligent et cultivé qui peut répondre à n'importe quelle question avec humour et pertinence.

Comportement :
- Si on te parle de voyages temporels ou de l'agence : réponds en expert enthousiaste
- Si on te pose une question générale (recette, histoire, science, blague...) : réponds normalement et avec intelligence, en glissant parfois un lien amusant avec le voyage temporel si c'est naturel
- Tu n'es jamais bloquant ni rigide — tu es utile avant tout
- Ton ton : intelligent, chaleureux, un peu d'humour, jamais condescendant
- Réponses concises (max 3-4 phrases)

Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — à partir de 12 500€
- Crétacé -65M ans (dinosaures, nature préhistorique, volcans) — à partir de 28 000€ (best-seller)
- Florence 1504 (Renaissance, Michel-Ange, Médicis) — à partir de 15 800€

Infos pratiques :
- Groupes de 8 personnes maximum
- Retour garanti 100%
- Costumes et briefings historiques inclus
- Réservation via le formulaire sur le site`;

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatWidget = document.getElementById('chatbotWidget');
const chatToggle = document.getElementById('chatbotToggle');
const chatClose = document.getElementById('chatClose');

// Conversation history for context
const conversationHistory = [];

chatToggle?.addEventListener('click', () => {
    chatWidget.classList.toggle('open');
});
chatClose?.addEventListener('click', () => {
    chatWidget.classList.remove('open');
});

function appendMessage(content, role) {
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.innerHTML = `<div class="msg-bubble">${content}</div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

function appendTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg bot msg-typing';
    div.innerHTML = `<div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

async function sendMessage(userText) {
    if (!userText.trim()) return;
    chatInput.value = '';
    chatSend.disabled = true;

    appendMessage(userText, 'user');
    conversationHistory.push({ role: 'user', content: userText });

    const typingEl = appendTyping();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...conversationHistory,
                ],
            }),
        });

        if (!response.ok) throw new Error(`API Error ${response.status}`);
        const data = await response.json();
        const reply = data.choices[0].message.content;
        typingEl.remove();
        appendMessage(reply, 'bot');
        conversationHistory.push({ role: 'assistant', content: reply });
    } catch (err) {
        console.warn('OpenRouter error, using local fallback:', err.message);
        typingEl.remove();
        const fallback = getLocalReply(userText);
        appendMessage(fallback, 'bot');
        conversationHistory.push({ role: 'assistant', content: fallback });
    }

    chatSend.disabled = false;
    chatInput.focus();
}

// Local fallback replies (sans API)
function getLocalReply(text) {
    const t = text.toLowerCase();
    if (t.includes('prix') || t.includes('coût') || t.includes('tarif') || t.includes('combien')) {
        return '💰 Nos tarifs : <strong>Paris 1889</strong> à partir de 12 500€, <strong>Florence 1504</strong> à 15 800€, et notre best-seller <strong>Le Crétacé</strong> à 28 000€. Ces prix incluent le transport temporel, les costumes d\'époque et un guide expert.';
    }
    if (t.includes('paris') || t.includes('belle époque') || t.includes('eiffel')) {
        return '🗼 <strong>Paris 1889</strong> est un voyage absolument magique ! Vous assisterez à l\'inauguration de la Tour Eiffel lors de l\'Exposition Universelle. Les Grands Boulevards, les cafés, l\'effervescence artistique... La Belle Époque à son apogée. À partir de 12 500€.';
    }
    if (t.includes('crétacé') || t.includes('dinosaure') || t.includes('préhistoire')) {
        return '🦕 Notre <strong>expédition Crétacée</strong> est notre best-seller ! Vous observerez des T-Rex et Brachiosaurus dans leur habitat naturel depuis un véhicule blindé ultra-sécurisé. Une expérience unique au monde, 65 millions d\'années en arrière. À partir de 28 000€.';
    }
    if (t.includes('florence') || t.includes('renaissance') || t.includes('michel-ange')) {
        return '🎨 <strong>Florence 1504</strong>, c\'est vivre au cœur de la Renaissance ! Vous côtoierez Michel-Ange à l\'apogée de sa création, visiterez les ateliers des Médicis. Un voyage pour les âmes sensibles à l\'art et à l\'histoire. À partir de 15 800€.';
    }
    if (t.includes('danger') || t.includes('sûr') || t.includes('sécurité') || t.includes('risque')) {
        return '🛡️ La sécurité est notre priorité absolue ! Chaque voyage bénéficie de protocoles de retour triple-vérifiés, d\'un guide chrononaute certifié et d\'équipements de protection adaptés à chaque époque. Retour garanti à 100%.';
    }
    if (t.includes('réserver') || t.includes('réservation') || t.includes('book')) {
        return '📋 Pour réserver, utilisez notre <a href="#reservation" style="color:var(--gold)">formulaire de réservation</a> sur cette page. Notre équipe vous contacte sous 24h pour finaliser les détails. Groupes de 8 personnes maximum.';
    }
    if (t.includes('bonjour') || t.includes('salut') || t.includes('hello')) {
        return '👋 Bonjour ! Je suis <strong>ZGEG</strong>, votre conseiller en voyages temporels. Nous proposons 3 destinations exceptionnelles : Paris 1889, Le Crétacé (-65M ans) et Florence 1504. Quelle époque vous attire ?';
    }
    if (t.includes('recommand') || t.includes('conseil') || t.includes('choisir')) {
        return '🤔 Pour vous recommander la destination idéale, dites-moi : préférez-vous l\'aventure nature (🦕 Crétacé), l\'élégance urbaine (🗼 Paris 1889) ou l\'art et la culture (🎨 Florence 1504) ? Vous pouvez aussi faire notre <a href="#quiz" style="color:var(--gold)">quiz de personnalisation</a> !';
    }
    return '⧖ Excellente question ! Je suis là pour vous aider à choisir votre voyage temporel idéal. Nos destinations : <strong>Paris 1889</strong>, <strong>Le Crétacé</strong> et <strong>Florence 1504</strong>. Souhaitez-vous des détails sur l\'une d\'elles ?';
}

chatSend?.addEventListener('click', () => sendMessage(chatInput.value));
chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(chatInput.value);
});

window.sendSuggestion = function (text) {
    chatInput.value = text;
    sendMessage(text);
    // Hide suggestions after first use
    document.querySelector('.chat-suggestions').style.display = 'none';
};
