import React from "react";

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';

import HomeScreen from "./components/Screens/HomeScreen";
import Inventory from "./components/Screens/Inventory";
import Orders from "./components/Screens/Orders";
import Profile from "./components/Screens/Profile";
import Sales from "./components/Screens/Sales";
import HelpCenter from "./components/Screens/HelpCenter";
import Settings from "./components/Screens/Settings";

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
       }}
      >
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            headerShown:false,
            cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="Inventory" component={Inventory}
          options={{
            headerShown:false,
            //cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="Orders" component={Orders}
          options={{
            title: 'My Orders Page',
            headerTitleAlign:'center',
            //cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="Profile" component={Profile}
          options={{
            title: 'My Profile Page',
            headerTitleAlign:'center',
            //cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="Sales" component={Sales}
          options={{
            title: 'My Sales Page',
            headerTitleAlign:'center',
            //cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="HelpCenter" component={HelpCenter}
          options={{
            title: 'My Help Center',
            headerTitleAlign:'center',
            //cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="Settings" component={Settings}
          options={{
            title: 'My Settings Page',
            headerTitleAlign:'center',
            //cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;