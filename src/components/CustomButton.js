import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

const getPosition = (position) => {
  switch (position) {
    case "left":
      return { position: "absolute", left: 20, bottom: 270 };
    default:
      return { position: "absolute", right: 20,  bottom: 270 };
  }
};

const CustomButton = ({ onPress, style, children, position }) => {
  const floatingActionButton = position ? getPosition(position) : [];

  return (
    <TouchableOpacity onPress={onPress} style={floatingActionButton}>
      <View style={[styles.button, style]}>{children}</View>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CustomButton.defaultProps = {
  style: {},
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#353535",
    alignItems: "center",
    justifyContent: "center",
  },
});
