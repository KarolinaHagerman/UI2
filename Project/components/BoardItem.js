import React, { PureComponent, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

// PureComponent automatically implements a "shouldComponentUpdate" method that performs a 
// shallow comparison of the props and state of the component to determine if it needs to re-render. - ChatGPT
export default class BoardItem extends PureComponent {
  state = {
    isClicked: false,
  }

  onPress = () => {
    this.props.onPress(this.props.item);
    this.state.isClicked = true;
  };

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.boardItem}>
          {this.state.isClicked && <Text>{this.props.playerClicked}</Text>}
        </View>
      </TouchableOpacity>
    );
  }

  
}

const styles = StyleSheet.create({
    boardItem: {
      padding: 30,
      backgroundColor: 'white',
      margin: 1,
    }
  });