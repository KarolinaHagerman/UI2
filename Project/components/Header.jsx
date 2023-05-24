/** 
* File: Header.jsx

* This file contains the JSX needed to create a Header containing
* 1) a menu
* 2) a timer that counts down the active players time to make a move
* 3) the players and which players turn it is to make a move

* Version 0.5
* Author: Karolina Hagerman, Erik Blomsterberg

* Requires the following files:

* GameMenu.jsx
* Timer.jsx
* Players.jsx

*/

// Imports
//
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import GameMenu from './GameMenu';
import { nextPlayer } from '../js/gameLogic';
import Timer from './Timer'
import Players from './Players'
import { StatusBar } from 'expo-status-bar';

/*
Header:
The header displayed on the game screen
*/
export default function Header({ navigation, language, players, activePlayer, time, setActivePlayer, resetTime, setResetTime, colors, tutMode, setTutMode, restartTut, hasWinner }) {
  return (
    <View style={styles.header}>

      {/**Dropdown menu with hamburger icon at the top left of the screen */}
      <GameMenu
        navigation={navigation}
        language={language}
        players={players}
        setActivePlayer={setActivePlayer}
        activePlayer={activePlayer}
        setResetTime={setResetTime}
        tutMode={tutMode}
        setTutMode={setTutMode}
        restartTut={restartTut}
      />

      {/**Timer at the center top of the screen */}
      <Timer
        time={time}
        nextPlayer={nextPlayer}
        setActivePlayer={setActivePlayer}
        activePlayer={activePlayer}
        players={players}
        resetTime={resetTime}
        setResetTime={setResetTime}
        tutMode={tutMode}
        language={language}
        hasWinner={hasWinner}
      />

      {/**shows players and which players turn at the top right of the screen*/}
      <Players
        players={players}
        activePlayer={activePlayer}
        colors={colors}
      />
    </View>



  );
}

// Styles for the header
//
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    //backgroundColor: '#F8FFFF',
    backgroundColor: '#EDE4E1',
    //borderBottomWidth: 2,
    //borderBottomColor: '#000',
    paddingRight: '2%',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center'
  },
});

/* END of file Header.jsx */
