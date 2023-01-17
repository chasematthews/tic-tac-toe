const modal = document.querySelector('.modal');
const newGame = document.getElementById('new-game-btn');
const form = document.getElementById('new-game-form');
const boxes = document.querySelectorAll('.box');
const title = document.querySelector('.title')

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

newGame.addEventListener('click', () => {
    modal.style.display = 'flex';
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    modal.style.display = 'none';
    initialiseGame(data);
});

const initialiseGame = (data) => {
    initialiseVariables(data);
    addEventListenersToGameBoard(data);
    title.textContent = `It's ${data.player1name}'s turn`
};

const initialiseVariables = (data) => {
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
};

const addEventListenersToGameBoard = (data) => {
    boxes.forEach(box => {
        box.addEventListener('click', (event) => {
            playMove(event.target, data);
        });
        box.style.cursor = "pointer"
    });
};

const playMove = (box, data) => {
    if(data.gameOver || data.round > 8) {
        return
    }
    
    if(data.board[box.id.substring(3)] === "X" || data.board[box.id.substring(3)] === "O") {
        return
    }

    data.board[box.id.substring(3)] = data.currentPlayer;
    box.textContent = data.currentPlayer;

    data.round++;

    if(endConditions(data)) {
        return
    }

    changePlayer(data);
};

const endConditions = (data) => {
    if(checkWinner(data)) {
        let winnerName
            if (data.currentPlayer == "X") {
                winnerName = data.player1name;
            } else {
                winnerName = data.player2name;
            } 
            title.textContent = `${winnerName} has won the game!`
        return true;
    } else if (data.round === 9) {
        return true;
    } 
    return false;
}

const checkWinner = (data) => {
    let result = false;
    winningConditions.forEach((condition) => {
        if(data.board[condition[0]] === data.board[condition[1]] && data.board[condition[1]] === data.board[condition[2]]) {
            data.gameOver = true;
            result = true;
        };
    });
    return result
};

const changePlayer = (data) => {
    if (data.currentPlayer === "X") {
        data.currentPlayer = "O";
        title.textContent = `It's ${data.player2name}'s turn`;
    } else {
        data.currentPlayer = "X";
        title.textContent = `It's ${data.player1name}'s turn`;
    }
}