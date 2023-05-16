import React, { PureComponent, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';
//import { vh } from 'react-native-viewport-units';
//screenWidth = Dimensions.get("window").width;
//numColumns = this.props.numColumns;
// PureComponent automatically implements a "shouldComponentUpdate" method that performs a 
// shallow comparison of the props and state of the component to determine if it needs to re-render. - ChatGPT
export default class BoardItem extends PureComponent {
 

  onPress = () => {
    this.props.onPress(this.props.item);
    //console.log(this.props.boardData);
  };

  render() {
    //console.log(this.props.boardData[2]);
    const tileSize = this.props.tileSize;
    //console.log('tile size: ', this.props.tileSize)
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={[styles.boardItem, {height: tileSize, width: tileSize} ]}>
          {this.props.item.isClicked && <Text>{this.props.item.player}</Text>}
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
    boardItem: {
      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: 'white',
      margin: 1,
    }
  });