import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import colors from "../../../assets/colors";

const Loading = ({ navigation }) => {
  useEffect(() => {
    // componentDidMount events
    const unlisten = firebase.auth().onAuthStateChanged((user) => {
      
      if (user) {
        //navigation.navigate("Home", { user });
        navigation.navigate('HomeTabNavigator', { screen: 'Books',  params: { user }, });
      } else {
        navigation.navigate("Login");
      }
    });
    return () => {
      // componentWillUnmount events
      unlisten();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.logoColor} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain,
  },
});
