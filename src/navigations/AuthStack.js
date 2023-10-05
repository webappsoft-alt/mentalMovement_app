import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GetStarted from '../Screens/GetStarted';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar/FocusAwareStatusBar';
import { colors } from '../constants';
import Account from '../Screens/AccountScreen';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import VerifyCode from '../Screens/VerifyCode';
import VerifyEamil from '../Screens/VerifyEmail';
import ChnagePassword from '../Screens/ChangePassword';
import ResetPassword from '../Screens/ChangePassword/ResetPassword';
import Privacy from '../Screens/Privacy';
import Terms from '../Screens/Terms';
import { Platform } from 'react-native';
import PaymentScreen from '../Screens/PaymentScreen/PaymentScreenandroid';
import PaymentScreenios from '../Screens/PaymentScreen/PaymentScreenios';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={'black'}
      // translucent={true}
      />
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
        initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="VerifyEmail" component={VerifyEamil} />
        <Stack.Screen name="PaymentScreen" component={Platform.OS == 'android' ? PaymentScreen : PaymentScreenios} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Terms" component={Terms} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
