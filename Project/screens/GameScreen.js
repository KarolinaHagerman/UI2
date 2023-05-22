/*
File: GameScreen.js

This file contains the JSX needed to create 
1) a header; containing a menu, timer and players
2) a game board

Version 0.5
Author: Karolina Hagerman, Erik Blomsterberg

Requires the following files:

Header.jsx
Board.jsx
WinnerModal.jsx

*/

import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from "react-native-popup-menu";
import Header from '../components/Header';
import Board from '../components/Board';
import WinnerModal from '../components/WinnerModal';


export default function GameScreen({ navigation, route }) {
  const {language, piecesToWin, players, time, data, numColumns, tutorialMode, colors } = route.params;
  const [activePlayer, setActivePlayer] = useState(0);
  const [resetTime, setResetTime] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
        <MenuProvider>
          <Header navigation = {navigation} language = {language} players = {players} activePlayer = {activePlayer} time = {time} setActivePlayer={setActivePlayer} resetTime = {resetTime} setResetTime = {setResetTime} colors = {colors}/>
          <Board props = {{numColumns: numColumns, data: data, players: players, activePlayer: activePlayer, piecesToWin: piecesToWin, setActivePlayer: setActivePlayer, setResetTime: setResetTime, colors: colors}}/>
          <WinnerModal/>
        </MenuProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});


  /* END of file GameScreen.js */