const words = ["azúcar", "gusto", "entorno", "coca", "solar", "saludo", "desprecio", "nuevo", 
    "cuentas", "relato", "lado", "helado", "saber", "primario", "secundario", "terciario", "novedoso", 
    "implicar", "practicar", "suave", "hermoso", "generoso", "abdicar", "aburrido", "dormir", "mirar", 
    "clasificar", "equipo", "ambiente", "estudio", "paralelo", "horizonte", "reflexionar", "neuronal", 
    "estaciones", "calendario", "medicina", "hospital", "dramaturgo", "exponer", "televisión", "brujería", 
    "dispositivo", "tecnología", "práctica", "abecedario", "alfombra", "lujo", "comodidad", "sabiduría", 
    "extraterrestre", "nominal", "inmenso", "desolador", "fastidioso", "experiencia", "melodía", "canto", 
    "baile", "secuencia", "pasos", "completo", "migajas", "alimentos", "flores", "bebida"
];

const textContainer = document.getElementById('text-container');
const timerElement = document.getElementById('timer');
const tryAgainButton = document.getElementById('try-again');
const finalScoreElement = document.getElementById('final-score');

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

let longText = generateLongText();

textContainer.textContent = longText;