import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/home";
import Detail from "../screens/detail";

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    // @ts-ignore
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}