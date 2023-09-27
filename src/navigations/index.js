import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';

import MainStack from './MainStack';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {colors} from '../constants';
import Splash from '../Screens/Splash/Splash';
// import {colors} from '../constraints';

const Stack = createNativeStackNavigator();

function RootNavigation(props) {
  return (
    <>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'dark-content'}
        backgroundColor={colors.white}
        // translucent={true}
      />
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </>
  );
}

export default RootNavigation;
