const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const popupMessage = document.getElementById('popup-message');
const popupText = document.getElementById('popup-text');
const emojiRain = document.querySelector('.emoji-rain');
const winnerContainer = document.getElementById('winner-container');
const runnerContainer = document.getElementById('runner-container');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] || !gameActive) return;

    makeMove(index, currentPlayer);
    if (checkWin(currentPlayer)) {
        message.textContent = `${currentPlayer} wins!`;
        showPopup(`${currentPlayer} wins! 🎉`, 'congrats');
        updateWinnerRunner(currentPlayer, currentPlayer === 'X' ? 'O' : 'X');
        gameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        message.textContent = 'Draw!';
        showPopup('Draw! 😞', 'draw');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

function restartGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    message.textContent = '';
    gameActive = true;
    hidePopup();
    resetWinnerRunner();
}

function showPopup(text, type) {
    popupText.textContent = text;
    popupMessage.style.display = 'block';
    createEmojiRain(type);
    setTimeout(() => {
        hidePopup();
    }, 3000); // Popup will disappear after 3 seconds
}

function hidePopup() {
    popupMessage.style.display = 'none';
    clearEmojiRain();
}

function createEmojiRain(type) {
    const emojiType = type === 'congrats' ? '🎉' : '👎'; 
    for (let i = 0; i < 50; i++) { 
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = emojiType;
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDuration = `${Math.random() * 2 + 3}s`; 
        emojiRain.appendChild(emoji);
    }
}

function clearEmojiRain() {
    while (emojiRain.firstChild) {
        emojiRain.removeChild(emojiRain.firstChild);
    }
}
function updateWinnerRunner(winner, runner) {
    document.getElementById('winner').textContent = winner;
    document.getElementById('runner').textContent = runner;
    winnerContainer.style.visibility = 'visible';
    runnerContainer.style.visibility = 'visible';
}

function resetWinnerRunner() {
    winnerContainer.style.visibility = 'hidden';
    runnerContainer.style.visibility = 'hidden';
}