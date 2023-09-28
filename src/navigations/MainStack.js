import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text, Image, Platform, View, ImageBackground } from 'react-native';
import HomeIcon from '../assets/images/Bottom/AccountIcon';
import Home from '../Screens/Home';
import { colors, fonts } from '../constants';
import AccountIcon from '../assets/images/Bottom/AccountIcon';
import {
  CoachingBottom,
  ExploreBottom,
  HomeBimagesottom,
  HomeBottom,
  ProfileBottom,
} from '../assets/images';
import Profile from '../Screens/Profile';
import ChnagePassword from '../Screens/ChangePassword';
import EditProfile from '../Screens/EditProfile';
import GoogleFit from '../Screens/GoogleFit';
import HomeListScreen from '../Screens/HomeListScreen';
import MediaPlayerAudio from '../Screens/MediaPlaayer';
import Explore from '../Screens/Explore';
import ExploreTraning from '../Screens/ExploreTraning/ExploreTraning';
import Coaching from '../Screens/Coaching';
import { useTranslation } from 'react-i18next';
import PaymentScreen from '../Screens/PaymentScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="AppStack" component={AppStack} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChnagePassword" component={ChnagePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="GoogleFit" component={GoogleFit} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="HomeListScreen" component={HomeListScreen} />
      <Stack.Screen name="MediaPlayerAudio" component={MediaPlayerAudio} />
      <Stack.Screen name="ExploreTraning" component={ExploreTraning} />
    </Stack.Navigator>
  );
};
const AppStack = () => {
  const { t } = useTranslation();
  const androidTab = {
    height: 60,
    width: '90%',
    borderRadius: 20,
    position: 'absolute',
    left: 20,
    bottom: 10,
  };

  return (
    <ImageBackground
      source={require('../assets/images/png/start_img.png')}
      style={{ flex: 1 }}
      >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle:
            Platform.OS == 'android'
              ? androidTab
              : {
                height: 60,
                marginBottom: 30,
                alignItems: 'center',
                paddingTop: 20,
                width: '95%',
                borderRadius: 20,
                alignSelf: 'center',
              },
        }}
        initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => <HomeBottom focused={focused} />,
            tabBarLabel: t('Home'),
            tabBarLabelStyle: {
              height: 25,
              marginTop: Platform.OS === 'android' ? 5 : 15,
              fontSize: 13,
              color: 'black',
            },
            tabBarShowLabel: true,
            tabBarIconStyle: { height: 50 },
          }}
        />

        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/glass.png')}
                style={{ height: 25, width: 24 }}
              />
            ),
            tabBarLabel: t('Explore'),
            tabBarLabelStyle: {
              height: 25,
              marginTop: Platform.OS === 'android' ? 5 : 15,

              fontSize: 13,
              color: 'black',
            },
            tabBarShowLabel: true,
            tabBarIconStyle: { height: 50 },
          }}
        />

        <Tab.Screen
          name="Coaching"
          component={Coaching}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <CoachingBottom focused={focused} />
              ) : (
                <CoachingBottom />
              ),
            tabBarLabel: t('Coaching'),
            tabBarLabelStyle: {
              height: 25,
              marginTop: Platform.OS === 'android' ? 5 : 15,

              fontSize: 13,
              color: 'black',
            },
            tabBarShowLabel: true,
            tabBarIconStyle: { height: 50 },
          }}
        />
        {/* <Tab.Screen
        name="Marco"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) =>
          focused ? <ProfileBottom focused={focused} /> : <ProfileBottom />,
          tabBarLabel: ({focused, color, size}) => (
            <Text
            style={{
              // fontSize: 14,
              paddingBottom: 5,
              // color: focused ? colors.primaryColor : colors.gray,
              // fontFamily: focused ? fonts.medium : fonts.regular,
            }}>
            Marco
            </Text>
            ),
          }}
        /> */}
      </Tab.Navigator>
    </ImageBackground>
  );
};

// const AppStackWithoutBottom = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         animation: 'slide_from_right',
//       }}>
//       <Stack.Screen name="EditProfile" component={EditProfile} />
//       <Stack.Screen name="ChangePassword" component={ChangePassword} />
//       <Stack.Screen name="OrderHistory" component={OrderHistory} />
//       <Stack.Screen name="ContactUs" component={ContactUs} />
//       <Stack.Screen name="DataProtection" component={DataProtection} />
//       <Stack.Screen name="FAQs" component={FAQs} />
//       <Stack.Screen name="Balance" component={BallanceScreen} />
//       {/* <Stack.Screen name="PaymentMethod" component={} /> */}
//     </Stack.Navigator>
//   );
// };

export default MainStack;
