/* ===========================================================
   Typing Race Game - script.js
   =========================================================== */

// ============ Text Library ============
const SUPPORTED_LANGUAGES = ["en", "fr"];
const SUPPORTED_DIFFICULTIES = ["easy", "medium", "hard"];
const SUPPORTED_LENGTHS = ["short", "medium", "long"];
const TEXTS_PER_BUCKET = 100;
const LANGUAGES_WITH_ACCENTS = ["fr"];

const PAGE_TEXT = {
    en: {
        pageLabel: "Page",
        homeSubtitle: "",
        soloTitle: "Solo",
        soloDesc: "",
        multiplayerTitle: "Multiplayer",
        multiplayerDesc: "",
        multiplayerMenuSubtitle: "",
        createLobbyTitle: "Create lobby",
        createLobbyDesc: "",
        joinLobbyTitle: "Join lobby",
        joinLobbyDesc: "",
        back: "Back",
        lobbyTitle: "Lobby",
        lobbySubtitle: "",
        lobbyUsernameLabel: "Username",
        lobbyUsernameSave: "Save",
        lobbyCodeLabel: "Lobby Code",
        copy: "Copy",
        copied: "Copied!",
        lobbyStart: "Start Race",
        leaveLobby: "Leave Lobby",
        backToLobby: "Back to Lobby",
        lobbyPlayerWaiting: "Waiting for player",
        hostSetupTitle: "Host is setting up the round",
        hostSetupSubtitle: "",
        lobbyNotConnected: "Not connected",
        lobbyWaitingHost: "Waiting for the host to start the race",
        lobbyWaitingGuest: "Waiting for another player to join",
        lobbyConnected: "Connected",
        lobbyConnecting: "Connecting...",
        lobbyPlayers: "Players: {count}",
        lobbyPrompt: "Enter private code",
        lobbyInvalidCode: "Please enter a valid lobby code.",
        lobbyCreateFailed: "Unable to create lobby. Try again.",
        lobbyJoinFailed: "Unable to join that lobby.",
        lobbyPeerMissing: "Multiplayer is unavailable right now.",
        lobbyStartUnavailable: "Only the host can start the race after a player joins.",
        waitingForHostStart: "Waiting for host to start",
        leaderboardTitle: "Leaderboard",
        raceAgain: "Play Again",
        gaveUpTag: "Gave up",
        configSubtitle: "",
        usernameLabel: "Username",
        usernamePlaceholder: "Enter your name",
        gameLanguageLabel: "Language",
        gameLanguageEn: "English",
        difficultyLabel: "Difficulty",
        difficultyEasy: "Easy",
        difficultyMedium: "Medium",
        difficultyHard: "Hard",
        textLengthLabel: "Text Length",
        textLengthShort: "Short",
        textLengthMedium: "Medium",
        textLengthLong: "Long",
        strictAccentsLabel: "Require Accents",
        enableAiLabel: "Enable Bot Racers",
        enableSoundLabel: "Sound Effects",
        randomWordsLabel: "Random Words",
        startRace: "Start Race",
        giveUp: "Give Up",
        quitRace: "Quit Race",
        statAccuracy: "Accuracy",
        statTime: "Time",
        statPosition: "Position",
        endTitle: "Race Complete!",
        playAgain: "Play Again",
        multiplayerAlert: "Multiplayer mode coming soon!"
    },
    fr: {
        pageLabel: "Page",
        homeSubtitle: "",
        soloTitle: "Solo",
        soloDesc: "",
        multiplayerTitle: "Multijoueur",
        multiplayerDesc: "",
        multiplayerMenuSubtitle: "",
        createLobbyTitle: "Créer un lobby",
        createLobbyDesc: "",
        joinLobbyTitle: "Rejoindre un lobby",
        joinLobbyDesc: "",
        back: "Retour",
        lobbyTitle: "Lobby",
        lobbySubtitle: "",
        lobbyUsernameLabel: "Pseudo",
        lobbyUsernameSave: "Enregistrer",
        lobbyCodeLabel: "Code du lobby",
        copy: "Copier",
        copied: "Copié !",
        lobbyStart: "Lancer la course",
        leaveLobby: "Quitter le lobby",
        backToLobby: "Retour au lobby",
        lobbyPlayerWaiting: "En attente d'un joueur",
        hostSetupTitle: "L'hôte prépare la manche",
        hostSetupSubtitle: "",
        lobbyNotConnected: "Non connecté",
        lobbyWaitingHost: "En attente du lancement par l'hôte",
        lobbyWaitingGuest: "En attente d'un autre joueur",
        lobbyConnected: "Connecté",
        lobbyConnecting: "Connexion...",
        lobbyPlayers: "Joueurs : {count}",
        lobbyPrompt: "Entre le code privé",
        lobbyInvalidCode: "Entre un code de lobby valide.",
        lobbyCreateFailed: "Impossible de créer le lobby. Réessaie.",
        lobbyJoinFailed: "Impossible de rejoindre ce lobby.",
        lobbyPeerMissing: "Le multijoueur est indisponible pour le moment.",
        lobbyStartUnavailable: "Seul l'hôte peut lancer la course après la connexion d'un joueur.",
        waitingForHostStart: "En attente du lancement par l'hôte",
        leaderboardTitle: "Classement",
        raceAgain: "Rejouer",
        gaveUpTag: "Abandon",
        configSubtitle: "",
        usernameLabel: "Pseudo",
        usernamePlaceholder: "Entre ton nom",
        gameLanguageLabel: "Langue du jeu",
        gameLanguageEn: "Anglais",
        difficultyLabel: "Difficulté",
        difficultyEasy: "Facile",
        difficultyMedium: "Moyen",
        difficultyHard: "Difficile",
        textLengthLabel: "Longueur du texte",
        textLengthShort: "Court",
        textLengthMedium: "Moyen",
        textLengthLong: "Long",
        strictAccentsLabel: "Exiger les accents",
        enableAiLabel: "Activer les bots",
        enableSoundLabel: "Effets sonores",
        randomWordsLabel: "Mots aléatoires",
        startRace: "Lancer la course",
        giveUp: "Abandonner",
        quitRace: "Quitter",
        statAccuracy: "Précision",
        statTime: "Temps",
        statPosition: "Position",
        endTitle: "Course terminée !",
        playAgain: "Rejouer",
        multiplayerAlert: "Le mode multijoueur arrive bientôt !"
    }
};

