import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';

export default function Timer({time, timeLeft, setTimeLeft, nextPlayer}) {

const [timeLeft, setTimeLeft] = useState(props.time);

//timer 
let timer = null;
useEffect(() => {
    timer = setTimeout(() => { 
    props.setTimeLeft(timeLeft - 1);
    if (timeLeft == 0){
        props.nextPlayer();
        props.setTimeLeft(props.time);
    }
    }, 1000) ;

    return () => clearInterval(timer);
}, [timeLeft]);

  return (
    
    <Text style={styles.time}>{props.timeLeft}</Text>
  );
}

const styles = StyleSheet.create({
    time: {
      fontSize: 30,
      color: 'black',
      position: 'relative',
      paddingTop: 5
    },
  });