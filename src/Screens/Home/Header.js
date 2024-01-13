import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Drawer, Heart, Logo_MentalMovement} from '../../assets/images';
import {Image} from 'react-native';

const AppHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        // flex: 1,
        marginVertical: 10,
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Drawer />
      </TouchableOpacity>

      <Image
        source={Logo_MentalMovement}
        style={{width: 180, height: 80}}
        resizeMode="center"
      />
      <TouchableOpacity onPress={() => navigation.navigate('FavouriteMusic')}>
        <Heart />
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
