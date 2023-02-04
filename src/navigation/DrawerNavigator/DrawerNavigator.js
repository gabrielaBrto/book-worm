import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from '@expo/vector-icons';
import StackNavigator from "../AppSwitchNavigator/StackNavigation";
import Home from "../../screens/Home";
import Settings from "../../screens/Settings";
import CustomDrawer from "./CustomDrawer";


const DrawerNavigator = props => {
  const Drawer = createDrawerNavigator();
  
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false}} drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={StackNavigator} />
      {/* <Drawer.Screen 
      name="Home" 
      component={Home} 
      options={{
        headerTitle:'',
        drawerActiveBackgroundColor:'transparent',
        drawerIcon: (({ size, color }) =>
            <Ionicons
                name="ios-home"
                size={24}
            />
        )
      }}
      /> */}
      <Drawer.Screen 
      name="Settings" 
      component={Settings} 
      options={{
        headerTitle:'',
        drawerActiveBackgroundColor:'transparent',
        drawerIcon: (({ size, color }) =>
            <Ionicons
                name="ios-settings"
                size={24}
            />
        )
      }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;