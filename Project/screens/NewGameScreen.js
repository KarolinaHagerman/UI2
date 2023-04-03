import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackActions } from '@react-navigation/native';

export default function NewGameScreen({ navigation, route }) {
  let language = route.params.language;
  let greeting = language === "french" ? "Bonjour" : "Hello";
  return (
    <View style={styles.container}>
      <Text>{greeting}</Text>

      {/* Use this to be able to pop back to new game screen from game screen, not sure if this is something we want */}
{/*       <Button 
        title='Start game'
        onPress={() => navigation.push("Game")}
      />  */}
      
      {/* Use this to pop directly to home screen from game screen with both pop and popToTop */}
      <Button 
        title='Start game'
        onPress={() => {
          navigation.dispatch(
            StackActions.replace("Game")
          );
        }}
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