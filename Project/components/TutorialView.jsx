import { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize, useResponsiveHeight } from "react-native-responsive-dimensions";
import Animated, {useAnimatedStyle,withRepeat,withSequence,withTiming} from 'react-native-reanimated';


export default function Tutorial({ language, activePlayer, players, colors }) {


  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>{language.TutorialView.turn1}{players[activePlayer]}{language.TutorialView.turn2}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: '5%',
  },
  infoText: {
    fontSize: responsiveFontSize(2),
  },
})