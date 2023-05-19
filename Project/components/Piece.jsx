import React, {useState } from 'react';
import {Text, StyleSheet, Animated } from 'react-native';


export default function Piece (props) {

    const [scaleAnim] = useState(new Animated.Value(5))  // Initial value for scale: 0

    React.useEffect(() => {
      Animated.spring(
        scaleAnim,
        {
          toValue: 1,
          friction: 3,
          useNativeDriver: true
        }
      ).start();
    }, [])
    console.log('color : ', props)
    return(
        <Animated.View style = {{transform: [{scale: scaleAnim}]}}>
            <Text style = {[styles.text, {color: props.color, fontSize: props.tileSize/1.5, }]}>{props.player}</Text>
        </Animated.View>

    );
}

const styles = StyleSheet.create({
    text: {

        fontWeight: 'bold',
      }
})