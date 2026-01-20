import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Badge = ({ children }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#fff',
  },
});

export default Badge;
