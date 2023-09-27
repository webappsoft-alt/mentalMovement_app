import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import React, {useState, useMemo} from 'react';
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
import ApiRequest from '../../services/ApiService';
import {validateEmail} from '../../utils/Validations';
import {ToastMessage} from '../../utils/Toast';

const VerifyEmail = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    email: '',
  });

  const [disable, setDisable] = useState(true);
  useMemo(() => {
    const isData = data?.email?.trim() && validateEmail(data.email);
    setDisable(!isData);
  }, [data]);

  const [isFormValid, setIsFormValid] = useState(false);
  const [isEyePressed, setEyePressed] = useState(false);

  const onEyePress = () => {
    setEyePressed(!isEyePressed);
  };
  const {t} = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const handleEmailVerified = async () => {
    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: 'forgot_password',
        email: data?.email?.toLowerCase(),
      });
      const resp = res?.data.result;
      console.log('res.data', res.data);
      if (resp) {
        //   console.log('register donesss////');
        //   await AsyncStorage.setItem('user_id', userIdString);
        //   console.log(typeof id, 'type of id');

        ToastMessage(res?.data?.message);
        setIsLoading(false);
        navigation.navigate('VerifyCode', {
          // formData: formData,
          OTPReset: res?.data,
        });
      } else {
        setIsLoading(false);
        ToastMessage(res?.data?.message);
      }
    } catch (error) {
      setIsLoading(false);
      ToastMessage(res?.data?.message);
      console.log(error);
    }
  };
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
            {t('Reset Password with Email')}
          </Text>

          <InputBox
            notShow
            placeholder={'Email'}
            KT={'email-address'}
            value={data.email}
            onChangeText={text => {
              setData({...data, email: text});
            }}
            Icon={() => <Email />}
          />
          {!validateEmail(data.email) && data.email.length > 2 && (
            <Text style={{top: -12, color: colors.red}}>
              {' '}
              Enter valid email (abc@gmail.com)
            </Text>
          )}
          <View style={styles.buttonContainer}>
            <BaseButton
              title={
                isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  t('Verify Email')
                )
              }
              onPress={handleEmailVerified}
              disabled={disable}
              defaultStyle={{width: '80%', marginVertical: 24}}
              // onPress={() =>
              //   navigation.navigate('MainStack', {screen: 'AppStack'})
              // }
            />
            {/* <BaseButton
              title={t('Verify Email')}
              defaultStyle={{width: '80%'}}
              onPress={() => navigation.navigate('VerifyCode', {OTP: '123'})}
            /> */}
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
              ]}></Text>
          </View>
        </ScrollView>
        <Footer agreed={false} textStyle={{color: colors.black}} />
      </View>
    </Container>
  );
};

export default VerifyEmail;

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
