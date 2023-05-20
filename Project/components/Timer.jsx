import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { nextPlayer } from '../js/gameLogic';

/*
Timer:
a timer located in the center of the header. Counts down the time to make a move,
resets when a player makes a move or if time runs out. 
The timer switches whos turn it is to make a move when a player runs out of time.
*/
export default function Timer({ time, setActivePlayer, activePlayer, players, resetTime, setResetTime, tutMode, language }) {

  const [timeLeft, setTimeLeft] = useState(time);

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
      {tutMode && <Text>{language.Tutorial.timer}</Text>}
      {timeLeft}
    </Text>
  );
}

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