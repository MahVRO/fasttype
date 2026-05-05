/* ===========================================================
   Typing Race Game - script.js
   =========================================================== */

// ============ Text Library ============
const WORD_LIST = [
    "the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "practice", "makes",
    "perfect", "coffee", "fuels", "coder", "night", "journey", "thousand", "miles", "begins", "single",
    "step", "coding", "art", "telling", "computers", "early", "bird", "catches", "worm", "music",
    "universal", "language", "mankind", "hungry", "foolish", "time", "waits", "wise", "success", "built",
    "daily", "habit", "great", "work", "love", "found", "looking", "keep", "settle", "matter",
    "heart", "know", "middle", "difficulty", "opportunity", "failure", "people", "realize", "close", "gave",
    "persistence", "key", "technology", "best", "together", "internet", "connected", "billion", "mind", "global",
    "spark", "innovation", "collaboration", "history", "reading", "exercise", "body", "book", "open", "door",
    "world", "idea", "invent", "meet", "real", "life", "cooking", "form", "meditation", "chopping",
    "stirring", "tasting", "focus", "present", "moment", "simple", "meal", "care", "feast", "haste"
];

const TEXTS = {
    short: [
        "The quick brown fox jumps over the lazy dog.",
        "Practice makes perfect when you type every day.",
        "Coffee fuels the coder through long nights.",
        "A journey of a thousand miles begins with a single step.",
        "Coding is the art of telling computers what to do.",
        "The early bird catches the worm.",
        "Music is the universal language of mankind.",
        "Stay hungry and stay foolish.",
        "Time waits for no one, so use it wisely.",
        "Success is built on small daily habits."
    ],
    medium: [
        "The only way to do great work is to love what you do. If you have not found it yet, keep looking. Do not settle. As with all matters of the heart, you will know when you find it.",
        "In the middle of difficulty lies opportunity. Many of life's failures are people who did not realize how close they were to success when they gave up. Persistence is the key.",
        "Technology is best when it brings people together. The internet has connected billions of minds across the globe, sparking innovation and collaboration like never before in history.",
        "Reading is to the mind what exercise is to the body. Books open doors to worlds we may never visit, ideas we may never invent, and people we may never meet in real life.",
        "Cooking is a form of meditation. The chopping, stirring, and tasting bring focus to the present moment. A simple meal made with care is better than a feast made in haste.",
        "Music has the power to transport us instantly to another place and time. A single melody can summon memories long forgotten and emotions we did not know we still carried.",
        "Travel is the only thing you buy that makes you richer. Every new city teaches a lesson, every conversation broadens a perspective, every meal tells a story of its people.",
        "Kindness costs nothing but means everything. A small smile, a kind word, or a helping hand can change someone's entire day. Choose to be kind whenever you have the choice.",
        "The best way to predict the future is to create it. Stop waiting for the perfect moment and start building toward your goals one small action at a time, today.",
        "Learning never exhausts the mind. Every skill you master, every book you read, every problem you solve adds to a foundation that no one can ever take away from you."
    ],
    long: [
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of light, it was the season of darkness, it was the spring of hope, it was the winter of despair. We had everything before us, we had nothing before us, we were all going direct to heaven, we were all going direct the other way.",
        "Call me Ishmael. Some years ago, never mind how long precisely, having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth, I account it high time to get to sea as soon as I can.",
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters in the area.",
        "All happy families are alike; each unhappy family is unhappy in its own way. Everything was in confusion in the household. The members of the family no longer met together, and the children ran wild all over the house. The cook had given warning the day before, and even the staff were on bad terms among themselves and had asked for new positions elsewhere.",
        "The future belongs to those who believe in the beauty of their dreams. Every great achievement was once considered impossible by someone who lacked vision. The history of progress is the history of stubborn dreamers who refused to accept the limits placed upon them. Build your dream brick by brick, day by day, and one morning you will wake up to find that you have built something remarkable that inspires others."
    ]
};

// ============ Game State ============
const state = {
    username: "Player",
    difficulty: "medium",
    textLength: "medium",
    useRandomWords: false,
    enableAI: true,
    enableSound: false,
    text: "",
    startTime: null,
    timerInterval: null,
    aiInterval: null,
    isActive: false,
    isFinished: false,
    typedChars: 0,        // total characters typed (including corrected ones)
    correctChars: 0,      // correct characters in current input
    mistakes: 0,          // total mistakes ever made
    currentInput: "",
    errorFlashUntil: 0,
    giveUpCount: 0,
    aiSpeeds: [],         // WPM for each AI
    aiProgress: [0, 0, 0],// 0..1
    position: 1
};

