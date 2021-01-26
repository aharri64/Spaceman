const wordsToGuess = [
    "SYSTEM",
    "APOLLO",
    "COSMOS",
    "BEYOND",
    "ALIENS",
    "AURORA",
    "BINARY",
    "CORONA",
    "CRATER",
    "COSMIC",
    "PLANET",
    "COMETS",
    "GALAXY",
    "GLOBAL",
    "HAZARD",
    "METEOR",
    "MODULE",
    "NEBULA",
    "NEWTON",
    "ORIGIN",
    "PROBES",
    "QUASAR",
    "PULSAR",
    "ROCKET",
    "PHASER",
    "PROTON",
    "THRUST",
    "URANUS",
    "VOYAGE",
    "ZENITH"
]

let theAnswer = '';
let maxDamage = 6;
let damageTaken = 0;
let shots = [];
let targetingStatus = null;


const randomWord = () => { answer = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)] };



function buildConsole() {
    let weaponControls = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        ` 
        <button 
        id='` + letter + `' 
        onClick="takeAShot('` + letter + `')"
        > 
        ` + letter + `
        </button>
        `).join('');
    document.getElementById("controls").innerHTML = weaponControls;
}

randomWord();
buildConsole();