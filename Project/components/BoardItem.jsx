/** 
* File: BoardItem.jsx

* This file contains the JSX needed to create a single square on the gameboard.

* Version 0.5
* Authors: Karolina Hagerman, Erik Blomsterberg

* Requires the following files:

* Piece.jsx
* GameLogic.js
*/

// Imports
//
import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { checkNinRow, nextPlayer } from '../js/gameLogic';
import { SoundContext } from '../components/SoundContext';
import Piece from './Piece'

/*
BoardItem:
Each item in the board
*/
export default function BoardItem({ winnerCallback, setResetTime, setActivePlayer, item, tileSize, data, players, activePlayer, piecesToWin, colors }) {

  // Getting the needed information from the sound context
  //
  const { playPlacePiece, playOccupied } = useContext(SoundContext);

  // Boolean values that tells if we have a winner or not
  //
  const [hasWinner, setHasWinner] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winnerColor, setWinnerColor] = useState(null);

  // Tells if the board item is occupied or not
  //
  const [isOccupied, setIsOccupied] = useState(false);

  // Listens to changes in hasWinner and winner, if so update tha callback to the parent
  //
  useEffect(() => {
    winnerCallback({ hasWinner, winner, winnerColor });
  }, [hasWinner]);

  // updates the square when it is clicked on and the checks for winner, resets timer and gives the turn to the next player
  //
  const onPress = () => {

    // checks that the square isnt occupied before updating the square with new values
    //
    if (!item.isClicked) {
      item.isClicked = true;
      item.color = colors[activePlayer];

      // Soundeffect
      //
      playPlacePiece();

      // If there is a winner change the states that will be sent back to the parents
      //
      let isWinner = checkNinRow(data, item, players[activePlayer], piecesToWin);
      if (isWinner) {
        setWinner(players[activePlayer]);
        setWinnerColor(colors[activePlayer]);
        setHasWinner(true);
      }

      // Next player in line
      //
      nextPlayer(setActivePlayer, activePlayer, players);
      setResetTime(true);
    }
    else {
      playOccupied();
      setIsOccupied(true);
    }
  }

  // All elements presented to the user
  // 
  return (
    <TouchableOpacity onPress={onPress}  >

      {/**a white square that renders a piece if it is clicked on for the first time*/}
      <View style={[styles.boardItem, { height: tileSize, width: tileSize, margin: tileSize / 25, }]}>
        {item.isClicked &&
          <Piece
            tileSize={tileSize}
            color={item.color}
            player={item.player}
            isOccupied={isOccupied}
            setIsOccupied={setIsOccupied}
          />}
      </View>
    </TouchableOpacity>
  );
}

// Styles for each square on the board
//
const styles = StyleSheet.create({
  boardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FFFF',
  },
});

//************
// END of file BoardItem.jsx
//************