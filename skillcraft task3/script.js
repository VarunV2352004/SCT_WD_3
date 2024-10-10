const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageDisplay = document.getElementById('game-message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let isGameActive = true;

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
];

// Handle a cell click
cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    
    if (!isGameActive || boardState[cellIndex] !== null) return;
    
    // Place current player's symbol
    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    
    // Check for win or draw
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check for a winning combination
function checkWin(player) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return boardState[index] === player;
        });
    });
}

// Check for a draw
function isDraw() {
    return boardState.every(cell => cell !== null);
}

// End the game with win or draw message
function endGame(draw) {
    isGameActive = false;
    if (draw) {
        messageDisplay.textContent = "It's a draw!";
    } else {
        messageDisplay.textContent = `Player ${currentPlayer} wins!`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

// Restart the game
restartBtn.addEventListener('click', () => {
    boardState = Array(9).fill(null);
    currentPlayer = 'X';
    isGameActive = true;
    messageDisplay.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
});
