import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import style from '../../../assets/css/style';
import {useNavigation} from '@react-navigation/native';

import {ToastMessage} from '../../../utils/Toast';
import {colors, fonts} from '../../../constants';
import Icon from 'react-native-vector-icons/AntDesign';
const CombineCard = ({
  items,
  topic,
  leng,
  bgImg,
  subscription = '',
  toggleToast = () => '',
}) => {
  const navigation = useNavigation();
  const topics = topic && topic[0];
  // console.log(topics?.favourite, 'item====>>.');
  return (
    <>
      <TouchableOpacity
        style={{width: '48%'}}
        onPress={() => {
          if (topics?.audio_file_female == undefined) {
            ToastMessage('There is no currently file present in this category');
            return;
          }
          navigation.navigate('HomeListScreen', {
            items: items,
            title: items?.name,
            name_german: items?.name_german,
            card_Title: items?.name,
            cardgerman_Title: items?.name_german,
            topic: topics,
            desc: topics?.description,
            germa_desc: topics?.description_german,
            status: topics?.favourite,
          });
        }}>
        {topics?.audio_file_female != undefined ? (
          <View style={styles.imageBackground}>
            <ImageBackground
              // source={require('../../../assets/images/HomeCardbg.png')}
              source={bgImg}
              style={styles.imageBackground}>
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  paddingHorizontal: 12,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',

                  borderRadius: 15,
                  paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 0,
                }}>
                <Text style={[style.font12Re, {padding: 10}]}>
                  {leng === 'es' ? items.name_german : items.name}
                </Text>
              </View>
            </ImageBackground>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              paddingHorizontal: 12,
              flex: 1,
              borderRadius: 15,
              width: '100%',

              height: 110,

              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 8,
              marginHorizontal: 4,
              paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 0,
            }}>
            <Text style={[style.font12Re, {padding: 10}]}>Comming soon</Text>
          </View>
        )}
      </TouchableOpacity>
      {/* <FlatList
        numColumns={2}
        data={items}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => {
          // console.log(item[0], '&&&&&&&&&&&&&&&&&&&&&&&');
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.topic.audio_file_female == undefined) {
                  ToastMessage(
                    'There is no currently file present in this category',
                  );
                  return;
                }
                if (index < 3) {
                  navigation.navigate('HomeListScreen', {
                    title: items.name,
                    name_german: items.name_german,
                    card_Title: item.name,
                    cardgerman_Title: item.name_german,
                    topic: item.topic,
                    desc: items.description,
                    germa_desc: items.description_german,
                  });
                  return;
                }
                if (subscription == 0) {
                  return toggleToast();
                }
                navigation.navigate('HomeListScreen', {
                  title: items.name,
                  name_german: items.name_german,
                  card_Title: item.name,
                  cardgerman_Title: item.name_german,
                  topic: item.topic,
                  desc: items.description,
                  germa_desc: items.description_german,
                });
              }}>
              <ImageBackground
                source={require('../../../assets/images/HomeCardbg.png')}
                style={styles.imageBackground}>
                <Text style={[style.font12Re, {padding: 10}]}>
                  {leng === 'es' ? item.name_german : item.name}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      /> */}
    </>
  );
};

export default CombineCard;

const styles = StyleSheet.create({
  imageBackground: {
    height: 110,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // backgroundColor: 'red',
    overflow: 'hidden',
    marginHorizontal: 4,
    marginVertical: 8,
  },
});
