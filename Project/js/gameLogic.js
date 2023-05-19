var boardData = [];
export var madeMoves = [];
export var unmadeMoves = [];
var lastMove = null;
var redoMove = null;
export let isWinnerModalOpen = false;

export function undo(setActivePlayer, activePlayer, players, setResetTime){
    if(madeMoves.length > 0){
        lastMove = {...madeMoves.pop()};
        boardData[lastMove.row][lastMove.col].player = null;
        boardData[lastMove.row][lastMove.col].isClicked = false;
        unmadeMoves.push(lastMove);

        if (activePlayer <= 0) {
            setActivePlayer(players.length - 1);
            //setTimeLeft(time);
          }
          else {
            setActivePlayer(activePlayer - 1);
          }

        setResetTime(true);
    }
}

export function redo(setActivePlayer, activePlayer, players, setResetTime){
    if(unmadeMoves.length > 0){
        redoMove = {...unmadeMoves.pop()};
        boardData[redoMove.row][redoMove.col].player = redoMove.player;
        boardData[redoMove.row][redoMove.col].isClicked = true;
        madeMoves.push(redoMove);
        console.log(boardData[2])
        nextPlayer(setActivePlayer, activePlayer, players);
        setResetTime(true);
    }
}

export function initializeBoardData(numColumns){
    //const numColumns = 30;
    for (let i = 0; i < numColumns; i++) {
        let row = [];
        for (let j = 0; j < numColumns; j++) {
        let boardObject = { id: i + '-' + j, row: i, col: j, isClicked: false, player: null, color: null }
        row.push(boardObject);
        }
        boardData.push(row);
    }
    return boardData
}


//After each click on the board, checks if there is a winner
export function checkNinRow(boardData, clickedSquare, player, n){
    console.log(boardData[2])
    
    if (boardData[clickedSquare.row][clickedSquare.col].player == null){
        boardData[clickedSquare.row][clickedSquare.col].player = player;
        madeMoves.push({...clickedSquare});

        //kolla diagonalen från övre vänster ner till höger
        let count = 0;
        for (let i = 1, j = 1; i <= n*2-1, j <= n*2-1; i++, j++) {
            try{
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col + (j - n)].player == boardData[clickedSquare.row][clickedSquare.col].player){
                    count += 1;
                    if (count == n){
                        proclaimWinner(player);
                        window.alert("you won!");
                    }
                } else {
                    count = 0
                }
            } catch(err){}
        }

        //kolla diagonalen från övre höger ner till vänster
        count = 0;
        for (let i = 1, j = 1; i <= n*2 - 1, j <= n*2 - 1; i++, j++) {
            try{
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col + (n - j)].player == boardData[clickedSquare.row][clickedSquare.col].player){
                    count += 1;
                    if (count == n){
                        proclaimWinner(player);
                        window.alert("you won!");
                    }
                } else {
                    count = 0
                }
            } catch(err){}
        }

        //kolla vertikalt uppifrån och ner
        count = 0;
        for (let i = 1; i <= n*2 - 1; i++) {
            try{
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col].player == boardData[clickedSquare.row][clickedSquare.col].player){
                    count += 1;
                    if (count == n){
                        window.alert("you won!");
                        proclaimWinner(player);
                    }
                } else {
                    count = 0
                }
            } catch(err){}
        }

        //kolla horizontelt, vänster till höger
        count = 0;
        for (let j = 1; j <= n*2 - 1; j++) {
            try{
                if (boardData[clickedSquare.row][clickedSquare.col + (j - n)].player == boardData[clickedSquare.row][clickedSquare.col].player){
                    count += 1;
                    if (count == n){
                        proclaimWinner(player);
                        window.alert("you won!");
                    }
                } else {
                    count = 0
                }
            } catch(err){}
        }
    }
}

export function proclaimWinner(player) {
    console.log('winner: ', player)
    isWinnerModalOpen = true;
}

  // Makes sure the activePlayer loops through the players array
export function nextPlayer(setActivePlayer, activePlayer, players){
    if (activePlayer >= (players.length - 1)) {
      setActivePlayer(0);
    }
    else {
      setActivePlayer(activePlayer + 1);
    }
  }