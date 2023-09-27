import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import {colors, fonts} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputBox from '../../components/InputBox';

import Footer from '../../components/Footer';
import style from '../../assets/css/style';
import Button from '../../components/Button';
import {BaseButton} from '../../components/BaseButton';
import {Email, Users} from '../../assets/images';
import {useTranslation} from 'react-i18next';
import {ToastMessage} from '../../utils/Toast';
import ApiRequest from '../../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
const VerifyCode = ({route}) => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    code: '',
  });
  const {t} = useTranslation();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEyePressed, setEyePressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onEyePress = () => {
    setEyePressed(!isEyePressed);
  };
  // const { OTP, formData } = route?.params;
  const OTP = route?.params?.OTP;
  const formData = route?.params?.formData;
  const OTPReset = route?.params?.OTPReset;

  // console.log(OTP, formData);

  const Otpverified = async () => {
    setIsLoading(true);

    if (OTP === parseInt(data.code)) {
      // setIsLoading(false);
      try {
        setIsLoading(true);
        const res = await ApiRequest({
          type: 'register',
          email: formData.email.toLowerCase(),
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
        });
        const resp = res?.data?.result;

        console.log('1');
        console.log(res.data);
        if (resp) {
          const id = JSON.stringify(res?.data?.user_id);
          console.log('redsfdfnsdkjfjhsdfgjhsdfg');

          // const user_type = res?.data?.user_type;
          await AsyncStorage.setItem('user_id', id);

          navigation.navigate('MainStack', {screen: 'AppStack'});
          setIsLoading(false);
          // setFormData({email: '', password: ''});
        } else {
          console.log('3');
          ToastMessage(res.data?.message);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
      // navigation.navigate('MainStack', {screen: 'AppStack'});
    } else if (OTPReset.code === parseInt(data.code)) {
      setIsLoading(false);
      navigation.navigate('ResetPassword', {OTPReset: OTPReset});
    }
  };

  // const [value, setValue] = useState('');
  const validateForm = useMemo(() => {
    const valueValid = data?.code?.length === 4;
    return valueValid;
  }, [data.code]);

  return (
    <Container customStyle={{paddingHorizontal: 0}}>
      <View style={{marginVertical: 20, padding: 10}}>
        <AuthHeader />
        <Text
          style={[
            style.font28Re,
            {fontFamily: fonts.timenewregularroman, marginTop: 50},
          ]}>
          {t('Reset Password')}
        </Text>
      </View>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[
              style.font20Re,
              {
                color: colors.black,
                fontFamily: fonts.boldExtra,
                alignSelf: 'center',
                marginVertical: 20,
              },
            ]}>
            Enter $-Digit Code
          </Text>

          <InputBox
            notShow
            placeholder={'Enter Code'}
            KT={'number-pad'}
            value={data.code}
            onChangeText={text => {
              setData({...data, code: text});
            }}
          />

          <View style={styles.buttonContainer}>
            <BaseButton
              title={
                isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  t('Verify Email')
                )
              }
              disabled={!validateForm}
              defaultStyle={{width: '80%'}}
              onPress={Otpverified}
            />
            <Text
              style={[
                style.font14Re,
                {
                  fontFamily: fonts.bold,
                  textDecorationLine: 'underline',
                  color: colors.black,
                  alignSelf: 'center',
                  marginVertical: 20,
                },
              ]}>
              Send Again
            </Text>
          </View>
        </ScrollView>
        <Footer agreed={false} textStyle={{color: colors.black}} />
      </View>
    </Container>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '0%',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonContainer: {
    marginVertical: 20,
    // paddingHorizontal: 20,
  },
});
