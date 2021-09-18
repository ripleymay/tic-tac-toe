/*----- constants -----*/
const symbolLookup = {
    '0': '',
    '1': 'X', 
    '-1': 'O'
} 


/*----- state (variables) -----*/
let board;  // array of column arrays
let turn;   // 1 (X) or -1 (O)
let winner; // null = no winner; 1 or -1 if there's a winner; 'T' = tie


/*----- cached element references -----*/
const messageEl = document.querySelector('h3');
const buttonEl = document.querySelector('button');


/*----- event listeners -----*/
document.getElementById('#board > div').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', init);

/*----- functions -----*/
init();

// Initialize all state, then call render
function init() {
  // Visualize by rotating 90 deg counter-clockwise
  board = [
    [0, 0, 0],  // col 0
    [0, 0, 0],  // col 1
    [0, 0, 0],  // col 2
  ];
  turn = 1;
  winner = null;
  render();
}

function handleMove(evt) {
    let colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1) return;
    // find the rowIdx for the first 0 in the column Array

    let colArray = board[colIdx];
    let rowIdx = colArray.indexOf(0);
    board[colIdx][rowIdx] = turn;
    
    turn = -turn;

    winner = checkWinner(rowIdx, colIdx);

    render();
}


function render() {
    renderBoard();
    renderMessage();
    // TO DO: show a replay button if someone wins
    buttonEl.style.visibility = winner ? visible : hidden;
}

function renderBoard() {
    board.forEach(function(colArray, colIndex) {
        colArray.forEach(function(slot, rowIndex) {
            let slotDiv = document.getElementById(`r${rowIndex}c${colIndex}`);
            slotDiv.style.backgroundColor = colorLookup[slot];
        });
    });

}

function renderMessage() {
    if (!winner) {
        messageEl.textContent = `It is ${symbolLookup[turn]}'s turn`;
    } else {
        messageEl.textContent = `${symbolLookup[winner]} wins!`
    }
}

function checkWinner(rowIdx, colIdx) {
    let winner = checkVertWin(colIdx, rowIdx) || checkHorzWin(colIdx, rowIdx);
    // TODO: check for tie
    return winner;
}

function checkVertWin(colIdx, rowIdx) {
    const cell = board[colIdx][rowIdx];
    let count = 0;
    // check up
    let row = rowIdx + 1;
    while (row < 6 && board[colIdx][row] === cell) {
        count++;
        row++;
    }
    // check down
    row = rowIdx - 1;
    while (row >=0 && board[colIdx][row] === cell) {
        count++;
        row--;
    }

    return count >= 3 ? cell : null;
}

function checkHorzWin(colIdx, rowIdx) {
    const cell = board[colIdx][rowIdx];
    let count = 0;
    // check right
    let col = colIdx + 1;
    while (col < 7 && board[col][rowIdx] === cell) {
        count++;
        col++;
    }
    // check left
    col = colIdx - 1;
    while (col >= 0 && board[col][rowIdx] === cell) {
        count++;
        col--;
    }

    return count >= 3 ? cell : null;
}