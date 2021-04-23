import React from 'react';
import {Home, Login, Rastreio} from './views'
import Restrito from './views/areaRestrita/Restrito'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Login} options={{headerTintColor: '#FFFBFF' ,headerStyle:{shadowColor: 'transparent', backgroundColor: '#1E1345'}}}/>
        <Stack.Screen name="Rastreio" component={Rastreio} />
        <Stack.Screen name="Restrito" component={Restrito} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


