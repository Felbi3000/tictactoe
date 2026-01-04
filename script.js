// setting up grid
const gameboard = (function () {
    const dimension = 3;
    const board = [];

    // init 2d array
    for (let i = 0; i < dimension; i++) {
        board [i] = [];
        for (let j = 0; j < dimension; j++){
            board[i].push(Cell());
        }
    }


const getBoard = () => board;

const placeToken = (column, row, player) => {

}

const printBoard = () => {
    const filledBoard = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(filledBoard);
}

return {getBoard, placeToken, printBoard};

})();
// setting up Cell as factory
function Cell () {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };
    const getValue = () => value;

    return {addToken, getValue};
};

// setting up player

// game logic