import React from 'react';
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts} from '../constants';

const Button = ({
  onPress,
  btnName,
  disabled,
  loading,
  customStyle,
  customText,
  style,
  buttonColor,
  textColor,
  buttonText,
}) => {
  const buttonStyles = [
    styles.btn,
    {
      backgroundColor: buttonColor,
    },
  ];

  const textStyles = [
    styles.btnText,
    {
      color: textColor,
    },
  ];

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.btn,
        {backgroundColor: buttonColor}, // Set the background color based on the buttonColor prop
        customStyle,
      ]}
      onPress={onPress}>
      {loading && <ActivityIndicator size={25} color={'#fff'} />}
      {!loading && (
        <Text style={[styles.btnText, textStyles, customText]}>{btnName}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    fontFamily: fonts.regular,
    fontSize: 16,
  },
});
