const gameboard = (function (){

    let gameboard = ["", "", "", "", "", "", "", "", ""]    //game.board array

    const getGameBoard = () => gameboard;                   //safely get gameboard

    const update = (cellIndex, currentPlayer) => {          //updates gameboard
        gameboard[cellIndex] = currentPlayer;
    }

    const clear = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""]
    }

    return {
        update,
        getGameBoard,
        clear,
    }
})();


const game = (function () {
    
    let playerOne = document.querySelector('#player-one');
    let playerTwo = document.querySelector('#player-two');

    let currentPlayer = "x";
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const boardElements = document.querySelectorAll('.cell');           //grabs cells
    const boardContainer = document.querySelector('.cell-container');   //grabs cell container
    const startButton = document.querySelector('.start-button');        //grabs start button
    const restartButton = document.querySelector('.restart-button');    //grabs restart button
    const gameStatus = document.querySelector('.game-status');          //grabs game status
    const dialog = document.querySelector('.game-dialog');                    //grabs start dialog
    const buttonContainer = document.querySelector('.button-container'); //grabs button container


    const start = () => {
        startButton.parentNode.removeChild(startButton);                //removes start button
        buttonContainer.parentNode.removeChild(buttonContainer);        //removes button container

        boardElements.forEach(cell => {
        cell.classList.add('square')
        })
        boardContainer.classList.add('gameboard')                       //adds css to cells to be visible

        boardElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})        //adds event listener
    })
    }

    const handleClick = (e) => {                                        //handles click and renders
        const cell = e.target
        const cellIndex = parseInt(event.target.id);
        cell.textContent = currentPlayer;
        gameboard.update(cellIndex, currentPlayer);
        checkWin();
        playerTurn();
    }

    const playerTurn = () => {                                          //switches player turn
        currentPlayer = (currentPlayer == "x") ? "o" : "x";
        }

    const checkWin = () => {                                            //checks for win or draw
        let roundWon = false

        for(let i = 0; i < winConditions.length; i++){
            const condition = winConditions[i];
            const cellA = gameboard.getGameBoard()[condition[0]];
            const cellB = gameboard.getGameBoard()[condition[1]];
            const cellC = gameboard.getGameBoard()[condition[2]];
    
            if(cellA == "" || cellB == "" || cellC == ""){
                continue;
            }
            if(cellA == cellB && cellB == cellC){
                roundWon = true;
                break;
            }
        }
        if (roundWon && currentPlayer === 'x' &&  playerOne.value != '') {
            gameStatus.textContent = (`${playerOne.value} won!`)
            dialog.showModal();
        } else if (roundWon && currentPlayer === 'o' && playerTwo.value != '') {
            gameStatus.textContent = (`${playerTwo.value} won!`)
            dialog.showModal();
        } else if (roundWon) {
            gameStatus.textContent = (`${currentPlayer} won!`)
            dialog.showModal();
        } else if (!gameboard.getGameBoard().includes('')){
            gameStatus.textContent = (`Draw!`)
            dialog.showModal();
        } 
    }

    const restart = () => {
        gameboard.clear();
        boardElements.forEach(cell => cell.textContent = "");
        currentPlayer = "x"
        boardElements.forEach(cell => {
            cell.addEventListener('click', handleClick, {once: true})       //adds event listener again
        })
        dialog.close();
    }

    //event listeners
    startButton.addEventListener('click', start)                         //start button event listener
    restartButton.addEventListener('click', restart)                    //restart button event listener

return {
    handleClick,
}

})();

