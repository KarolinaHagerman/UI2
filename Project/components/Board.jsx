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
import { StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import BoardItem from '../components/BoardItem';
import MovableView from 'react-native-movable-view';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export default function Board({ numColumns, data, players, activePlayer, piecesToWin, setActivePlayer, setResetTime, colors }) {
    //size of each side of the squares on the board
    //
    const tileSize = (Dimensions.get('window').width * 0.8) / (numColumns);

    return (
            <View style={[styles.container, { height: (tileSize + 2 * tileSize / 25) * numColumns, width: (tileSize + 2 * tileSize / 25) * numColumns }]}>
            
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
            </View>
            );
}

            /**style for background of the board, gives the color to the lines of the grid */
            const styles = StyleSheet.create({
    container: {
        backgroundColor: '#262723',
    },

})