const WORD_LISTS = {
    en: [
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
    ],
    fr: [
        "le", "renard", "brun", "rapide", "saute", "par", "dessus", "chien", "paresseux", "pratique",
        "rend", "meilleur", "clavier", "vitesse", "texte", "course", "école", "classe", "amis", "apprendre",
        "coder", "logique", "idée", "projet", "avenir", "travail", "effort", "patience", "focus", "calme",
        "lecture", "livre", "musique", "énergie", "routine", "objectif", "progrès", "détail", "précision", "rythme",
        "phrase", "mot", "lettre", "erreur", "correction", "exercice", "mémoire", "habitude", "discipline", "temps",
        "minute", "seconde", "résultat", "score", "confiance", "équipe", "partage", "internet", "outil", "solution",
        "esprit", "curieux", "créatif", "inspiré", "motivation", "réussite", "défi", "simple", "complexe", "rapide",
        "lent", "fluide", "propre", "utile", "chanson", "voyage", "histoire", "culture", "langue", "français",
        "anglais", "communication", "message", "clarté", "souffle", "pause", "attention", "concentration", "gagner", "avancer",
        "niveau", "facile", "moyen", "difficile", "départ", "arrivée", "progression", "constance", "développer", "construire",
        "l'école", "l'élève", "d'accord", "aujourd'hui", "s'entraîne", "l'équipe", "l'attention", "d'énergie", "l'objectif", "d'habitude"
    ]
};

const BANK_TEMPLATES = {
    en: {
        easy: {
            subjects: ["The student", "Our team", "The player", "A beginner", "The runner", "My friend", "The class", "This coder", "The teacher", "A learner"],
            verbs: ["types", "reads", "builds", "writes", "checks", "reviews", "trains", "keeps", "solves", "follows"],
            objects: ["short words", "simple lines", "daily goals", "clean notes", "basic drills", "clear prompts", "small tasks", "steady rhythm", "quick ideas", "tiny wins"],
            tails: ["with calm focus", "before lunch", "every morning", "in one minute", "with no stress", "at school", "after class", "with good form", "for better speed", "with strong accuracy"]
        },
        medium: {
            starts: ["Typing with consistency", "Focused practice", "A smart routine", "Daily repetition", "Clear feedback", "Careful correction", "Sustained attention", "Steady progress", "Balanced effort", "Intentional training"],
            middles: ["improves both speed and confidence", "builds durable keyboard memory", "helps each mistake become a lesson", "turns weak spots into reliable habits", "makes race results more predictable", "supports cleaner and faster inputs", "reduces hesitation on complex lines", "keeps performance stable under pressure", "raises quality without rushing", "creates strong momentum over time"],
            ends: ["when goals stay realistic and clear", "because small wins compound quickly", "if every session has a purpose", "when feedback is used right away", "as long as effort remains consistent", "if the player keeps breathing calmly", "when accuracy leads before speed", "if progress is tracked each day", "as confidence grows from repetition", "when the challenge level matches skill"]
        },
        hard: {
            openings: ["Although the race appears simple", "When pressure rises in the final stretch", "Because advanced typing rewards precision", "While competitors chase raw speed", "As the text becomes more demanding", "Since difficult passages expose weak habits", "Even when the timer feels unforgiving", "If a player wants elite consistency", "Whenever attention starts to drift", "As strategic pacing replaces panic"],
            pivots: ["careful rhythm control still determines the outcome", "micro corrections prevent larger breakdowns", "intentional breathing protects long term focus", "disciplined input timing outperforms random bursts", "structured repetition stabilizes complex patterns", "error awareness improves every split decision", "composure under stress creates measurable gains", "clarity in movement keeps accuracy intact", "technical patience unlocks sustainable speed", "small adjustments compound into strong finishes"],
            closings: ["so the best result comes from precision first and acceleration second", "which is why steady execution beats chaotic typing in most runs", "therefore each session should reward control before risky aggression", "and that is where experienced players gain an edge over impatient rivals", "so improvement depends on systems, not luck or sudden bursts", "which proves that disciplined mechanics can carry the hardest passages", "therefore long term consistency matters more than a single fast start", "and this is exactly why deliberate practice remains the winning approach", "so high level performance emerges from repeatable habits and clear review", "which turns difficult text into a manageable and winnable sequence"]
        }
    },
    fr: {
        easy: {
            subjects: ["L'élève", "Notre équipe", "Le joueur", "Un débutant", "Le coureur", "Mon ami", "La classe", "Ce codeur", "Le prof", "Un apprenant"],
            verbs: ["tape", "lit", "construit", "écrit", "vérifie", "observe", "s'entraîne", "garde", "corrige", "suit"],
            objects: ["des mots courts", "des lignes simples", "des objectifs du jour", "des notes claires", "des exercices faciles", "des consignes nettes", "de petites tâches", "un rythme stable", "des idées rapides", "de petits progrès"],
            tails: ["avec calme", "avant midi", "chaque matin", "en une minute", "sans stress", "à l'école", "après le cours", "avec précision", "pour aller plus vite", "avec une bonne justesse"]
        },
        medium: {
            starts: ["Taper avec régularité", "Une pratique concentrée", "Une routine utile", "La répétition quotidienne", "Un retour clair", "Une correction rapide", "Une attention stable", "Un progrès constant", "Un effort équilibré", "Un entraînement intentionnel"],
            middles: ["améliore la vitesse et la confiance", "construit une mémoire clavier solide", "transforme chaque erreur en leçon", "renforce les habitudes utiles", "rend les résultats plus stables", "donne des saisies plus propres", "diminue l'hésitation sur les passages longs", "garde la performance sous pression", "augmente la qualité sans se précipiter", "crée un bon élan sur la durée"],
            ends: ["quand les objectifs restent clairs", "car les petits gains se cumulent", "si chaque session a un but", "quand le retour est appliqué tout de suite", "tant que l'effort reste constant", "si le joueur respire calmement", "quand la précision passe avant la vitesse", "si le suivi est fait chaque jour", "quand la confiance monte avec la répétition", "si le niveau du défi reste adapté"]
        },
        hard: {
            openings: ["Même si la course semble simple", "Quand la pression monte à la fin", "Parce que la frappe avancée demande de la précision", "Pendant que les rivaux cherchent la vitesse brute", "Quand le texte devient exigeant", "Comme les passages difficiles révèlent les faiblesses", "Même si le chrono paraît sévère", "Si un joueur veut une constance élite", "Chaque fois que l'attention baisse", "Quand la stratégie remplace la panique"],
            pivots: ["le contrôle du rythme décide encore le résultat", "les micro-corrections évitent de grosses erreurs", "une respiration volontaire protège la concentration", "un timing propre dépasse les accélérations au hasard", "la répétition structurée stabilise les motifs complexes", "la lecture des erreurs améliore chaque décision", "le calme sous pression crée des gains visibles", "la clarté du geste maintient la précision", "la patience technique ouvre une vitesse durable", "de petits ajustements produisent de grandes fins"],
            closings: ["donc le meilleur score vient de la précision avant l'accélération", "c'est pourquoi une exécution stable bat souvent un style chaotique", "ainsi chaque session doit valoriser le contrôle avant le risque", "et c'est là que les joueurs expérimentés prennent l'avantage", "donc le progrès dépend d'un système et non de la chance", "ce qui montre que la discipline porte les passages les plus durs", "ainsi la constance compte plus qu'un départ trop rapide", "et voilà pourquoi la pratique délibérée reste gagnante", "donc la performance élevée vient d'habitudes répétables", "ce qui rend même un texte dur plus gérable"]
        }
    }
};

