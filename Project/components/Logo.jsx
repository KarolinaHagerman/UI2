/** 
* File: Piece.jsx

* This file contains the JSX needed to create logo on the starting page

* Version 0.5
* Author: Karolina Hagerman, Erik Blomsterberg

*/

// Imports
//
import { responsiveHeight, responsiveWidth, responsiveFontSize, useResponsiveHeight } from "react-native-responsive-dimensions";
import { useState, useEffect } from 'react';
import { Text, StyleSheet, Animated, View } from 'react-native';


/*
Logo:
The Logo XOZ displayed on the home screen.
*/
export default function Logo() {

        // The initial values for all animations used for logo
        //
        const [fadeAnimX] = useState(new Animated.Value(0))
        const [fadeAnimO] = useState(new Animated.Value(0))
        const [fadeAnimZ] = useState(new Animated.Value(0))
        const [slideAnimX] = useState(new Animated.Value(responsiveWidth(100)))
        const [slideAnimZ] = useState(new Animated.Value(responsiveWidth(-100)))
        const [slideAnimO] = useState(new Animated.Value(responsiveHeight(-100)))
        const [spinValueX] = useState(new Animated.Value(1));
        const [spinValueZ] = useState(new Animated.Value(1));


        //animations for X, O and Z
        //
        useEffect(() => {
                //makes letter X simuntainesly fade in, rotate and slide in from the left
                //
                Animated.parallel([Animated.timing(fadeAnimX,{tovalue: 1, duration: 1000, useNativeDriver: true}),
                                   Animated.timing(slideAnimX,{tovalue: 1, duration: 1000, useNativeDriver: true}),
                                   Animated.loop(Animated.timing(spinValueX,{toValue: -0.035, duration: 1000, useNativeDriver: true, isInteraction: false}), {iterations: 1})
                                ]).start(),  

                //makes letter Z simuntainesly fade in, rotate and slide in from the right
                //             
                Animated.parallel([Animated.timing(fadeAnimZ,{tovalue: 1, duration: 1000, delay: 1000, useNativeDriver: true}),
                                   Animated.timing(slideAnimZ,{tovalue: 0, duration: 1000, delay: 1000, useNativeDriver: true}),
                                   Animated.loop(Animated.timing(spinValueZ,{toValue: 0.035, duration: 1000, delay: 1000, useNativeDriver: true, isInteraction: false}), {iterations: 1})
                                ]).start(),

                //makes letter O simuntainesly fade in and slide in from the top
                //
                Animated.parallel([Animated.timing(fadeAnimO,{tovalue: 1, duration: 1000, delay: 2000, useNativeDriver: true}),
                                   Animated.timing(slideAnimO,{tovalue: 0, duration: 1000, delay: 2000, useNativeDriver: true}),
                                ],).start()
        }, [])

  return (
    <Animated.View style = {styles.container}>
      {/**letter X in logo */}
      <Animated.Text style = {[styles.X, {transform: [{translateX: slideAnimX}, { rotate: spinValueX.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg'],}) }], opacity: fadeAnimX }]}>{'X'}</Animated.Text>
      {/**letter O in logo */}
      <Animated.Text style = {[styles.O, {transform: [{translateY: slideAnimO}], opacity: fadeAnimO }]}>{'O'}</Animated.Text>
      {/**letter Z in logo */}
      <Animated.Text style = {[styles.Z, {transform: [{translateX: slideAnimZ}, { rotate: spinValueZ.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg'],}) }], opacity: fadeAnimZ }]}>{'Z'}</Animated.Text>
    </Animated.View>

  );
}


/**styles for the logo */
const styles = StyleSheet.create({
  container: {
    alignItems: 'baseline',
    flexDirection: "row",
    alignSelf: 'center',
  },
  X: {
    fontSize: responsiveFontSize(12),
    fontFamily: 'bold',
    transform: [{ rotate: '-12deg'}],
    color: '#C2933F',
  },
    O: {
    fontSize: responsiveFontSize(20),
    fontFamily: 'bold',
    color: '#294725',
    },
    Z: {
    fontSize: responsiveFontSize(12),
    fontFamily: 'bold',  
    transform: [{ rotate: '12deg'}],
    color: '#276180',
    }
})


  /* END of file Piece.jsx */