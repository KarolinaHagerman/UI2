import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

/*
Players: shows all players and whos turn it is to play,
whos turn it is is shown by making the players
*/
export default function Players({players, activePlayer, colors}) {
    console.log('render Players')
    
  return ( 
    <View style={styles.playerTurn}>
    {players.map((player, index) => (
      <Text key={index} style={[styles.player, {color: colors[index]}, players[activePlayer] === player ? styles.activePlayer : null]} >{player}</Text>
    ))}
  </View>
  );
}

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