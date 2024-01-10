import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import { ITEM_SKUS } from '../../utils/CommonFunc';
import { initConnection, getProducts, flushFailedPurchasesCachedAsPendingAndroid } from "react-native-iap";
import GooglePay from '../GooglePay/GooglePay';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [produc, setProduc] = useState([]);

  const getProduct = async () => {
    setIsLoading(true)
    try {
      const connected = await initConnection();

      if (!connected) {
        return [];
      }

      const products = await getProducts({ skus: ITEM_SKUS })
      console.log(products)
      setProduc(products);
      if (Platform.OS === 'android') {
        flushFailedPurchasesCachedAsPendingAndroid();
      }
    } catch (error) {
      console.log("errrr==>>>>>>", error)
    } finally { setIsLoading(false) }
  }

  useEffect(() => {
    getProduct()
  }, [])

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
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Text
                style={[style.font20Re, { fontFamily: fonts.bold, width: '70%' }]}>
                {t('MENTAL MOVEMENT/PREMIUM ACCESS')}
              </Text>
              <Pressable onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{
                    name: 'MainStack',
                    state: {
                      routes: [
                        {
                          name: "AppStack",
                        }
                      ]
                    }
                  }]
                })
              }}>
                <Text
                  style={[style.font20Re, { fontFamily: fonts.bold, }]}>
                  {t('Skip')}
                </Text>
              </Pressable>
            </View>
            <Text style={[style.font12Re, { marginVertical: 10 }]}>
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
            {
              produc.map((item) => (
                <SubcriptionCard selected={selected} item={item.productId} onPress={() => setSelected(item.productId)} title={(item.productId == 'com.mentalmovement.001' || item.productId == 'com.mentalmovement.001c') ? t('Monthly Subscription') : t('Annually Subscription')} price={item.localizedPrice} />
              ))
            }

            <View
              style={{
                alignItems: 'center',
                // height: 100,
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={[style.font12Re]}>{t('SUBSCRIBE TODAY')}</Text>
              <Text
                style={[
                  style.font12Re,
                  { textAlign: 'center', marginVertical: 10 },
                ]}>
                {/* {t(
                  'When subscription will be expired you can use access these program free for forever. Training Day Morning, Training Day Evening, Competition Day Morning, Competition Day Evening',
                )} */}
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
          </View>
        </ScrollView>

        <GooglePay
          sku={selected}
          setIsLoading={setIsLoading}
        />
      </ImageBackground>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
