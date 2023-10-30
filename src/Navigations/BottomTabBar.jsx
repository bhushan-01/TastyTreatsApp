import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Screens/OrdersFlow/Home';
import Contact from '../Screens/OrdersFlow/Contact';
import Cart from '../Screens/OrdersFlow/Cart';

const Tab = createBottomTabNavigator();
const BottomTabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      tabBarPosition="bottom"
      // swipeEnabled={false}

      screenOptions={{
        swipeEnabled: true,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
      //@ts-ignore
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Contact" component={Contact} options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="shopping-cart" size={size} color={color} />
          ),
        }} />
      <Tab.Screen name="Cart" component={Cart}  options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="contacts" size={size} color={color} />
          ),
        }}/>
    </Tab.Navigator>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({});
