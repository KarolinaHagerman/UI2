var boardData = [];
export var madeMoves = [];
export var unmadeMoves = [];
var lastMove = null;
var redoMove = null;

export function undoBoard(){
    if(madeMoves.length > 0){
        lastMove = {...madeMoves.pop()};
        boardData[lastMove.row][lastMove.col].player = null;
        boardData[lastMove.row][lastMove.col].isClicked = false;
        unmadeMoves.push(lastMove);
    }
}

export function redoBoard(){
    if(unmadeMoves.length > 0){
        redoMove = {...unmadeMoves.pop()};
        boardData[redoMove.row][redoMove.col].player = redoMove.player;
        boardData[redoMove.row][redoMove.col].isClicked = true;
        madeMoves.push(redoMove);
        console.log(boardData[2])
    }
}

export function initializeBoardData(numColumns){
    //const numColumns = 30;
    for (let i = 0; i < numColumns; i++) {
        let row = [];
        for (let j = 0; j < numColumns; j++) {
        let boardObject = { id: i + '-' + j, row: i, col: j, isClicked: false, player: null }
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
                        console.log('winner: ', player)
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
                        console.log('winner: ', player)
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
                        console.log('winner: ', player)
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
                        console.log('winner: ', player)
                    }
                } else {
                    count = 0
                }
            } catch(err){}
        }
    }
}