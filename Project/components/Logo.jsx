/** 
* File: Logo.jsx

* This file contains the JSX needed to create logo on the starting page

* Version 0.5
* Author: Karolina Hagerman, Erik Blomsterberg

*/

// Imports
//
import { responsiveHeight, responsiveWidth, responsiveFontSize, useResponsiveHeight } from "react-native-responsive-dimensions";
import { useState, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';


/*
Logo:
The Logo XOZ displayed on the home screen.
*/
export default function Logo() {

  // The initial values for all animations used for logo
  //
  const [fadeAnimX] = useState(new Animated.Value(0));
  const [fadeAnimO] = useState(new Animated.Value(0));
  const [fadeAnimZ] = useState(new Animated.Value(0));
  const [slideAnimX] = useState(new Animated.Value(responsiveWidth(100)));
  const [slideAnimZ] = useState(new Animated.Value(responsiveWidth(-100)));
  const [slideAnimO] = useState(new Animated.Value(responsiveHeight(-100)));
  const [spinValueX] = useState(new Animated.Value(1));
  const [spinValueZ] = useState(new Animated.Value(1));


  //animations for X, O and Z
  //
  useEffect(() => {
    /* ANIMATION FOR LETTER X
    Parallell animations: 
        - fade in
        - slide in from right 
        - a looped rotation that ends with the value -0.035 which maps to a specific degree with interpolate later in the code
    useNativeDriver: false = default approach, useNativeDriver: true = React Native can retrieve and send all the animations frames at the same time, 
    so it happens in the UI
    */
    Animated.parallel([
      Animated.timing(fadeAnimX, {
        tovalue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(slideAnimX, {
        tovalue: 0,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.loop(
        Animated.timing(spinValueX, {
          toValue: -0.035,
          duration: 1000,
          useNativeDriver: true,
          isInteraction: false
        }),
        { iterations: 1 })
    ]).start(),

      /* ANIMATION FOR LETTER Z
      Parallell animations: 
          - fade in
          - slide in from left
          - a looped rotation that ends with the value 0.035 which maps to a specific degree with interpolate later in the code
      useNativeDriver: false = default approach, useNativeDriver: true = React Native can retrieve and send all the animations frames at the same time, 
      so it happens in the UI
      */
      Animated.parallel([
        Animated.timing(fadeAnimZ, {
          tovalue: 1,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true
        }),
        Animated.timing(slideAnimZ, {
          tovalue: 0,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true
        }),
        Animated.loop(
          Animated.timing(spinValueZ, {
            toValue: 0.035,
            duration: 1000,
            delay: 1000,
            useNativeDriver: true,
            isInteraction: false
          }),
          { iterations: 1 })
      ]).start(),

      /* ANIMATION FOR LETTER O
      Parallell animations: 
          - fade in
          - slide in from top
          (- rotation is not needed because the O is round)
      useNativeDriver: false = default approach, useNativeDriver: true = React Native can retrieve and send all the animations frames at the same time, 
      so it happens in the UI
      */
      Animated.parallel([
        Animated.timing(fadeAnimO, {
          tovalue: 1,
          duration: 1000,
          delay: 2000,
          useNativeDriver: true
        }),
        Animated.timing(slideAnimO, {
          tovalue: 0,
          duration: 1000,
          delay: 2000,
          useNativeDriver: true
        }),
      ],).start()
  }, [])

  // All elements presented to the user
  //
  return (
    <Animated.View style={styles.container}>

      {/** Letter X in logo */}
      <Animated.Text
        style={[
          styles.X,
          {
            transform: [

              // translateX tells us the X position of the object, e.g. 0 means it's placed in its original place, -50 means a bit to the left
              // In this case the position is an animated value, a slide animation. Which means it slides in along the X axis.
              //
              { translateX: slideAnimX },

              // Interpolate translates the input values from 0 to 1 to degrees 0 to 360
              // where e.g. 1 means 360 degrees.
              //
              {
                rotate: spinValueX.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })
              }
            ],

            // The opacity is an animated value, which means the opacity changes
            //
            opacity: fadeAnimX
          }]}>
        {'X'}
      </Animated.Text>

      {/** Letter O in logo */}
      <Animated.Text
        style={[
          styles.O,
          {
            transform: [

              // translateY tells us the Y position of the object in the same way as translateX does for X position.
              // In this case the position is an animated value, a slide animation. Which means it slides in along the Y axis.
              //
              { translateY: slideAnimO }
            ],

            // The opacity is an animated value, which means the opacity changes
            //
            opacity: fadeAnimO
          }
        ]}>
        {'O'}
      </Animated.Text>

      {/** Letter Z in logo */}
      <Animated.Text
        style={[
          styles.Z,
          {
            transform: [

              // translateX tells us the X position of the object, e.g. 0 means it's placed in its original place, -50 means a bit to the left
              // In this case the position is an animated value, a slide animation. Which means it slides in along the X axis.
              //
              { translateX: slideAnimZ },

              // Interpolate translates the input values from 0 to 1 to degrees 0 to 360
              // where e.g. 1 means 360 degrees.
              //
              {
                rotate: spinValueZ.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })
              }
            ],

            // The opacity is an animated value, which means the opacity changes
            //
            opacity: fadeAnimZ
          }
        ]}>
        {'Z'}
      </Animated.Text>
    </Animated.View>

  );
}


// Styles for the logo
//
const styles = StyleSheet.create({
  container: {
    alignItems: 'baseline',
    flexDirection: "row",
    alignSelf: 'center',
  },
  X: {
    fontSize: responsiveFontSize(12),
    fontFamily: 'bold',
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
    color: '#276180',
  }
})

//************
// END of file Logo.jsx
//************