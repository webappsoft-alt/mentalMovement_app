import React, {useEffect, useState} from 'react';
import style from '../../assets/css/style';
import {colors} from '../../constants';
import {deviceWidth} from '../../constants/Dimentions';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ProfileCard = ({title, source, onPress}) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        {
          // flexDirection: 'row',
          // alignItems: 'center',
          // justifyContent: 'space-between',
        }
      }>
      <View
        style={{
          // paddingHorizontal: 10,
          // width: '100%',
          // backgroundColor: 'red',
          flexDirection: 'row',
          marginVertical: 6,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 0.2,
          paddingBottom: 20,
          borderBottomColor: colors.white,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: colors.line,
              // padding: 10,
              borderRadius: 50,
            }}>
            {source}
            {/* <Image
              source={source}
              style={{height: 20, width: 20}}
              // resizeMode="center"
            /> */}
          </View>
          <Text style={[style.font16Re, {paddingLeft: 16}]}>{t(title)}</Text>
        </View>
        <Icon name={'chevron-forward'} size={22} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({});
