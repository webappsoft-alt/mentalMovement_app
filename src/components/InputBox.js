import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {colors, fonts} from '../constants';
import style from '../assets/css/style';
import {useTranslation} from 'react-i18next';

const InputBox = ({
  Icon,
  error,
  update,
  onChangeText,
  value,
  placeholder,
  errorDisc,
  KT,
  updateText,
  editable,
  customStyle,
  customInputStyle,
  isEye,
  secureTextEntry,
  onEyePress,
  check,
  notShow,
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.inputBox}>
      {Icon ? (
        <View style={styles.iconBox}>
          <Icon />
        </View>
      ) : null}

      <TextInput
        placeholder={t(placeholder)}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.textInput,
          // {
          //   //borderColor: value ? colors.primaryColor : '#F3F3F3',
          //   // Add border at the bottom
          //   borderBottomWidth: 1,
          //   borderBottomColor: colors.black, // Customize the border color as needed
          // },
          customInputStyle,
        ]}
        keyboardType={KT ? KT : 'default'}
        secureTextEntry={secureTextEntry}
        editable={editable}
        check={check}
      />

      {isEye && (
        <TouchableOpacity style={[styles.leftIconBox]} onPress={onEyePress}>
          <Feather
            name={secureTextEntry ? 'eye-off' : 'eye'}
            color={colors.black}
            size={20}
          />
        </TouchableOpacity>
      )}
      {updateText ? (
        <Text
          style={[
            style.font14Re,
            {fontFamily: fonts.bold, color: colors.black, top: 7},
          ]}>
          {updateText}
        </Text>
      ) : null}
      {error ? <Text style={styles.error}>This is required.</Text> : null}
      {errorDisc ? <Text style={styles.error}>{errorDisc}</Text> : null}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    // marginBottom: 0,
    paddingLeft: 0,
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    backgroundColor: colors.white,
    flex: 1,
    paddingRight: 45,

    paddingBottom: 0,
  },
  iconBox: {
    width: 20,
    height: 20,
    resizeMode: 'center',
    position: 'absolute',
    zIndex: 1,
    right: 0,
    top: 20,
  },
  inputBox: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#575757',
  },
  leftIconBox: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    top: 20,
    height: 50,
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginLeft: 10, // Adjust the margin as needed
  },
});
