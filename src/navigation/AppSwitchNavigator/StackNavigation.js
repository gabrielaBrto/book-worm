import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../../screens/Welcome";
import Home from "../../screens/Home";
import Login from "../../screens/Login";
import Loading from "../../screens/Loading";
import TabNavigator from "../BottomTabNavigator/TabNavigator";

const StackNavigation = () => {
  const Stack = createStackNavigator();

  /** CREATE A STACK TO SEE IF THE USER IS LOGGED IN 
   * <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
   */
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
      name="HomeTabNavigator"
      component={TabNavigator}
      />
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
