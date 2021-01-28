let wordsToGuess = [
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

let solution = '';
let maxDamage = 6;
let damageTaken = 0;
let shots = [];
let targetingStatus = null;

let controls = document.getElementById('controls')
let cockpit = document.getElementById('cockpit')
let wordGuessHud = document.getElementById('wordGuessHud')
let damageReport = document.getElementById('damage-taken')
let destroyed = document.getElementById('max-damage')

function randomWord() {
    solution = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
    console.log(solution)
}


function generateConsole() {
    let buttonConsole = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
        `
      <button
        class = 'control-button'
        id='` + letter + `'
        onClick="takeAShot('` + letter + `')"
        
      >
        ` + letter + `
      </button>
    `).join('');

    controls.innerHTML = buttonConsole;
}

function takeAShot(chosenLetter) {
    if (shots.indexOf(chosenLetter) === -1) {
        shots.push(chosenLetter)
        // document.getElementById(chosenLetter).setAttribute('disabled', true);
    }
    if (solution.indexOf(chosenLetter) > -1) {
        targetedWord();
        checkIfBattleWon();
    } else {
        damageTaken++;
        damageReportUpdate();
        shipImage();
        checkIfBattleLost();
    }
}

function shipImage() {
    cockpit.src = './img/Damage' + damageTaken + '.png';
}

function checkIfBattleWon() {
    if (targetingStatus === solution) {
        controls.innerHTML = 'You Won!!!';
    }
}

function checkIfBattleLost() {
    if (damageTaken === maxDamage) {
        wordGuessHud.innerHTML = 'The solution was: ' + solution;
        controls.innerHTML = 'You Lost!!!';
        cockpit.src = './img/GameOver.png';
    }
}

function targetedWord() {
    targetingStatus = solution.split('').map(letter => (shots.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    wordGuessHud.innerHTML = targetingStatus;
}

function damageReportUpdate() {
    damageReport.innerHTML = damageTaken;
}

function eject() {
    damageTaken = 0;
    shots = [];
    cockpit.src = './img/Game-Start.png';

    randomWord();
    targetedWord();
    damageReportUpdate();
    generateConsole();
}

destroyed.innerHTML = maxDamage;

randomWord();
generateConsole();
targetedWord();
