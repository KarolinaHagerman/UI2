/**
 * File: App.js
 *
 * This file contains the javaScript needed for the app in whole.
 *
 * Version ???
 * Author: Karolina Hagerman, Erik Blomsterberg
 */

// Imports
//
import HomeScreen from "./screens/HomeScreen";
import NewGameScreen from "./screens/NewGameScreen";
import GameScreen from "./screens/GameScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Creates a stack navigator used to navigate between screens
// 
const Stack = createNativeStackNavigator();

export default function App() {

  // All elements presented to the user, in this case only the navigation container
  // 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="NewGame"
          component={NewGameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Game"
          component={GameScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}