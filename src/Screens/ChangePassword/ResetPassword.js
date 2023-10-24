import { StyleSheet, ScrollView, Text, View } from 'react-native';
import React, { useState, useMemo } from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import { colors, fonts } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputBox from '../../components/InputBox';

import Footer from '../../components/Footer';
import style from '../../assets/css/style';
import Button from '../../components/Button';
import { BaseButton } from '../../components/BaseButton';
import { validatePassword } from '../../utils/Validations';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import ApiRequest from '../../services/ApiService';
import { ToastMessage } from '../../utils/Toast';
const ResetPassword = ({ route }) => {
  const navigation = useNavigation();
  const OTPReset = route?.params?.OTPReset;
  console.log(OTPReset, 'OTP PASSWRS');
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [disable, setDisable] = useState(true);
  useMemo(() => {
    const isData =
      formData.newPassword.trim() &&
      formData.confirmPassword.trim() &&
      formData.newPassword?.length > 7 &&
      formData.confirmPassword?.length > 7;
    setDisable(!isData);
  }, [formData]);

  const [isEyePressed, setEyePressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onEyePress = () => {
    setEyePressed(!isEyePressed);
  };
  const [isEyePressedCon, setEyePressedCon] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const onEyePressCon = () => {
    setEyePressedCon(!isEyePressedCon);
  };

  const { t } = useTranslation();

  const handleUpdatePAssword = async () => {
    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: 'update_password',
        password: formData?.confirmPassword,
        user_id: parseInt(OTPReset.user_id),
      });
      const resp = res?.data.result;
      console.log('res.data', res.data);
      if (resp) {
        //   console.log('register donesss////');
        //   await AsyncStorage.setItem('user_id', userIdString);
        //   console.log(typeof id, 'type of id');

        ToastMessage(res?.data?.message);
        setIsLoading(false);
        navigation.navigate('Login');
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
    <Container customStyle={{ paddingHorizontal: 0 }}>
      <View style={{ marginVertical: 20, padding: 10 }}>
        <AuthHeader />
        <Text
          style={[
            style.font28Re,
            { fontFamily: fonts.timenewregularroman, marginTop: 50 },
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
            {t('New Password')}
          </Text>
          <InputBox
            notShow
            placeholder={'New Password'}
            value={formData.newPassword}
            onChangeText={text => {
              setFormData({ ...formData, newPassword: text });
            }}
            isEye={true}
            onEyePress={onEyePress}
            secureTextEntry={isEyePressed ? false : true}
          />
          {!validatePassword(formData.newPassword) &&
            formData.newPassword?.length > 2 && (
              <Text style={{ top: -12, color: colors.red }}>
                {' '}
                Password must be 8 digits (Aa1234*/)
              </Text>
            )}

          <InputBox
            notShow
            placeholder={'Confirm Password'}
            value={formData.confirmPassword}
            onChangeText={text => {
              setFormData({ ...formData, confirmPassword: text });
            }}
            isEye={true}
            onEyePress={onEyePressCon}
            secureTextEntry={isEyePressedCon ? false : true}
          />
          {!validatePassword(formData.confirmPassword) &&
            formData.confirmPassword?.length > 2 && (
              <Text style={{ top: -12, color: colors.red }}>
                {' '}
                Password must be 8 digits (Aa1234*/)
              </Text>
            )}

          <View style={styles.buttonContainer}>
            <BaseButton
              onPress={handleUpdatePAssword}
              disabled={disable}
              // onPress={() => navigation.navigate('Login')}
              title={t('Change Password')}
              defaultStyle={{ width: '80%' }}
            />
          </View>
        </ScrollView>
        <Footer agreed={false} textStyle={{ color: colors.black }} />
      </View>
    </Container>
  );
};

export default ResetPassword;

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
