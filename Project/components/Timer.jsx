import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import {nextPlayer} from '../js/gameLogic';

/*
Timer:
a timer located in the center of the header. Counts down the time to make a move,
resets when a player makes a move or if time runs out. 
The timer switches whos turn it is to make a move when a player runs out of time.
*/
export default function Timer({time, setActivePlayer, activePlayer, players, resetTime, setResetTime}) {

const [timeLeft, setTimeLeft] = useState(time);

let timer = null;
useEffect(() => {
    timer = setTimeout(() => { 
    setTimeLeft(timeLeft - 1);
    if (timeLeft == 0){
        nextPlayer(setActivePlayer, activePlayer, players);
        setTimeLeft(time);
    } else if (resetTime){
        setTimeLeft(time);
        setResetTime(false);
    }
    
    }, 1000) ;

    return () => clearInterval(timer);
}, [timeLeft]);

  return (
    
    <Text style={[styles.time, timeLeft <= 3 ? styles.shortTime : styles.time]}>{timeLeft}</Text>
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
      color: 'red'
    },
  });