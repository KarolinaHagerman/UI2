/** 
* File: BoardItem.jsx

* This file contains the JSX needed to create a single square on the gameboard.

* Version 0.5
* Authors: Karolina Hagerman, Erik Blomsterberg

* Requires the following files:

* Piece.jsx
* GameLogic.js
*/

import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Animated } from 'react-native';
import { checkNinRow, nextPlayer } from '../js/gameLogic';
import { SoundContext } from '../components/SoundContext';
import Piece from './Piece'

export default function BoardItem({ setResetTime, setActivePlayer, item, tileSize, data, players, activePlayer, piecesToWin, colors }) {

  // Getting the needed information from the sound context
  //
  const { soundOn, toggleSound, playBackgroundMusic, backgroundMusic, placePiece, playPlacePiece } = useContext(SoundContext);

  //updates the square when it is clicked on and the checks for winner, resets timer and gives the turn to the next player
  //
  const onPress = () => {

    //checks that the square isnt occupied before updating the square with new values
    //
    if (!item.isClicked) {
      item.isClicked = true;
      item.color = colors[activePlayer];
      playPlacePiece();
      checkNinRow(data, item, players[activePlayer], piecesToWin);
      nextPlayer(setActivePlayer, activePlayer, players);
      setResetTime(true);
    }


  }
  return (
    <TouchableOpacity onPress={onPress}  >
      {/**a white square that renders a piece if it is clicked on for the first time*/}
      <View style={[styles.boardItem, { height: tileSize, width: tileSize, margin: tileSize / 25 }]}>
        {item.isClicked &&
          <Piece
            tileSize={tileSize}
            color={item.color}
            player={item.player}
          />}
      </View>
    </TouchableOpacity>
  );
}

/**styles for each square on the board */
const styles = StyleSheet.create({
  boardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FFFF',
  },

});

/* END of file BoardItem.jsx */