const STORAGE_KEY = "typing-race-settings";

// ============ DOM ============
const $ = (id) => document.getElementById(id);

const screens = {
    home:   $("home-screen"),
    config: $("config-screen"),
    active: $("active-screen"),
    end:    $("end-screen")
};

const els = {
    textDisplay:  $("text-display"),
    typingInput:  $("typing-input"),
    wpm:          $("wpm"),
    accuracy:     $("accuracy"),
    timer:        $("timer"),
    position:     $("position"),
    userProgress: $("user-progress"),
    aiRacers:     $("ai-racers"),
    ai: [$("ai1-progress"), $("ai2-progress"), $("ai3-progress")],
    finalWpm:      $("final-wpm"),
    finalAccuracy: $("final-accuracy"),
    finalTime:     $("final-time"),
    finalPosition: $("final-position"),
    playerLabel:   $("player-label")
};

// ============ Sound (using WebAudio for click/error tones) ============
let audioCtx = null;
function playTone(freq, duration = 0.05, type = "sine", volume = 0.05) {
    if (!state.enableSound) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.value = volume;
        osc.connect(gain).connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) { /* ignore */ }
}

// ============ Initialization ============
function initHomeScreen() {
    showScreen("home");
    clearInterval(state.timerInterval);
    clearInterval(state.aiInterval);
}

function initConfigScreen() {
    showScreen("config");
    clearInterval(state.timerInterval);
    clearInterval(state.aiInterval);
    loadConfigToState();
    applyStateToConfigControls();
}

function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[name].classList.add("active");
}

function loadConfigToState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const saved = JSON.parse(raw);
        state.username = typeof saved.username === "string" && saved.username.trim() ? saved.username.trim() : state.username;
        state.difficulty = ["easy", "medium", "hard"].includes(saved.difficulty) ? saved.difficulty : state.difficulty;
        state.textLength = ["short", "medium", "long"].includes(saved.textLength) ? saved.textLength : state.textLength;
        state.enableAI = typeof saved.enableAI === "boolean" ? saved.enableAI : state.enableAI;
        state.enableSound = typeof saved.enableSound === "boolean" ? saved.enableSound : state.enableSound;
        state.useRandomWords = typeof saved.useRandomWords === "boolean" ? saved.useRandomWords : state.useRandomWords;
    } catch (e) {
        /* ignore invalid storage */
    }
}

function applyStateToConfigControls() {
    $("username").value = state.username;
    $("difficulty").value = state.difficulty;
    $("text-length").value = state.textLength;
    $("enable-ai").checked = state.enableAI;
    $("enable-sound").checked = state.enableSound;
    $("use-random-words").checked = state.useRandomWords;
    setActiveOptionButton("difficulty", state.difficulty);
    setActiveOptionButton("text-length", state.textLength);
}

function setActiveOptionButton(group, value) {
    document.querySelectorAll(`.option-btn[data-group="${group}"]`).forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.value === value);
    });
}

function syncStateFromConfigControls() {
    state.username = $("username").value.trim() || "Player";
    state.difficulty = $("difficulty").value;
    state.textLength = $("text-length").value;
    state.enableAI = $("enable-ai").checked;
    state.enableSound = $("enable-sound").checked;
    state.useRandomWords = $("use-random-words").checked;
    persistConfig();
}

function persistConfig() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            username: state.username,
            difficulty: state.difficulty,
            textLength: state.textLength,
            enableAI: state.enableAI,
            enableSound: state.enableSound,
            useRandomWords: state.useRandomWords
        }));
    } catch (e) {
        /* ignore storage errors */
    }
}

// ============ Start Game ============
function generateRandomWordText(wordCount) {
    let text = "";
    for (let i = 0; i < wordCount; i++) {
        text += WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)] + " ";
    }
    return text.trim();
}

