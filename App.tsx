import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import Stackrouter from './src/Navigations/Stackrouter';
import { Provider } from 'react-redux';
import { persistor, store } from './src/Store/Store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <>
 <StatusBar
        backgroundColor={"#3E64FF"}
        barStyle={'light-content'}
      />
    <Provider store={store}>
<PersistGate loading={null} persistor={persistor}>

   <NavigationContainer>

<Stackrouter/>
</NavigationContainer>
</PersistGate>
    </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})