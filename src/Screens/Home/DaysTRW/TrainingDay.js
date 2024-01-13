import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  AppLogo,
  Drawer,
  Heart,
  Logo_MentalMovement,
} from '../../../assets/images';
import style from '../../../assets/css/style';
import {colors, fonts} from '../../../constants';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import CombineCard from './CombineCard';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {useTranslation} from 'react-i18next';
import ApiRequest from '../../../services/ApiService';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import Modal from 'react-native-modal';
import {BaseButton} from '../../../components/BaseButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo';
import {Img1, Img2} from '../../../assets/images/img';
import {Google, Help} from '../../../assets/images/Profile';
import AppHeader from '../Header';

const TraningDay = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isFocuses = useIsFocused();
  useEffect(() => {
    handleGetHome();
  }, [isFocuses]);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [leng, setLeng] = useState([]);
  const [name, setName] = useState('');

  const handleGetHome = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    console.log('id', user_id);
    try {
      // setIsLoading(true);
      const res = await ApiRequest({
        type: 'get_category_data',
        id: 48,
        user_id: user_id,
      });
      console.log('Call Traning=======>>>>>>>>>home');
      setData(res.data.category);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [subscription, setSubscription] = useState('');

  const toggleToast = () => {
    toggleModal();
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const checkSubscription = async () => {
    const username = await AsyncStorage.getItem('name');
    const len = await AsyncStorage.getItem('selectedLanguage');
    setLeng(len);
    setName(username);

    const id = await AsyncStorage.getItem('user_id');
    const ApiData = {
      type: 'subscription_days',
      user_id: id,
    };
    const userData = {
      type: 'get_data',
      table_name: 'users',
      id: id,
    };

    try {
      const res = await ApiRequest(ApiData);
      const respo = await ApiRequest(userData);
      // console.log(respo.data.data)
      const days = calculateDaysPassed(
        new Date(respo.data.data[0].timestamp),
        new Date(),
      );
      if (res.data.subscription_remaining_day == 0 && days < 7) {
        setSubscription(7);
      } else {
        setSubscription(res.data.subscription_remaining_day);
      }
    } catch (error) {}
  };

  const calculateDaysPassed = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((endDate - startDate) / oneDay));
  };

  useFocusEffect(
    React.useCallback(() => {
      checkSubscription();
      return () => {};
    }, []),
  );

  const Img = [
    require('../../../assets/images/One.png'),
    require('../../../assets/images/Three.png'),
    require('../../../assets/images/Four.png'),
    require('../../../assets/images/Five.png'),
  ];
  return (
    <>
      <ImageBackground
        source={require('../../../assets/images/png/start_img.png')}
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
          <AppHeader />
          <Text
            style={[
              style.font16Re,
              {fontFamily: fonts.bold, marginVertical: 10, color: colors.white},
            ]}>
            {leng === 'es' ? 'TRAININGSTAG' : 'TRAINING DAY'}
          </Text>
          {/* <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
            {t('Hi ')} {name}
            {','}
          </Text>
          <Text style={[style.font16Re, {marginVertical: 10, marginLeft: 5}]}>
            {t('Whats happening today?')}
          </Text> */}
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <View
              style={{
                flex: 1,
                paddingBottom: Platform.OS == 'android' ? 10 : 0,
              }}>
              <FlatList
                data={data}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                renderItem={({item, index}) => {
                  // console.log(item && item?.topic, 'oppo');
                  // const Img =
                  // index % 2 === 0
                  //   ? require('../../../assets/images/start_img.png')
                  //   : require('../../../assets/images/SelfExteemCard.png');
                  return (
                    <CombineCard
                      bgImg={Img[index]}
                      items={item}
                      topic={item?.topic}
                      leng={leng}
                      subscription={subscription}
                      toggleToast={toggleToast}
                    />
                  );
                }}
              />
            </View>
          )}
        </View>
      </ImageBackground>

      <Modal
        style={{margin: 0}}
        isVisible={isVisible}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              width: '80%',
              padding: 18,
              borderRadius: 20,
            }}>
            <Pressable onPress={toggleModal} style={{alignSelf: 'flex-end'}}>
              <Icon name="circle-with-cross" color={colors.black} size={24} />
            </Pressable>
            <Text
              style={[
                style.font14,
                {textAlign: 'center', color: colors.black, paddingVertical: 10},
              ]}>
              {t('subscripiton')}
            </Text>
            <BaseButton
              defaultStyle={{width: '80%'}}
              title={'Subscribe Now'}
              onPress={async () => {
                toggleModal();
                navigation.navigate('PaymentScreen');
              }}
            />
          </View>
        </View>
      </Modal>
      {/* //////////////// */}
    </>
  );
};

export default TraningDay;

const styles = StyleSheet.create({});