function pick(arr, i, jump) {
    return arr[(i * jump + jump) % arr.length];
}

function buildText(lang, difficulty, textLength, index) {
    const tpl = BANK_TEMPLATES[lang][difficulty];
    const serial = index + 1;

    if (difficulty === "easy") {
        const clauses = {
            short: 1,
            medium: 2,
            long: 3
        };
        const parts = [];
        for (let i = 0; i < clauses[textLength]; i++) {
            const k = index * 3 + i;
            if (lang === "en") {
                parts.push(`${pick(tpl.subjects, k, 3)} ${pick(tpl.verbs, k, 5)} ${pick(tpl.objects, k, 7)} ${pick(tpl.tails, k, 9)}.`);
            } else {
                parts.push(`${pick(tpl.subjects, k, 3)} ${pick(tpl.verbs, k, 5)} ${pick(tpl.objects, k, 7)} ${pick(tpl.tails, k, 9)}.`);
            }
        }
        parts.push(lang === "en" ? `Training text ${serial}.` : `Texte d'entraînement ${serial}.`);
        return parts.join(" ");
    }

    if (difficulty === "medium") {
        const clauses = {
            short: 1,
            medium: 2,
            long: 3
        };
        const parts = [];
        for (let i = 0; i < clauses[textLength]; i++) {
            const k = index * 4 + i;
            parts.push(`${pick(tpl.starts, k, 3)} ${pick(tpl.middles, k, 5)} ${pick(tpl.ends, k, 7)}.`);
        }
        parts.push(lang === "en" ? `Session ${serial}.` : `Session ${serial}.`);
        return parts.join(" ");
    }

    const clauses = {
        short: 1,
        medium: 2,
        long: 3
    };
    const parts = [];
    for (let i = 0; i < clauses[textLength]; i++) {
        const k = index * 5 + i;
        parts.push(`${pick(tpl.openings, k, 3)}, ${pick(tpl.pivots, k, 5)}, ${pick(tpl.closings, k, 7)}.`);
    }
    parts.push(lang === "en" ? `Advanced passage ${serial}.` : `Passage avancé ${serial}.`);
    return parts.join(" ");
}

function buildTextBank() {
    const bank = {};

    SUPPORTED_LANGUAGES.forEach((lang) => {
        bank[lang] = {};
        SUPPORTED_DIFFICULTIES.forEach((difficulty) => {
            bank[lang][difficulty] = {};
            SUPPORTED_LENGTHS.forEach((textLength) => {
                bank[lang][difficulty][textLength] = [];
                for (let i = 0; i < TEXTS_PER_BUCKET; i++) {
                    bank[lang][difficulty][textLength].push(buildText(lang, difficulty, textLength, i));
                }
            });
        });
    });

    return bank;
}

const TEXT_BANK = buildTextBank();

// ============ Game State ============
const state = {
    username: "Player",
    pageLanguage: "en",
    language: "en",
    strictAccents: true,
    difficulty: "medium",
    textLength: "medium",
    useRandomWords: false,
    enableAI: true,
    enableSound: false,
    text: "",
    startTime: null,
    timerInterval: null,
    aiInterval: null,
    animationFrameId: null,
    lastTimerPaintAt: 0,
    lastAiPaintAt: 0,
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
    renderedChars: [],
    position: 1,
    multiplayer: {
        peer: null,
        connection: null,
        connections: {},
        lobbyCode: "",
        selfId: "",
        isHost: false,
        connectedPlayers: 1,
        rosterBroadcastTimer: null,
        mode: "solo",
        players: {},
        results: {},
        raceConfig: null
    }
};

const STORAGE_KEY = "typing-race-settings";

// ============ DOM ============
const $ = (id) => document.getElementById(id);

const screens = {
    home:   $("home-screen"),
    multiplayer: $("multiplayer-screen"),
    lobby:  $("lobby-screen"),
    hostSetup: $("host-setup-screen"),
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
    playerLabel:   $("player-label"),
    leaderboardList: $("leaderboard-list"),
    lobbyCodeDisplay: $("lobby-code-display"),
    lobbyStatus: $("lobby-status"),
    lobbyPlayers: $("lobby-players"),
    lobbyPlayerList: $("lobby-player-list"),
    lobbyStartButton: $("lobby-start-button")
};

function getPageText() {
    return PAGE_TEXT[state.pageLanguage] || PAGE_TEXT.en;
}

function lobbyPeerIdFromCode(code) {
    return `fasttype-${code.toLowerCase()}`;
}

function generateLobbyCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

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
    clearGameLoops();
}

function initMultiplayerScreen() {
    showScreen("multiplayer");
    clearGameLoops();
}

function initHostSetupScreen() {
    showScreen("hostSetup");
    clearGameLoops();
}

