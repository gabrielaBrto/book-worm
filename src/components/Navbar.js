import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../assets/colors';
const Navbar = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Book Worm</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    borderBottomWidth: 0.5, 
    borderBottomColor: colors.borderColor, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 70,
    marginTop: 20
  }
});

export default Navbar
