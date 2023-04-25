import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity, Modal } from 'react-native';
import GameMenu from '../components/GameMenu';
import BoardItem from '../components/BoardItem';
import { checkNinRow } from '../gameLogic';

export default function GameScreen({ navigation, route }) {
  const { language, piecesToWin, totPlayers, time } = route.params;

  // Get the player with players[activePlayer]
  const players = ['X', 'O', 'Y', 'Z'];
  const [activePlayer, setActivePlayer] = useState(0);
  const [headerFlex, setHeaderFlex] = useState(0);

  /*   TODO: it's still very slow if I increase numColumns. 
    Have tried useCallback (here) and PureComponent (BoardItem.js). 
    Other things to try is VirtualizedList instead of FlatList:
     the app will only render the items that are currently visible on the screen, 
     which can improve the performance significantly. - ChatGPT */
  const numColumns = 30;

  // Lets the header flex over the entire board while the menu is shown - boardItems not clickable and menu can stretch down
  // TODO: still problem with the menu not stretching over the borders of the other flexitems (scores and playerTurn)
  const showMenu = () => {
    setHeaderFlex(1);
  }

  // Sets the header flex back to normal - boardItems clickable again and menu can't stretch
  const hideMenu = () => {
    setHeaderFlex(0);
  }

  // Returns data on the form (this example is a 3x3 board):
  /*   [
    [{ id: '0-0', row: 0, col: 0, isClicked: false, player: null  }, { id: '0-1', row: 0, col: 1, isClicked: false, player: null  }, { id: '0-2', row: 0, col: 2, isClicked: false, player: null  }],
    [{ id: '1-0', row: 1, col: 0, isClicked: false, player: null  }, { id: '1-1', row: 1, col: 1, isClicked: false, player: null  }, { id: '1-2', row: 1, col: 2, isClicked: false, player: null }],
    [{ id: '2-0', row: 2, col: 0, isClicked: false, player: null  }, { id: '2-1', row: 2, col: 1, isClicked: false, player: null  }, { id: '2-2', row: 2, col: 2, isClicked: false, player: null }],
  ]; */
  const initializeBoardData = () => {
    let boardData = [];
    for (let i = 0; i < numColumns; i++) {
      let row = [];
      for (let j = 0; j < numColumns; j++) {
        let boardObject = { id: i + '-' + j, row: i, col: j, isClicked: false, player: null }
        row.push(boardObject);
      }
      boardData.push(row);
    }
    //TODO: denna log indikerar att initializeBoardData körs varje gång man klickar, så vill vi inte ha det!
    //console.log(boardData);
    return boardData;
  }

  const data = initializeBoardData();

  // Decides what happens when you click on a grid item, useCallback to try and speed things up
  const clickHandler = useCallback((item, index) => {
    console.log('Player ', players[activePlayer], ' with index ', activePlayer, ' clicked on ', item.id);
    item.isClicked = !item.isClicked;
    checkNinRow(data, item, players[activePlayer], piecesToWin);
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
          navigation={navigation}
          showMenu={showMenu}
          hideMenu={hideMenu}
          language={language}
          players={players}
        />

        <Text style={styles.scores}>{language.GameScreen.scores}</Text>
        <View style={styles.playerTurn}>
          {players.map((player, index) => (
            <Text key={index} style={[styles.player, players[activePlayer] === player ? styles.activePlayer : null]} >{player}</Text>
          ))}
        </View>
      </View>

      <View style={styles.body}>

        {/* FLATLIST DÄR DATAN ÄR EN MATRIS MED OBJEKT */}
        {/* Here, we're using the flatMap() method to flatten the two-dimensional data 
          array into a one-dimensional array, which can be used as the data prop for the FlatList. 
          We're also using the index parameter of the keyExtractor function instead of the id property, 
          since we're using an array of objects instead of an array of arrays. - ChatGPT*/}
        <FlatList
          numColumns={numColumns}
          key={numColumns}
          keyExtractor={(item, index) => index.toString()}
          data={data.flatMap((row) => row)}
          renderItem={({ item, index }) =>
            <BoardItem
              item={item}
              index={index}
              playerClicked={players[activePlayer]}
              onPress={() => clickHandler(item, index)}

            />}
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
    color: 'white',
    padding: 20,
  },
  playerTurn: {
    backgroundColor: 'gold',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  gameMenu: {
  },
  player: {
    fontSize: 20,
    color: 'blue',
  },
  activePlayer: {
    fontSize: 30,
    fontWeight: 'bold',

  },
});