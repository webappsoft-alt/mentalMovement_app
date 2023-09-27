import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import WhiteForword from '../../assets/WhiteForword.png';
import WhiteCross from '../../assets/WhiteCross.png';

const PaymentText = ({title}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        // justifyContent: 'space-between',
        //   paddingHorizontal: 10,
        marginVertical: 8,
      }}>
      <Image source={WhiteForword} style={{height: 15, width: 15}} />
      <Text style={[style.font12Re, {paddingLeft: 10}]}>{title}</Text>
    </View>
  );
};

export default PaymentText;

const styles = StyleSheet.create({});
