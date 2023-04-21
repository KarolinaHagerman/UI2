export function checkNinRow(boardData, clickedSquare, player, n){
    console.log(boardData[clickedSquare.row][clickedSquare.col].player)
    
    if (boardData[clickedSquare.row][clickedSquare.col].player == null){
        
        boardData[clickedSquare.row][clickedSquare.col].player = player;
        let count = 0;

        //kolla diagonalen från övre vänster ner till höger
        console.log('digonal 1**********************')
        for (let i = 1, j = 1; i <= n*2-1, j <= n*2-1; i++, j++) {
            try{
                console.log(boardData[clickedSquare.row + (i - n)][clickedSquare.col + (j - n)].player)
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col + (j - n)].player == boardData[clickedSquare.row][clickedSquare.col].player){
                    count += 1;
                    if (count == n){
                        console.log('hoooooow??')
                        //player winns!!!
                    }
                } else {
                    count = 0
                }
            } catch(err){
                console.log(err)
            }
        }

        //kolla diagonalen från övre höger ner till vänster
        console.log('digonal 2**********************')
        count = 0;
        for (let i = 1, j = 1; i <= n*2 - 1, j <= n*2 - 1; i++, j++) {
            try{
                console.log(boardData[clickedSquare.row + (i - n)][clickedSquare.col + (n - j)].player)
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col + (n - j)].player == boardData[clickedSquare.row][clickedSquare.col].player){
                    count += 1;
                    if (count == n){
                        console.log('hoooooow??')
                        //player winns!!!
                    }
                } else {
                    count = 0
                }
            } catch(err){

                console.log(err)
            }
        }

        //kolla vertikalt uppifrån och ner
        console.log('vertikal **********************')
        count = 0;
        for (let i = 1; i <= n*2 - 1; i++) {
            try{
                console.log(boardData[clickedSquare.row + (i - n)][clickedSquare.col].player)
                if (boardData[clickedSquare.row + (i - n)][clickedSquare.col].player == boardData[clickedSquare.row][clickedSquare.col].player){
                    count += 1;
                    if (count == n){
                        console.log('hoooooow??')
                        //player winns!!!
                    }
                } else {
                    count = 0
                }
            } catch(err){
                console.log(err)
            }
        }

        //kolla horizontelt, vänster till höger
        console.log('horizontal **********************')
        count = 0;
        for (let j = 1; j <= n*2 - 1; j++) {
            try{
                console.log(boardData[clickedSquare.row][clickedSquare.col + (j - n)].player)
                if (boardData[clickedSquare.row][clickedSquare.col + (j - n)].player == boardData[clickedSquare.row][clickedSquare.col].player){
                    count += 1;
                    if (count == n){
                        console.log('hoooooow??')
                        //player winns!!!
                    }
                } else {
                    count = 0
                }
            } catch(err){
                console.log(err)
            }
        }
    }
}