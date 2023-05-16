import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, TouchableOpacity, Text } from 'react-native';
import { useState, useEffect } from 'react';
import eng from '../languages/eng.json';
import sve from '../languages/sve.json';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const ICON_SIZE = 40;

export default function HomeScreen({ navigation }) {
  const [language, setLanguage] = useState(eng);
  const [soundOn, setSound] = useState(false)

  // Fonts, download from https://www.dafont.com/ and add to fonts folder
  const [fontsLoaded] = useFonts({
    'impact': require('../fonts/impact.ttf'),
    'oxfordStreet': require('../fonts/OxfordStreet.ttf'),
    'bold': require('../fonts/THEBOLDFONT.ttf'),
  });

  // https://www.youtube.com/watch?v=viIkcDYSBrI
  // This hook is used to tell React to do prepare after rendering
  useEffect(() => {
    async function prepare() {
      // Keeps the splash screen visible until we call hideAsync
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  }
  else {
    //Hides the native splash screen immediately - Expo Documentation
    SplashScreen.hideAsync();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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


        <TouchableOpacity
          style={[styles.headerItem, styles.soundIcon]}
          onPress={() => setSound(!soundOn)}
        >
          {soundOn ? (
            <Ionicons name="volume-high-outline" size={ICON_SIZE} color="#262723" />
          ) : (
            <Ionicons name="volume-mute-outline" size={ICON_SIZE} color="#262723" />
          )}
        </TouchableOpacity>

      </View>

      <View style={styles.body}>

        {/*       <Image style={styles.image} source={require('../assets/BILD')}/> */}

        <Text style={styles.xoz}>
          <Text style={styles.x}>X</Text>
          <Text style={styles.o}>O</Text>
          <Text style={styles.z}>Z</Text>
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("NewGame", { language: language, soundOn: soundOn })}
        >
          <Text style={styles.buttonText}>{language.HomeScreen.newGameButton}</Text>
        </TouchableOpacity>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',

    alignSelf: 'stretch',
    justifyContent: 'space-between',
    padding: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%',
  },
  body: {
    marginTop: '40%',
    flex: 1,
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
    fontSize: 120,
    fontFamily: 'bold',
    padding: 10,
  },
  x: {
    color: '#69272A',
  },
  o: {
    fontSize: 180,
    color: '#374730',
  },
  z: {
    color: '#3E6680',
  },
  button: {
    borderColor: '#262723',
    backgroundColor: '#C8C1AD',
    borderWidth: 2,
    borderRadius: 7,
    color: 'black',
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