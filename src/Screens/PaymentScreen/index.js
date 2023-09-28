import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import style from '../../assets/css/style';
import { colors, fonts } from '../../constants';
import WhiteForword from '../../assets/WhiteForword.png';
import WhiteCross from '../../assets/WhiteCross.png';
import PaymentText from './PaymentText';
import SubcriptionCard from './SubcriptionCard';
import { BaseButton } from '../../components/BaseButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import GooglePay from '../GooglePay/GooglePay';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState('');

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: 'add_data',
        table_name: 'payment_subscriptions',
        user_id: 1,
        status: 'success or failure',
        payment_response: 'json format',
        plan_type: 'monthly',
      });
      const resp = res?.data?.result;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <ImageBackground
        source={require('../../assets/GooglePay.png')}
        style={{
          flex: 1,
          padding: 20,
          paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() + 20 : 20,
        }}>
        <FocusAwareStatusBar
          animated={true}
          barStyle={'light-content'}
          backgroundColor={'#4d4d4d'}
        // translucent={true}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Text
              style={[style.font20Re, { fontFamily: fonts.bold, width: 300 }]}>
              {t('MENTAL MOVEMENT/PREMIUM ACCESS')}
              {/* style={[style.font20Re, {fontFamily: fonts.bold, width: 300}]}> */}
            </Text>
            <Text style={[style.font12Re, { marginVertical: 10 }]}>
              Come for the journey - Safe for the shift
            </Text>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <PaymentText
                title={t(
                  'Join the Mental Movement App to boost your mental health & performance',
                )}
              />
              <PaymentText
                title={t(
                  'Gain exclusive access to Hypnosis & Meditations audio files from Dr. Marco Rathschlag & his team especially designed for athletes to enhance their performance',
                )}
              />
              <PaymentText
                title={t(
                  'Create a playlist of your favorite tracks, listen offline and and unlock your full potential in your sport',
                )}
              />
            </View>

            <SubcriptionCard selected={selected} item={'1'} onPress={() => setSelected('1')} title={t('Monthly Subscription')} price={'6.99'} />
            <SubcriptionCard
              selected={selected} item={'2'}
              onPress={() => setSelected('2')}
              title={t('Annually Subscription')}
              price={'69.99'}
            />
            <View
              style={{
                alignItems: 'center',
                // height: 100,
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={[style.font12Re]}>{t('SUBSCRIBE TODAY')}</Text>
              <Text style={[style.font12Re, { textAlign: 'center' }]}>
                {t(
                  'Payment will be charged to your App Store/Play Store account at the confirmation of purchase',
                )}
              </Text>
              <Text
                style={[
                  style.font12Re,
                  { textAlign: 'center', marginVertical: 10 },
                ]}>
                {t(
                  'When subscription will be expired you can use access these program free for forever. Training Day Morning, Training Day Evening, Competition Day Morning, Competition Day Evening',
                )}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                  <Text style={[style.font12Re, { fontFamily: fonts.bold }]}>
                    Terms ·
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Privacy')}>
                  <Text style={[style.font12Re, { fontFamily: fonts.bold }]}>
                    {' '}
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <BaseButton
        title={'Google Pay'}
        onPress={() => navigation.navigate('Account')}
        textStyle={{ color: colors.black }}
        defaultStyle={{
          marginVertical: 30,
          backgroundColor: '#CFBA00',
          width: '90%',
        }}
      /> */}
          </View>
        </ScrollView>
        <GooglePay
          selected={selected}
          data={route.params}
          setIsLoading={setIsLoading}
        />
      </ImageBackground>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
