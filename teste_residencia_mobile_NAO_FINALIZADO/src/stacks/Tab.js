/* eslint-disable prettier/prettier */
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import SignOut from '../screens/SignOut';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
    tabBar={props =><CustomTabBar {...props} />}
    >
        <Tab.Screen name='Home'component={Home}/>
        <Tab.Screen name='SignOut'component={SignOut}/>
    </Tab.Navigator>
)