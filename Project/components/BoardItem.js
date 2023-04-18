import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// PureComponent automatically implements a "shouldComponentUpdate" method that performs a 
// shallow comparison of the props and state of the component to determine if it needs to re-render. - ChatGPT
export default class BoardItem extends PureComponent {
  onPress = () => {
    this.props.onPress(this.props.item);
  };

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text style={styles.boardItem}></Text>
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