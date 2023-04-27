import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View} from 'react-native';
import {useState} from 'react';
import eng from '../languages/eng.json';
import sve from '../languages/sve.json';


//import eng from '../languages/eng.json';
//import sve from '../languages/sve.json';

export default function HomeScreen({ navigation }) {
  const [language, setLanguage] = useState(eng);
  return (   
    <View style={styles.container}>
      <Button 
        title= "Svenska"
        onPress={() => {
          setLanguage(sve);
        }
        }
      />
      <Button 
        title= "English"
        onPress={() => {
          setLanguage(eng);
        }
        }
      />

      <Button 
        title= {language.HomeScreen.newGameButton}
        onPress={() => navigation.navigate("NewGame", {language: language})}
      />

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
});