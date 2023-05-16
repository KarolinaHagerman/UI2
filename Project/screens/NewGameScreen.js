import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, Switch, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { initializeBoardData } from '../js/gameLogic';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const ICON_SIZE = 40;

export default function NewGameScreen({ navigation, route }) {
  const language = route.params.language;
  const [soundOn, setSound] = useState(route.params.soundIsOn)

  //All displayed options
  const playerChars = ['A', 'B', 'C', 'D', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö']
  const numberOfPlayers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const piecesInRow = [3, 4, 5, 6, 7, 8, 9, 10];
  const timePerMove = [5, 10, 15, 30, 60];
  const boardSizes = [3, 5, 15, 30];
  const tutModeOptions = ['On', 'Off'];

  //States for all options
  const [players, changePlayers] = useState(playerChars.slice(0, 2));
  const [pieces, changePieces] = useState(3);
  const [time, changeTime] = useState(60);
  const [boardSize, changeBoardSize] = useState(3);
  const [tutModeOn, changeTutMode] = useState('Off');

  // Fonts, download from https://www.dafont.com/ and add to fonts folder
  const [fontsLoaded] = useFonts({
    'impact': require('../fonts/impact.ttf'),
    'oxfordStreet': require('../fonts/OxfordStreet.ttf'),
    'bold': require('../fonts/THEBOLDFONT.ttf'),
  });

  // https://www.youtube.com/watch?v=viIkcDYSBrI
  // This hook is used to tell React to do prepare after rendering
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


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { soundIsOn: soundOn })}>
          <Ionicons name="chevron-back" size={ICON_SIZE} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.headerItem, styles.soundIcon]}
          onPress={() => setSound(!soundOn)}
        >
          {soundOn ? (
            <Ionicons name="volume-high-outline" size={ICON_SIZE} color="#262723" />
          ) : (
            <Ionicons name="volume-mute-outline" size={ICON_SIZE} color="#262723" />
          )}
        </TouchableOpacity>

      </View>
      <View style={styles.body}>
        <SelectDropdown
          buttonStyle={styles.dropDown}
          buttonTextStyle={styles.dropDownText}
          defaultButtonText={language.NewGameScreen.numberOfPlayers + ': ' + players.length}
          renderDropdownIcon={() => { return <Ionicons name="chevron-back" size={24} style={styles.dropDownIcon} />; }}
          data={numberOfPlayers}
          onSelect={(selectedItem, index) => { changePlayers(playerChars.slice(0, selectedItem)); }}
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

        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => {
            var boardData = initializeBoardData(boardSize)
            navigation.dispatch(
              StackActions.replace("Game", { language: language, piecesToWin: pieces, players: players, time: time, data: boardData, numColumns: boardSize, tutorialMode: tutModeOn })
            );
          }}
        >
          <Text style={styles.startBtnText}>{language.NewGameScreen.startGameButton}</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  body: {
    marginTop: '20%',
    marginBottom: '60%',
    flex: 1,
    justifyContent: 'space-evenly'
  },
  dropDown: {
    backgroundColor: '#C8C1AD',
    borderColor: '#262723',
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'center',
  },
  dropDownText: {
    color: '#262723',
    fontFamily: 'oxfordStreet'
  },
  dropDownIcon: {
    transform: [{ rotate: '270deg' }],
    color: 'black'
  },
  startBtn: {
    backgroundColor: '#9E355E',
    padding: '5%',
    alignSelf: 'center',
    borderColor: '#262723',
    borderWidth: 1,
    borderRadius: 3,
  },
  startBtnText: {
    fontSize: 40,
    fontFamily: 'oxfordStreet',
    color: 'white'
  }
});