function initConfigScreen() {
    showScreen("config");
    clearGameLoops();
    loadConfigToState();
    applyStateToConfigControls();
}

function clearGameLoops() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
    if (state.aiInterval) {
        clearInterval(state.aiInterval);
        state.aiInterval = null;
    }
    if (state.animationFrameId !== null) {
        cancelAnimationFrame(state.animationFrameId);
        state.animationFrameId = null;
    }
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
        state.pageLanguage = SUPPORTED_LANGUAGES.includes(saved.pageLanguage) ? saved.pageLanguage : state.pageLanguage;
        state.language = SUPPORTED_LANGUAGES.includes(saved.language) ? saved.language : state.language;
        state.strictAccents = typeof saved.strictAccents === "boolean" ? saved.strictAccents : state.strictAccents;
        state.difficulty = SUPPORTED_DIFFICULTIES.includes(saved.difficulty) ? saved.difficulty : state.difficulty;
        state.textLength = SUPPORTED_LENGTHS.includes(saved.textLength) ? saved.textLength : state.textLength;
        state.enableAI = typeof saved.enableAI === "boolean" ? saved.enableAI : state.enableAI;
        state.enableSound = typeof saved.enableSound === "boolean" ? saved.enableSound : state.enableSound;
        state.useRandomWords = typeof saved.useRandomWords === "boolean" ? saved.useRandomWords : state.useRandomWords;
    } catch (e) {
        /* ignore invalid storage */
    }
}

function applyStateToConfigControls() {
    $("username").value = state.username;
    $("lobby-username-input").value = state.username;
    $("page-language").value = state.pageLanguage;
    $("language").value = state.language;
    $("strict-accents").checked = state.strictAccents;
    $("difficulty").value = state.difficulty;
    $("text-length").value = state.textLength;
    $("enable-ai").checked = state.enableAI;
    $("enable-sound").checked = state.enableSound;
    $("use-random-words").checked = state.useRandomWords;
    setActiveOptionButton("language", state.language);
    setActiveOptionButton("difficulty", state.difficulty);
    setActiveOptionButton("text-length", state.textLength);
    applyPageLanguage();
    updateLanguageDependentSettings();
}

function applyPageLanguage() {
    const t = getPageText();
    document.documentElement.lang = state.pageLanguage;

    $("page-language-label").textContent = t.pageLabel;
    $("home-subtitle").textContent = t.homeSubtitle;
    $("solo-title").textContent = t.soloTitle;
    $("solo-desc").textContent = t.soloDesc;
    $("multiplayer-title").textContent = t.multiplayerTitle;
    $("multiplayer-desc").textContent = t.multiplayerDesc;
    $("multiplayer-menu-title").textContent = t.multiplayerTitle;
    $("multiplayer-menu-subtitle").textContent = t.multiplayerMenuSubtitle;
    $("create-lobby-title").textContent = t.createLobbyTitle;
    $("create-lobby-desc").textContent = t.createLobbyDesc;
    $("join-lobby-title").textContent = t.joinLobbyTitle;
    $("join-lobby-desc").textContent = t.joinLobbyDesc;
    $("back-home-button").textContent = t.back;
    $("lobby-title").textContent = t.lobbyTitle;
    $("lobby-subtitle").textContent = t.lobbySubtitle;
    $("lobby-username-label").textContent = t.lobbyUsernameLabel;
    $("lobby-username-save-button").textContent = t.lobbyUsernameSave;
    $("lobby-code-label").textContent = t.lobbyCodeLabel;
    $("copy-lobby-code-button").textContent = t.copy;
    $("lobby-start-button").textContent = t.lobbyStart;
    $("leave-lobby-button").textContent = t.leaveLobby;
    $("host-setup-title").textContent = t.hostSetupTitle;
    $("host-setup-subtitle").textContent = t.hostSetupSubtitle;
    $("host-setup-back-lobby-button").textContent = t.backToLobby;
    $("config-subtitle").textContent = t.configSubtitle;
    $("username-label").textContent = t.usernameLabel;
    $("username").placeholder = t.usernamePlaceholder;
    $("game-language-label").textContent = t.gameLanguageLabel;
    $("game-language-en").textContent = t.gameLanguageEn;
    $("difficulty-label").textContent = t.difficultyLabel;
    $("difficulty-easy").textContent = t.difficultyEasy;
    $("difficulty-medium").textContent = t.difficultyMedium;
    $("difficulty-hard").textContent = t.difficultyHard;
    $("text-length-label").textContent = t.textLengthLabel;
    $("text-length-short").textContent = t.textLengthShort;
    $("text-length-medium").textContent = t.textLengthMedium;
    $("text-length-long").textContent = t.textLengthLong;
    $("strict-accents-label").textContent = t.strictAccentsLabel;
    $("enable-ai-label").textContent = t.enableAiLabel;
    $("enable-sound-label").textContent = t.enableSoundLabel;
    $("use-random-words-label").textContent = t.randomWordsLabel;
    $("start-race-button").textContent = t.startRace;
    $("give-up-button").textContent = t.giveUp;
    $("quit-button").textContent = t.quitRace;
    $("stat-accuracy-label").textContent = t.statAccuracy;
    $("stat-time-label").textContent = t.statTime;
    $("stat-position-label").textContent = t.statPosition;
    $("result-accuracy-label").textContent = t.statAccuracy;
    $("result-time-label").textContent = t.statTime;
    $("result-position-label").textContent = t.statPosition;
    $("end-title").textContent = t.endTitle;
    $("leaderboard-title").textContent = t.leaderboardTitle;
    $("play-again-button").textContent = t.raceAgain;
    $("back-to-lobby-button").textContent = t.backToLobby;
    updateConfigStartButtonState();
    renderLobbyState();
}

