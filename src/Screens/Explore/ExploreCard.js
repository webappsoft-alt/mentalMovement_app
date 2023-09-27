import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import {fonts} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const ExploreCard = ({items, time, leng, onPress}) => {
  console.log(items.category, 'lllllllll');
  const navigation = useNavigation();
  return (
    <View>
      <Text style={[style.font16, {fontFamily: fonts.bold, width: 200}]}>
        {leng === 'es' ? items.name_german : items.name}
      </Text>
      <FlatList
        data={items.category}
        renderItem={({item}) => {
          console.log('sub_category//////////////////', item.topic);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MainStack', {
                  screen: 'ExploreTraning',
                  params: {
                    heading: items.name,
                    sub_category: item.sub_category,
                    topic: item.topic,
                    card_Title: item.name,
                  },
                })
              }>
              <ImageBackground
                source={require('../../assets/images/ExploreBg.png')}
                style={{
                  height: 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  marginVertical: 10,
                }}>
                <Text
                  style={[style.font16, {fontFamily: fonts.bold, width: 200}]}>
                  {leng === 'es' ? items.name_german : items.name}
                </Text>
                <Text style={[style.font12, {fontFamily: fonts.medium}]}>
                  {'time'}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ExploreCard;

const styles = StyleSheet.create({});
