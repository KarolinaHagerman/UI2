/*
File: ZoomMoveTut.jsx

This file contains the JSX needed to create a pulsing circle with differet tutorial images in the middle of the screen.

Version 0.5
Author: Karolina Hagerman, Erik Blomsterberg

*/

// Imports
//
import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { responsiveHeight, responsiveWidth, useResponsiveHeight } from 'react-native-responsive-dimensions';

// Constants for the animation
//
const INITIAL_SCALE = 1;
const MINIMUM_SCALE = 0.95;
const DURATION = 2000;

const IMAGE_SIZE = '80%';

/*
ZoomMoveTut:
A circle in the middle of the screen with images showing tutorial things
*/
export default function ZoomMoveTut({ hasZoomed, hasMoved, hasWinner }) {

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
    <View>

      {/* Circle is only shown unless we have a winner and if we either haven't zoomed or dragged on the screen. */}
      {!hasWinner && (!hasZoomed || !hasMoved) &&
        <Animated.View style={[styles.container, movingAnimation]}>
          <View style={styles.symbol}>

            {/* A zoom image is shown if you haven't zoomed or moved. */}
            {!hasZoomed && !hasMoved &&
              <Image
                source={require('../images/zoom.png')}
                style={styles.image}
              />
            }

            {/* A drag image is shown if you have zoomed but not yet moved. */}
            {hasZoomed && !hasMoved &&
              <Image
                source={require('../images/move.png')}
                style={styles.image}
              />
            }

          </View>
        </Animated.View>
      }
    </View>

  );
};

// Styles zoom move tut
//
const styles = StyleSheet.create({
  image: {
    height: IMAGE_SIZE,
    aspectRatio: 1 / 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: responsiveHeight(35),
    backgroundColor: '#FFF786',
    opacity: 0.9,
    width: responsiveWidth(50),
    aspectRatio: 1 / 1,
    borderRadius: '100%',
  },
  symbol: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
