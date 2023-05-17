/**
 * File: HomeScreen.js
 *
 * This file contains the javaScript needed for the home screen of the app.
 *
 * Version ???
 * Author: Karolina Hagerman, Erik Blomsterberg
 */

// Imports
//
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, TouchableOpacity, Text } from 'react-native';
import { useState, useEffect } from 'react';
import eng from '../languages/eng.json';
import sve from '../languages/sve.json';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Audio } from 'expo-av';
import AppContext from '../components/AppContext';

const ICON_SIZE = 40;

// START OF EXPORTED HOME SCREEN
//
export default function HomeScreen({ navigation }) {

  // States for changing the language and the sound
  //
  const [language, setLanguage] = useState(eng);
  const [soundOn, setSound] = useState(false);

  const [backgroundMusic, setBackgroundMusic] = useState(null);


  // Call the playBackgroundMusic() function whenever we want to play music
  // This code is from ChatGPT
  //
  const playBackgroundMusic = async () => {
    if (soundOn && !backgroundMusic) {
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
      await backgroundMusic.stopAsync();
      await backgroundMusic.unloadAsync();
      setBackgroundMusic(null);
    }
  };

  useEffect(() => {
    playBackgroundMusic();
    return () => {
      if (backgroundMusic) {
        backgroundMusic.stopAsync();
        backgroundMusic.unloadAsync();
      }
    };
  }, [soundOn]);

  // Fonts, can be downloaded from e.g. https://www.dafont.com/ and added to fonts folder
  //
  const [fontsLoaded] = useFonts({
    'impact': require('../fonts/impact.ttf'),
    'oxfordStreet': require('../fonts/OxfordStreet.ttf'),
    'bold': require('../fonts/THEBOLDFONT.ttf'),
  });

  // The following code was explained in https://www.youtube.com/watch?v=viIkcDYSBrI and is used to load the fonts.
  // This hook is used to tell React to do prepare after rendering.
  //
  useEffect(() => {
    async function prepare() {
      // Keeps the splash screen visible until we call hideAsync
      //
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  }
  else {
    //Hides the native splash screen immediately - explained in Expo Documentation
    //
    SplashScreen.hideAsync();
  }
  // Ending of the named code

  // All elements presented to the user
  // 
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* The clickable language flags */}
        <View style={styles.flags}>
          <TouchableOpacity
            style={styles.headerItem}
            onPress={() => {
              setLanguage(eng);
            }
            }
          >
            <Image
              source={require('../images/eng.png')}
              style={[styles.flag, language === eng && styles.chosenFlag]}
            >
            </Image>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerItem}
            onPress={() => {
              setLanguage(sve);
            }
            }
          >
            <Image
              source={require('../images/swe.png')}
              style={[styles.flag, language === sve && styles.chosenFlag]}
            >
            </Image>
          </TouchableOpacity>
        </View>

        {/* The clickable sound icon, different icons depending on soundOn state */}

        <TouchableOpacity
          style={[styles.headerItem, styles.soundIcon]}
          onPress={() => {
            setSound(!soundOn);
            playBackgroundMusic();
          }}
        >
          {soundOn ? (
            <Ionicons name="volume-high-outline" size={ICON_SIZE} color="#262723" />
          ) : (
            <Ionicons name="volume-mute-outline" size={ICON_SIZE} color="#262723" />
          )}
        </TouchableOpacity>
      </View>
      {/* END OF HEADER */}

      {/* BODY */}
      <View style={styles.body}>

        {/* The XOZ text displayed in different colors */}
        <Text style={styles.xoz}>
          <Text style={styles.x}>X</Text>
          <Text style={styles.o}>O</Text>
          <Text style={styles.z}>Z</Text>
        </Text>

        {/* New game button, navigates to new game screen */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("NewGame", { language: language, soundIsOn: soundOn, backgroundMusic: backgroundMusic })}
        >
          <Text style={styles.buttonText}>{language.HomeScreen.newGameButton}</Text>
        </TouchableOpacity>
      </View>
      {/* END OF BODY */}

      {/* Default style of status bar */}
      <StatusBar style="auto" />
    </View>
  );
}


// Styles for home screen
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    padding: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 50,
  },
  body: {
    paddingTop: '10%',
    margin: '10%',
  },
  flags: {
    flexDirection: 'row',
  },
  headerItem: {
    //INKLUDERAR FLAGGOR OCH LJUDSYMBOL, 
  },
  flag: {
    width: 60,
    height: ICON_SIZE,
    marginRight: '3%',
  },
  chosenFlag: {
    borderColor: '#F2A341',
    borderWidth: 2,
  },
  soundIcon: {
    //här kan vi lägga till
  },
  image: {
    //HÄR LÄGGER VI TILL FÖR BILDEN
  },
  xoz: {
    margin: 5,
    fontSize: 100,
    fontFamily: 'bold',
    padding: 20,
  },
  x: {
    color: '#69272A',
  },
  o: {
    fontSize: 150,
    color: '#374730',
  },
  z: {
    color: '#3E6680',
  },
  button: {
    margin: 20,
    backgroundColor: '#C8C1AD',
    borderColor: '#262723',
    borderWidth: 1,
    borderRadius: 7,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 40,
    fontFamily: 'oxfordStreet',
    alignSelf: 'center',
    color: '#262723'
  }
});

//************
// END of file HomeScreen.js
//************