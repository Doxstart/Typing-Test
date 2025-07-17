const words = ["cereza", "gusto", "entorno", "coca", "solar", "saludo", "desprecio", "nuevo", 
    "cuentas", "relato", "lado", "helado", "saber", "primario", "secundario", "terciario", "novedoso", 
    "implicar", "practicar", "suave", "hermoso", "generoso", "abdicar", "aburrido", "dormir", "mirar", 
    "clasificar", "equipo", "ambiente", "estudio", "paralelo", "horizonte", "reflexionar", "neuronal", 
    "estaciones", "calendario", "medicina", "hospital", "dramaturgo", "exponer", "cambio", "bruja", 
    "dispositivo", "astral", "abismal", "abecedario", "alfombra", "lujo", "comodidad", "despertar", 
    "extraterrestre", "nominal", "inmenso", "desolador", "fastidioso", "experiencia", "destrozar", "canto", 
    "baile", "secuencia", "pasos", "completo", "migajas", "alimentos", "flores", "bebida", "maestro", 
    "destino", "simple", "final", "perezoso", "cotidiano", "establecer", "simplificar", "estrellas", "borracho",
    "adjuntar", "escanear", "partido", "comunicar", "probar", "cretino", "mantequilla", "salado", "creativo", 
    "vestido", "discutir", "dialogar", "enfrentar", "pelear", "admirar", "entregado", "delicioso"
];

const textContainer = document.getElementById('text-container');
const timerElement = document.getElementById('timer');
const tryAgainButton = document.getElementById('try-again');
const finalScoreElement = document.getElementById('final-score');

let totalTyped = '';
let currentCharIndex = 0;
let errors = 0;
let longText = generateLongText();
let timeLeft = 60;
let timerInterval;
let typingStarted = false;

//Shuffle the words Array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Combine shuffled words into one long string with spaces
function generateLongText() {
    const shuffledWords = shuffleArray([...words]);
    return shuffledWords.join(' ');
}

//Start countdown timer
function startTimer() {
    if (!typingStarted) {
        typingStarted = true;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Tiempo restante: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endTest();
            }
        }, 1000);
    }
}

//End the test and display the final score
function endTest() {
    timerElement.textContent = `El tiempo ha terminado!`;
    finalScoreElement.textContent = `Palabras por minuto: ${calculateWPM()}`;
    textContainer.style.display = 'none';
    tryAgainButton.style.display = 'block';
}

//Calculate words-per-minute with error adjustment
function calculateWPM() {
    const wordsTyped = totalTyped.trim().split(/\s+/).length;
    console.log(wordsTyped, totalTyped.trim().split(/\s+/));
    const baseWPM = Math.round((wordsTyped / 60) * 60);
    const adjustedWPM = Math.max(baseWPM - errors, 0);
    return adjustedWPM;
}

//Handle typing over the displayed text and scrolling
document.addEventListener('keydown', (e) => {
    startTimer();

    if (e.key === 'Backspace') {
        if (totalTyped.length > 0) {
            currentCharIndex = Math.max(currentCharIndex - 1, 0);
            totalTyped = totalTyped.slice(0, -1);
        }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        totalTyped += e.key;
        currentCharIndex ++;
    }

    const textArray = longText.split('');
    textContainer.innerText = '';

    errors = 0;

    for (let i = 0; i < textArray.length; i++) {
        const span = document.createElement('span');
        
        if (i < totalTyped.length) {
            if (totalTyped[i] === textArray[i]) {
                span.classList.add('correct');
            } else {
                span.classList.add('error');
                errors++;
            }
        }

        span.textContent = textArray[i];
        textContainer.appendChild(span);
    }

    //Scroll the container after 20 characters
    if (totalTyped.length >= 20) {
        const scrollAmount = (totalTyped.length - 20) * 14;
        textContainer.scrollLeft = scrollAmount;
    }
});

//Reset the test
function resetTest() {
    clearInterval(timerInterval);
    timeLeft = 60;
    timerElement.textContent = `Tiempo restante: ${timeLeft}s`;
    finalScoreElement.textContent = '';
    textContainer.style.display = 'block';
    tryAgainButton.style.display = 'none';
    totalTyped = '';
    typingStarted = false;
    currentCharIndex = 0;
    errors = 0;
    textContainer.scrollLeft = 0;
    longText = generateLongText();
    init();
}

//Initialize the test
function init() {
    if (isMobileDevice()) {
        showMobileMessage();
    } else {
        textContainer.innerText = longText;
        timerElement.textContent = `Tiempo restante: ${timeLeft}s`;
    }
}

//Try Again button listener
tryAgainButton.addEventListener('click', resetTest);

//Detect if the device is mobile
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 800;
}

//Show message for mobile users
function showMobileMessage() {
    textContainer.textContent = 'Esta prueba de tipeado solo funciona para ordenadores';
}

//Startup
init();