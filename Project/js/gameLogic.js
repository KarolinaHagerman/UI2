/**
 * File: gameLogic.js
 *
 * This file contains the javaScript needed for the game to function
 *
 * Version 0.5
 * Authors: karolina Hagerman, Erik Blomsterberg
 */


var boardData = [];
export var madeMoves = [];
export var unmadeMoves = [];
var lastMove = null;
var redoMove = null;

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
        boardData[redoMove.row][redoMove.col].color = redoMove.color;

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

// Reset all the board data
//
export function resetBoardData(){
    boardData = [];
    madeMoves = [];
    unmadeMoves = [];
    lastMove = null;
    redoMove = null;
}


// Initialize the board data
//
export function initializeBoardData(numColumns){
    resetBoardData();

    // Loop through all rows
    //
    for (let i = 0; i < numColumns; i++) {
        let row = [];

        // For each row loop through columns
        //
        for (let j = 0; j < numColumns; j++) {

            // Create objects in row i, col j and add the object to the row-array
            //
            let boardObject = { id: i + '-' + j, row: i, col: j, isClicked: false, player: null, color: null }
            row.push(boardObject);
        }

        // Add the finished rows to board data
        //
        boardData.push(row);
    }
    return boardData
}


//This function checks if there is a winner after each click on the board. Returns true/false if there is a winner or not.
//
export function checkNinRow(boardData, clickedSquare, player, n) {

    // Check if the boardItem is empty
    //
    if (boardData[clickedSquare.row][clickedSquare.col].player == null) {
        boardData[clickedSquare.row][clickedSquare.col].player = player;
        madeMoves.push({ ...clickedSquare });

        // If we make a new move we shouldn't be able to redo again. E.g. i make move A, undo move A, make move B, then I can't redo move A
        //
        let deletedMove = { ...unmadeMoves.pop() };

        //count keeps track of the number of same pieces in a row
        //
        let count = 0;

        //check diagonaly from n-1 squares to the top left of the clicked square to n-1 squares down right of the clicked square
        //
        for (let i = 1, j = 1; i <= n * 2 - 1, j <= n * 2 - 1; i++, j++) {
            try {
                //if square is occupied by the same player as the player that made a move, the count is increase by one
                // 
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col + (j - n)].player == boardData[clickedSquare.row][clickedSquare.col].player) {
                    count += 1;

                    //if count is the same as the number of pieces needed to win, return true - WINNER
                    //
                    if (count == n) {
                        return(true);
                    }
                //if square is not occupied by the same player as the player that made a move, the count is reset to 0
                // 
                } else {
                    count = 0
                }
            } catch (err) { }
        }

        //check diagonaly from n-1 squares to the top right of the clicked square to n-1 squares bottom left of the clicked square
        //
        count = 0;
        for (let i = 1, j = 1; i <= n * 2 - 1, j <= n * 2 - 1; i++, j++) {
            try {
                //if square is occupied by the same player as the player that made a move, the count is increase by one
                //
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col + (n - j)].player == boardData[clickedSquare.row][clickedSquare.col].player) {
                    count += 1;

                    //if count is the same as the number of pieces needed to win, return true - WINNER
                    //
                    if (count == n) {
                        return(true);
                    }

                //if square is not occupied by the same player as the player that made a move, the count is reset to 0
                //
                } else {
                    count = 0
                }
            } catch (err) { }
        }

        //check vertically from n-1 squares up of the clicked square to n-1 squares down of the clicked square
        //
        count = 0;
        for (let i = 1; i <= n * 2 - 1; i++) {
            try {

                //if square is occupied by the same player as the player that made a move, the count is increase by one
                // 
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col].player == boardData[clickedSquare.row][clickedSquare.col].player) {
                    count += 1;

                    //if count is the same as the number of pieces needed to win, return true - WINNER
                    //
                    if (count == n) {
                        return(true);
                    }
                
                //if square is not occupied by the same player as the player that made a move, the count is reset to 0
                //
                } else {
                    count = 0
                }
            } catch (err) { }
        }

        
        //check horisontally from n-1 squares to the right of the clicked square to n-1 squares to the left of the clicked square
        //
        count = 0;
        for (let j = 1; j <= n * 2 - 1; j++) {

            // Try-catch to handle boardItems with index out of bound
            //
            try {

                //if square is occupied by the same player as the player that made a move, the count is increase by one
                // 
                if (boardData[clickedSquare.row][clickedSquare.col + (j - n)].player == boardData[clickedSquare.row][clickedSquare.col].player) {
                    count += 1;

                    //if count is the same as the number of pieces needed to win, return true - WINNER
                    //
                    if (count == n) {
                        return(true);
                    }

                //if square is not occupied by the same player as the player that made a move, the count is reset to 0
                //
                } else {
                    count = 0
                }
            } catch (err) { }
        }
    }
    return(false);
}

// Makes sure the activePlayer loops through the players array
//
export function nextPlayer(setActivePlayer, activePlayer, players) {

    // If active player is the last index, start from beginning, else take next index
    //
    if (activePlayer >= (players.length - 1)) {
        setActivePlayer(0);
    }
    else {
        setActivePlayer(activePlayer + 1);
    }
}

//************
// END of file gameLogic.js
//************