function startGame() {
    syncStateFromConfigControls();

    // Pick a random text or generate from random words
    if (state.useRandomWords) {
        const wordCounts = {
            short: 15,
            medium: 35,
            long: 75
        };
        state.text = generateRandomWordText(wordCounts[state.textLength]);
    } else {
        const pool = TEXTS[state.textLength];
        state.text = pool[Math.floor(Math.random() * pool.length)];
    }

    // AI speeds (WPM) by difficulty - randomized within range
    const ranges = {
        easy:   [25, 45],
        medium: [45, 70],
        hard:   [70, 100]
    };
    const [min, max] = ranges[state.difficulty];
    state.aiSpeeds = [0, 1, 2].map(() => min + Math.random() * (max - min));

    // Reset state
    state.startTime = null;
    state.isActive = false;
    state.isFinished = false;
    state.typedChars = 0;
    state.correctChars = 0;
    state.mistakes = 0;
    state.currentInput = "";
    state.aiProgress = [0, 0, 0];
    state.position = 1;
    state.giveUpCount = 0;

    // Reset UI
    els.typingInput.value = "";
    els.playerLabel.textContent = state.username.slice(0, 8);
    els.aiRacers.style.display = state.enableAI ? "block" : "none";

    renderText();
    updateStats();
    updateProgress();
    updateAIProgress(0);
    updatePositions();

    showScreen("active");

    // Focus the hidden input so keystrokes are captured
    setTimeout(() => els.typingInput.focus(), 50);
}

// ============ Typing Handling ============
function handleTyping(e) {
    if (state.isFinished) return;

    const value = els.typingInput.value;

    // Enforce strictly linear typing: no going backwards.
    if (value.length < state.currentInput.length) {
        els.typingInput.value = state.currentInput;
        return;
    } else if (value.length > state.currentInput.length) {
        const appended = value.slice(state.currentInput.length);

        for (const ch of appended) {
            const expectedChar = state.text[state.currentInput.length];
            if (ch === expectedChar) {
                state.currentInput += ch;
                playTone(800, 0.03, "sine", 0.03);
            } else {
                state.mistakes++;
                playTone(200, 0.06, "square", 0.04);
                triggerTypingErrorFeedback();
            }
        }

        state.correctChars = state.currentInput.length;
        els.typingInput.value = state.currentInput;
    } else {
        els.typingInput.value = state.currentInput;
    }

    state.typedChars = state.currentInput.length;

    // Start timer on first keystroke
    if (!state.isActive && state.currentInput.length > 0) {
        startTimer();
    }

    renderText();
    updateProgress();
    updateStats();
    updatePositions();

    // Finish: full text typed correctly
    if (state.currentInput === state.text) {
        endGame();
    }
}

// ============ Render Text with Highlights ============
function renderText() {
    const text = state.text;
    const input = state.currentInput;
    let html = "";

    for (let i = 0; i < text.length; i++) {
        let cls = "char";
        if (i < input.length) {
            cls += input[i] === text[i] ? " correct" : " incorrect";
        } else if (i === input.length) {
            cls += " current";
            if (Date.now() < state.errorFlashUntil) cls += " current-error";
        }
        // Keep regular spaces so long texts can naturally wrap across lines.
        const ch = escapeHtml(text[i]);
        html += `<span class="${cls}">${ch}</span>`;
    }
    els.textDisplay.innerHTML = html;
}

function triggerTypingErrorFeedback() {
    state.errorFlashUntil = Date.now() + 220;
    els.textDisplay.classList.remove("typing-error");
    // Restart the animation when mistakes happen in rapid succession.
    void els.textDisplay.offsetWidth;
    els.textDisplay.classList.add("typing-error");
    setTimeout(() => els.textDisplay.classList.remove("typing-error"), 220);
}

function escapeHtml(c) {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[c] || c;
}

// ============ Timer ============
function startTimer() {
    state.isActive = true;
    state.startTime = Date.now();
    state.timerInterval = setInterval(updateTimer, 50);

    if (state.enableAI) {
        state.aiInterval = setInterval(() => {
            const elapsed = (Date.now() - state.startTime) / 1000;
            updateAIProgress(elapsed);
            updatePositions();
        }, 100);
    }
}

function updateTimer() {
    if (!state.startTime) return;
    const elapsed = (Date.now() - state.startTime) / 1000;
    els.timer.textContent = `${elapsed.toFixed(3)}s`;
    updateStats();
}

// ============ Stats ============
function calculateWPM(elapsedSeconds) {
    if (elapsedSeconds <= 0) return 0;
    const minutes = elapsedSeconds / 60;
    // Standard WPM: (correct chars / 5) / minutes
    return state.correctChars / 5 / minutes;
}

function calculateAccuracy() {
    const totalAttempts = state.correctChars + state.mistakes;
    if (totalAttempts === 0) return 100;
    return (state.correctChars / totalAttempts) * 100;
}

