import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import colors from '../../../assets/colors';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name="ios-book" color={colors.logoColor} size={150} />
        <Text style={{fontSize: 50, fontWeight: '100', color:'#fff'}}>Book Worm</Text>
      </View>
      <View style={{flex:1, alignItems: 'center'}}>
        <CustomButton 
            style={{
                width: 200,
                backgroundColor: 'transparent',
                borderWidth: 0.5,
                marginBottom:10,
                borderColor: colors.bgPrimary
            }}
            title="Log In" 
            onPress={() => navigation.navigate('Login')}
        >
            <Text style={{fontWeight: 'bold', color:'#fff'}}>Log In</Text>
        </CustomButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.bgMain
    }
});

export default Welcome;
