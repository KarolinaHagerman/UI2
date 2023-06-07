/** 
* File: Board.jsx

* This file contains the JSX needed to create a gameboard.
* The gameboard is a grid of white squares, on which players can place pieces.
* The board can be dragged around and zoomed in and out

* Version 0.5
* Authors: Karolina Hagerman, Erik Blomsterberg

* Requires the following files:

* BoardItem.jsx

*/

// Imports
//
import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import BoardItem from '../components/BoardItem';
import { responsiveHeight, useResponsiveHeight } from 'react-native-responsive-dimensions';

/*
Board:
The game board with the grid of board items
*/
export default function Board({ winnerCallbackAgain, numColumns, data, players, activePlayer, piecesToWin, setActivePlayer, setResetTime, colors }) {

    //size of each side of the squares on the board
    //
    const tileSize = useResponsiveHeight(10);

    // Boolean values that tells if we have a winner or not
    //
    const [hasWinner, setHasWinner] = useState(false);
    const [winner, setWinner] = useState(null);
    const [winnerColor, setWinnerColor] = useState(null);

    // Listens to changes in hasWinner and winner, if so update tha callback to the parent
    //
    useEffect(() => {
        winnerCallbackAgain({ hasWinner, winner, winnerColor });
    }, [hasWinner]);

    // Handles the winner callback from BoardItem and set new state values
    //
    const handleWinnerCallback = (data) => {
        setWinnerColor(data.winnerColor);
        setWinner(data.winner);
        setHasWinner(data.hasWinner);
    };

    // All elements presented to the user
    // 
    return (
        <View style={[styles.container, { height: (tileSize + 2 * tileSize / 25) * numColumns, width: (tileSize + 2 * tileSize / 25) * numColumns }, numColumns < 10 && styles.marginTop]}>

            {/**FlatList renders all the squares on the board, BoardItem is a single square on the board */}
            <FlatList
                numColumns={numColumns}
                data={data.flatMap((row) => row)}
                renderItem={({ item }) =>
                    <BoardItem
                        winnerCallback={handleWinnerCallback}
                        setResetTime={setResetTime}
                        setActivePlayer={setActivePlayer}
                        item={item}
                        tileSize={tileSize}
                        data={data}
                        players={players}
                        activePlayer={activePlayer}
                        piecesToWin={piecesToWin}
                        colors={colors}
                    />
                }
            />
        </View>
    );
}

// Style for background of the board, gives the color to the lines of the grid */
//
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#262723',
        alignSelf: 'center',
    },
    marginTop: {
        marginTop: responsiveHeight(10),
    }

})

//************
// END of file Board.jsx
//************