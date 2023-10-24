import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import AuthHeader from '../../components/AuthHeader';
import ProfileCard from './ProfileCard';
import { useNavigation } from '@react-navigation/native';
import { Users } from '../../assets/images';
import {
  About,
  Download,
  Google,
  Reminder,
  Start,
} from '../../assets/images/Profile';
import Button from '../../components/Button';
import { BaseButton } from '../../components/BaseButton';
import style from '../../assets/css/style';
import { colors, fonts } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageToggle from './LanguageSwitchButton';
import { useTranslation } from 'react-i18next';
import { Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../services/ApiService';
import { ToastMessage } from '../../utils/Toast';

const Profile = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isSpanish, setIsSpanish] = useState(false);
  const [loading, setLoading] = useState(false);

  const data = [
    // {
    //   id: 1,
    //   navigate: 'StartTrail',
    //   title: 'Start Trail',
    //   image: <Start />,
    // },
    // {
    //   id: 2,
    //   navigate: 'Reminders',
    //   title: 'Reminders',
    //   image: <Reminder />,
    // },
    // {
    //   id: 3,
    //   navigate: 'GoogleFit',
    //   title: 'Google Fit',
    //   image: <Google />,
    // },
    {
      id: 4,
      navigate: 'EditProfile',
      title: 'Edit Profile',
      image: <Google />,
    },
    {
      id: 5,
      navigate: 'ChnagePassword',
      title: 'Change Password',
      image: <Google />,
    },
    // {
    //   id: 6,
    //   navigate: 'Notifications',
    //   title: 'Notifications',
    //   image: <Google />,
    // },
    {
      id: 7,
      navigate: 'Terms',
      title: 'Terms & Conditions',
      image: <Google />,
    },
    {
      id: 8,
      navigate: 'Privacy',
      title: 'Privacy Policy',
      image: <Google />,
    },
    // {
    //   id: 9,
    //   navigate: 'Manage',
    //   title: 'Manage Subscriptions',
    //   image: <Google />,
    // },
    {
      id: 10,
      navigate: 'Downloads',
      title: 'Downloads',
      image: <Download />,
    },
    {
      id: 11,
      navigate: 'AboutUs',
      title: 'About US',
      image: <About />,
    },
  ];


  const { i18n } = useTranslation();

  const [currentLanguageName, setCurrentLanguageName] = useState('English');

  const toggleLanguage = async () => {
    let newLanguage;
    if (i18n.language === 'en') {
      newLanguage = 'es'; // Switch to Spanish
    } else {
      newLanguage = 'en'; // Switch to English
    }

    // Save the selected language in AsyncStorage
    await AsyncStorage.setItem('selectedLanguage', newLanguage)
      .then(() => {
        i18n.changeLanguage(newLanguage);
        setCurrentLanguageName(newLanguage === 'en' ? 'English' : 'Spanish');
        setIsSpanish(newLanguage === 'es');
      })
      .catch(error => {
        console.error('Error saving selected language:', error);
      });
  };

  useEffect(() => {
    setCurrentLanguageName(i18n.language == 'en' ? 'English' : 'Spanish')
    setIsSpanish(i18n.language === 'es');
  }, [i18n.language])

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('name');
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AuthStack',
            state: {
              routes: [
                {
                  name: 'Login',
                },
              ],
            },
          },
        ],
      });
    } catch (error) {
      // Handle errors if necessary
      console.error('Error while logging out:', error);
    }
  };
  const deleteAccount = async () => {
    setLoading(true)
    const userId = await AsyncStorage.getItem('user_id');

    try {
      const ApiData = {
        type: 'update_data',
        table_name: 'users',
        id: userId,//login user id
        status: 1
      }
      const res = await ApiRequest(ApiData)
      console.log(res.data)
      if (!res.data.result) ToastMessage('Internet Error. Try Again later')
      await AsyncStorage.removeItem('user_id');
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AuthStack',
            state: {
              routes: [
                {
                  name: 'Login',
                },
              ],
            },
          },
        ],
      });
    } catch (error) {
      // Handle errors if necessary
      console.error('Error while logging out:', error);
    } finally {
      setLoading(false)
    }
  };

  const pressDelete = () => {
    Alert.alert('ALert', 'Are you sure? You want to delete your account.', [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'Yes', onPress: deleteAccount },
    ]);
  }

  return (
    <Container loading={loading}>
      <ScrollView>
        <View style={{ marginVertical: 40, marginTop: 50 }}>
          <AuthHeader title={t('Settings')} />
        </View>
        <FlatList
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <ProfileCard
              title={item.title}
              source={item.image}
              onPress={() =>
                navigation.navigate('MainStack', {
                  screen: item.navigate,
                })
              }
            />
          )}
        />

        {/* <TouchableOpacity onPress={toggleLanguage}> */}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 6,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 0.2,
            paddingBottom: 20,
            borderBottomColor: colors.white,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: colors.line,
                borderRadius: 50,
              }}>
              <About />
            </View>
            <Text style={[style.font16Re, { paddingLeft: 16 }]}>
              {t('Language')}
            </Text>

          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[style.font16Re, { paddingLeft: 16 }]}>
              {currentLanguageName}
            </Text>
            <Switch
              value={isSpanish}
              onValueChange={toggleLanguage}
              thumbColor={isSpanish ? colors.primary : colors.white}
              trackColor={{ false: colors.white, true: colors.primaryColor }}
            />
          </View>
        </View>
        <BaseButton
          title={t('Logout')}
          onPress={handleLogout}
          textStyle={{ color: colors.black }}
          defaultStyle={{
            marginTop: 30,
            backgroundColor: '#CFBA00',
            width: '90%',
          }}
        />

        <Pressable onPress={pressDelete}>
          <Text style={[
            style.font14Re,
            {
              marginTop: 10,
              marginBottom: 30,
              color: 'red',
              fontFamily: fonts.bold,
              alignSelf: 'center',
            },
          ]}>{t('Delete account')}</Text>
        </Pressable>
        <Text
          style={[
            style.font12Re,
            {
              marginBottom: 100,
              color: '#535353',
              fontFamily: fonts.bold,
              alignSelf: 'center',
            },
          ]}>
          {t('Version')}
        </Text>
      </ScrollView>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
