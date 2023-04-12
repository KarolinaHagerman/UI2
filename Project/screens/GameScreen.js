import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity, Modal } from 'react-native';
import GameMenu from '../components/GameMenu';

export default function GameScreen({ navigation }) {

  // Get the player with players[activePlayer]
  const players = ['X', 'O', 'Y', 'Z'];
  const [activePlayer, setActivePlayer] = useState(0);

  const numColumns = 5;
  const data = [
    { id: '1-1', isClicked: false }, { id: '1-2', isClicked: false }, { id: '1-3', isClicked: false }, { id: '1-4', isClicked: false }, { id: '1-5', isClicked: false },
    { id: '2-1', isClicked: false }, { id: '2-2', isClicked: false }, { id: '2-3', isClicked: false }, { id: '2-4', isClicked: false }, { id: '2-5', isClicked: false },
    { id: '3-1', isClicked: false }, { id: '3-2', isClicked: false }, { id: '3-3', isClicked: false }, { id: '3-4', isClicked: false }, { id: '3-5', isClicked: false },
    { id: '4-1', isClicked: false }, { id: '4-2', isClicked: false }, { id: '4-3', isClicked: false }, { id: '4-4', isClicked: false }, { id: '4-5', isClicked: false },
    { id: '5-1', isClicked: false }, { id: '5-2', isClicked: false }, { id: '5-3', isClicked: false }, { id: '5-4', isClicked: false }, { id: '5-5', isClicked: false }
  ];

  // Decides what happens when you click on a grid item
  const clickHandler = (item) => {
    console.log('Player ', players[activePlayer], ' with index ', activePlayer, ' clicked on ', item.id);
    item.isClicked = !item.isClicked;
    nextPlayer();
  }

  // Makes sure the activePlayer loops through the players array
  const nextPlayer = () => {
    if (activePlayer >= (players.length - 1)) {
      setActivePlayer(0);
    }
    else {
      setActivePlayer(activePlayer + 1);
    }

  }

  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <GameMenu navigation={navigation} />

        <Text style={styles.scores}>Poängen</Text>
        <Text style={styles.playerTurn}>BLABLBLABLA {players[activePlayer]}</Text>
      </View>

      <View style={styles.body}>
              <FlatList
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => clickHandler(item)}>
              <Text style={styles.gridItem}></Text>
            </TouchableOpacity>
          )}
        /> 

      </View>

    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 2,
  },
  body: {
    backgroundColor: 'black',
    flex: 1,
    position: 'absolute',
  },
  bodyText: {
    fontWeight: 'bold',
    fontSize: 80,
    color: 'white',
    padding: 20,
  },
  scores: {
    backgroundColor: 'purple',
    fontSize: 20,
    color: 'blue',
    padding: 20,
  },
  playerTurn: {
    backgroundColor: 'gold',
    fontSize: 20,
    color: 'red',
    padding: 10,
  },
  gridItem: {
    padding: 30,
    backgroundColor: 'white',
    margin: 1,
  }
});