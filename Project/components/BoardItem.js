import React, { PureComponent, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';

//screenWidth = Dimensions.get("window").width;
//numColumns = this.props.numColumns;
let tileSize = 100;
// PureComponent automatically implements a "shouldComponentUpdate" method that performs a 
// shallow comparison of the props and state of the component to determine if it needs to re-render. - ChatGPT
export default class BoardItem extends PureComponent {
  

  onPress = () => {
    this.props.onPress(this.props.item);
    //console.log(this.props.boardData);
  };

  render() {
    //console.log(this.props.boardData[2]);

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.boardItem}>
          {this.props.item.isClicked && <Text>{this.props.item.player}</Text>}
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
    boardItem: {
      alignItems: "center",
      height: tileSize,
      width: tileSize,
      backgroundColor: 'white',
      margin: 1,
    }
  });