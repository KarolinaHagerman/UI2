
import React, { useState} from 'react';
import { StyleSheet, View} from 'react-native';
import GameMenu from './GameMenu';
import {nextPlayer} from '../js/gameLogic';

import Timer from './Timer'
import Players from './Players'

/*
Header:
This is the component shown at the top of GameScreen
Composed of:
1) GameMenu: a drop down menu, location: tope left of the screen
2) Timer: a timer that counts down the active players time to make a move, location: top center of the screen
3) Players: shows all the players and which players turn it is to make a move, location: top right of the screen
*/

export default function Header({navigation, language, players, activePlayer, time, setActivePlayer, resetTime, setResetTime, colors}) {
    console.log('render header, activePlayer: ', activePlayer)
    const [headerFlex, setHeaderFlex] = useState(0);
    const [isMenuVisible, changeMenuVisibility] = useState(false);
 

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
  return ( 
    <View style={styles.menuContainer}>
        <GameMenu
        navigation={navigation}
        showMenu={showMenu}
        hideMenu={hideMenu}
        language={language}
        players={players}
        setActivePlayer = {setActivePlayer}
        activePlayer = {activePlayer}
        openCloseMenu={openCloseMenu}
        isVisible={isMenuVisible}
        setResetTime = {setResetTime}
        
        
        />

        <Timer time = {time} nextPlayer = {nextPlayer} setActivePlayer = {setActivePlayer} activePlayer = {activePlayer} players = {players} resetTime = {resetTime} setResetTime = {setResetTime}/>
        
        <Players players = {players} activePlayer = {activePlayer} colors = {colors}/>
    </View>


  );
}

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: "row",
        backgroundColor: 'rgba(255 ,255,255,1)',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        paddingRight: 5,
        justifyContent: 'space-between'
      },
  });