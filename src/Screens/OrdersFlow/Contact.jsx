import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Contact = () => {
  const [feedback, setFeedback] = useState('');
  const [contactMethod, setContactMethod] = useState('Email');

  const submitFeedback = () => {
    // Handle feedback submission here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenName}>Contact Us</Text>

      <View style={styles.contactMethodContainer}>
        <Text style={styles.contactMethodLabel}>Preferred Contact Method:</Text>
        <TouchableOpacity
          style={[
            styles.contactMethodButton,
            contactMethod === 'Email' ? styles.activeContactMethod : null,
          ]}
          onPress={() => setContactMethod('Email')}
        >
          <Text style={[styles.contactMethodText, contactMethod === 'Email' ? styles.activeText : null]}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.contactMethodButton,
            contactMethod === 'Phone' ? styles.activeContactMethod : null,
          ]}
          onPress={() => setContactMethod('Phone')}
        >
          <Text style={[styles.contactMethodText, contactMethod === 'Phone' ? styles.activeText : null]}>Phone</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.feedbackInput}
        multiline
        placeholder="Enter your feedback here..."
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        textAlignVertical="top"
      />

      <Button title="Submit Feedback" onPress={submitFeedback} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

    backgroundColor: '#f5f5f5',
  },
  screenName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',

   
    marginBottom: 16,
  },
  contactMethodLabel: {
    fontSize: 18,
    marginRight: 8,
  },
  contactMethodButton: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007acc',
    backgroundColor: 'white',
    marginHorizontal:4

  },
  activeContactMethod: {
    backgroundColor: '#007acc',
  },
  contactMethodText: {
    color: '#007acc',
    fontSize: 16,
  },
  activeText: {
    color: 'white',
  },
  feedbackInput: {
    height: 200,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16,
    padding: 8,
    marginVertical: 16,
    backgroundColor: 'white',
  },
});

export default Contact;





