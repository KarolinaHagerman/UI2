import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackActions } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import {useState} from 'react';

export default function NewGameScreen({ navigation, route}) {
  const [pieces, setPieces] = useState(3);
  const [players, setPlayers] = useState(2);
  const [time, setTime] = useState(5);
  const numberOfPlayers = [2,3,4,5,6,7,8,9,10];
  const piecesInRow = [3,4,5,6,7,8,9,10];
  const timePerMove = [5,10,15,30,60];
  console.log(route.params.language.HomeScreen.newGameButton)
  return (
    <View style={styles.container}>
      
      <Button 
        title= {route.params.language.NewGameScreen.mainMenuButton}
        onPress={() => navigation.navigate('Home')}
      />
      <StatusBar style="auto" />
        <SelectDropdown 
          defaultButtonText = {route.params.language.NewGameScreen.numberOfPlayers}
          data = {numberOfPlayers}
          onSelect={(selectedItem, index) => {
            setPlayers(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            let text = selectedItem + ' ' + route.params.language.NewGameScreen.players
            return text
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}/>
        <SelectDropdown 
          defaultButtonText = {route.params.language.NewGameScreen.numberOfPieces}
          data = {piecesInRow}
          onSelect={(selectedItem, index) => {
            setPieces(selectedItem)
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            let text = selectedItem + ' ' + route.params.language.NewGameScreen.pieces
            return text
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}/>

          <SelectDropdown 
          defaultButtonText = {route.params.language.NewGameScreen.timePerMove}
          data = {timePerMove}
          onSelect={(selectedItem, index) => {
            setTime(selectedItem)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            let text = selectedItem + ' ' + route.params.language.NewGameScreen.seconds
            return text
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            let text = item + ' ' + route.params.language.NewGameScreen.seconds
            return text
          }}/>
      

      <Button 
        title={route.params.language.NewGameScreen.startGameButton}
        onPress={() => {
          navigation.dispatch(
            StackActions.replace("Game", {players: players, pieces: pieces, time: time})
          );
        }}
      />
      <StatusBar style="auto" />
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