function resetMultiplayerState() {
    if (state.multiplayer.connection) {
        try { state.multiplayer.connection.close(); } catch (e) { /* ignore */ }
    }
    Object.values(state.multiplayer.connections).forEach((conn) => {
        try { conn.close(); } catch (e) { /* ignore */ }
    });
    if (state.multiplayer.peer) {
        try { state.multiplayer.peer.destroy(); } catch (e) { /* ignore */ }
    }

    state.multiplayer.peer = null;
    state.multiplayer.connection = null;
    state.multiplayer.connections = {};
    state.multiplayer.lobbyCode = "";
    state.multiplayer.selfId = "";
    state.multiplayer.isHost = false;
    state.multiplayer.connectedPlayers = 1;
    if (state.multiplayer.rosterBroadcastTimer) {
        clearTimeout(state.multiplayer.rosterBroadcastTimer);
    }
    state.multiplayer.rosterBroadcastTimer = null;
    state.multiplayer.mode = "solo";
    state.multiplayer.players = {};
    state.multiplayer.results = {};
    state.multiplayer.raceConfig = null;
    state.renderedChars = [];
}

function renderLobbyState(statusKey = null) {
    const t = getPageText();
    els.lobbyCodeDisplay.textContent = state.multiplayer.lobbyCode || "------";

    let status = t.lobbyNotConnected;
    if (statusKey && t[statusKey]) {
        status = t[statusKey];
    } else if (state.multiplayer.connection && state.multiplayer.connection.open) {
        status = t.lobbyConnected;
    } else if (state.multiplayer.lobbyCode) {
        status = state.multiplayer.isHost ? t.lobbyWaitingGuest : t.lobbyWaitingHost;
    }

    const playerEntries = Object.entries(state.multiplayer.players);
    const sortedEntries = playerEntries.sort((a, b) => {
        if (a[1].isHost && !b[1].isHost) return -1;
        if (!a[1].isHost && b[1].isHost) return 1;
        return a[1].name.localeCompare(b[1].name);
    });

    state.multiplayer.connectedPlayers = sortedEntries.length || 1;
    els.lobbyStatus.textContent = status;
    els.lobbyPlayers.textContent = t.lobbyPlayers.replace("{count}", String(state.multiplayer.connectedPlayers));
    els.lobbyPlayerList.innerHTML = sortedEntries.length
        ? sortedEntries.map(([id, p]) => `<div class="lobby-player-item">${escapeHtml(p.name)}${p.isHost ? " (Host)" : ""}</div>`).join("")
        : `<div class="lobby-player-item">${escapeHtml(t.lobbyPlayerWaiting)}</div>`;
    els.lobbyStartButton.disabled = !(state.multiplayer.isHost && state.multiplayer.connectedPlayers > 1);
}

function openLobbyScreen(statusKey = null) {
    showScreen("lobby");
    renderLobbyState(statusKey);
}

function languageUsesAccents(lang) {
    return LANGUAGES_WITH_ACCENTS.includes(lang);
}

function updateLanguageDependentSettings() {
    const accentsToggle = $("accents-toggle");
    const hasAccents = languageUsesAccents(state.language);
    accentsToggle.style.display = hasAccents ? "block" : "none";
}

function setActiveOptionButton(group, value) {
    document.querySelectorAll(`.option-btn[data-group="${group}"]`).forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.value === value);
    });
}

function syncStateFromConfigControls() {
    state.username = $("username").value.trim() || "Player";
    state.pageLanguage = $("page-language").value;
    state.language = $("language").value;
    state.strictAccents = $("strict-accents").checked;
    state.difficulty = $("difficulty").value;
    state.textLength = $("text-length").value;
    state.enableAI = $("enable-ai").checked;
    state.enableSound = $("enable-sound").checked;
    state.useRandomWords = $("use-random-words").checked;
    applyPageLanguage();
    updateConfigStartButtonState();
    updateLanguageDependentSettings();
    persistConfig();
}

function isMultiplayerSession() {
    return state.multiplayer.mode === "multiplayer";
}

function updateConfigStartButtonState() {
    const t = getPageText();
    const startBtn = $("start-race-button");

    if (isMultiplayerSession() && !state.multiplayer.isHost) {
        startBtn.style.display = "none";
        startBtn.disabled = true;
        startBtn.textContent = t.waitingForHostStart;
        return;
    }

    startBtn.style.display = "inline-block";
    startBtn.disabled = false;
    startBtn.textContent = t.startRace;
}

function buildRaceTextForCurrentSettings() {
    if (state.useRandomWords) {
        const wordCounts = {
            short: 15,
            medium: 35,
            long: 75
        };
        return generateRandomWordText(wordCounts[state.textLength]);
    }

    const pool = TEXT_BANK[state.language][state.difficulty][state.textLength];
    return pool[Math.floor(Math.random() * pool.length)];
}

function startGameFromConfig(config) {
    state.language = config.language;
    state.strictAccents = config.strictAccents;
    state.difficulty = config.difficulty;
    state.textLength = config.textLength;
    state.useRandomWords = config.useRandomWords;
    state.enableSound = config.enableSound;
    state.enableAI = Boolean(config.enableAI);
    state.text = config.text;

    state.multiplayer.raceConfig = config;
    state.multiplayer.results = {};

    const ranges = {
        easy:   [25, 45],
        medium: [45, 70],
        hard:   [70, 100]
    };
    const [min, max] = ranges[state.difficulty];
    state.aiSpeeds = [0, 1, 2].map(() => min + Math.random() * (max - min));

    state.startTime = null;
    state.isActive = false;
    state.isFinished = false;
    state.typedChars = 0;
    state.correctChars = 0;
    state.mistakes = 0;
    state.currentInput = "";
    state.aiProgress = [0, 0, 0];
    state.renderedChars = [];
    state.position = 1;
    state.giveUpCount = 0;

    els.typingInput.value = "";
    els.playerLabel.textContent = state.username.slice(0, 8);
    els.aiRacers.style.display = state.enableAI ? "block" : "none";

    renderText();
    updateStats();
    updateProgress();
    updateAIProgress(0);
    updatePositions();

    showScreen("active");
    setTimeout(() => els.typingInput.focus(), 50);
}

function persistConfig() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            username: state.username,
            pageLanguage: state.pageLanguage,
            language: state.language,
            strictAccents: state.strictAccents,
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

function getPlayersPayload() {
    return Object.entries(state.multiplayer.players).map(([id, p]) => ({
        id,
        name: p.name,
        isHost: Boolean(p.isHost)
    }));
}

function getResultsPayload() {
    return Object.entries(state.multiplayer.results).map(([id, r]) => ({
        id,
        ...r
    }));
}

function broadcastToGuests(message) {
    if (!state.multiplayer.isHost) return;
    Object.values(state.multiplayer.connections).forEach((conn) => {
        if (conn && conn.open) {
            conn.send(message);
        }
    });
}

