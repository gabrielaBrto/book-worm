import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import colors from '../../assets/colors';
import CustomButton from '../components/CustomButton';
import * as firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    if(email && password){
      setLoading(true);
      try {
        const response = await firebase.auth()
        .signInWithEmailAndPassword(email, password)
        
        if (response) {
          setLoading(false);
         // navigation.navigate('HomeDrawer', { screen: 'Loading' });
          navigation.navigate('Loading');
        }

      } catch (error) {
        setLoading(false);
        switch(error.code){
          case 'auth/user-not-found':
            alert('A user with this email does not exist. Try Signing Up');
          break;
          case 'auth/invalid-email':
            alert('Please enter an email address');
          break;
          default:
            alert(error.code);
        }
      }
    }else{
      alert('Please enter your email and password')
    }
  }

  const onSignUp = async () => {

    if(email && password){
      setLoading(true)
      try {
        const response = await firebase.auth()
        .createUserWithEmailAndPassword(email, password);
        
        if(response) setLoading(true);

        //inserting user on firebase real time database
        const user = await firebase.database().ref('users/').child(response.user.uid)
        .set({ email: response.user.email, uid: response.user.uid })

        //signin user
        navigation.navigate('Loading');
        // onSignIn(email, password);
      } catch (error) {
        setLoading(false);
        if(error.code == 'auth/email-already-in-use'){
          alert('User already exists. Try Loggin in');
        }
      }
    }else{
      alert('Please enter your email and password')
    }
  }

  return (
    <View style={styles.container}>
      {loading ? 
        <View style={[ StyleSheet.absoluteFill, 
        { alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          elevation: 1000
        } ]}>
          <ActivityIndicator size="large" color={colors.logoColor}/>
        </View> 
        : null}
        <TextInput 
        style={styles.textInput}
        placeholder="abc@example.com"
        placeholderTextColor={colors.bgTextInputDark}
        onChangeText={email => setEmail(email)}
        />
        <TextInput 
        style={styles.textInput}
        placeholder="Enter Password"
        placeholderTextColor={colors.bgTextInputDark}
        onChangeText={password => setPassword(password)}
        secureTextEntry
        />
        <View style={{ alignItems: 'center' }}>
          <CustomButton 
           onPress={() => onSignIn()}
           style={[styles.loginButton, 
           {borderColor: colors.bgPrimary}]}
           >
            <Text style={{color: '#FFF', fontWeight: '100'}}>Login</Text>
          </CustomButton>
          <CustomButton 
            onPress={() => onSignUp()}
            style={[styles.loginButton, 
            {borderColor: colors.bgError}]}
          >
            <Text style={{color: '#FFF', fontWeight: '100'}}>Sign Up</Text>
          </CustomButton>
        </View>
      {/* <View styles={{flex: 1}} /> */}
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
    backgroundColor: colors.bgMain
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10,
    color: colors.txtWhite,
    paddingHorizontal: 10
  },
  loginButton: {
    borderWidth: 0.5,
    backgroundColor: 'transparent',
    marginTop: 10,
    width: 200
  }
});
