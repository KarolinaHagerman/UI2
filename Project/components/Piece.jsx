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
export default function Piece({ tileSize, color, player, isOccupied, setIsOccupied }) {

  // The initial value of the marker size gives the impression that it is places from 'above' the screen
  //
  const [scaleAnim] = useState(new Animated.Value(5));
  const [rotate] = useState(new Animated.Value(0));

  // A bouncing effect that happens once. This was created with the help from the React Native documentation.
  //
  useEffect(() => {

    // Takes the initial size and changes it to a new size toValue. Friction makes the bouncing effect.
    //
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true
    }).start();
  }, [])

  // This animation is called when isOccupied is changed to true
  //
  useEffect(() => {
    if (isOccupied) {
      Animated.sequence([
        Animated.timing(rotate, {
          toValue: 0.05,
          duration: 100,
          delay: 0,
          useNativeDriver: true,
          isInteraction: false
        }),
        Animated.timing(rotate, {
          toValue: -0.05,
          duration: 100,
          delay: 0,
          useNativeDriver: true,
          isInteraction: false
        }),
        Animated.timing(rotate, {
          toValue: 0,
          duration: 100,
          delay: 0,
          useNativeDriver: true,
          isInteraction: false
        }),
      ]).start();
    }

    // After the animation we change isOccupied back to false, so the same thing can happen again with the same piece
    //
    setIsOccupied(false);
  }, [isOccupied])

  // All elements presented to the user
  //
  return (
    // Animated.View is what animated and Text is the player that clicked on the square
    //
    <Animated.View style={{
      transform: [
        {
          scale: scaleAnim
        },
        {
          // Interpolate translates the input values from 0 to 1 to degrees 0 to 360
          // where e.g. 1 means 360 degrees.
          //
          rotate: rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          })
        },]
    }}>
      <Text style={[styles.text, { color: color, fontSize: tileSize / 1.5, }]}>{player}</Text>
    </Animated.View>

  );
}

// Styles for piece
//
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  }
})

//************
// END of file Piece.jsx
//************