function broadcastRoster() {
    if (!state.multiplayer.isHost) return;
    state.multiplayer.connectedPlayers = Object.keys(state.multiplayer.players).length;
    const message = {
        type: "roster",
        players: getPlayersPayload(),
        connectedPlayers: state.multiplayer.connectedPlayers
    };
    broadcastToGuests(message);
    renderLobbyState("lobbyConnected");
}

function scheduleRosterBroadcast() {
    if (!state.multiplayer.isHost) return;
    if (state.multiplayer.rosterBroadcastTimer) return;
    state.multiplayer.rosterBroadcastTimer = setTimeout(() => {
        state.multiplayer.rosterBroadcastTimer = null;
        broadcastRoster();
    }, 0);
}

function broadcastResults() {
    if (!state.multiplayer.isHost) return;
    broadcastToGuests({ type: "results", results: getResultsPayload() });
}

function attachConnectionHandlers(conn) {
    if (state.multiplayer.isHost) {
        state.multiplayer.connections[conn.peer] = conn;
    } else {
        state.multiplayer.connection = conn;
    }

    conn.on("open", () => {
        if (state.multiplayer.isHost) {
            if (!state.multiplayer.players[conn.peer]) {
                state.multiplayer.players[conn.peer] = {
                    name: `Player ${Object.keys(state.multiplayer.players).length}`,
                    isHost: false
                };
            }
            scheduleRosterBroadcast();
        } else {
            renderLobbyState("lobbyConnected");
        }
    });

    conn.on("data", (data) => {
        if (!data || typeof data !== "object") return;

        if (data.type === "hello" && data.username) {
            if (state.multiplayer.isHost) {
                if (!state.multiplayer.players[conn.peer]) {
                    state.multiplayer.players[conn.peer] = { name: data.username, isHost: false };
                } else {
                    state.multiplayer.players[conn.peer].name = data.username;
                }
                scheduleRosterBroadcast();
            }
            return;
        }

        if (data.type === "username-update" && data.username) {
            if (state.multiplayer.isHost && state.multiplayer.players[conn.peer]) {
                state.multiplayer.players[conn.peer].name = data.username;
                scheduleRosterBroadcast();
            }
            return;
        }

        if (data.type === "roster" && Array.isArray(data.players) && !state.multiplayer.isHost) {
            state.multiplayer.players = {};
            data.players.forEach((p) => {
                state.multiplayer.players[p.id] = { name: p.name, isHost: Boolean(p.isHost) };
            });
            state.multiplayer.connectedPlayers = data.connectedPlayers || data.players.length;
            renderLobbyState("lobbyConnected");
            return;
        }

        if (data.type === "start-race-setup") {
            state.multiplayer.mode = "multiplayer";
            initHostSetupScreen();
            return;
        }

        if (data.type === "race-start" && data.config) {
            state.multiplayer.mode = "multiplayer";
            state.multiplayer.results = {};
            startGameFromConfig(data.config);
            return;
        }

        if (data.type === "race-result" && data.result) {
            if (state.multiplayer.isHost) {
                state.multiplayer.results[conn.peer] = data.result;
                broadcastResults();
            }
            if (screens.end.classList.contains("active")) {
                renderLeaderboard();
            }
            return;
        }

        if (data.type === "results" && Array.isArray(data.results) && !state.multiplayer.isHost) {
            state.multiplayer.results = {};
            data.results.forEach((r) => {
                const { id, ...payload } = r;
                state.multiplayer.results[id] = payload;
            });
            if (screens.end.classList.contains("active")) {
                renderLeaderboard();
            }
        }
    });

    conn.on("close", () => {
        if (state.multiplayer.isHost) {
            delete state.multiplayer.connections[conn.peer];
            delete state.multiplayer.players[conn.peer];
            delete state.multiplayer.results[conn.peer];
            scheduleRosterBroadcast();
        } else {
            state.multiplayer.connection = null;
            state.multiplayer.connectedPlayers = 1;
            renderLobbyState("lobbyNotConnected");
        }
    });

    conn.on("error", () => {
        if (state.multiplayer.isHost) {
            delete state.multiplayer.connections[conn.peer];
            delete state.multiplayer.players[conn.peer];
            delete state.multiplayer.results[conn.peer];
            scheduleRosterBroadcast();
        } else {
            state.multiplayer.connection = null;
            state.multiplayer.connectedPlayers = 1;
            renderLobbyState("lobbyNotConnected");
        }
    });
}

function createLobby() {
    const t = getPageText();

    if (typeof window.Peer === "undefined") {
        alert(t.lobbyPeerMissing);
        return;
    }

    resetMultiplayerState();
    const lobbyCode = generateLobbyCode();
    const peer = new window.Peer(lobbyPeerIdFromCode(lobbyCode));

    state.multiplayer.peer = peer;
    state.multiplayer.lobbyCode = lobbyCode;
    state.multiplayer.isHost = true;
    state.multiplayer.mode = "multiplayer";
    state.multiplayer.connectedPlayers = 1;
    state.multiplayer.players = {};
    state.multiplayer.results = {};
    $("lobby-username-input").value = state.username;
    openLobbyScreen("lobbyConnecting");

    peer.on("open", (id) => {
        state.multiplayer.selfId = id;
        state.multiplayer.players[id] = { name: state.username, isHost: true };
        renderLobbyState("lobbyWaitingGuest");
    });

    peer.on("connection", (conn) => {
        attachConnectionHandlers(conn);
    });

    peer.on("error", () => {
        resetMultiplayerState();
        alert(t.lobbyCreateFailed);
        initMultiplayerScreen();
    });
}

