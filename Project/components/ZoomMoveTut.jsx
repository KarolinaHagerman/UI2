import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { responsiveHeight, responsiveWidth, useResponsiveHeight } from 'react-native-responsive-dimensions';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const INITIAL_SCALE = 1;
const MINIMUM_SCALE = 0.95;
const DURATION = 2000;
const IMAGE_SIZE = '80%';

export default function ZoomMoveTut({ hasZoomed, hasMoved }) {

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
    <View>
      {(!hasZoomed || !hasMoved) &&
        <Animated.View style={[styles.container, movingAnimation]}>
          <View style={styles.symbol}>
            {!hasZoomed && !hasMoved &&
              <Image
                source={require('../images/zoom.png')}
                style={styles.image}
              />
            }

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
