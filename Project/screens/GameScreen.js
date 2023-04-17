import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity, Modal } from 'react-native';
import GameMenu from '../components/GameMenu';
import BoardItem from '../components/BoardItem';

export default function GameScreen({ navigation }) {

  // Get the player with players[activePlayer]
  const players = ['X', 'O', 'Y', 'Z'];
  const [activePlayer, setActivePlayer] = useState(0);
  const [headerFlex, setHeaderFlex] = useState(0);

/*   TODO: it's still very slow if I increase numColumns. 
  Have tried useCallback (here) and PureComponent (BoardItem.js). 
  Other things to try is VirtualizedList instead of FlatList:
   the app will only render the items that are currently visible on the screen, 
   which can improve the performance significantly. - ChatGPT */
  const numColumns = 15;

// Lets the header flex over the entire board while the menu is shown - boardItems not clickable and menu can stretch down
// TODO: still problem with the menu not stretching over the borders of the other flexitems (scores and playerTurn)
  const showMenu = () => {
    setHeaderFlex(1);
  }

// Sets the header flex back to normal - boardItems clickable again and menu can't stretch
  const hideMenu = () => {
    setHeaderFlex(0);
  }

  // Returns data on the form (this example is a 5x5 board):
/*   [
    { id: '1-1', isClicked: false }, { id: '1-2', isClicked: false }, { id: '1-3', isClicked: false }, { id: '1-4', isClicked: false }, { id: '1-5', isClicked: false },
    { id: '2-1', isClicked: false }, { id: '2-2', isClicked: false }, { id: '2-3', isClicked: false }, { id: '2-4', isClicked: false }, { id: '2-5', isClicked: false },
    { id: '3-1', isClicked: false }, { id: '3-2', isClicked: false }, { id: '3-3', isClicked: false }, { id: '3-4', isClicked: false }, { id: '3-5', isClicked: false },
    { id: '4-1', isClicked: false }, { id: '4-2', isClicked: false }, { id: '4-3', isClicked: false }, { id: '4-4', isClicked: false }, { id: '4-5', isClicked: false },
    { id: '5-1', isClicked: false }, { id: '5-2', isClicked: false }, { id: '5-3', isClicked: false }, { id: '5-4', isClicked: false }, { id: '5-5', isClicked: false }
  ]; */
  const initializeBoardData = () => {
    let boardData = [];
    for (let i=1; i <= numColumns; i++) {
      for (let j=1; j<= numColumns; j++) {
        let boardObject = { id: i + '-' + j, isClicked: false }
        boardData.push(boardObject);
      }
    }
    return boardData;
  }

  const data = initializeBoardData();
  
  

  // Decides what happens when you click on a grid item, useCallback to try and speed things up
  const clickHandler = useCallback((item) => {
    console.log('Player ', players[activePlayer], ' with index ', activePlayer, ' clicked on ', item.id);
    item.isClicked = !item.isClicked;
    nextPlayer();
  });

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
      <View style={[styles.header, { flex: headerFlex }]}>
        <GameMenu 
        style={styles.gameMenu}
        navigation={navigation} 
        showMenu={showMenu}
        hideMenu={hideMenu}
        />

        <Text style={styles.scores}>Poängen</Text>
        <Text style={styles.playerTurn}>BLABLBLABLA {players[activePlayer]}</Text>
      </View>

      <View style={styles.body}>
              <FlatList
          numColumns={numColumns}
          key={numColumns}
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <BoardItem item={item} onPress={clickHandler} />
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
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 2,
    position: 'relative'
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
  gameMenu: {
  }
});