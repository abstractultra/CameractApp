import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from 'screens/CameraScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="account-circle"
              type="material"
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={CameraScreen}
        options={{
          title: 'Add Mood Entry',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="camera"
              type="entypo"
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Analytics"
        component={HomeScreen}
        options={{
          title: 'Analytics',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
							name="clipboard-text-outline"
              type="material-community"
            />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  return routeName;
}
