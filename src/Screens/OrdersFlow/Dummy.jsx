import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Dummy = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample data arrays
  const vegData = ['Veg Item 1', 'Veg Item 2', 'Veg Item 3'];
  const nonVegData = ['Non-Veg Item 1', 'Non-Veg Item 2', 'Non-Veg Item 3'];

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, selectedFilter === 'all' && styles.selectedButton]}
          onPress={() => setSelectedFilter('all')}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedFilter === 'veg' && styles.selectedButton]}
          onPress={() => setSelectedFilter('veg')}>
          <Text>Veg</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedFilter === 'non-veg' && styles.selectedButton]}
          onPress={() => setSelectedFilter('non-veg')}>
          <Text>Non-Veg</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dataContainer}>
        {selectedFilter === 'all' && (
          <Text>All Data: {vegData.concat(nonVegData).join(', ')}</Text>
        )}
        {selectedFilter === 'veg' && <Text>Veg Data: {vegData.join(', ')}</Text>}
        {selectedFilter === 'non-veg' && (
          <Text>Non-Veg Data: {nonVegData.join(', ')}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedButton: {
    backgroundColor: 'lightgray',
  },
  dataContainer: {
    paddingHorizontal: 20,
  },
});

export default Dummy;
