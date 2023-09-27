import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import style from '../../../assets/css/style';
import AuthHeader from '../../../components/AuthHeader';
import {fonts} from '../../../constants';

const HeadAuth = () => {
  return (
    <View style={{marginVertical: 20, padding: 10}}>
      <AuthHeader />
      <Text
        style={[
          style.font28Re,
          {fontFamily: fonts.timenewregularroman, marginTop: 50},
        ]}>
        Change Password
      </Text>
    </View>
  );
};

export default HeadAuth;

const styles = StyleSheet.create({});
