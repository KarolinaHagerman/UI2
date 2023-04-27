import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity, Modal } from 'react-native';
import GameMenu from '../components/GameMenu';
import BoardItem from '../components/BoardItem';
import { checkNinRow, undoBoard, redoBoard, madeMoves, unmadeMoves } from 'C:/Users/hager/OneDrive/Dokument/UI Programming II/Project/js/gameLogic';

export default function GameScreen({ navigation, route }) {
  const { language, piecesToWin, players, time, data, numColumns } = route.params;
  console.log('totplayers gamescreeeeeeen:', players)
  const [activePlayer, setActivePlayer] = useState(0);
  const [headerFlex, setHeaderFlex] = useState(0);
  const [isMenuVisible, changeMenuVisibility] = useState(false);

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

  // Sets the header flex back to normal - boardItems clickable again and menu can't stretch
  const openCloseMenu = () => {
    console.log('isMenuVisible', isMenuVisible, !isMenuVisible);

    // Show menu if not shown already
    if (isMenuVisible) {
      setHeaderFlex(0);
    }
    else {
      setHeaderFlex(1);
    }
    console.log('headerFlex', headerFlex);
    changeMenuVisibility(!isMenuVisible);
  }

  // Decides what happens when you click on a grid item, useCallback to try and speed things up
  const clickHandler = useCallback((item, index) => {
    console.log('Player ', players[activePlayer], ' with index ', activePlayer, ' clicked on ', item.id);
    if (!item.isClicked) {
      item.isClicked = true;
      checkNinRow(data, item, players[activePlayer], piecesToWin);
      nextPlayer();
    }
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

  // Goes back one step in player loop
  const undoPlayer = () => {
    if (madeMoves.length > 0) {
      if (activePlayer <= 0) {
        setActivePlayer(players.length - 1);
      }
      else {
        setActivePlayer(activePlayer - 1);
      }
    }
  }

  // Calls on next player only if undo's are done
  const redoPlayer = () => {
    if(unmadeMoves.length > 0) {
      nextPlayer();
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
          openCloseMenu={openCloseMenu}
          isVisible={isMenuVisible}
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
              boardData={data}
              onPress={() => clickHandler(item, index)}
            />}
        />
        <Button
          title={'undo'}
          onPress={() => {
            undoBoard();
            undoPlayer();
          }}
        />

        <Button
          title={'redo'}
          onPress={() => {
            redoBoard();
            redoPlayer();
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 2,
    position: 'relative',
    backgroundColor: 'orange',
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
  player: {
    fontSize: 20,
    color: 'blue',
  },
  activePlayer: {
    fontSize: 30,
    fontWeight: 'bold',

  },
});