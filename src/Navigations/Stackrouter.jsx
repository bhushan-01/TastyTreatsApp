import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomTabBar from './BottomTabBar';

import Cart from '../Screens/OrdersFlow/Cart';
const Stack = createNativeStackNavigator();
const Stackrouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabBar"
      screenOptions={{
        cardStyle: {backgroundColor: '#000'},
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabBar" component={BottomTabBar} />

      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

export default Stackrouter;

const styles = StyleSheet.create({});
