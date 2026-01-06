// setting up grid function as IIFE
const gameboard = (function () {
    const dimension = 3;
    const board = [];

    // init 2d array
    for (let i = 0; i < dimension; i++) {
        board [i] = [];
        for (let j = 0; j < dimension; j++){
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const placeToken = ( row, column) => {
        board[row][column].addToken();
    }

    const printBoard = () => {
        const filledBoard = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(filledBoard);
    }

    return {getBoard, placeToken, printBoard, board};

})();

// setting up cell logic as factory
function cell () {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };
    const getValue = () => value;

    return {addToken, getValue};
};

// game logic
function gameLogic (playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = gameboard;
    const players = [
        {
            name : playerOneName,
            token : 1
        },{
            name : playerTwoName,
            token : 2
        }
    ];  

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        };
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (row, column) => {
        console.log(`Placing ${activePlayer}'s token at row ${row}, column ${column}.`);
        board.placeToken(row, column, getActivePlayer().token);

        // Winner check

        switchPlayerTurn();
        printNewRound();
    };
    printNewRound();

    return {playRound, getActivePlayer};
}

//const game = gameLogic();