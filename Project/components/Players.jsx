/**
* File: Players.jsx

* This file contains the JSX needed to show participating players and whos turn it is to makea move

* Version 0.5
* Author: Karolina Hagerman, Erik Blomsterberg

*/

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function Players({players, activePlayer, colors}) {
  return ( 
    <View style={styles.playerTurn}>
      {/**writes each player with their corresponding color and gives the player whos turn it is a bigger sign/letter */}
    {players.map((player, index) => (
      <Text key={index} style={[styles.player, {color: colors[index]}, players[activePlayer] === player ? styles.activePlayer : null]} >{player}</Text>
    ))}
  </View>
  );
}

/**styles for the players and showing whos turn it is */
const styles = StyleSheet.create({
    playerTurn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline', 
      },
      player: {
        fontSize: 20,
        color: 'black',
        paddingTop: 5,
      },
      activePlayer: {
        fontSize: 30,
        fontWeight: 'bold',
    
      },
  });

  
  /* END of file Players.jsx */