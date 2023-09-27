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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Container from '../../components/Container';
import {AppLogo, Drawer, Heart} from '../../assets/images';
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

const Home = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const TrainingDay = [
    {key: '1', text: 'MORNING'},
    {key: '2', text: 'AFTERNOON'},
    {key: '3', text: 'EVENING'},
    {key: '4', text: 'PRE TRAINING'},
    {key: '5', text: 'POST TRAINING'},
  ];
  const CompetitionDay = [
    {key: '1', text: 'MORNING'},
    {key: '2', text: 'AFTERNOON'},
    {key: '3', text: 'EVENING'},
    {key: '4', text: 'PRE TRAINING'},
    {key: '5', text: 'POST TRAINING'},
  ];
  const RestDay = [
    {key: '1', text: 'MORNING'},
    {key: '2', text: 'AFTERNOON'},
    {key: '3', text: 'EVENING'},
  ];

  useEffect(() => {
    handleGetHome();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [leng, setLeng] = useState([]);
  // const [dataLoading,e] = useState(true);
  // console.log(data, 'home data');
  const handleGetHome = async () => {
    const len = await AsyncStorage.getItem('selectedLanguage');
    // console.log(len);
    setLeng(len);
    try {
      // setIsLoading(true);
      const res = await ApiRequest({
        type: 'get_home',
      });
      setData(res.data.section);
      setIsLoading(false);
      // console.log(res.data, 'home');
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
    const id = await AsyncStorage.getItem('user_id');
    const ApiData = {
      type: 'subscription_days',
      user_id: id,
    };
    try {
      const res = await ApiRequest(ApiData);
      setSubscription(res.data.subscription_remaining_day);
      if (res.data.subscription_remaining_day == 0) {
        toggleToast();
      }
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      checkSubscription();
      return () => {};
    }, []),
  );

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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              // flex: 1,
              marginVertical: 20,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Drawer />
            </TouchableOpacity>

            <AppLogo />

            <Heart />
          </View>
          <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
            {t('Hi Marco')}
          </Text>
          <Text style={[style.font16Re, {marginVertical: 10}]}>
            {t('Whats happening today?')}
          </Text>
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <View style={{flex: 1, paddingBottom: 80}}>
              <FlatList
                data={data}
                renderItem={({item}) => {
                  return (
                    <CardHome
                      items={item}
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
              Your Subscription has been expired. Please purchase a new
              subscription plan.
            </Text>
            <BaseButton
              defaultStyle={{width: '80%'}}
              title={'Upgrade'}
              onPress={async () => {
                toggleModal();
                const id = await AsyncStorage.getItem('user_id');
                navigation.navigate('PaymentScreen', {id: id});
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
