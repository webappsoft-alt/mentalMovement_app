import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import {AppLogo, Drawer, Heart} from '../../assets/images';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreCard from './ExploreCard';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {useTranslation} from 'react-i18next';
import ApiRequest from '../../services/ApiService';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Explore = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const TOPICS = [
    {
      id: '1',
      title: t('SELF-ESTEEM'),
      time: '15 mins · Harry',
    },
    {
      id: '2',
      title: t('FOKUS'),
      time: '15 mins · Harry',
    },
    {
      id: '3',
      title: t('COMPETION ANXIETY'),
      time: '15 mins · Harry',
    },
  ];

  useEffect(() => {
    handleGetExplore();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [leng, setLeng] = useState([]);
  // console.log(data, 'explore data');
  const handleGetExplore = async () => {
    const len = await AsyncStorage.getItem('selectedLanguage');
    setLeng(len);
    try {
      const res = await ApiRequest({
        type: 'get_explore',
      });
      setData(res.data.section);
      setIsLoading(false);
      console.log(res.data, 'explore home');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/png/start_img.png')}
      style={{flex: 1}}>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={'#000000'}
        translucent={true}
      />
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          paddingHorizontal: 12,
          flex: 1,
          paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginVertical: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Drawer />
          </TouchableOpacity>

          <AppLogo />

          <Heart />
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            alignItems: 'center',
            borderRadius: 50,
            marginBottom: 20,
            height: 45,
          }}>
          <TextInput placeholder="Search" style={{}} />
          <Icon name="search" size={16} />
        </View>

        {/* <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
          {t('TOPICS')}
        </Text> */}
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <View style={{flex: 1, paddingBottom: 80}}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <ExploreCard
                  items={item}
                  leng={leng}
                  // title={item.name}
                  // time={item.time}
                  // onPress={() =>
                  //   navigation.navigate('MainStack', {
                  //     screen: 'ExploreTraning',
                  //     params: {
                  //       heading: t('Traning Days'),
                  //     },
                  //   })
                  // }
                />
              )}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Explore;

const styles = StyleSheet.create({});