function updateStats() {
    const elapsed = state.startTime ? (Date.now() - state.startTime) / 1000 : 0;
    els.wpm.textContent = calculateWPM(elapsed).toFixed(0);
    els.accuracy.textContent = `${calculateAccuracy().toFixed(0)}%`;
    if (!state.startTime) els.timer.textContent = "0.000s";
}

// ============ Progress ============
function updateProgress() {
    const pct = (state.correctChars / state.text.length) * 100;
    els.userProgress.style.width = `${pct}%`;
}

function updateAIProgress(elapsedSeconds) {
    if (!state.enableAI) return;
    const minutes = elapsedSeconds / 60;
    state.aiSpeeds.forEach((wpm, i) => {
        // chars typed = wpm * 5 * minutes
        const charsTyped = wpm * 5 * minutes;
        state.aiProgress[i] = Math.min(1, charsTyped / state.text.length);
        els.ai[i].style.width = `${state.aiProgress[i] * 100}%`;
    });
}

// ============ Positions ============
function updatePositions() {
    const userPct = state.correctChars / state.text.length;

    if (!state.enableAI) {
        state.position = 1;
        els.position.textContent = "1st";
        return;
    }

    // Count how many AIs are strictly ahead of the user
    let ahead = 0;
    state.aiProgress.forEach(p => { if (p > userPct) ahead++; });
    state.position = ahead + 1;
    els.position.textContent = `${state.position}${ordinal(state.position)}`;
}

function ordinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

// ============ End Game ============
function endGame(options = {}) {
    const { forcedPosition = null } = options;
    state.isFinished = true;
    state.isActive = false;
    clearInterval(state.timerInterval);
    clearInterval(state.aiInterval);

    const elapsed = state.startTime ? (Date.now() - state.startTime) / 1000 : 0;
    const wpm = calculateWPM(elapsed);
    const acc = calculateAccuracy();

    let finalPos = forcedPosition;
    if (finalPos === null) {
        // Final position: compare user (now at 1.0) vs current AI progress
        let ahead = 0;
        if (state.enableAI) {
            state.aiProgress.forEach(p => { if (p >= 1) ahead++; });
        }
        finalPos = ahead + 1;
    }

    els.finalWpm.textContent = wpm.toFixed(0);
    els.finalAccuracy.textContent = `${acc.toFixed(0)}%`;
    els.finalTime.textContent = `${elapsed.toFixed(3)}s`;
    els.finalPosition.textContent = `${finalPos}${ordinal(finalPos)}`;

    showScreen("end");
}

function getTotalRacers() {
    return state.enableAI ? 4 : 1;
}

function giveUpGame() {
    if (state.isFinished) return;

    // If racers gave up before this player, place right above them.
    const finalPos = Math.max(1, getTotalRacers() - state.giveUpCount);
    state.giveUpCount += 1;
    endGame({ forcedPosition: finalPos });
}

// ============ Quit ============
function quitGame() {
    clearInterval(state.timerInterval);
    clearInterval(state.aiInterval);
    state.isActive = false;
    initHomeScreen();
}

// ============ Wire Up Events ============
$("solo-button").addEventListener("click", initConfigScreen);
$("multiplayer-button").addEventListener("click", () => {
    alert("Multiplayer mode coming soon!");
    // Future: initMultiplayerScreen();
});

$("start-race-button").addEventListener("click", startGame);
$("play-again-button").addEventListener("click", initHomeScreen);
$("quit-button").addEventListener("click", quitGame);
$("give-up-button").addEventListener("click", giveUpGame);
els.typingInput.addEventListener("input", handleTyping);

document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const group = btn.dataset.group;
        const value = btn.dataset.value;
        $(group).value = value;
        setActiveOptionButton(group, value);
        syncStateFromConfigControls();
    });
});

$("username").addEventListener("input", syncStateFromConfigControls);
$("enable-ai").addEventListener("change", syncStateFromConfigControls);
$("enable-sound").addEventListener("change", syncStateFromConfigControls);
$("use-random-words").addEventListener("change", syncStateFromConfigControls);

els.typingInput.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
    }
});

// Refocus hidden input whenever the text area is clicked
els.textDisplay.addEventListener("click", () => els.typingInput.focus());
els.typingInput.addEventListener("focus", () => els.textDisplay.classList.add("focused"));
els.typingInput.addEventListener("blur",  () => els.textDisplay.classList.remove("focused"));

// Prevent paste (cheating)
els.typingInput.addEventListener("paste", e => e.preventDefault());

// Boot
initHomeScreen();
