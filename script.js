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

textContainer.textContent = longText;

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

//Handle typing over the displayed text and scrolling
document.addEventListener('keydown', (e) => {

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