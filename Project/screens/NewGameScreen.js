import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, Switch} from 'react-native';
import React, { useState} from 'react';
import { StackActions } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { initializeBoardData } from '../js/gameLogic';



export default function NewGameScreen({ navigation, route}) {
  const { language } = route.params;
  const playerChars = [ 'X', 'Y', 'Z', 'O', 'E'];
  const playerColors = ['orange', 'green', 'purple', 'blue', 'red'];
  const numberOfPlayers = [2,3,4,5];
  const piecesInRow = [3,4,5,6,7,8,9,10];
  const timePerMove = [5,10,15,30,60];
  const boardSize = [3,5,15,30];
  var size = 3;
  var colors = playerColors.slice(0,2);
  var players = playerChars.slice(0,2);
  var pieces = 3;
  var time = 60;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  console.log('totplayers newgamescreen initial: ' , players)
  return (
    <View style={styles.container}>

      <StatusBar style="auto" />
      <Button 
        title= {language.NewGameScreen.mainMenuButton}
        onPress={() => navigation.navigate('Home')}
      />
      <Text>{language.NewGameScreen.tutorialMode}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <StatusBar style="auto" />
        <SelectDropdown 
          defaultButtonText = {language.NewGameScreen.numberOfPlayers}
          data = {numberOfPlayers}
          onSelect={(selectedItem, index) => {
            players = playerChars.slice(0,selectedItem);
            colors = playerColors.slice(0,selectedItem);
            console.log('totplayers newgamescreen: ' , players)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            let text = selectedItem + ' ' + language.NewGameScreen.players
            return text
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}/>
        <SelectDropdown 
          defaultButtonText = {language.NewGameScreen.numberOfPieces}
          data = {piecesInRow}
          onSelect={(selectedItem, index) => {
            pieces = selectedItem;
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            let text = selectedItem + ' ' + language.NewGameScreen.pieces
            return text
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}/>

          <SelectDropdown 
          defaultButtonText = {language.NewGameScreen.timePerMove}
          data = {timePerMove}
          onSelect={(selectedItem, index) => {
            time = selectedItem;
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            let text = selectedItem + ' ' + language.NewGameScreen.seconds
            return text
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            let text = item + ' ' + language.NewGameScreen.seconds
            return text
          }}/>
          
          <SelectDropdown 
          defaultButtonText = {route.params.language.NewGameScreen.boardSize}
          data = {boardSize}
          onSelect={(selectedItem, index) => {
            size = selectedItem;
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            let text = selectedItem + ' x ' + selectedItem + ' ' + route.params.language.NewGameScreen.squares
            return text
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            let text = item + ' x ' + item + ' ' + route.params.language.NewGameScreen.squares
            return text
          }}/>
      

      <Button 
        title={language.NewGameScreen.startGameButton}
        onPress={() => {
          const boardData = initializeBoardData(size)
          navigation.navigate(
            "Game", {language: language, piecesToWin: pieces, players: players, time: time, data: boardData, numColumns: size, tutorialMode: isEnabled, colors: colors}
          );
        }}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});