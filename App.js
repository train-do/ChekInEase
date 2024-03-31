import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "./src/screens/Login";
import RNBootSplash from "react-native-bootsplash"
import SplashScreen from "./src/screens/SplashScreen";
import Register from "./src/screens/Register";
import Home from "./src/screens/Home";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Scanner from "./src/screens/Scanner";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          statusBarColor: "transparent",
          statusBarTranslucent: true
        }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Scanner" component={Scanner} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


