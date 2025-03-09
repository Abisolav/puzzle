let board = [];
let moves = 0;
let timer = 0;
let gameTimer;

// Initialize Board
function initBoard() {
  board = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16] // Empty space is 16
  ];
}

// Shuffle Board
function shuffleBoard() {
  let flatBoard = board.flat().filter(n => n !== 16); // Remove empty slot
  for (let i = flatBoard.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [flatBoard[i], flatBoard[j]] = [flatBoard[j], flatBoard[i]];
  }
  flatBoard.push(16); // Add empty slot back

  let idx = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      board[row][col] = flatBoard[idx++];
    }
  }
  renderBoard();
}

// Render Board to UI
function renderBoard() {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let cell = document.getElementById(`cell${row}${col}`);
      if (!cell) continue;
      if (board[row][col] === 16) {
        cell.className = "empty";
        cell.innerText = "";
      } else {
        cell.className = "tile";
        cell.innerText = board[row][col];
      }
    }
  }
}

// Click Tile Logic
function clickTile(row, col) {
  let emptyRow, emptyCol;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 16) {
        emptyRow = r;
        emptyCol = c;
      }
    }
  }

  if (Math.abs(emptyRow - row) + Math.abs(emptyCol - col) === 1) {
    [board[row][col], board[emptyRow][emptyCol]] = [board[emptyRow][emptyCol], board[row][col]];
    moves++;
    document.getElementById('move-counter').innerText = `Number of Moves thus far: ${moves}`;
    renderBoard();
    checkWin();
  }
}

// Check if Puzzle is Solved
function checkWin() {
  let counter = 1;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] !== counter && !(row === 3 && col === 3 && board[row][col] === 16)) {
        return;
      }
      counter++;
    }
  }

  clearInterval(gameTimer);
  alert(`🎉 Congratulations! Solved in ${moves} moves and ${timer} seconds.`);
}

// Start New Game
function startNewGame() {
  moves = 0;
  timer = 0;
  document.getElementById('move-counter').innerText = `Number of Moves thus far: ${moves}`;
  document.getElementById('timer').innerText = `Time spent in the current game: ${timer} seconds`;
  shuffleBoard();
  startTimer();
}

// Simple Game Mode (One Move Away)
function startSimpleGame() {
  initBoard();
  board[3][2] = 16;
  board[3][3] = 15;
  moves = 0;
  document.getElementById('move-counter').innerText = `Number of Moves thus far: ${moves}`;
  renderBoard();
}

// Quit Game
function quitGame() {
  if (confirm('Are you sure you want to quit?')) {
    location.reload();
  }
}

// Timer Function
function startTimer() {
  clearInterval(gameTimer);
  gameTimer = setInterval(() => {
    timer++;
    document.getElementById('timer').innerText = `Time spent in the current game: ${timer} seconds`;
  }, 1000);
}

// Initialize Game on Load
window.onload = function() {
  initBoard();
  startNewGame();
};
