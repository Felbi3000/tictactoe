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

    const placeToken = (row, column) => {
        board[row][column].addToken(game.getActivePlayer().token);
    }

    const printBoard = () => {
        const filledBoard = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(filledBoard);
    }
    const checkoccupied = (row, column) => {
        if (board[row][column].getValue() !== 0) {
            return true;
        }
    }

    const checkWin = (playerToken) => {
        for (let i = 0; i < dimension; i++) {
            if (board[i][0].getValue() === playerToken &&
                board[i][1].getValue() === playerToken &&
                board[i][2].getValue() === playerToken
            ){return true;}
        }
        
        for (let j= 0; j < dimension; j++){
            if (board[0][j].getValue() === playerToken &&
                board[1][j].getValue() === playerToken &&
                board[2][j].getValue() === playerToken
            ){return true;}
        }
        
        if (board[0][0].getValue() === playerToken &&
            board[1][1].getValue() === playerToken &&
            board[2][2].getValue() === playerToken
        ) {return true;}
        
        if (board[2][0].getValue() === playerToken &&
            board[1][1].getValue() === playerToken &&
            board[0][2].getValue() === playerToken
        ){return true;}

        return false;        
    }

    return {getBoard, placeToken, printBoard, checkWin, checkoccupied};

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
        console.log(`Placing ${getActivePlayer().name}'s token at row ${row}, column ${column}.`);
        if (board.checkoccupied(row, column)){
            console.log(`Field already taken, choose another one`);
            printNewRound();
            return;
        } else {
        board.placeToken(row, column, getActivePlayer().token);

        // Winner check
        if(board.checkWin(getActivePlayer().token)){
            console.log(`${getActivePlayer().name} is the winner!`);
            board.printBoard();
        }else{
        switchPlayerTurn();
        printNewRound();
        };
        };
    };
    printNewRound();

    return {playRound, getActivePlayer};
}

const game = gameLogic();