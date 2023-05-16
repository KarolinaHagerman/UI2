import HomeScreen from "./screens/HomeScreen";
import NewGameScreen from "./screens/NewGameScreen";
import GameScreen from "./screens/GameScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  // Fonts, download from https://www.dafont.com/ and add to fonts folder
  const [fontsLoaded] = useFonts({
    'impact': require('./fonts/impact.ttf'),
    'swallowKick': require('./fonts/SwallowKick.ttf'),
    'oxfordStreet': require('./fonts/OxfordStreet.ttf')
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

  if(!fontsLoaded) {
    return undefined;
  }
  else {
    //Hides the native splash screen immediately - Expo Documentation
    SplashScreen.hideAsync();
  }

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