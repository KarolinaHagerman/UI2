import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import eng from '../languages/eng.json';
import sve from '../languages/sve.json';
import { Ionicons } from '@expo/vector-icons';

const ICON_SIZE = 40;

export default function HomeScreen({ navigation }) {
  const [language, setLanguage] = useState(eng);
  const [soundOn, setSound] = useState(false)

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
            <Ionicons name="volume-high-outline" size={ICON_SIZE} color="black" />
          ) : (
            <Ionicons name="volume-mute-outline" size={ICON_SIZE} color="black" />
          )}
        </TouchableOpacity>

      </View>

      <View style={styles.body}>

        {/*       <Image style={styles.image} source={require('../assets/BILD')}/> */}

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
    backgroundColor: '#fff',
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
    marginTop: '60%',
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
    borderColor: 'red',
    borderWidth: 2,
  },
  soundIcon: {
    //här kan vi lägga till
  },
  image: {
    //HÄR LÄGGER VI TILL FÖR BILDEN
  },
  button: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
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
  }
});