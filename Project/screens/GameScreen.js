import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity, Modal } from 'react-native';
import GameMenu from '../components/GameMenu';
import BoardItem from '../components/BoardItem';
import { checkNinRow, undo, redo } from '../js/gameLogic';

export default function GameScreen({ navigation, route}) {
  // Get the player with players[activePlayer]
  const players = ['X', 'O'];
  //const players = ['X', 'O', 'Y', 'Z'];
  const [activePlayer, setActivePlayer] = useState(0);
  const [headerFlex, setHeaderFlex] = useState(0);

  /*   TODO: it's still very slow if I increase numColumns. 
    Have tried useCallback (here) and PureComponent (BoardItem.js). 
    Other things to try is VirtualizedList instead of FlatList:
     the app will only render the items that are currently visible on the screen, 
     which can improve the performance significantly. - ChatGPT */
 // const numColumns = 30;

  // Lets the header flex over the entire board while the menu is shown - boardItems not clickable and menu can stretch down
  // TODO: still problem with the menu not stretching over the borders of the other flexitems (scores and playerTurn)
  const showMenu = () => {
    setHeaderFlex(1);
  }

  // Sets the header flex back to normal - boardItems clickable again and menu can't stretch
  const hideMenu = () => {
    setHeaderFlex(0);
  }


  // Decides what happens when you click on a grid item, useCallback to try and speed things up
  const clickHandler = useCallback((item, index) => {
    console.log('Player ', players[activePlayer], ' with index ', activePlayer, ' clicked on ', item.id);
    item.isClicked = !item.isClicked;
    checkNinRow(route.params.data, item, players[activePlayer], route.params.piecesToWin);
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

        {/* FLATLIST DÄR DATAN ÄR EN MATRIS MED OBJEKT */}
        {/* Here, we're using the flatMap() method to flatten the two-dimensional data 
          array into a one-dimensional array, which can be used as the data prop for the FlatList. 
          We're also using the index parameter of the keyExtractor function instead of the id property, 
          since we're using an array of objects instead of an array of arrays. - ChatGPT*/}
        <FlatList
          numColumns={route.params.numColumns}
          key={route.params.numColumns}
          keyExtractor={(item, index) => index.toString()}
          data={route.params.data.flatMap((row) => row)}
          renderItem={({ item, index }) => <BoardItem item={item} index={index} onPress={() => clickHandler(item, index)} />}
        />
              <Button 
        title={'undo'}
        onPress={() => {
        undo();
        }}
      />

<Button 
        title={'redo'}
        onPress={() => {
        redo();
        }}
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
    //position: 'absolute',
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