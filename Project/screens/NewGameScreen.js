/**
 * File: NewGameScreen.js
 *
 * This file contains the javaScript needed for the new game screen of the app.
 *
 * Version ???
 * Author: Karolina Hagerman, Erik Blomsterberg
 */

// Imports
//
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, Switch, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { StackActions } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { initializeBoardData } from '../js/gameLogic';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SoundContext } from '../components/SoundContext';
import { responsiveHeight, responsiveWidth, responsiveFontSize, useResponsiveHeight } from "react-native-responsive-dimensions";

export default function NewGameScreen({ navigation, route }) {
  const ICON_SIZE = useResponsiveHeight(5);

  // Language passed from hame screen
  //
  const language = route.params.language;

  // Getting the needed information from the sound context
  //
  const { soundOn, toggleSound } = useContext(SoundContext);

  //All displayed options
  //
  const playerChars = ['X', 'Y', 'Z', 'O', 'E'];
  const playerColors = ['orange', 'green', 'purple', 'blue', 'red'];
  const numberOfPlayers = [2, 3, 4, 5];
  const piecesInRow = [3, 4, 5, 6, 7, 8, 9, 10];
  const timePerMove = [5, 10, 15, 30, 60];
  const boardSizes = [3, 5, 15, 30];
  const tutModeOptions = ['On', 'Off'];

  //States for all options which will then be passed on to game screen
  //
  const [players, changePlayers] = useState(playerChars.slice(0, 2));
  const [colors, changeColors] = useState(playerColors.slice(0, 2));
  const [pieces, changePieces] = useState(3);
  const [time, changeTime] = useState(60);
  const [boardSize, changeBoardSize] = useState(3);
  const [tutModeOn, changeTutMode] = useState('Off');

  // Fonts, can be downloaded from e.g. https://www.dafont.com/ and added to fonts folder
  //
  const [fontsLoaded] = useFonts({
    'impact': require('../fonts/impact.ttf'),
    'oxfordStreet': require('../fonts/OxfordStreet.ttf'),
    'bold': require('../fonts/THEBOLDFONT.ttf'),
  });

  // The following useEffect was explained in https://www.youtube.com/watch?v=viIkcDYSBrI and is used to load the fonts.
  // This hook is used to tell React to do prepare after rendering
  //
  useEffect(() => {
    async function prepare() {
      // Keeps the splash screen visible until we call hideAsync
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  }
  else {
    //Hides the native splash screen immediately - Expo Documentation
    SplashScreen.hideAsync();
  }
  // Ending of the named code

  // All elements presented to the user
  // 
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* The go back button, navigates back to home screen */}
        <TouchableOpacity onPress={() => navigation.navigate('Home', { soundIsOn: soundOn })}>
          <Ionicons name="chevron-back" size={ICON_SIZE} color="black" />
        </TouchableOpacity>

        {/* The clickable sound icon, different icons depending on soundOn state */}
        <TouchableOpacity
          style={[styles.headerItem, styles.soundIcon]}
          onPress={() => { toggleSound(); }}
        >
          {soundOn ? (
            <Ionicons name="volume-high-outline" size={ICON_SIZE} color="#262723" />
          ) : (
            <Ionicons name="volume-mute-outline" size={ICON_SIZE} color="#262723" />
          )}
        </TouchableOpacity>

      </View>
      {/* END OF HEADER */}

      {/* BODY */}
      <View style={styles.body}>

        {/* The dropdowns */}
        <SelectDropdown
          buttonStyle={styles.dropDown}
          buttonTextStyle={styles.dropDownText}
          defaultButtonText={language.NewGameScreen.numberOfPlayers + ': ' + players.length}
          renderDropdownIcon={() => { return <Ionicons name="chevron-back" size={24} style={styles.dropDownIcon} />; }}
          data={numberOfPlayers}
          onSelect={(selectedItem, index) => {
            changePlayers(playerChars.slice(0, selectedItem));
            changeColors(playerColors.slice(0, selectedItem));
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            //let text = selectedItem + ' ' + language.NewGameScreen.players
            return language.NewGameScreen.numberOfPlayers + ': ' + players.length;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }} />

        <SelectDropdown
          buttonStyle={styles.dropDown}
          buttonTextStyle={styles.dropDownText}
          defaultButtonText={language.NewGameScreen.numberOfPieces + ': ' + pieces}
          renderDropdownIcon={() => { return <Ionicons name="chevron-back" size={24} style={styles.dropDownIcon} />; }}
          data={piecesInRow}
          onSelect={(selectedItem, index) => { changePieces(selectedItem); }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            //let text = selectedItem + ' ' + language.NewGameScreen.pieces
            return language.NewGameScreen.numberOfPieces + ': ' + pieces;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }} />

        <SelectDropdown
          buttonStyle={styles.dropDown}
          buttonTextStyle={styles.dropDownText}
          defaultButtonText={language.NewGameScreen.timePerMove + ': ' + time + ' ' + language.NewGameScreen.seconds}
          renderDropdownIcon={() => { return <Ionicons name="chevron-back" size={24} style={styles.dropDownIcon} />; }}
          data={timePerMove}
          onSelect={(selectedItem, index) => { changeTime(selectedItem); }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            //let text = selectedItem + ' ' + language.NewGameScreen.seconds
            return language.NewGameScreen.timePerMove + ': ' + time + ' ' + language.NewGameScreen.seconds;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            let text = item + ' ' + language.NewGameScreen.seconds
            return text
          }} />

        <SelectDropdown
          buttonStyle={styles.dropDown}
          buttonTextStyle={styles.dropDownText}
          defaultButtonText={language.NewGameScreen.boardSize + ': ' + boardSize + 'x' + boardSize}
          renderDropdownIcon={() => { return <Ionicons name="chevron-back" size={24} style={styles.dropDownIcon} />; }}
          data={boardSizes}
          onSelect={(selectedItem, index) => { changeBoardSize(selectedItem); }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            //let text = selectedItem + ' x ' + selectedItem + ' ' + route.params.language.NewGameScreen.squares
            return language.NewGameScreen.boardSize + ': ' + boardSize + 'x' + boardSize;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            let text = item + ' x ' + item + ' ' + route.params.language.NewGameScreen.squares
            return text
          }} />

        <SelectDropdown
          buttonStyle={styles.dropDown}
          buttonTextStyle={styles.dropDownText}
          defaultButtonText={language.NewGameScreen.tutorialMode + ': ' + tutModeOn}
          renderDropdownIcon={() => { return <Ionicons name="chevron-back" size={24} style={styles.dropDownIcon} />; }}
          data={tutModeOptions}
          onSelect={(selectedItem, index) => { changeTutMode(selectedItem); }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            //let text = selectedItem + ' ' + language.NewGameScreen.players
            return language.NewGameScreen.tutorialMode + ': ' + tutModeOn;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }} />
        {/* End of dropdowns */}

        {/* Start game button, navigates to game screen */}
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => {
            var boardData = initializeBoardData(boardSize)
            navigation.dispatch(
              StackActions.replace("Game", { language: language, piecesToWin: pieces, players: players, time: time, data: boardData, numColumns: boardSize, tutorialMode: tutModeOn, colors: colors })
            );
          }}
        >
          <Text style={styles.startBtnText}>{language.NewGameScreen.startGameButton}</Text>
        </TouchableOpacity>
      </View>
      {/* END OF BODY */}

      {/* Default style of status bar */}
      <StatusBar style="auto" />
    </View>
  );
}



// Styles for new game screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    padding: '2%',
    marginHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(5),
    width: responsiveWidth(96),
  },
  body: {
    paddingVertical: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(10),
    width: responsiveWidth(96),
    height: responsiveHeight(80),
    justifyContent: 'space-evenly',
  },
  dropDown: {
    backgroundColor: '#EDE4E1',
    borderColor: '#262723',
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'center',
    width: '70%',
  },
  dropDownText: {
    color: '#262723',
    fontFamily: 'Helvetica',
    paddingHorizontal: '1%',
    alignSelf: 'center',
    fontSize: responsiveFontSize(2),
    textAlign: 'left'
  },
  dropDownIcon: {
    transform: [{ rotate: '270deg' }],
    color: 'black'
  },
  startBtn: {
    backgroundColor: '#9E355E',
    borderColor: '#262723',
    borderWidth: 1,
    borderRadius: 7,
    padding: '5%',
    paddingTop: '7%',
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignSelf: 'center',
  },
  startBtnText: {
    fontSize: responsiveFontSize(7),
    fontFamily: 'oxfordStreet',
    color: '#F8FFFF',
    alignSelf: 'center',
  }
});

//************
// END of file NewGameScreen.js
//************