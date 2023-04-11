import HomeScreen from "./screens/HomeScreen";
import NewGameScreen from "./screens/NewGameScreen";
import GameScreen from "./screens/GameScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{title: "Welcome"}}
        />
        <Stack.Screen 
          name="NewGame"
          component={NewGameScreen}
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