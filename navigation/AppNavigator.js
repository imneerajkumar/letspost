import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeSceen from '../screens/HomeScreen';
import PostImageScreen from '../screens/PostImageScreen';
import UserScreen from '../screens/UserScreen';
import PostButton from '../components/PostButton';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="Home" 
      component={HomeSceen} 
      options={{
        tabBarIcon: ({ color, size }) => 
          <MaterialCommunityIcons name="home" color={color} size={size} />
      }}
    />
    <Tab.Screen 
      name="Post" 
      component={PostImageScreen} 
      options={({ navigation }) => ({
        tabBarButton: () => <PostButton onPress= {() => navigation.navigate("Post")} />,
        tabBarIcon: ({ color, size }) => 
          <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
      })}
    />
    <Tab.Screen 
      name="User" 
      component={UserScreen} 
      options={{
        tabBarIcon: ({ color, size }) => 
          <MaterialCommunityIcons name="account" color={color} size={size} />
      }}
    />
  </Tab.Navigator>
)

export default AppNavigator;