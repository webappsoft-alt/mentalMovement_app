import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import style from '../assets/css/style';
import {fonts} from '../constants';
import {useTranslation} from 'react-i18next';
import {deviceWidth} from '../constants/Dimentions';
import {useNavigation} from '@react-navigation/native';

const Footer = ({agreed, textStyle}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const textColor = agreed ? 'white' : 'black';
  const bgColor = agreed ? 'black' : 'white';
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Text style={[style.font14Re, {fontFamily: fonts.medium}, textStyle]}>
        {t('By using this app you agree to the')}
      </Text>
      <Text style={[style.font14Re]}>
        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <Text
            style={[
              style.font14Re,
              {textDecorationLine: 'underline', fontFamily: fonts.bold},
              ,
              textStyle,
            ]}>
            {t('Terms and Conditions')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
          <Text
            style={[
              style.font14Re,
              {textDecorationLine: 'underline', fontFamily: fonts.bold},
              ,
              textStyle,
            ]}>
            {t('& Privacy Policy')}
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: deviceWidth,
    paddingVertical: 24,
    // paddingHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Footer;
