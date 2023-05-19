import { useState, useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';


export default function Piece(props) {


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
      <Text style={[styles.text, { color: props.color, fontSize: props.tileSize / 1.5, }]}>{props.player}</Text>
    </Animated.View>

  );
}

const styles = StyleSheet.create({
  text: {

    fontWeight: 'bold',
  }
})