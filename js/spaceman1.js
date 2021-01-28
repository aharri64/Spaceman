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

function randomWord() {
    solution = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)];
}

function generateConsole() {
    let buttonConsole = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
      <button
        id='` + letter + `'
        onClick="takeAShot('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById('controls').innerHTML = buttonConsole;
}

function takeAShot(chosenLetter) {
    shots.indexOf(chosenLetter) === -1 ? shots.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (solution.indexOf(chosenLetter) >= 0) {
        targetedWord();
        checkIfBattleWon();
    } else if (solution.indexOf(chosenLetter) === -1) {
        damageTaken++;
        damageReportUpdate();
        checkIfBattleLost();
        shipImage();
    }
}

function shipImage() {
    document.getElementById('cockpit').src = './img/Damage' + damageTaken + '.png';
}

function checkIfBattleWon() {
    if (targetingStatus === solution) {
        document.getElementById('controls').innerHTML = 'You Won!!!';
    }
}

function checkIfBattleLost() {
    if (damageTaken === maxDamage) {
        document.getElementById('wordGuessHud').innerHTML = 'The solution was: ' + solution;
        document.getElementById('controls').innerHTML = 'You Lost!!!';
        document.getElementById('cockpit').src = './img/GameOver.png';
    }
}

function targetedWord() {
    targetingStatus = solution.split('').map(letter => (shots.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordGuessHud').innerHTML = targetingStatus;
}

function damageReportUpdate() {
    document.getElementById('damage-taken').innerHTML = damageTaken;
}

function reset() {
    damageTaken = 0;
    shots = [];
    document.getElementById('cockpit').src = './img/Game-Start.png';

    randomWord();
    targetedWord();
    damageReportUpdate();
    generateConsole();
}

document.getElementById('max-damage').innerHTML = maxDamage;

randomWord();
generateConsole();
targetedWord();
