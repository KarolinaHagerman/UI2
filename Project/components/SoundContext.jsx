/**
 * File: SoundContext.jsx
 *
 * This file contains the JSX needed for the sound in the app.
 *
 * Version 0.5
 * Author: Karolina Hagerman, Erik Blomsterberg
 */

// Imports
//
import { createContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';

/*
SoundContext:
The sound context in the app
*/
export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {

  // Create states for sound on and for different sounds
  //
  const [soundOn, setSoundOn] = useState(false);
  const [soundEffectsOn, setSoundEffectsOn] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState(null);
  const [placePiece, setPlacePiece] = useState(null);
  const [occupied, setOccupied] = useState(null);

  // This function toggles the states for the sound. This is called when we change all the sound together.
  //
  const toggleSound = () => {

    if (soundOn) {
      setMusicOn(false);
      setSoundEffectsOn(false);
    }
    else {
      setMusicOn(true);
      setSoundEffectsOn(true);
    }
    setSoundOn(!soundOn);
  };

  // This function toggles the musicOn, which means 
  //
  const toggleMusic = () => {
    setMusicOn(!musicOn);
  };

  // This function toggles the musicOn, which means 
  //
  const toggleSoundEffects = () => {
    setSoundEffectsOn(!soundEffectsOn);
  };

  useEffect(() => {
    if (!musicOn && !soundEffectsOn) {
      setSoundOn(false);
    }
    else {
      setSoundOn(true);
    }
  }, [soundOn, musicOn, soundEffectsOn]);

  // This function was created with the help of ChatGPT. It's responsible for playing and stopping the background music based on the soundOn state.
  //  
  const playBackgroundMusic = async () => {

    // If sound and music is on and if the background music isn't already playing we create a new soundObject with the background music. 
    //
    if (soundOn && musicOn && !backgroundMusic) {
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

            // This row restart the song after finished - no errors so far, but keep this line in mind since it's recursive!
            //
            playBackgroundMusic();
          }
        });

        // Start playing at a reasonable volume and setBackgroundMusic to the soundObject
        // 
        await soundObject.setVolumeAsync(0.3)
        await soundObject.playAsync();
        setBackgroundMusic(soundObject);
      } catch (error) {
        console.log('Failed to play the sound', error);
      }

      // If sound or music is off and if the background music is already playing we stop the music, unload the audio file and set the backgroundMusic to null
    } else if ((!soundOn || !musicOn) && backgroundMusic) {
      await backgroundMusic.stopAsync();
      await backgroundMusic.unloadAsync();
      setBackgroundMusic(null);
    }
  };

  // This function is responsible for playing the place piece sound effect, similarly to the playBackgroundMusic
  //
  const playPlacePiece = async () => {
    // If sound and effects is on and if the sound effect isn't already playing we create a new soundObject.
    //
    if (soundOn && soundEffectsOn && !placePiece) {
      const soundObject = new Audio.Sound();
      try {

        // The mp3 is loaded and prepared for playback
        //
        await soundObject.loadAsync(require('../sounds/placepiece.mp3'));

        // Sets an update callback function for the playback status
        //
        await soundObject.setOnPlaybackStatusUpdate(async (status) => {

          // If sounds is loaded and has already finished we unload the audio from the sound object and the background music i set to null.
          //
          if (status.isLoaded && status.didJustFinish) {
            await soundObject.unloadAsync();
            setPlacePiece(null);
          }
        });

        // Start playing and setPlacePiece to the soundObject
        // 
        await soundObject.playAsync();
        setPlacePiece(soundObject);
      } catch (error) {
        console.log('Failed to play the sound', error);
      }

      // If sound or sound effect is off and if the effect is already playing we stop it, unload the audio file and set place piecet to null
    } else if ((!soundOn || !soundEffectsOn) && placePiece) {
      await placePiece.stopAsync();
      await placePiece.unloadAsync();
      setPlacePiece(null);
    }
  }

  // This function is responsible for playing the occupied sound effect, similarly to the playBackgroundMusic
  //
  const playOccupied = async () => {
    // If sound and soundeffect is on and if the sound effect isn't already playing we create a new soundObject.
    //
    if (soundOn && soundEffectsOn && !occupied) {
      const soundObject = new Audio.Sound();
      try {

        // The mp3 is loaded and prepared for playback
        //
        await soundObject.loadAsync(require('../sounds/occupied.mp3'));

        // Sets an update callback function for the playback status
        //
        await soundObject.setOnPlaybackStatusUpdate(async (status) => {

          // If sounds is loaded and has already finished we unload the audio from the sound object and the background music i set to null.
          //
          if (status.isLoaded && status.didJustFinish) {
            await soundObject.unloadAsync();
            setOccupied(null);
          }
        });

        // Start playing and set occupied to the soundObject
        // 
        await soundObject.playAsync();
        setOccupied(soundObject);
      } catch (error) {
        console.log('Failed to play the sound', error);
      }

      // If sound or sound effect is off and if the effect is already playing we stop it, unload the audio file and set place piecet to null
    } else if ((!soundOn || !soundEffectsOn) && occupied) {
      await occupied.stopAsync();
      await occupied.unloadAsync();
      setOccupied(null);
    }
  }

  //Needed variables and function are passed so that they can be accessed from the components that import the sound context
  //
  return (
    <SoundContext.Provider value={{
      soundOn,
      soundEffectsOn,
      musicOn,
      toggleSound,
      playBackgroundMusic,
      backgroundMusic,
      placePiece,
      playPlacePiece,
      occupied,
      playOccupied,
      toggleMusic,
      toggleSoundEffects
    }}>
      {children}
    </SoundContext.Provider>
  );
};

//************
// END of file SoundContext.jsx
//************