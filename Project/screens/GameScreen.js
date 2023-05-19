
import React, {useState} from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from "react-native-popup-menu";
import Header from '../components/Header';
import Board from '../components/Board';
import WinnerModal from '../components/WinnerModal';

/*
GameScreen: 
This is the screen that shows when starting a game
Composed of:
1) Header: contains a menu, timer and players, location: top of the screen
2) Board: contains the game board, location: the whole screen except for header
*/
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