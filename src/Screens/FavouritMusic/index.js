import {
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import CardHomeList from '../HomeListScreen/CardHomeList';
import {useTranslation} from 'react-i18next';
import {ToastMessage} from '../../utils/Toast';
import ApiRequest from '../../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constants';
import {BackArrow} from '../../assets/images';

const FavouriteMusic = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataFav, setDataFav] = useState([]);
  const [leng, setLeng] = useState([]);
  const handleGetMusicFav = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const len = await AsyncStorage.getItem('selectedLanguage');
    setLeng(len);
    // console.log(user_id, 'uuuuuuuuuuuuuuuu');
    try {
      // setIsLoading(true);
      const res = await ApiRequest({
        type: 'get_fav_data',

        user_id: user_id,
      });

      console.log(res?.data?.data, 'home');

      setDataFav(res?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetMusicFav();
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 1)',
        paddingHorizontal: 12,
        flex: 1,
        height: '100%',
        paddingTop:
          Platform.OS == 'ios' ? getStatusBarHeight() : StatusBar.currentHeight,
      }}>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={'#000000'}
        translucent={true}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text
            style={[
              style.font14Re,
              {color: colors.white, marginVertical: 10, textAlign: 'center'},
            ]}>
            {t('Favourite Music')}
          </Text>
        </View>
      </View>
      <FlatList
        data={dataFav}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              height: Dimensions.get('screen').height,
              // backgroundColor: 'red',
              // alignSelf: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: 14,
                fontFamily: fonts.semiBold,
                marginBottom: 15,
              }}>
              Not Found Data
            </Text>
          </View>
        }
        renderItem={({item}) => {
          console.log(item, 'item');
          return (
            <TouchableOpacity
              onPress={() => {
                // !item?.topic?.audio_file_male
                //   ? ToastMessage('This is uder proces')
                // :
                // navigation.navigate('MainStack', {
                //   screen: 'MediaPlayerAudio',
                navigation.navigate('MainStack', {
                  screen: 'ListOfMusic',

                  params: {
                    // title: item?.category.name,
                    // title_german: item?.category?.name_german,
                    // card_Title: item?.category?.name,
                    // voice: t('germanMale'),
                    lang: leng,
                    item: item,
                    topic: item?.topics,
                    category: item?.category,
                    // audioFile:
                    //   topicData?.profile_url + topicData?.audio_file_male,
                  },
                });
              }}>
              <ImageBackground
                source={require('../../assets/images/HomeCardbg.png')}
                // source={bgImg}
                style={styles.imageBackground}>
                <View
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    paddingHorizontal: 12,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <Text style={[style.font14Re]}>
                    {leng === 'es'
                      ? item.category.name_german
                      : item.category.name}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            // <CardHomeList
            //   topicData={item.topic}
            //   card_Title={'card_Title'}
            //   voice={t('germanMale')}
            //   duration={item?.topic?.duration_female}
            //   onPress={() => {
            //     !item?.topic?.audio_file_male
            //       ? ToastMessage('This is uder proces')
            //       : navigation.navigate('MainStack', {
            //           screen: 'MediaPlayerAudio',

            //           params: {
            //             title: 'title',
            //             card_Title: 'card_Title',
            //             voice: t('germanMale'),
            //             audioFile:
            //               topicData.profile_url + topicData.audio_file_male,
            //           },
            //         });
            //   }}
            // />
          );
        }}
      />
    </View>
  );
};

export default FavouriteMusic;

const styles = StyleSheet.create({
  imageBackground: {
    height: 110,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 4,
  },
});
