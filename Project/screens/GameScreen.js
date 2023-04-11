import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

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
      setActivePlayer(activePlayer+1);
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Menu"
        />
        <Text style={styles.scores}>Här står poängen</Text>
        <Text style={styles.playerTurn}>Player {players[activePlayer]}'s turn</Text>
      </View>
      <View style={styles.body}>
        <Text>Här ska brädet vara</Text>

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
      <Button title="Pop to root" onPress={() => navigation.popToTop()} />
      <Button title="Pop" onPress={() => navigation.pop()} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'pink',

  },
  body: {
    backgroundColor: 'black',
  },
  playerTurn: {

  },
  gridItem: {
    padding: 30,
    backgroundColor: 'white',
    margin: 1,
  }
});