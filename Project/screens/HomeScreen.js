/**
 * File: HomeScreen.js
 *
 * This file contains the javaScript needed for the home screen of the app.
 *
 * Version 0.5
 * Author: Karolina Hagerman, Erik Blomsterberg
 */

// Imports
//
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, TouchableOpacity, Text, Animated} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import eng from '../languages/eng.json';
import sve from '../languages/sve.json';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SoundContext } from '../components/SoundContext';
import { responsiveHeight, responsiveWidth, responsiveFontSize, useResponsiveHeight } from "react-native-responsive-dimensions";
import Logo from '../components/Logo';

export default function HomeScreen({ navigation }) {
  const ICON_SIZE = useResponsiveHeight(5);

  //initial value for header and button fading animation
  //
  const [fadeAnim] = useState(new Animated.Value(0));

  // fading animation for header and button
  //
  useEffect(() => {
          Animated.timing(fadeAnim,{tovalue: 1, duration: 3000, useNativeDriver: true, delay: 3200}).start()
  }, [])

  // States for changing the language 
  //
  const [language, setLanguage] = useState(eng);

  // Getting the needed information from the sound context
  //
  const { soundOn, toggleSound, playBackgroundMusic, backgroundMusic } = useContext(SoundContext);

  // This hook is responsible for playing and cleaning up the background music based on the soundOn state. It will execute a function whenever soundOn changes. 
  // The function first calls playBackgroundMusic, which is explained in SoundContext.js. 
  // Then it returns a cleanup function that stops/unloads if backgroundMusic is already defined. 
  // It was created with the help of ChatGPT.
  //
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
    'prillyMonly': require('../fonts/PrillyMonly.ttf')
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
      <Animated.View style={[styles.header, {opacity: fadeAnim}]}>

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
          onPress={() => { toggleSound(); }}
        >
          {soundOn ? (
            <Ionicons name="volume-high-outline" size={ICON_SIZE} color="#262723" />
          ) : (
            <Ionicons name="volume-mute-outline" size={ICON_SIZE} color="#262723" />
          )}
        </TouchableOpacity>
      </Animated.View>
      {/* END OF HEADER */}

      {/* BODY */}
      <View style={styles.body}>

        {/* The XOZ text displayed in different colors */}
        <Logo/>

        {/* New game button, navigates to new game screen */}
        <Animated.View style =  {{opacity: fadeAnim}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("NewGame", { language: language })}
        >
          <Text style={styles.buttonText}>{language.HomeScreen.newGameButton}</Text>
        </TouchableOpacity>
        </Animated.View>
      </View>
      {/* END OF BODY */}

      {/* Default style of status bar */}
      <StatusBar style="auto" />
    </View>
  )
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
    marginHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(5),
    width: responsiveWidth(96),
  },
  body: {
    paddingVertical: responsiveHeight(14),
    paddingHorizontal: responsiveWidth(10),
    width: responsiveWidth(96),
    height: responsiveHeight(80),
  },
  flags: {
    flexDirection: 'row',
  },
  headerItem: {
    //INKLUDERAR FLAGGOR OCH LJUDSYMBOL, 
  },
  flag: {
    height: responsiveHeight(5),
    aspectRatio: 3/2,
    marginRight: '5%',
  },
  chosenFlag: {
    borderColor: '#FFF786',
    borderWidth: 3,
  },
  soundIcon: {
    //här kan vi lägga till
  },
  image: {
    //HÄR LÄGGER VI TILL FÖR BILDEN
  },
  xozView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
  },
  xoz: {
    fontSize: responsiveFontSize(10),
    fontFamily: 'bold',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  x: {
    color: '#C2933F',
  },
  o: {
    fontSize: responsiveFontSize(18),
    color: '#294725',
  },
  z: {
    color: '#276180',
  },
  button: {
    backgroundColor: '#9E355E',
    borderColor: '#262723',
    borderWidth: 1,
    borderRadius: 7,
    padding: '5%',
    paddingTop: '7%',
    shadowColor: 'black',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: responsiveFontSize(7),
    fontFamily: 'oxfordStreet',
    alignSelf: 'center',
    color: '#F8FFFF',
  }
});

//************
// END of file HomeScreen.js
//************