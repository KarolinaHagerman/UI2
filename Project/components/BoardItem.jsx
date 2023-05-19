import React, {useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Animated } from 'react-native';
import { checkNinRow, nextPlayer} from '../js/gameLogic';
import Piece from './Piece'
//import { vh } from 'react-native-viewport-units';
//screenWidth = Dimensions.get("window").width;
//numColumns = this.props.numColumns;
// PureComponent automatically implements a "shouldComponentUpdate" method that performs a 
// shallow comparison of the props and state of the component to determine if it needs to re-render. - ChatGPT
export default function BoardItem ({ setResetTime, setActivePlayer, item, tileSize, data, players, activePlayer, piecesToWin, colors}) {
  console.log('redl ass color: ', item.color)


   // setThisItem(item)
    //this.props.onPress(this.props.item);
    //console.log(this.props.boardData);
 // };
 
    //console.log(this.props.boardData[2]);
    //const tileSize = tileSize;
    const onPress = () => {
      console.log('Player ', players[activePlayer], ' with index ', activePlayer, ' clicked on ', item.id, 'item color: ', item.color);
      if (!item.isClicked) {
      item.isClicked = true;
      item.color = colors[activePlayer];
      checkNinRow(data, item, players[activePlayer], piecesToWin);
      nextPlayer(setActivePlayer, activePlayer, players);
      setResetTime(true);
      }
  }
    return (
      <TouchableOpacity onPress = {onPress}  >
        <View style={[styles.boardItem, {height: tileSize, width: tileSize} ]}>
          {item.isClicked && <Piece tileSize = {tileSize} color = {item.color} player = {item.player}/>}
        </View>
      </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    boardItem: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      margin: 1,
    },

  });