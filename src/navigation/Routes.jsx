import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SCREENS from '../utils/routes';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SongInfoScreen from '../screens/SongInfoScreen';
import SongsScreen from '../screens/SongsScreen';
import AppColors from '../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {HOME, LOGIN, PROFİLE, SONGS, SONGSINFO} = SCREENS;

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: AppColors.SoftBlack,
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: {
            width: 0,
            height: -10,
          },
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          paddingTop: 5,
          height: 85,
          borderWidth: 0,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: AppColors.White,
            fontSize: 13,
            fontWeight: '600',
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="home" size={24} color={AppColors.White} />
            ) : (
              <Ionicons name="home-outline" size={20} color={AppColors.White} />
            ),
        }}
        name={HOME}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            color: AppColors.White,
            fontSize: 13,
            fontWeight: '600',
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="person" size={24} color={AppColors.White} />
            ) : (
              <Ionicons
                name="person-outline"
                size={20}
                color={AppColors.White}
              />
            ),
        }}
        name={PROFİLE}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={LOGIN} component={LoginScreen} />
      <Stack.Screen name="Main" component={BottomTabsNavigator} />
      <Stack.Screen name={SONGS} component={SongsScreen} />
      <Stack.Screen name={SONGSINFO} component={SongInfoScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
