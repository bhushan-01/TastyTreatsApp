import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import MainScreen from '../Screens/LoadData/MainScreen';
import ProductItem from '../Screens/LoadData/ProductItem';
import DetailsScreen from '../Screens/LoadData/DetailsScreen';
import BottomTabBar from './BottomTabBar';
import Dummy from '../Screens/OrdersFlow/Dummy';
const Stack = createNativeStackNavigator();
const Stackrouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabBar"
      screenOptions={{
        cardStyle: {backgroundColor: '#000'},
        headerShown: false,
      }}>
<Stack.Screen name='BottomTabBar' component={BottomTabBar}/>
<Stack.Screen name='Dummy' component={Dummy}/>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="ProductItem" component={ProductItem} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default Stackrouter;

const styles = StyleSheet.create({});
