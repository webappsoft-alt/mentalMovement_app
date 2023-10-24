import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
  Platform,
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
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../../utils/Validations';
// import {
//   LoginButton,
//   Profile,
//   LoginManager,
//   AccessToken,
// } from 'react-native-fbsdk-next';
import { ToastMessage } from '../../utils/Toast';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import ApiRequest from '../../services/ApiService';
import { GoogleLog } from '../../assets/MediaImg';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth, { AppleButton } from '@invertase/react-native-apple-authentication';
const Signup = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    // confirmPassword: '',
  });

  const [isEyePressed, setEyePressed] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState('');

  const handleEmailVerified = async () => {
    setIsLoading(true);
    try {
      const res = await ApiRequest({
        type: 'check_email',
        email: formData.email.toLowerCase(),
      });
      const resp = res?.data.result;
      if (resp) {
        const registerd = await ApiRequest({
          type: 'register',
          email: formData.email.toLowerCase(),
          ...formData,
        });
        if (registerd?.data?.result) {
          console.log('respppppppp', registerd.data.name)
          await AsyncStorage.setItem('user_id', String(registerd?.data?.user_id));
          await AsyncStorage.setItem('name', registerd?.data.name);
          navigation.navigate('PaymentScreen');
        }
      } else {
        ToastMessage('email is already registered');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [disable, setDisable] = useState(true);
  useMemo(() => {
    const isData =
      formData.email.trim() &&
      formData.first_name.trim() &&
      formData.last_name.trim() &&
      formData.password.trim() &&
      validateEmail(formData.email) &&
      formData.first_name &&
      formData.last_name &&
      formData.password.length > 5;
    setDisable(!isData);
  }, [formData]);

  const onEyePress = () => setEyePressed(!isEyePressed);


  const [isEmailValid, setIsEmailValid] = useState(true); // Assume email is valid by default
  const [validationMessage, setValidationMessage] = useState('');

  // Asynchronous email validation
  useEffect(() => {
    if (formData.email.trim().length > 2) {
      const checkEmail = async () => {
        try {
          const res = await ApiRequest({
            type: 'check_email',
            email: formData.email,
          });

          if (res.data.result === false) {
            setValidationMessage(res.data.message);
            setIsEmailValid(false);
          } else {
            setValidationMessage('');
            setIsEmailValid(true);
          }
        } catch (error) {
          console.log(error);
        }
      };

      checkEmail();
    }
  }, [formData.email]);

  const handleGoogle = async () => {
    try {
      setIsLoading1('google');
      // Check for Google Play Services
      GoogleSignin.configure({
        webClientId: '319958759561-ks499rmr0a8103urgc8v0lgargbk1ab1.apps.googleusercontent.com',
        offlineAccess: true,
      });
      await GoogleSignin.hasPlayServices({ autoResolve: true, showPlayServicesUpdateDialog: true });

      const userInfo = await GoogleSignin.signIn();

      const UserEmail = userInfo?.user?.email;
      if (UserEmail) {
        await GoogleSignin.signOut();
        const res = await ApiRequest({
          type: 'check_email',
          email: userInfo?.user?.email
        })
        console.log("resssss==>>", res.data)
        if (!res.data.result) {
          await AsyncStorage.setItem('user_id', String(res.data.user_id));
          await AsyncStorage.setItem('name', res.data.name);
          await GoogleSignin.signOut()

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
        } else {
          const registerd = await ApiRequest({
            type: 'social_register',
            email: userInfo?.user?.email,
            first_name: userInfo?.user?.givenName,
            last_name: userInfo?.user?.familyName,
            social_token: userInfo?.user.id,
          });
          if (registerd?.data?.result) {
            console.log('respppppppp', registerd.data.name)
            await AsyncStorage.setItem('user_id', String(registerd?.data?.user_id));
            await AsyncStorage.setItem('name', registerd?.data.name);
            id = String(registerd?.data?.user_id)
            navigation.navigate('PaymentScreen');
          }
        }
        // const res = await ApiRequest({
        //   type: 'social_register',
        //   email: userInfo?.user?.email,
        //   first_name: userInfo?.user?.givenName,
        //   last_name: userInfo?.user?.familyName,
        //   social_token: userInfo?.user.id,
        // });
        // console.log(res.data);
        // if (res.data.result) {
        //   const id = JSON.stringify(res?.data?.user_id);
        //   await AsyncStorage.setItem('user_id', id);
        //   ToastMessage(res?.data?.message);
        //   navigation.navigate('MainStack');
        // }
      } else {
        console.log('no user data ');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading1('');
    }
  };

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const res = await ApiRequest({
        type: 'check_email',
        email: appleAuthRequestResponse.email
      })
      console.log("resssss==>>", res.data)
      if (!res.data.result) {
        await AsyncStorage.setItem('user_id', String(res.data.user_id));
        await AsyncStorage.setItem('name', res.data.name);

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
      } else {
        const registerd = await ApiRequest({
          type: 'social_register',
          email: appleAuthRequestResponse.email,
          first_name: appleAuthRequestResponse.fullName,
          last_name: '',
          social_token: appleAuthRequestResponse.identityToken,
        });
        if (registerd?.data?.result) {
          console.log('respppppppp', registerd.data.name)
          await AsyncStorage.setItem('user_id', String(registerd?.data?.user_id));
          await AsyncStorage.setItem('name', registerd?.data.name);
          id = String(registerd?.data?.user_id)
          navigation.navigate('PaymentScreen');
        }
      }
    }
  }

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
              {t('Connect with Email')}
            </Text>

            <InputBox
              notShow
              placeholder={'First Name'}
              value={formData.first_name}
              onChangeText={text => {
                setFormData({ ...formData, first_name: text });
              }}
              Icon={() => <Users />}
            />
            {!formData.first_name && formData.first_name.length > 2 && (
              <Text style={{ top: -12, color: colors.red }}>
                Enter valid Last Name (John)
              </Text>
            )}
            <InputBox
              notShow
              placeholder={'Last Name'}
              value={formData.last_name}
              onChangeText={text => {
                setFormData({ ...formData, last_name: text });
              }}
              Icon={() => <Users />}
            />
            {!formData.last_name && formData.last_name.length > 2 && (
              <Text style={{ top: -12, color: colors.red }}>
                {' '}
                Enter valid Last Name (John)
              </Text>
            )}
            <InputBox
              notShow
              placeholder={'Email'}
              KT={'email-address'}
              value={formData.email}
              onChangeText={text => {
                setFormData({ ...formData, email: text });
              }}
              Icon={() => <Email />}
            />
            {!isEmailValid && (
              <Text style={{ top: -12, color: colors.red }}>
                {validationMessage}
              </Text>
            )}
            {/* {isEmailValid ? <Text>{message}</Text> : null} */}
            {!validateEmail(formData.email) && formData.email.length > 2 && (
              <Text style={{ top: -12, color: colors.red }}>
                {' '}
                Enter valid email (abc@gmail.com)
              </Text>
            )}
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
            {formData.password && formData.password.length < 5 && (
              <Text style={{ top: -12, color: colors.red }}>
                Password must be 6 digits
              </Text>
            )}
            <BaseButton
              title={
                isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  t('Register')
                )
              }
              onPress={handleEmailVerified}
              disabled={disable}
              defaultStyle={{ width: '80%', marginVertical: 24 }}
            // onPress={() =>
            //   navigation.navigate('MainStack', {screen: 'AppStack'})
            // }
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={{ alignSelf: 'center', marginBottom: 30 }}>
              <Text style={[style.font14Re, { color: colors.black }]}>
                {t('Already have an account?')}{' '}
                <Text
                  style={[
                    style.font14Re,
                    {
                      fontFamily: fonts.medium,
                      color: colors.black,
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  {t('Sign in')}
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
                disabled={isLoading1 == 'google'}
                style={styles.box}
                onPress={handleGoogle}>
                {isLoading1 == 'google' ? (
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
                      {t('Sign up with Google')}
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {Platform.OS == 'ios' && (
                <AppleButton
                  buttonStyle={AppleButton.Style.BLACK}
                  buttonType={AppleButton.Type.SIGN_IN}
                  style={{
                    width: '100%', // You must specify a width
                    height: 45, // You must specify a height
                  }}
                  onPress={() => onAppleButtonPress()}
                />)}
              {/* <TouchableOpacity
                onPress={handleCustomLoginFB}
                style={[styles.box, {marginTop: 0}]}>
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
              </TouchableOpacity> */}
            </View>
          </View>
          <Footer agreed={false} textStyle={{ color: colors.black }} />
        </ScrollView>
      </View>
    </Container>
  );
};

export default Signup;

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
