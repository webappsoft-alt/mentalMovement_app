import {
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {fonts} from '../../constants';
import {Heart} from '../../assets/images';

const ExploreTranungCard = ({title, subTitle, imageSource, onPress, time}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={imageSource}
        style={{
          height: 100,
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            height: 100,
            justifyContent: 'space-around',
          }}>
          <Text style={[style.font14Re, {fontFamily: fonts.bold}]}>
            {title}
          </Text>
          <Text style={[style.font14Re, {fontFamily: fonts.medium}]}>
            {subTitle}
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            alignItems: 'flex-end',
            marginTop: 12,
          }}>
          <Heart />
          <Text
            style={[style.font14Re, {fontFamily: fonts.medium, marginTop: 12}]}>
            {time}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ExploreTranungCard;

const styles = StyleSheet.create({});
