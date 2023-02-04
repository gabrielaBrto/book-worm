import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../../assets/colors";

const ListItem = ({ item, children }) => {
  return (
    <View style={styles.makedAsReadContainer}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/icon.png")} style={styles.image} />
      </View>
      <View style={styles.makedAsReadItem}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
      </View>
      {children}
      {/* {item.read ? (
      <Ionicons name="ios-checkmark" color={colors.logoColor} size={30} />
    ) : (
      <CustomButton
        onPress={() => markAsRead(item, index)}
        style={styles.markAsReadButton}
      >
        <Text style={styles.makedAsReadText}>Mark as read</Text>
      </CustomButton>
    )} */}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  makedAsReadContainer: {
    minHeight: 100,
    flexDirection: "row",
    backgroundColor: colors.markedAsReadContainerBg,
    alignItems: "center",
    marginVertical: 5,
  },
  imageContainer: {
    height: 70,
    width: 70,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 35,
  },
  makedAsReadItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  listItemTitle: {
    fontWeight: "100",
    fontSize: 20,
    color: colors.txtWhite,
  },
  markAsReadButton: {
    width: 100,
    height: 50,
    backgroundColor: colors.bgSuccess,
    alignItems: "center",
    justifyContent: "center",
  },
  makedAsReadText: {
    fontWeight: "bold",
    color: "#FFF",
  },
});
