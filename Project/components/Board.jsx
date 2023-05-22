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

import React, { useCallback } from 'react';
import { StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
import BoardItem from '../components/BoardItem';
import MovableView from 'react-native-movable-view';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import { responsiveHeight, responsiveWidth, responsiveFontSize, useResponsiveHeight } from "react-native-responsive-dimensions";

export default function Board(input) {

    //setting being passed on from NewGameScreen
    //
    const { numColumns, data, players, activePlayer, piecesToWin, setActivePlayer, setResetTime, colors } = input.props;

    //size of each side of the squares on the board
    //
    //const tileSize = (Dimensions.get('window').width * 0.8) / (numColumns);
    const tileSize = 100;
    return (
        
        <ReactNativeZoomableView >
            {/**ReactNativeZoomableView makes the board/screen zaommable*/}

            {/**MovableView makes the board movable*/}
            <MovableView style={[styles.board, { height: (tileSize + 2) * numColumns, width: (tileSize + 2) * numColumns }]}>
            
                {/**FlatList renders all the squares on the board, BoardItem is a single square on the board */}
                <FlatList
                    numColumns={numColumns}
                    data={data.flatMap((row) => row)}
                    renderItem={({ item }) =>
                        <BoardItem
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
            </MovableView>
        </ReactNativeZoomableView>
    );
}

/**style for background of the board, gives the color to the lines of the grid */
const styles = StyleSheet.create({
    board: {
        backgroundColor: 'black',

    }
})

/* END of file Board.jsx */