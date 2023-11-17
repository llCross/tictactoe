const gameboard = (function (){

    let currentPlayer

    const playerTurn = () => {
        currentPlayer = !currentPlayer
        }
    
    const handleClick = (e) => {
        console.log(index)
        const cell = e.target
        const playerMark = currentPlayer ? cell.textContent = 'o' : cell.textContent = 'x';
        playerTurn();
    }

    return {
        handleClick
    }
})();


const game = (function () {

    const start = () => {
        startButton.parentNode.removeChild(startButton);
        const boardElements = document.querySelectorAll('.cell');
        const boardContainer = document.querySelector('.cell-container');
        boardElements.forEach(cell => {
        cell.classList.add('square')
        })
        boardContainer.classList.add('gameboard')

        boardElements.forEach(cell => {
        cell.addEventListener('click', gameboard.handleClick, {once: true})
    })
    }

    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', start)

//game.restart
return {
}

})();