function joinLobby() {
    const t = getPageText();

    if (typeof window.Peer === "undefined") {
        alert(t.lobbyPeerMissing);
        return;
    }

    const rawCode = window.prompt(t.lobbyPrompt, "");
    const lobbyCode = rawCode ? rawCode.trim().toUpperCase() : "";
    if (!lobbyCode) return;
    if (!/^[A-Z0-9]{6}$/.test(lobbyCode)) {
        alert(t.lobbyInvalidCode);
        return;
    }

    resetMultiplayerState();
    const peer = new window.Peer();
    state.multiplayer.peer = peer;
    state.multiplayer.lobbyCode = lobbyCode;
    state.multiplayer.isHost = false;
    state.multiplayer.mode = "multiplayer";
    state.multiplayer.connectedPlayers = 1;
    state.multiplayer.players = {};
    state.multiplayer.results = {};
    $("lobby-username-input").value = state.username;
    openLobbyScreen("lobbyConnecting");

    peer.on("open", (id) => {
        state.multiplayer.selfId = id;
        const conn = peer.connect(lobbyPeerIdFromCode(lobbyCode), { reliable: true });
        attachConnectionHandlers(conn);
        conn.on("open", () => {
            conn.send({ type: "hello", username: state.username });
        });
    });

    peer.on("error", () => {
        resetMultiplayerState();
        alert(t.lobbyJoinFailed);
        initMultiplayerScreen();
    });
}

function leaveLobby() {
    resetMultiplayerState();
    initMultiplayerScreen();
}

function saveLobbyUsername() {
    const next = $("lobby-username-input").value.trim() || "Player";
    state.username = next;
    $("username").value = state.username;
    persistConfig();

    if (state.multiplayer.selfId) {
        if (!state.multiplayer.players[state.multiplayer.selfId]) {
            state.multiplayer.players[state.multiplayer.selfId] = { name: state.username, isHost: state.multiplayer.isHost };
        } else {
            state.multiplayer.players[state.multiplayer.selfId].name = state.username;
        }
    }

    if (state.multiplayer.isHost) {
        broadcastRoster();
    }

    if (state.multiplayer.connection && state.multiplayer.connection.open) {
        state.multiplayer.connection.send({ type: "username-update", username: state.username });
    }

    renderLobbyState();
}

function startMultiplayerRace() {
    const t = getPageText();
    if (!(state.multiplayer.isHost && Object.keys(state.multiplayer.connections).length > 0)) {
        alert(t.lobbyStartUnavailable);
        return;
    }

    broadcastToGuests({ type: "start-race-setup" });
    initConfigScreen();
}

function handlePlayAgain() {
    if (!isMultiplayerSession()) {
        initHomeScreen();
        return;
    }

    if (state.multiplayer.isHost) {
        broadcastToGuests({ type: "start-race-setup" });
        initConfigScreen();
        return;
    }

    initHostSetupScreen();
}

function handleBackToLobbyFromEnd() {
    if (!isMultiplayerSession()) {
        initHomeScreen();
        return;
    }

    openLobbyScreen();
}

// ============ Start Game ============
function generateRandomWordText(wordCount) {
    const words = WORD_LISTS[state.language] || WORD_LISTS.en;
    let text = "";
    for (let i = 0; i < wordCount; i++) {
        text += words[Math.floor(Math.random() * words.length)] + " ";
    }
    return text.trim();
}

