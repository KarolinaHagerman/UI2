/**
 * File: SoundContext.js
 *
 * This file contains the javaScript needed for the sound in the app.
 *
 * Version ???
 * Author: Karolina Hagerman, Erik Blomsterberg
 */

// Imports
//
import { createContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  // Create states for sound on and for background music
  //
  const [soundOn, setSoundOn] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState(null);

  // This function was created with the help of ChatGPT. It's responsible for playing and stopping the background music based on the soundOn state.
  //  
  const playBackgroundMusic = async () => {

    // If sound is on and if the background music isn't already playing we create a new soundObject with the background music. 
    //
    if (soundOn && !backgroundMusic) {
      const soundObject = new Audio.Sound();
      try {

        // The mp3 is loaded and prepared for playback
        //
        await soundObject.loadAsync(require('../sounds/background.mp3'));

        // Sets an update callback function for the playback status
        //
        await soundObject.setOnPlaybackStatusUpdate(async (status) => {

          // If sounds is loaded and has already finished we unload the audio from the sound object and the background music i set to null.
          //
          if (status.isLoaded && status.didJustFinish) {
            await soundObject.unloadAsync();
            setBackgroundMusic(null);
          }
        });

        // Start playing and setBackgroundMusic to the soundObject
        // 
        await soundObject.playAsync();
        setBackgroundMusic(soundObject);
      } catch (error) {
        console.log('Failed to play the sound', error);
      }

      // If sound is off or if the background music is already playing we stop the music, unload the audio file and set the backgroundMusic to null
    } else if (!soundOn && backgroundMusic) {
      await backgroundMusic.stopAsync();
      await backgroundMusic.unloadAsync();
      setBackgroundMusic(null);
    }
  };

  // This function toggles the soundOn state
  //
  const toggleSound = () => {
    setSoundOn(!soundOn);
  };

  //Needed variables and function are passed so that they can be accessed from the components that import the sound context
  //
  return (
    <SoundContext.Provider value={{ soundOn, toggleSound, playBackgroundMusic, backgroundMusic }}>
      {children}
    </SoundContext.Provider>
  );
};

