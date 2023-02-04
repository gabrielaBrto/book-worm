import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import colors from "../../assets/colors";
import * as firebase from "firebase/app";
import "firebase/auth";

const Settings = ({ navigation }) => {
  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate("Welcome");
    } catch (error) {
      alert("Unable to sign out right now");
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton
        style={{
          width: 200,
          backgroundColor: "transparent",
          borderWidth: 0.5,
          marginBottom: 10,
          borderColor: colors.bgPrimary,
        }}
        title="Log Out"
        onPress={() => signOut()}
      >
        <Text style={{ fontWeight: "bold", color: "#fff" }}>Log Out</Text>
      </CustomButton>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain,
  },
});
