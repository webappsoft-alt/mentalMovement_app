// React
import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {StyleSheet} from 'react-native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constants';
import {devWidth} from '../../constraints/Dimentions';

export const BaseButton = ({
  title,
  onPress = () => '',
  disabled = false,
  icon,
  textStyle,
  defaultStyle,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[
        styles.default,
        defaultStyle,
        style.justify,
        {...defaultStyle, ...style},
        disabled ? {backgroundColor: colors.gray} : {},
      ]}>
      {/* // style={[styles.default, , defaultStyle, style.justify]} */}
      {icon ? icon : null}
      {!loading ? (
        <Text
          style={[
            style.font16Re,
            textStyle,
            {fontFamily: fonts.bold},
            // disabled ? {color: colors.neutralDarkFour} : {},
          ]}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator color={'#fff'} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    height: 45,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.black,
    borderRadius: 10,
  },
});
