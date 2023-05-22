/*
File: GameScreen.js

This file contains the JSX needed to create 
1) a header; containing a menu, timer and players
2) a game board

Version 0.5
Author: Karolina Hagerman, Erik Blomsterberg

Requires the following files:

Header.jsx
Board.jsx
WinnerModal.jsx

*/

import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { MenuProvider } from "react-native-popup-menu";
import Header from '../components/Header';
import Board from '../components/Board';
import WinnerModal from '../components/WinnerModal';
import MovableView from 'react-native-movable-view';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import ZoomMoveTut from '../components/ZoomMoveTut';
import TutorialText from '../components/TutorialText';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


export default function GameScreen({ navigation, route }) {

  // Passed values from New game screen
  //
  const { language, piecesToWin, players, time, data, numColumns, tutorialMode, colors } = route.params;

  // New state values for the active player and if the timer should be reset or not
  //
  const [activePlayer, setActivePlayer] = useState(0);
  const [resetTime, setResetTime] = useState(false);

  // Tutorial mode states that decide what will be shown for the user in tutorial mode
  //
  const [hasTutZoomed, setHasTutZoomed] = useState(false);
  const [hasTutMoved, setHasTutMoved] = useState(false);
  const [tutMode, setTutMode] = useState(getTutMode(tutorialMode));

  // Translate tutorialMode from 'On'/'Off' to true/false
  //
  function getTutMode(tutModeText) {
    let tutMode = false;
    if (tutModeText == 'On') {
      tutMode = true;
    }
    return tutMode;
  }

  // Reset the hasTutMoved and hasTutZoomed, this i called when we change if tutorial mode is on or not in the game menu
  //
  function restartTut() {
    setHasTutMoved(false);
    setHasTutZoomed(false);
  }


  // Fonts, can be downloaded from e.g. https://www.dafont.com/ and added to fonts folder
  //
  const [fontsLoaded] = useFonts({
    'oxfordStreet': require('../fonts/OxfordStreet.ttf'),
    'bold': require('../fonts/THEBOLDFONT.ttf'),
  });

  // ---------------------------------------------------------------
  // The following useEffect was explained in https://www.youtube.com/watch?v=viIkcDYSBrI and is used to load the fonts.
  // This hook is used to tell React to do prepare after rendering
  //
  useEffect(() => {
    async function prepare() {
      // Keeps the splash screen visible until we call hideAsync
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  }
  else {
    //Hides the native splash screen immediately - Expo Documentation
    SplashScreen.hideAsync();
  }
  // ------------------- Ending of the named code ----------------------

  return (
    <SafeAreaView style={[styles.container]}>
      <MenuProvider>
        <View style={{ zIndex: 2 }}>
          <Header
            navigation={navigation}
            language={language}
            players={players}
            activePlayer={activePlayer}
            time={time}
            setActivePlayer={setActivePlayer}
            resetTime={resetTime}
            setResetTime={setResetTime}
            colors={colors}
            tutMode={tutMode}
            setTutMode={setTutMode}
            restartTut={restartTut}
            fontsLoaded={fontsLoaded}
          />

          {tutMode &&
            <TutorialText
              language={language}
              activePlayer={activePlayer}
              players={players}
              colors={colors}
              hasZoomed={hasTutZoomed}
              hasMoved={hasTutMoved}
            />
          }
          {tutMode &&
            <ZoomMoveTut
              hasZoomed={hasTutZoomed}
              hasMoved={hasTutMoved}
            />
          }

        </View>

        <ReactNativeZoomableView
          zoomEnabled={true}
          maxZoom={10}
          minZoom={0.13}
          onZoomAfter={() => setHasTutZoomed(true)}
          initialZoom={1}
        >
          <MovableView
            onDragEnd={() => {
              if (hasTutZoomed) {
                setHasTutMoved(true);
              }
            }}
          >
            <Board
              numColumns={numColumns}
              data={data}
              players={players}
              activePlayer={activePlayer}
              piecesToWin={piecesToWin}
              setActivePlayer={setActivePlayer}
              setResetTime={setResetTime}
              colors={colors}
            />
          </MovableView>
        </ReactNativeZoomableView>


        <WinnerModal />
      </MenuProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262723',
  },
});


/* END of file GameScreen.js */