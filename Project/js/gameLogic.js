var boardData = [];
export var madeMoves = [];
export var unmadeMoves = [];
var lastMove = null;
var redoMove = null;
export let isWinnerModalOpen = false;

// This function handles the undo action in the game
//
export function undo(setActivePlayer, activePlayer, players, setResetTime) {

    // Can only undo if we have made moves
    //
    if (madeMoves.length > 0) {

        // Delete move from made moves
        //
        lastMove = { ...madeMoves.pop() };

        // Undo everything in boardData
        //
        boardData[lastMove.row][lastMove.col].player = null;
        boardData[lastMove.row][lastMove.col].isClicked = false;
        boardData[lastMove.row][lastMove.col].color = null;

        // Add the move to unmade moves
        //
        unmadeMoves.push(lastMove);

        // Manipulate the activePlayer array accordingly
        // If the active player is the first index in the array, change to the last index
        //
        if (activePlayer <= 0) {
            setActivePlayer(players.length - 1);
        }
        // Else just take one step back in array
        //
        else {
            setActivePlayer(activePlayer - 1);
        }

        // Reset timer
        //
        setResetTime(true);
    }
}

// This function handles the redo action in the game
//
export function redo(setActivePlayer, activePlayer, players, setResetTime) {

    // Can only redo if we have done undo before
    //
    if (unmadeMoves.length > 0) {

        // Delete move from unmade moves
        //
        redoMove = { ...unmadeMoves.pop() };

        // Redo everything in boardData
        //
        boardData[redoMove.row][redoMove.col].player = redoMove.player;
        boardData[redoMove.row][redoMove.col].isClicked = true;
        boardData[lastMove.row][lastMove.col].color = redoMove.color;

        // Add the move to made moves
        //
        madeMoves.push(redoMove);

        // Next player in array
        //
        nextPlayer(setActivePlayer, activePlayer, players);

        // Reset timer
        //
        setResetTime(true);
    }
}

// 
export function initializeBoardData(numColumns) {
    //const numColumns = 30;
    for (let i = 0; i < numColumns; i++) {
        let row = [];
        for (let j = 0; j < numColumns; j++) {
            let boardObject = { id: i + '-' + j, row: i, col: j, isClicked: false, player: null, color: null }
            row.push(boardObject);
        }
        boardData.push(row);
    }
    console.log(boardData);
    return boardData
}


//After each click on the board, checks if there is a winner
export function checkNinRow(boardData, clickedSquare, player, n) {

    // Check if the boardItem is empty
    //
    if (boardData[clickedSquare.row][clickedSquare.col].player == null) {
        boardData[clickedSquare.row][clickedSquare.col].player = player;
        madeMoves.push({ ...clickedSquare });

        //kolla diagonalen från övre vänster ner till höger
        let count = 0;
        for (let i = 1, j = 1; i <= n * 2 - 1, j <= n * 2 - 1; i++, j++) {
            try {
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col + (j - n)].player == boardData[clickedSquare.row][clickedSquare.col].player) {
                    count += 1;
                    if (count == n) {
                        proclaimWinner(player);
                    }
                } else {
                    count = 0
                }
            } catch (err) { }
        }

        //kolla diagonalen från övre höger ner till vänster
        count = 0;
        for (let i = 1, j = 1; i <= n * 2 - 1, j <= n * 2 - 1; i++, j++) {
            try {
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col + (n - j)].player == boardData[clickedSquare.row][clickedSquare.col].player) {
                    count += 1;
                    if (count == n) {
                        proclaimWinner(player);
                    }
                } else {
                    count = 0
                }
            } catch (err) { }
        }

        //kolla vertikalt uppifrån och ner
        count = 0;
        for (let i = 1; i <= n * 2 - 1; i++) {
            try {
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col].player == boardData[clickedSquare.row][clickedSquare.col].player) {
                    count += 1;
                    if (count == n) {
                        proclaimWinner(player);
                    }
                } else {
                    count = 0
                }
            } catch (err) { }
        }

        //kolla horizontelt, vänster till höger
        count = 0;
        for (let j = 1; j <= n * 2 - 1; j++) {

            // Try-catch to handle boardItems with index out of bound
            //
            try {
                if (boardData[clickedSquare.row][clickedSquare.col + (j - n)].player == boardData[clickedSquare.row][clickedSquare.col].player) {
                    count += 1;
                    if (count == n) {
                        proclaimWinner(player);
                    }
                } else {
                    count = 0
                }
            } catch (err) { }
        }
    }
}

export function proclaimWinner(player) {
    console.log('winner: ', player)
    isWinnerModalOpen = true;
}

// Makes sure the activePlayer loops through the players array
export function nextPlayer(setActivePlayer, activePlayer, players) {
    if (activePlayer >= (players.length - 1)) {
        setActivePlayer(0);
    }
    else {
        setActivePlayer(activePlayer + 1);
    }
}