import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import { colors, fonts } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import InputBox from '../../components/InputBox';
import Footer from '../../components/Footer';
import style from '../../assets/css/style';
import Button from '../../components/Button';
import { Email, FbLogin, Users } from '../../assets/images';
import { BaseButton } from '../../components/BaseButton';
import { validateEmail } from '../../utils/Validations';
import { ToastMessage } from '../../utils/Toast';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import ApiRequest from '../../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginButton,
  Profile,
  LoginManager,
  AccessToken,
} from 'react-native-fbsdk-next';
import { GoogleLog } from '../../assets/MediaImg';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
const Login = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isEyePressed, setEyePressed] = useState(false);

  const onEyePress = () => {
    setEyePressed(!isEyePressed);
  };

  const [disable, setDisable] = useState(true);
  useMemo(() => {
    const isData =
      validateEmail(formData.email.trim()) &&
      formData.password.trim() &&
      formData.password.length > 0;
    setDisable(!isData);
  }, [formData]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: 'login',
        email: formData.email.toLowerCase(),
        password: formData.password,
      });
      const resp = res?.data?.result;

      console.log('1');
      console.log(res.data);
      if (resp) {
        const id = res?.data?.user_id;
        // console.log('2');

        // const user_type = res?.data?.user_type;
        await AsyncStorage.setItem('user_id', id);

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

        setIsLoading(false);
        setFormData({ email: '', password: '' });
      } else {
        console.log('3');
        ToastMessage(res.data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    // Check the current language and toggle to the opposite language
    if (i18n.language === 'en') {
      i18n.changeLanguage('es'); // Switch to Spanish
    } else {
      i18n.changeLanguage('en'); // Switch to English
    }
  };

  const handleGoogle = async () => {
    try {
      setIsLoading1('google');
      // Check for Google Play Services
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      const UserEmail = userInfo?.user?.email;
      console.log(UserEmail, 'email');
      if (UserEmail) {
        const res = await ApiRequest({
          type: 'social_login',
          email: userInfo?.user?.email,
        });
        console.log(res.data, 'ff');
        if (res.data.result) {
          const id = JSON.stringify(res?.data?.user_id);
          await AsyncStorage.setItem('user_id', id);
          ToastMessage(res?.data?.message);
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
        }
      } else {
        ToastMessage('No user exsit');
        console.log('no user data ');
      }
    } catch (error) {
      // Handle errors
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened:', error.message);
      }
    } finally {
      setIsLoading1('');
    }
  };
  const handleCustomLoginFB = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        console.log('Login was cancelled');
      } else {
        const accessToken = await AccessToken.getCurrentAccessToken();

        if (accessToken) {
          console.log('Logged in successfully');
          console.log('Access Token:', accessToken.accessToken.toString());

          const currentProfile = await Profile.getCurrentProfile();

          console.log(currentProfile)
          // console.log('Logged user:', currentProfile.email);
          // console.log('Logged user:', currentProfile.name);
          // console.log('Profile ID:', currentProfile.userID);
          // if (currentProfile.email) {
          //   const res = await ApiRequest({
          //     type: 'social_login',
          //     email: currentProfile?.email,
          //   });
          //   console.log(res.data, 'ff');
          //   if (res.data.result) {
          //     const id = JSON.stringify(res?.data?.user_id);
          //     await AsyncStorage.setItem('user_id', id);
          //     ToastMessage(res?.data?.message);
          //     navigation.navigate('MainStack');
          //   }
          // } else {
          //   ToastMessage('No user exsit');
          //   console.log('no user data ');
          // }
        }
      }
    } catch (error) {
      console.log('Login error:', error);
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
          {t("Let's get started")}
        </Text>
      </View>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                style.font20Re,
                {
                  color: colors.black,
                  fontFamily: fonts.semiBold,
                  alignSelf: 'center',
                  marginVertical: 20,
                },
              ]}>
              {t('Login with Email')}
            </Text>

            <InputBox
              notShow
              KT={'email-address'}
              placeholder={'Email'}
              value={formData.email}
              onChangeText={text => {
                setFormData({ ...formData, email: text });
              }}
              Icon={() => <Email />}
            />

            <InputBox
              notShow
              placeholder={'Password'}
              value={formData.password}
              onChangeText={text => {
                setFormData({ ...formData, password: text });
              }}
              isEye={true}
              onEyePress={onEyePress}
              secureTextEntry={isEyePressed ? false : true}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('VerifyEmail')}>
                <Text
                  style={[
                    style.font12Re,
                    { color: '#A10000', fontFamily: fonts.bold },
                  ]}>
                  {t('Forgot Password')}
                </Text>
              </TouchableOpacity>
            </View>

            <BaseButton
              title={
                isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  t('Login')
                )
              }
              onPress={handleLogin}
              disabled={disable}
              defaultStyle={{ width: '80%', marginVertical: 24 }}
            // onPress={() =>
            //   navigation.navigate('MainStack', {screen: 'AppStack'})
            // }
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
              }}
              style={{ alignSelf: 'center', marginBottom: 30 }}>
              <Text style={[style.font14Re, { color: colors.black }]}>
                {t("Don't have an account?")}{' '}
                <Text
                  style={[
                    style.font14Re,
                    {
                      fontFamily: fonts.medium,
                      color: colors.black,
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  {t('Sign up')}
                </Text>
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{ height: 1, width: 100, backgroundColor: colors.black }}
              />
              <Text
                style={[
                  style.font14Re,
                  { color: colors.black, fontFamily: fonts.bold },
                ]}>
                OR
              </Text>
              <View
                style={{ height: 1, width: 100, backgroundColor: colors.black }}
              />
            </View>

            <View style={{}}>
              <TouchableOpacity
                disabled={isLoading == 'google'}
                style={styles.box}
                onPress={handleGoogle}>
                {isLoading == 'google' ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    <GoogleLog />
                    <Text
                      style={[
                        style.font14Re,
                        {
                          color: colors.white,
                          marginLeft: 10,
                          fontFamily: fonts.bold,
                        },
                      ]}>
                      {t('Sign in with Google')}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCustomLoginFB}
                style={[styles.box, { marginTop: 0 }]}>
                <FbLogin />
                <Text
                  style={[
                    style.font14Re,
                    {
                      color: colors.white,
                      marginLeft: 10,
                      fontFamily: fonts.bold,
                    },
                  ]}>
                  {t('Continue with Facebook')}
                </Text>
              </TouchableOpacity>
            </View>
            <Footer agreed={false} textStyle={{ color: colors.black }} />
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  box: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    borderRadius: 7,
    padding: 10,
    marginTop: 30,
    marginBottom: 12,
  },
});
