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

    // gets the array with the cell objects and its values
    const getBoard = () => board;
    
    // place token function
    const placeToken = (row, column) => {
        board[row][column].addToken(game.getActivePlayer().token);
    }

    // displays board with values in console
    const printBoard = () => {
        const filledBoard = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(filledBoard);
    }

    // checks, if the field has already another value than 0
    const checkoccupied = (row, column) => {
        if (board[row][column].getValue() !== 0) {
            return true;
        }
    }
    // winning conditions
    const checkWin = (playerToken) => {
        //check in the rows
        for (let i = 0; i < dimension; i++) {
            if (board[i][0].getValue() === playerToken &&
                board[i][1].getValue() === playerToken &&
                board[i][2].getValue() === playerToken
            ){return true;}
        }
        
        // check in the columns
        for (let j= 0; j < dimension; j++){
            if (board[0][j].getValue() === playerToken &&
                board[1][j].getValue() === playerToken &&
                board[2][j].getValue() === playerToken
            ){return true;}
        }
        
        // check the diagonals
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
    
    // create players
    const players = [
        {
            name : playerOneName,
            token : "X"
        },{
            name : playerTwoName,
            token : "O"
        }
    ];  
    const setPlayerNames = (name1, name2) => {
        players[0].name = name1;
        players[1].name = name2;

    }
    let activePlayer = players[0];
    
    // create gamestate to disable play after win
    let gameActive = true;

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        };
    };

    const getActivePlayer = () => activePlayer;

    // getter for gamestate
    const isGameActive = () => gameActive;

    // print the status of the board and activePlayer 
    const printNewRound = () => {
        board.printBoard();
        
        const message = `${getActivePlayer().name}'s turn`;
        console.log(message);
        screen.setStatus(message); // Display to UI
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (row, column) => {
        if (!gameActive) return;

        console.log(`Placing ${getActivePlayer().name}'s token at row ${row}, column ${column}.`);
        if (board.checkoccupied(row, column)){
            const message = `Field already taken, choose another one`;
            console.log(message);
            screen.setStatus(message); // Display to UI
            printNewRound();
            return;
        } else {
        board.placeToken(row, column);

        // Winner check
        if(board.checkWin(getActivePlayer().token)){
            board.printBoard();
            const message = `${getActivePlayer().name} is the winner!`;
            console.log(message);
            screen.setStatus(message); // Display to UI
            console.log(`${getActivePlayer().name} is the winner!`);
            gameActive = false;
            
        }else{
        switchPlayerTurn();
        printNewRound();
        };
        };
    };
    printNewRound();

    return {playRound, getActivePlayer, setPlayerNames, isGameActive};
};

function screenController () {
    // get DOM elements
    const formNames = document.querySelector("#formPlayerName");
    const player1Name = document.querySelector("#player1Name");
    const player2Name = document.querySelector("#player2Name");
    const formButton = document.querySelector("#formButton");
    const message = document.querySelector("#message");
    const gameArea = document.querySelector("#main");
    const cells = document.querySelectorAll(".cell");


    // set up Event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (game.isGameActive()) {
                cell.classList.add(game.getActivePlayer().token);
                game.playRound(cell.getAttribute("data-row"), cell.getAttribute("data-col"));
            }
        })
    })

    formButton.addEventListener('click', () => {
        game.setPlayerNames(player1Name.value,player2Name.value);
        formNames.setAttribute("style", "visibility: hidden;");
        gameArea.setAttribute("style", "visibility: visible;");
        const message = `${getActivePlayer().name}'s turn`;
        setStatus(message);
    })

    function setStatus (text) {
        message.textContent = text;
    }

    return {setStatus};
}


const screen = screenController();
const game = gameLogic();