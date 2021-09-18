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
document.querySelector('#board').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', init);


/*----- functions -----*/
init();


function init() {
  // visualize the board by rotating 90 degrees counter-clockwise
  board = [
    [0, 0, 0],  // column 0
    [0, 0, 0],  // column 1
    [0, 0, 0],  // column 2
  ];
  turn = 1;
  winner = null;
  render();
}

function handleMove(evt) {

    let x = parseInt(evt.target.id[3]);
    let y = parseInt(evt.target.id[1]);

    if (board[x][y]) return; 
    
    board[x][y] = turn;    
    turn = -turn;
    winner = checkWinner(x, y);

    render();
}

function render() {
    renderBoard();
    renderMessage();
    // TO DO: show a replay button if someone wins
    // buttonEl.style.visibility = winner ? visible : hidden;
}

function renderBoard() {
    board.forEach(function(colArray, colIndex) {
        colArray.forEach(function(cell, rowIndex) {
            let cellDiv = document.getElementById(`r${rowIndex}c${colIndex}`);
            cellDiv.textContent = symbolLookup[cell];
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

function checkWinner(x, y) {
    let winner = checkVertWin(x, y) || checkHorzWin(x, y) || checkDiagWin(x, y);
    // TODO: check for tie
    return winner;
}

function checkHorzWin(x, y) {
    const cell = board[x][y];
    let count = 0;
    // check right
    let xCheck = x + 1;
    while (xCheck < 3 && board[xCheck][y] === cell) {
        count++;
        xCheck++;
    }
    // check left
    xCheck = x - 1;
    while (xCheck >=0 && board[xCheck][y] === cell) {
        count++;
        xCheck--;
    }

    return count === 2 ? cell : null;
}

function checkVertWin(x, y) {
    const cell = board[x][y];
    let count = 0;
    // check up
    let yCheck = y + 1;
    while (yCheck < 3 && board[x][yCheck] === cell) {
        count++;
        yCheck++;
    }
    // check down
    yCheck = y - 1;
    while (yCheck >= 0 && board[x][yCheck] === cell) {
        count++;
        yCheck--;
    }

    return count === 2 ? cell : null;
}

function checkDiagWin(x, y) {
    console.log('diag win being called');
    const cell = board[x][y];
    let count = 0;
    // check \ diagonal
    let xCheck = x + 1;
    let yCheck = y - 1;
    console.log('FIRST xCheck and yCheck are ', xCheck, yCheck);
    while (xCheck < 3 && yCheck >= 0 && board[xCheck][yCheck] === cell) {
        count++;
        xCheck++;
        yCheck--;
    }
    // check / diagonal
    // xCheck = x - 1;
    // yCheck = y + 1;
    // console.log('SECOND xCheck and yCheck are ', xCheck, yCheck);
    // while (xCheck >= 0 && yCheck < 3 && board[xCheck][yCheck] === cell) {
    //     count++;
    //     console.log('this is count', count);
    //     xCheck--;
    //     yCheck++;
    // }

    return count === 2 ? cell : null;
}