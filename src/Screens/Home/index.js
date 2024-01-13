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
import Container from '../../components/Container';
import {AppLogo, Drawer, Heart, Logo_MentalMovement} from '../../assets/images';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CardHome from './CardHome';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {useTranslation} from 'react-i18next';
import ApiRequest from '../../services/ApiService';
import {deviceHeight} from '../../constants/Dimentions';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Modal from 'react-native-modal';
import {BaseButton} from '../../components/BaseButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo';
import AppHeader from './Header';

const Home = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  // useEffect(() => {
  //   handleGetHome();
  // }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [leng, setLeng] = useState([]);
  const [name, setName] = useState('');
  // const [dataLoading,e] = useState(true);
  // console.log(data, 'home data');
  // const handleGetHome = async () => {
  //   try {
  //     // setIsLoading(true);
  //     const res = await ApiRequest({
  //       type: 'get_home',
  //     });
  //     setData(res.data.section);
  //     setIsLoading(false);
  //     // console.log(res.data, 'home');
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log(error);
  //   }
  // };

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

  const Img = [];
  const nameArr = [
    {
      id: '1',
      name: 'TRAINING DAY',
      name_g: 'TRAININGSTAG',
      img: require('../../assets/images/HomeTrani.jpg'),
      navigate: 'TRAININGSTAG',
    },
    {
      id: '2',
      name: 'REST DAY',
      name_g: 'RUHETAG',
      img: require('../../assets/images/HomeComp.jpg'),
      navigate: 'RUHETAG',
    },
    {
      id: '3',
      name: 'COMPETITION DAY',
      name_g: 'WETTKAMPFTAG',
      img: require('../../assets/images/HomeRest.jpg'),
      navigate: 'WETTKAMPFTAG',
    },
  ];
  return (
    <>
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
          <AppHeader />
          <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
            {t('Hi ')} {name}
            {','}
          </Text>
          <Text style={[style.font16Re, {marginVertical: 10, marginLeft: 5}]}>
            {t('Whats happening today?')}
          </Text>
          {/* {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <View
              style={{
                flex: 1,
                paddingBottom: Platform.OS == 'android' ? 10 : 0,
              }}>
              <FlatList
                data={data}
                renderItem={({item, index}) => {
                  return (
                    <CardHome
                      items={item}
                      bgImg={Img[index]}
                      leng={leng}
                      topic={item?.topic}
                      subscription={subscription}
                      toggleToast={toggleToast}
                    />
                  );
                }}
              />
            </View>
          )} */}
          <View
            style={{
              flex: 1,
              paddingBottom: Platform.OS == 'android' ? 10 : 0,
            }}>
            <FlatList
              data={nameArr}
              keyExtractor={({item}) => item?.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate(item?.navigate)}>
                  <ImageBackground
                    source={item?.img}
                    style={styles.imageBackground}>
                    <View
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        paddingHorizontal: 12,
                        flex: 1,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        paddingTop:
                          Platform.OS == 'ios' ? getStatusBarHeight() : 0,
                      }}>
                      <Text style={[style.font14Re, {padding: 10}]}>
                        {leng === 'es' ? item?.name_g : item?.name}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            />
          </View>
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

export default Home;

const styles = StyleSheet.create({
  imageBackground: {
    height: 130,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 4,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});
