import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    SafeAreaView,
    Platform
} 
from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../assets/colors';
import { DrawerItemList } from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: colors.bgMain }} />
      <View 
      style={{ 
        height: 150, 
        backgroundColor: colors.bgMain, 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        paddingTop: Platform.OS == 'android' ? 20 : 0 
      }}>
        <Ionicons name="ios-book" size={60} color={colors.logoColor} />
        <Text style={{ 
            fontSize: 24,
            color: '#fff',
            fontWeight: '100'
        }}>
            Book Worm
        </Text>
      </View>
      <DrawerItemList {...props} />
    </ScrollView>
  )
}

export default CustomDrawer
