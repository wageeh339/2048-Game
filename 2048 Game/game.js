document.addEventListener('DOMContentLoaded', () => {
  const board = [];
  const size = 4;
  let score = 0;
  let isGameOver = false;

  const initializeBoard = () => {
    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j] = 0;
      }
    }
    addNewNumber();
    addNewNumber();
    updateBoard();
  };

  const addNewNumber = () => {
    const availableSpots = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === 0) {
          availableSpots.push({ x: i, y: j });
        }
      }
    }
    if (availableSpots.length > 0) {
      const spot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
      board[spot.x][spot.y] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const updateBoard = () => {
    const boardElement = document.querySelector('.board');
    boardElement.innerHTML = '';
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const tile = document.createElement('div');
        tile.className = `tile tile-${board[i][j]}`;
        tile.textContent = board[i][j] === 0 ? '' : board[i][j];
        boardElement.appendChild(tile);
      }
    }
  };

  const move = (direction) => {
    if (isGameOver) return;
    let moved = false;

    switch (direction) {
      case 'left':
        for (let i = 0; i < size; i++) {
          for (let j = 1; j < size; j++) {
            if (board[i][j] !== 0) {
              let k = j;
              while (k > 0 && board[i][k - 1] === 0) {
                board[i][k - 1] = board[i][k];
                board[i][k] = 0;
                k--;
                moved = true;
              }
              if (k > 0 && board[i][k - 1] === board[i][k]) {
                board[i][k - 1] *= 2;
                score += board[i][k - 1];
                board[i][k] = 0;
                moved = true;
              }
            }
          }
        }
        break;

      case 'right':
        for (let i = 0; i < size; i++) {
          for (let j = size - 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
              let k = j;
              while (k < size - 1 && board[i][k + 1] === 0) {
                board[i][k + 1] = board[i][k];
                board[i][k] = 0;
                k++;
                moved = true;
              }
              if (k < size - 1 && board[i][k + 1] === board[i][k]) {
                board[i][k + 1] *= 2;
                score += board[i][k + 1];
                board[i][k] = 0;
                moved = true;
              }
            }
          }
        }
        break;

      case 'up':
        for (let j = 0; j < size; j++) {
          for (let i = 1; i < size; i++) {
            if (board[i][j] !== 0) {
              let k = i;
              while (k > 0 && board[k - 1][j] === 0) {
                board[k - 1][j] = board[k][j];
                board[k][j] = 0;
                k--;
                moved = true;
              }
              if (k > 0 && board[k - 1][j] === board[k][j]) {
                board[k - 1][j] *= 2;
                score += board[k - 1][j];
                board[k][j] = 0;
                moved = true;
              }
            }
          }
        }
        break;

      case 'down':
        for (let j = 0; j < size; j++) {
          for (let i = size - 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
              let k = i;
              while (k < size - 1 && board[k + 1][j] === 0) {
                board[k + 1][j] = board[k][j];
                board[k][j] = 0;
                k++;
                moved = true;
              }
              if (k < size - 1 && board[k + 1][j] === board[k][j]) {
                board[k + 1][j] *= 2;
                score += board[k + 1][j];
                board[k][j] = 0;
                moved = true;
              }
            }
          }
        }
        break;
    }

    if (moved) {
      addNewNumber();
      updateBoard();
      if (isGameOver) {
        alert('Game over! Final score: ' + score);
      }
    }
  };

  const checkGameOver = () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] === 0) {
          return false;
        }
        if (i > 0 && board[i][j] === board[i - 1][j]) {
          return false;
        }
        if (i < size - 1 && board[i][j] === board[i + 1][j]) {
          return false;
        }
        if (j > 0 && board[i][j] === board[i][j - 1]) {
          return false;
        }
        if (j < size - 1 && board[i][j] === board[i][j + 1]) {
          return false;
        }
      }
    }
    return true;
  };

  initializeBoard();

  document.addEventListener('keydown', (event) => {
    if (isGameOver) return;
    let direction = '';
    switch (event.key) {
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
    }
    if (direction !== '') {
      move(direction);
      if (checkGameOver()) {
        isGameOver = true;
      }
    }
  });
});
