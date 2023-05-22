/**
* File: Timer.jsx

* This file contains the JSX needed to create a timer 
* that counts down and resets the time that each player has to make a move

* Version 0.5
* Author: Karolina Hagerman, Erik Blomsterberg

* Requires the following files:

* GameLogic.js
*/

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { nextPlayer } from '../js/gameLogic';

export default function Timer({ time, setActivePlayer, activePlayer, players, resetTime, setResetTime, tutMode, language }) {
  //Initializes timeLeft, timeleft is initialized as the same value that was selected in NewGameScreen
  //
  const [timeLeft, setTimeLeft] = useState(time);
  //initializes timer let
  //
  let timer = null;

  // This effect is recursive, because it happens when timeLeft changes and inside the function timeLeft changes
  //
  useEffect(() => {

    // Creates a timer that runs a function every 1000 milliseconds
    //
    timer = setTimeout(() => {

      // Timer counts down
      //
      setTimeLeft(timeLeft - 1);

      // If the timer is 0, go to new player and reset time left with chosen time
      //
      if (timeLeft == 0) {
        nextPlayer(setActivePlayer, activePlayer, players);
        setTimeLeft(time);

        // If resetTime is true, e.g. after undo/redo or placing a marker, reset the time left and change back resetTime to false
        //
      } else if (resetTime) {
        setTimeLeft(time);
        setResetTime(false);
      }

    }, 1000);

    // Without this row new timers will be created, so clearInterval clears the timer
    //
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <Text style={[styles.time, timeLeft <= 3 ? styles.shortTime : styles.time]}>
    
      {/**shows the time left for a player to make a move*/}
      {tutMode && <Text>{language.Tutorial.timer}</Text>}
      {timeLeft}
    </Text>
  );
}

/**styles for the timer/seconds left */
const styles = StyleSheet.create({
  time: {
    fontSize: 30,
    color: 'black',
    position: 'relative',
    paddingTop: 5
  },
  shortTime: {
    color: 'red',
    fontWeight: 'bold',
  },
});

/* END of file Timer.jsx */

