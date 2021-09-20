/*----- constants -----*/
const symbolLookup = {
    '0': '',
    '1': 'X', 
    '-1': 'O'
} 

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


/*----- state (variables) -----*/
let board;  // array of column arrays
let turn;   // 1 (X) or -1 (O)
let winner; // null = no winner; 1 or -1 if there's a winner; 'T' = tie


/*----- cached element references -----*/
const messageEl = document.querySelector('h3');
const buttonEl = document.querySelector('button');


/*----- event listeners -----*/
document.querySelector('#board').addEventListener('click', handleMove);
buttonEl.addEventListener('click', init);


/*----- functions -----*/
init();


function init() {
  // visualize the board by rotating 90 degrees counter-clockwise
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
}

function handleMove(evt) {

    let space = parseInt(evt.target.id);

    if (board[space] || winner) return; 
    
    board[space] = turn;    
    winner = checkWinner();
    turn = -turn;

    render();
}

function render() {
    renderBoard();
    renderMessage();
    buttonEl.style.visibility = winner ? 'visible' : 'hidden';
}

function renderBoard() {
    board.forEach(function(value, index) {
            document.getElementById(`${index}`).textContent = symbolLookup[value];
        });
}

function renderMessage() {
    if (winner === 'T') {
        messageEl.textContent = 'It\'s a tie!';
    } else if (winner) {
        messageEl.textContent = `${symbolLookup[winner]} wins!`;
    } else {
        messageEl.textContent = `It\'s ${symbolLookup[turn]}'s turn`;
    }
}

function checkWinner() {
    winCombos.forEach(function(winCombo) {
        let total = board[winCombo[0]] + board[winCombo[1]] + board[winCombo[2]];
        if (Math.abs(total) === 3) winner = turn;
    });
    if (!board.includes(null) && !winner) winner = 'T';
    return winner;
}