import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { SelfEsteemCardPlayer } from '../../assets/images';
import { colors, fonts } from '../../constants';
import style from '../../assets/css/style';

const CardHomeList = ({
  title,
  subTitle,
  imageSource,
  lenght,
  item,
  onPress,
  topicData,
  card_Title,
  voice,
  duration,
}) => {
  // console.log(topicData);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'white',
        height: 80,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image
          source={require('../../assets/images/SelfExteemCard.png')}
          style={{ height: 72, width: 72, borderRadius: 10, marginLeft: 4 }}
        />
        <View
          style={{
            marginLeft: 10,
            justifyContent: 'space-between',
            height: 45,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontFamily: fonts.bold,
            }}>
            {card_Title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                style.font10Re,
                { color: colors.black, fontFamily: fonts.bold },
              ]}>
              {voice} Voice{' '}
            </Text>
            <Text
              style={[
                style.font10Re,
                { color: colors.black, fontFamily: fonts.bold },
              ]}>
              {/* - {duration} */}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginRight: 14 }}>
        <SelfEsteemCardPlayer />
      </View>
    </TouchableOpacity>
  );
};

export default CardHomeList;
