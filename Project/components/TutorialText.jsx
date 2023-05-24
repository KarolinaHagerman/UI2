import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize, useResponsiveHeight } from "react-native-responsive-dimensions";
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const INITIAL_SCALE = 1; //Scale of the glow
const MINIMUM_SCALE = 0.95;
const DURATION = 2000;


export default function TutorialText({ language, activePlayer, players, colors, hasZoomed, hasMoved }) {

  const useMovingAnimation = () => {
    return useAnimatedStyle(() => ({
      transform: [
        {
          scale: withRepeat(
            withSequence(
              // Go to minimal value on half scaling duration
              withTiming(MINIMUM_SCALE, { duration: DURATION / 2 }),
              //and go to initial value during other half
              withTiming(INITIAL_SCALE, { duration: DURATION / 2 })
            ),
            // Loop the animation
            -1,
            // Loop in both direction (small=> big, big => small)
            true
          ),
        },
      ],
    }));
  };

  const movingAnimation = useMovingAnimation();


  return (
    <View >
      <Animated.View style={[styles.container, movingAnimation]}>

        <Text style={styles.infoText}>
          {!hasZoomed && !hasMoved &&
            <Text>{language.Tutorial.zoom}</Text>
          }

          {hasZoomed && !hasMoved &&
            <Text>{language.Tutorial.move}</Text>
          }

          {hasZoomed && hasMoved &&
            <Text>{language.Tutorial.turn1}<Text style={[styles.activePlayer, { color: colors[activePlayer] }]}>{language.Tutorial.turn2}{players[activePlayer]}</Text>{language.Tutorial.turn3}</Text>
          }
        </Text>

      </Animated.View>
    </View>

  );
}

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