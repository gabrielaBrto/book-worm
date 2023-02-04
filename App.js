import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from '@expo/vector-icons';
import Welcome from './src/screens/AppSwitchNavigator/Welcome';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Loading from './src/screens/AppSwitchNavigator/Loading';
import Settings from './src/screens/Settings';
import BooksRead from './src/screens/HomeTabNavigator/BooksRead';
import BooksReading from './src/screens/HomeTabNavigator/BooksReading';
import CustomDrawer from './src/navigation/DrawerNavigator/CustomDrawer';
import colors from './assets/colors';
import firebase from 'firebase/app';
import { firebaseConfig } from './config/config';

firebase.initializeApp(firebaseConfig);

const App = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  //screenOptions={{ headerShown: false }}
  const HomeTabNavigator = () => (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.logoColor,
        inactiveTintColor: colors.bgTextInput
      }}  
      screenOptions={({ route }) => ({
        headerShown: false,     
        tabBarStyle: {
          backgroundColor: colors.bgMain
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Books') {
            iconName = focused ? 'ios-book': 'ios-book-outline';
          } else if (route.name === 'BooksReading') {
            iconName = focused ? 'ios-bookmarks': 'ios-bookmarks-outline';
          }else{
            iconName = focused ? 'ios-checkmark-circle': 'ios-checkmark-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.logoColor,
        tabBarInactiveTintColor: 'gray',
      })}

    >
      <Tab.Screen 
        name="Books" 
        component={Home} 
      />
      <Tab.Screen
        options={{ tabBarLabel: "Books Reading"}}
        name="BooksReading"
        component={BooksReading}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Books Read" }}
        name="BooksRead"
        component={BooksRead}
      />
    </Tab.Navigator>
  );
  const getHeaderTitle = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "Home";
  
    switch (routeName) {
      case "Home":
        return "Books";
      case "BooksReading":
        return "Books Reading";
      case "BooksRead":
        return "Books Read";
    }
  };
  
  const HomeStackNavigator = ({ navigation }) => (
    <Stack.Navigator
      initialRouteName='Loading'
      screenOptions={{
        title: 'Book Worm',
        headerStyle: { backgroundColor: colors.bgMain },
        headerTintColor: "white",
        headerLeft: () => (
          <Ionicons
            onPress={() => navigation.openDrawer()}
            name="ios-menu"
            size={30}
            color={colors.logoColor}
            style={{ marginLeft: 10 }}
          />
        )
      }}
    >
       <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerBackTitleVisible: false }}
          />
        <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }}/>
      <Stack.Screen
        name="HomeTabNavigator"
        component={HomeTabNavigator}
      />
    </Stack.Navigator>
  );

  const AppDrawerNavigator = ({ navigation }) => (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        options={{ drawerIcon: () => <Ionicons name="ios-home" size={24} /> }}
        name="Home"
        component={HomeStackNavigator}
      />
      <Drawer.Screen
        options={{ drawerIcon: () => <Ionicons name="ios-settings" size={24} /> }}
        name="Settings"
        component={Settings}
      />
    </Drawer.Navigator>
  );

  return (
   <NavigationContainer>
     <AppDrawerNavigator />
   </NavigationContainer>
  );

}


export default App;