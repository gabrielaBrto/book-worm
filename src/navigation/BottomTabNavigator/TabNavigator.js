import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import BooksRead from '../../screens/HomeTabNavigator/BooksRead';
import BooksReading from '../../screens/HomeTabNavigator/BooksReading';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Tab.Screen name="BooksReading" component={BooksReading} />
      <Tab.Screen name="BooksRead" component={BooksRead} />
    </Tab.Navigator>
  )
}

export default TabNavigator;
