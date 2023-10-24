import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native-svg';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import { useTranslation } from 'react-i18next';

const Splash = () => {
  const navigation = useNavigation();
  const { i18n } = useTranslation();

  const setLang = async () => {
    await AsyncStorage.setItem("selectedLanguage", "es");
    i18n.changeLanguage('es'); // Switch to English
  }

  const getUserId = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    console.log('id...', user_id);
    // const user_id = '';
    setTimeout(() => {
      if (user_id) {
        navigation.reset({
          index: 0,
          routes: [{
            name: 'MainStack',
            state: {
              routes: [
                {
                  name: "AppStack",
                }
              ]
            }
          }]
        })
      } else {
        setLang()
        navigation.reset({
          index: 0,
          routes: [{
            name: 'AuthStack',
          }]
        })
      }
    }, 1500);
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../../../splashscreen.png')}>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={'black'}
      // translucent={true}
      />
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({});
