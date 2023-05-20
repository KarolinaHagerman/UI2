
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from "react-native-popup-menu";
import Header from '../components/Header';
import Board from '../components/Board';
import WinnerModal from '../components/WinnerModal';
import MovableView from 'react-native-movable-view';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import ZoomMoveTut from '../components/ZoomMoveTut';
import TutorialText from '../components/TutorialText';

/*
GameScreen: 
This is the screen that shows when starting a game
Composed of:
1) Header: contains a menu, timer and players, location: top of the screen
2) Board: contains the game board, location: the whole screen except for header
*/
export default function GameScreen({ navigation, route }) {
  const { language, piecesToWin, players, time, data, numColumns, tutorialMode, colors } = route.params;
  const [activePlayer, setActivePlayer] = useState(0);
  const [resetTime, setResetTime] = useState(false);
  const [hasTutZoomed, setHasTutZoomed] = useState(false);
  const [hasTutMoved, setHasTutMoved] = useState(false);
  const [tutMode, setTutMode] = useState(getTutMode(tutorialMode));

  // Translate tutorialMode
  //
  function getTutMode(tutModeText){
    let tutMode = false;
    if (tutModeText == 'On') {
      tutMode = true;
    }
    return tutMode;
  }

  function restartTut(){
    setHasTutMoved(false);
    setHasTutZoomed(false);
  }

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
          minZoom={1}
          onZoomAfter={() => setHasTutZoomed(true)}
          initialZoom={1}
        >
          <MovableView
            onDragEnd={() => setHasTutMoved(true)}
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