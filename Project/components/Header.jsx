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


import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import GameMenu from './GameMenu';
import { nextPlayer } from '../js/gameLogic';
import Timer from './Timer'
import Players from './Players'
import { StatusBar } from 'expo-status-bar';

      export default function Header({navigation, language, players, activePlayer, time, setActivePlayer, resetTime, setResetTime, colors, tutMode, setTutMode, restartTut}) {
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

      /**styles for the header */
      const styles = StyleSheet.create({
        header: {
        flexDirection: "row",
      backgroundColor: 'rgba(255 ,255,255,1)',
      borderBottomWidth: 2,
      borderBottomColor: '#000',
      paddingRight: 5,
      justifyContent: 'space-between'
      },
  });

/* END of file Header.jsx */
