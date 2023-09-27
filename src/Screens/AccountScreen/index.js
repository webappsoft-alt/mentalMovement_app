import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Footer from '../../components/Footer';

import {useNavigation} from '@react-navigation/native';
import {colors, fonts} from '../../constants';
import style from '../../assets/css/style';
import {AppLogo, FbLogin} from '../../assets/images';
import {Google} from '../../assets/images/Profile';
import {GoogleLog} from '../../assets/MediaImg';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginButton,
  Profile,
  LoginManager,
  AccessToken,
} from 'react-native-fbsdk-next';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../services/ApiService';
import {ToastMessage} from '../../utils/Toast';
const Account = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState('');

  GoogleSignin.configure({
    webClientId:
      '319958759561-ks499rmr0a8103urgc8v0lgargbk1ab1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const Login = () =>
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

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
          if (currentProfile) {
            console.log('Logged user:', currentProfile.name);
            console.log('Profile ID:', currentProfile.userID);
          }
        }
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };
  const handleGoogle = async () => {
    try {
      setIsLoading('google');
      // Check for Google Play Services
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      const UserEmail = userInfo?.user?.email;
      if (UserEmail) {
        const res = await ApiRequest({
          type: 'social_register',
          email: userInfo?.user?.email,
          first_name: userInfo?.user?.givenName,
          last_name: userInfo?.user?.familyName,
          social_token: userInfo?.user.id,
        });
        console.log(res.data);
        if (res.data.result) {
          const id = JSON.stringify(res?.data?.user_id);
          await AsyncStorage.setItem('user_id', id);
          ToastMessage(res?.data?.message);
          navigation.navigate('MainStack');
        }
      } else {
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
      setIsLoading('');
    }
  };

  return (
    <Container>
      <View style={{flex: 1}}>
        <View style={{alignSelf: 'center', marginVertical: 40}}>
          <AppLogo />
        </View>

        <Text style={[style.font34Re, {fontFamily: fonts.timenewregularroman}]}>
          {t('Start Your Journey')}
        </Text>
        <Text style={[style.font14Re, {width: '80%'}]}>
          {t(
            'A performance mindset app for athletes to boost your success in a healthy way',
          )}
        </Text>
        <View style={{height: 200}}>
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
                      color: colors.light_gray,
                      marginLeft: 10,
                      fontFamily: fonts.bold,
                    },
                  ]}>
                  {t('Sign up with Google')}
                </Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCustomLoginFB}
            style={[styles.box, {marginTop: 0}]}>
            <FbLogin />
            <Text
              style={[
                style.font14Re,
                {
                  color: colors.light_gray,
                  marginLeft: 10,
                  fontFamily: fonts.bold,
                },
              ]}>
              {t('Continue with Facebook')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.box,
              {
                marginTop: 0,
                marginBottom: 20,
                justifyContent: 'center',
                paddingLeft: 0,
              },
            ]}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text
              style={[
                style.font14Re,
                {
                  color: colors.light_gray,
                  marginLeft: 10,
                  fontFamily: fonts.bold,
                },
              ]}>
              {t('Other Options')}{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}
            style={{alignSelf: 'center'}}>
            <Text style={[style.font14Re]}>
              {t("Don't have an account?")}{' '}
              <Text
                style={[
                  style.font14Re,
                  {fontFamily: fonts.medium, textDecorationLine: 'underline'},
                ]}>
                {t('Sign up')}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height: 100}}>
        <Footer agreed={true} />
      </View>
    </Container>
  );
};

export default Account;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 7,
    padding: 10,
    marginTop: 50,
    marginBottom: 12,
  },
});
