import React from 'react';
import { View, StyleSheet } from 'react-native';

const Progress = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: '#e0e0df',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#007bff',
  },
});

export default Progress;
