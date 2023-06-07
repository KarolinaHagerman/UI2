/**
 * File: App.js
 *
 * This file contains the javaScript needed for the app in whole.
 *
 * Version 0.5
 * Author: Karolina Hagerman, Erik Blomsterberg
 */

// Imports
//
import HomeScreen from "./screens/HomeScreen";
import NewGameScreen from "./screens/NewGameScreen";
import GameScreen from "./screens/GameScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SoundProvider } from "./components/SoundContext";

// Creates a stack navigator used to navigate between screens
// 
const Stack = createNativeStackNavigator();

export default function App() {

  // All elements presented to the user, in this case only the navigation container
  // 
  return (

    //This is where the SoundProvides wraps the whole app
    // 
    <SoundProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewGame"
            component={NewGameScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SoundProvider>
  );
}

//************
// END of file App.js
//************