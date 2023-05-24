/** 
* File: Piece.jsx

* This file contains the JSX needed to create pieces that are placed on the squares in the gameboard

* Version 0.5
* Author: Karolina Hagerman, Erik Blomsterberg

*/

// Imports
//
import { useState, useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

/*
Piece:
The pieces displayed in the board items
*/
export default function Piece( { tileSize, color, player}) {

  // The initial value of the marker size, when the animation starts
  //
  const [scaleAnim] = useState(new Animated.Value(5))  // Initial value for scale: 0


  // A bouncing effect that happens once. This was created with the help from the React Native documentation.
  //
  useEffect(() => {
    Animated.spring(

      // Takes the initial size and changes it to a new size toValue. Friction makes the bouncing effect.
      //
      scaleAnim,
      {
        toValue: 1,
        friction: 3,
        useNativeDriver: true
      }
    ).start();
  }, [])

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      {/** Animated.View is what animated and Text is the player that clicked on the square */}
      <Text style={[styles.text, { color: color, fontSize: tileSize / 1.5, }]}>{player}</Text>
    </Animated.View>

  );
}

/**styles for the letter/piece */
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  }
})

//************
// END of file Piece.jsx
//************