import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import CardHomeList from '../HomeListScreen/CardHomeList';
import style from '../../assets/css/style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BackArrow} from '../../assets/images';
import {colors} from '../../constants';
import {useTranslation} from 'react-i18next';

const ListOfMusic = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route?.params?.item;
  const category = route?.params?.category;
  const topic = route?.params?.topic;
  const lang = route?.params?.lang;
  const status = route?.params?.status;
  console.log(item.profile_url, '!@#$%^&*((*&^%$#@#^&%$#@#$%^');
  const {t} = useTranslation();
  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 1)',
        paddingHorizontal: 12,
        flex: 1,
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
            {t('Music')}
          </Text>
        </View>
      </View>
      <CardHomeList
        topicData={item}
        card_Title={
          lang === 'es' ? item?.category?.name_german : item?.category?.name
        }
        voice={t('germanMale')}
        duration={topic?.duration_male}
        onPress={() => {
          !topic.audio_file_male
            ? ToastMessage('This is uder proces')
            : navigation.navigate('MainStack', {
                screen: 'MediaPlayerAudio',

                params: {
                  itemsFav: item,
                  topicFav: topic,
                  disable: 'disable',
                  title:
                    lang === 'es'
                      ? item?.category?.name_german
                      : item?.category?.name,
                  card_Title:
                    lang === 'es'
                      ? item?.category?.name_german
                      : item?.category?.name,
                  voice: t('germanMale'),
                  status: item?.status,
                  audioFile: item?.profile_url + topic?.audio_file_male,
                },
              });
        }}
      />

      <CardHomeList
        topicData={item}
        card_Title={
          lang === 'es' ? item?.category?.name : item?.category?.name_german
        }
        duration={topic.duration_female}
        voice={t('femaleGermal')}
        onPress={() => {
          !topic.audio_file_male
            ? ToastMessage('This is uder proces')
            : navigation.navigate('MainStack', {
                screen: 'MediaPlayerAudio',

                params: {
                  itemsFav: item,
                  topicFav: topic,
                  disable: 'disable',
                  title:
                    lang === 'es'
                      ? item?.category?.name
                      : item?.category?.name_german,
                  card_Title:
                    lang === 'es'
                      ? item?.category?.name
                      : item?.category?.name_german,
                  voice: t('femaleGermal'),
                  status: item?.status,
                  audioFile: item?.profile_url + topic?.audio_file_male,
                },
              });
        }}
      />
    </View>
  );
};

export default ListOfMusic;

const styles = StyleSheet.create({});
