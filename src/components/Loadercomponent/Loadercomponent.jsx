import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/Colors/Colors';
// Assuming you have a COLORS object in your constants file

const Loadercomponent = props => {
  return (
    <Modal
      visible={props.Visible} // Set the visible prop to show the modal
      transparent={true} // Set transparent prop to have a transparent background
    >
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={"#3E64FF"} />
      </View>
    </Modal>
  );
};

export default Loadercomponent;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
});