function startGame() {
    syncStateFromConfigControls();

    if (isMultiplayerSession()) {
        if (!state.multiplayer.isHost) return;

        const config = {
            language: state.language,
            strictAccents: state.strictAccents,
            difficulty: state.difficulty,
            textLength: state.textLength,
            useRandomWords: state.useRandomWords,
            enableSound: state.enableSound,
            enableAI: false,
            text: buildRaceTextForCurrentSettings()
        };

        state.multiplayer.results = {};
        if (state.multiplayer.selfId) {
            delete state.multiplayer.results[state.multiplayer.selfId];
        }
        broadcastToGuests({ type: "race-start", config });

        startGameFromConfig(config);
        return;
    }

    // Pick a random text or generate from random words
    state.text = buildRaceTextForCurrentSettings();

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
    state.renderedChars = [];
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
    const previousLength = state.currentInput.length;

    // Enforce strictly linear typing: no going backwards.
    if (value.length < state.currentInput.length) {
        els.typingInput.value = state.currentInput;
        return;
    } else if (value.length > state.currentInput.length) {
        const appended = value.slice(state.currentInput.length);

        for (const ch of appended) {
            const expectedChar = state.text[state.currentInput.length];
            if (charactersMatch(ch, expectedChar)) {
                // Store the canonical text character so progress remains aligned.
                state.currentInput += expectedChar;
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

    renderText(previousLength);
    updateProgress();
    updateStats();
    updatePositions();

    // Finish: full text typed correctly
    if (state.currentInput === state.text) {
        endGame();
    }
}

function normalizeAccentChar(ch) {
    return ch
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/’/g, "'")
        .toLowerCase();
}

function charactersMatch(inputChar, expectedChar) {
    if (inputChar === expectedChar) return true;

    // When accents are not strict, accept base-letter matches (e.g. e for e acute).
    if (languageUsesAccents(state.language) && !state.strictAccents) {
        return normalizeAccentChar(inputChar) === normalizeAccentChar(expectedChar);
    }

    return false;
}

// ============ Render Text with Highlights ============
function buildTextSpans() {
    const fragment = document.createDocumentFragment();
    const chars = [];

    for (let i = 0; i < state.text.length; i++) {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = state.text[i];
        fragment.appendChild(span);
        chars.push(span);
    }

    els.textDisplay.textContent = "";
    els.textDisplay.appendChild(fragment);
    state.renderedChars = chars;
}

function renderText(previousLength = 0) {
    if (!state.renderedChars.length || state.renderedChars.length !== state.text.length) {
        buildTextSpans();
        previousLength = 0;
    }

    const inputLength = state.currentInput.length;

    if (inputLength < previousLength) {
        for (let i = inputLength; i < previousLength; i++) {
            const ch = state.renderedChars[i];
            if (ch) {
                ch.className = "char";
            }
        }
    }

    for (let i = previousLength; i < inputLength; i++) {
        const ch = state.renderedChars[i];
        if (ch) {
            ch.className = "char correct";
        }
    }

    if (inputLength < state.renderedChars.length) {
        const current = state.renderedChars[inputLength];
        current.className = Date.now() < state.errorFlashUntil
            ? "char current current-error"
            : "char current";
    }
}

function triggerTypingErrorFeedback() {
    state.errorFlashUntil = Date.now() + 220;
    const idx = state.currentInput.length;
    const current = state.renderedChars[idx];
    if (current) current.classList.add("current-error");
    els.textDisplay.classList.remove("typing-error");
    // Restart the animation when mistakes happen in rapid succession.
    void els.textDisplay.offsetWidth;
    els.textDisplay.classList.add("typing-error");
    setTimeout(() => {
        els.textDisplay.classList.remove("typing-error");
        const caret = state.renderedChars[state.currentInput.length];
        if (caret) caret.classList.remove("current-error");
    }, 220);
}

function escapeHtml(c) {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[c] || c;
}

// ============ Timer ============
function startTimer() {
    clearGameLoops();
    state.isActive = true;
    state.startTime = Date.now();
    state.lastTimerPaintAt = 0;
    state.lastAiPaintAt = 0;

    const tick = (now) => {
        if (!state.isActive || state.isFinished || !state.startTime) {
            state.animationFrameId = null;
            return;
        }

        if (!state.lastTimerPaintAt || now - state.lastTimerPaintAt >= 50) {
            updateTimer();
            state.lastTimerPaintAt = now;
        }

        if (state.enableAI && (!state.lastAiPaintAt || now - state.lastAiPaintAt >= 100)) {
            const elapsed = (Date.now() - state.startTime) / 1000;
            updateAIProgress(elapsed);
            updatePositions();
            state.lastAiPaintAt = now;
        }

        state.animationFrameId = requestAnimationFrame(tick);
    };

    state.animationFrameId = requestAnimationFrame(tick);
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

function renderLeaderboard() {
    const t = getPageText();
    const rows = [];

    const sortRows = (a, b) => {
        if (a.gaveUp !== b.gaveUp) return a.gaveUp ? 1 : -1;
        return a.timeSeconds - b.timeSeconds;
    };

    if (isMultiplayerSession()) {
        rows.push(...Object.values(state.multiplayer.results));
        rows.sort(sortRows);
    } else {
        const elapsed = state.startTime ? (Date.now() - state.startTime) / 1000 : 0;
        rows.push({
            name: state.username,
            wpm: calculateWPM(elapsed),
            accuracy: calculateAccuracy(),
            timeSeconds: elapsed,
            gaveUp: false
        });

        if (state.enableAI) {
            state.aiSpeeds.forEach((speed, idx) => {
                const aiTime = (state.text.length / (speed * 5)) * 60;
                rows.push({
                    name: `Bot ${idx + 1}`,
                    wpm: speed,
                    accuracy: 100,
                    timeSeconds: aiTime,
                    gaveUp: false
                });
            });
        }

        rows.sort(sortRows);
    }

    els.leaderboardList.innerHTML = rows.map((row, index) => `
        <div class="leaderboard-row">
            <div class="leaderboard-rank">${index + 1}</div>
            <div class="leaderboard-name">${escapeHtml(row.name)}${row.gaveUp ? ` <span class="leaderboard-tag">${t.gaveUpTag}</span>` : ""}</div>
            <div class="leaderboard-meta">${row.wpm.toFixed(0)} WPM</div>
            <div class="leaderboard-meta">${row.gaveUp ? "-" : `${row.timeSeconds.toFixed(2)}s`}</div>
        </div>
    `).join("");

    $("back-to-lobby-button").style.display = isMultiplayerSession() ? "inline-block" : "none";
}

// ============ End Game ============
function endGame(options = {}) {
    const { forcedPosition = null, gaveUp = false } = options;
    state.isFinished = true;
    state.isActive = false;
    clearGameLoops();

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

    if (isMultiplayerSession()) {
        const localResult = {
            name: state.username,
            wpm,
            accuracy: acc,
            timeSeconds: elapsed,
            gaveUp
        };
        const localId = state.multiplayer.selfId || "local";
        state.multiplayer.results[localId] = localResult;

        if (state.multiplayer.isHost) {
            broadcastResults();
        } else if (state.multiplayer.connection && state.multiplayer.connection.open) {
            state.multiplayer.connection.send({ type: "race-result", result: localResult });
        }
    }

    renderLeaderboard();

    showScreen("end");
}

function getTotalRacers() {
    if (isMultiplayerSession()) {
        return Math.max(1, Object.keys(state.multiplayer.players).length);
    }
    return state.enableAI ? 4 : 1;
}

function giveUpGame() {
    if (state.isFinished) return;

    // If racers gave up before this player, place right above them.
    const finalPos = Math.max(1, getTotalRacers() - state.giveUpCount);
    state.giveUpCount += 1;
    endGame({ forcedPosition: finalPos, gaveUp: true });
}

// ============ Quit ============
function quitGame() {
    clearGameLoops();
    state.isActive = false;
    initHomeScreen();
}

// ============ Wire Up Events ============
$("solo-button").addEventListener("click", initConfigScreen);
$("multiplayer-button").addEventListener("click", initMultiplayerScreen);
$("create-lobby-button").addEventListener("click", createLobby);
$("join-lobby-button").addEventListener("click", joinLobby);
$("back-home-button").addEventListener("click", initHomeScreen);
$("host-setup-back-lobby-button").addEventListener("click", () => openLobbyScreen());
$("leave-lobby-button").addEventListener("click", leaveLobby);
$("lobby-start-button").addEventListener("click", startMultiplayerRace);
$("lobby-username-save-button").addEventListener("click", saveLobbyUsername);
$("copy-lobby-code-button").addEventListener("click", async () => {
    const t = getPageText();
    if (!state.multiplayer.lobbyCode) return;
    try {
        await navigator.clipboard.writeText(state.multiplayer.lobbyCode);
        $("copy-lobby-code-button").textContent = t.copied;
        setTimeout(() => {
            $("copy-lobby-code-button").textContent = getPageText().copy;
        }, 1200);
    } catch (e) {
        /* ignore clipboard errors */
    }
});

$("start-race-button").addEventListener("click", startGame);
$("play-again-button").addEventListener("click", handlePlayAgain);
$("back-to-lobby-button").addEventListener("click", handleBackToLobbyFromEnd);
$("quit-button").addEventListener("click", quitGame);
$("give-up-button").addEventListener("click", giveUpGame);
els.typingInput.addEventListener("input", handleTyping);

$("page-language").addEventListener("change", syncStateFromConfigControls);

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
$("strict-accents").addEventListener("change", syncStateFromConfigControls);
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
loadConfigToState();
applyStateToConfigControls();
initHomeScreen();
