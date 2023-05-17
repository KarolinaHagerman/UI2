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
    if (soundOn) {
      if (backgroundMusic) {
        // If there's already a background music playing, unload it first
        await backgroundMusic.stopAsync();
        await backgroundMusic.unloadAsync();
        setBackgroundMusic(null);
      }

      // Create a new sound object and load the background music
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require('../sounds/background.mp3'));
        await soundObject.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded && status.didJustFinish) {
            await soundObject.unloadAsync();
            setBackgroundMusic(null);
          }
        });
        await soundObject.playAsync();
        setBackgroundMusic(soundObject);
      } catch (error) {
        console.log('Failed to play the sound', error);
      }
    } else if (!soundOn && backgroundMusic) {
      // If sound is turned off and there's background music playing, stop and unload it
      await backgroundMusic.stopAsync();
      await backgroundMusic.unloadAsync();
      setBackgroundMusic(null);
    }
  }

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

