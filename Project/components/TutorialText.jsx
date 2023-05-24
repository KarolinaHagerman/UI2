/** 
* File: TutorialText.jsx

* This file contains the JSX needed to create the text displayed in the tutorial view.

* Version 0.5
* Author: Karolina Hagerman, Erik Blomsterberg

*/

// Imports
//
import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize, useResponsiveHeight } from "react-native-responsive-dimensions";
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const INITIAL_SCALE = 1; //Scale of the glow
const MINIMUM_SCALE = 0.95;
const DURATION = 2000;

/*
TutorialText:
The text displayed in the view, only showed if tutorial mode is on
*/
export default function TutorialText({ language, activePlayer, players, colors, hasZoomed, hasMoved, hasWinner, winner, winnerColor }) {

  // A react hook of the moving animation that makes the view do a pulsing motion: bigger-smaller
  //
  const useMovingAnimation = () => {
    return useAnimatedStyle(() => ({

      // An array of transform function, in this case only scale.
      transform: [
        {
          scale: withRepeat(
            withSequence(

              // Go to minimal value on half scaling duration
              //
              withTiming(MINIMUM_SCALE, { duration: DURATION / 2 }),

              // and go to initial value during other half
              //

              withTiming(INITIAL_SCALE, { duration: DURATION / 2 })
            ),

            // How many times we repeat the animation. -1 means infinite loop
            //
            -1,

            // Loop in both direction (small=> big, big => small): true
            //
            true
          ),
        },
      ],
    }));
  };

  const movingAnimation = useMovingAnimation();

  // All elements presented to the user
  // 
  return (
    <View >
      <Animated.View style={[styles.container, movingAnimation]}>

        {/* Different texts are shown depending on if the user has zoomed or dragged yet */}
        <Text style={styles.infoText}>

          {/* Before zooming */}
          {!hasZoomed && !hasMoved && !hasWinner &&
            <Text>{language.Tutorial.zoom}</Text>
          }

          {/* After zooming, before dragging */}
          {hasZoomed && !hasMoved && !hasWinner &&
            <Text>{language.Tutorial.move}</Text>
          }

          {/* After zooming and dragging */}
          {hasZoomed && hasMoved && !hasWinner &&
            <Text>{language.Tutorial.turn1}<Text style={[styles.activePlayer, { color: colors[activePlayer] }]}>{language.Tutorial.turn2}{players[activePlayer]}</Text>{language.Tutorial.turn3}</Text>
          }

          {/* When we have a winner */}
          {hasWinner &&
            <Text>{language.Tutorial.ifWinner1}{language.WinnerModal.winnerIs}<Text style={[styles.activePlayer, { color: winnerColor }]}>{language.Tutorial.turn2}{winner}</Text>{language.WinnerModal.goBack}</Text>
          }
        </Text>

      </Animated.View>
    </View>

  );
}

// Styles for the header
//
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '1%',
    width: responsiveWidth(98),
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: '#FFF786',
  },

  infoText: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
  },
  activePlayer: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: 'bold',
  }
})