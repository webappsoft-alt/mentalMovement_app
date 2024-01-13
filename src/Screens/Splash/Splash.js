import {StyleSheet, Text, Image, ImageBackground, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {useTranslation} from 'react-i18next';
import {AppLogo, Logo_MentalMovement} from '../../assets/images';
import {colors} from '../../constants';

const Splash = () => {
  const navigation = useNavigation();
  const {i18n} = useTranslation();

  const setLang = async () => {
    await AsyncStorage.setItem('selectedLanguage', 'es');
    i18n.changeLanguage('es'); // Switch to English
  };

  const getUserId = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    console.log('id...', user_id);
    // const user_id = '';
    setTimeout(() => {
      if (user_id) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'MainStack',
              state: {
                routes: [
                  {
                    name: 'AppStack',
                  },
                ],
              },
            },
          ],
        });
      } else {
        setLang();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'AuthStack',
            },
          ],
        });
      }
    }, 1500);
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.black,
      }}>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={'black'}
        // translucent={true}
      />
      <Image
        source={Logo_MentalMovement}
        style={{width: 200, height: 25, marginBottom: 25}}
        resizeMode="center"
      />
    </View>
    // <ImageBackground
    //   style={{flex: 1}}
    //   source={require('../../../splashscreen.png')}>
    //
    // </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({});
