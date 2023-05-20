import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Animated } from 'react-native';
import { checkNinRow, nextPlayer } from '../js/gameLogic';
import Piece from './Piece'

export default function BoardItem({ setResetTime, setActivePlayer, item, tileSize, data, players, activePlayer, piecesToWin, colors }) {
  const onPress = () => {
    if (!item.isClicked) {
      item.isClicked = true;
      item.color = colors[activePlayer];
      checkNinRow(data, item, players[activePlayer], piecesToWin);
      nextPlayer(setActivePlayer, activePlayer, players);
      setResetTime(true);
    }
  }
  return (
    <TouchableOpacity onPress={onPress}  >
      <View style={[styles.boardItem, { height: tileSize, width: tileSize, margin: tileSize/25 }]}>
        {item.isClicked && <Piece tileSize={tileSize} color={item.color} player={item.player} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FFFF',
  },

});