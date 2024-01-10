import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import AuthHeader from '../../components/AuthHeader';
import ProfileCard from './ProfileCard';
import {useNavigation} from '@react-navigation/native';
import {Users} from '../../assets/images';
import {
  About,
  Download,
  Google,
  Reminder,
  Start,
} from '../../assets/images/Profile';
import Button from '../../components/Button';
import {BaseButton} from '../../components/BaseButton';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import LanguageToggle from './LanguageSwitchButton';
import {useTranslation} from 'react-i18next';
import {Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [isSpanish, setIsSpanish] = useState(false);

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
    {
      id: 6,
      navigate: 'Notifications',
      title: 'Notifications',
      image: <Google />,
    },
    {
      id: 7,
      navigate: 'Terms & Conditions',
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
      navigate: 'About',
      title: 'About US',
      image: <About />,
    },
  ];

  const [currentLanguage, setCurrentLanguage] = useState('English'); // Default language is English

  // const toggleLanguage = () => {
  //   // Toggle the language between English and Spanish
  //   setCurrentLanguage(currentLanguage === 'English' ? 'Spanish' : 'English');
  // };

  const {t} = useTranslation();
  const {i18n} = useTranslation();

  // const toggleLanguage = () => {
  //   // Check the current language and toggle to the opposite language
  //   if (i18n.language === 'en') {
  //     i18n.changeLanguage('es'); // Switch to Spanish
  //   } else {
  //     i18n.changeLanguage('en'); // Switch to English
  //   }
  // };
  const getSelectedLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem('selectedLanguage');
      return language || 'en'; // Default to English if no language is stored
    } catch (error) {
      console.error('Error getting selected language:', error);
      return 'en'; // Default to English in case of an error
    }
  };

  useEffect(() => {
    getSelectedLanguage().then(language => {
      // Set the initial language when the component mounts
      i18n.changeLanguage(language);
      setCurrentLanguageName(language === 'en' ? 'English' : 'Spanish');
      setIsSpanish(language === 'es');
    });
  }, []);

  const [currentLanguageName, setCurrentLanguageName] = useState('English');
  const toggleLanguage = () => {
    let newLanguage;
    if (i18n.language === 'en') {
      newLanguage = 'es'; // Switch to Spanish
    } else {
      newLanguage = 'en'; // Switch to English
    }

    // Save the selected language in AsyncStorage
    AsyncStorage.setItem('selectedLanguage', newLanguage)
      .then(() => {
        i18n.changeLanguage(newLanguage);
        setCurrentLanguageName(newLanguage === 'en' ? 'English' : 'Spanish');
        setIsSpanish(newLanguage === 'es');
      })
      .catch(error => {
        console.error('Error saving selected language:', error);
      });
  };

  const handleLogout = async () => {
    try {
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
    }
  };

  return (
    <Container>
      <ScrollView>
        <View style={{marginVertical: 40, marginTop: 50}}>
          <AuthHeader title={t('Settings')} />
        </View>
        <FlatList
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
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
            <Text style={[style.font16Re, {paddingLeft: 16}]}>
              {t('Language')}
            </Text>
            {/* <Text style={[style.font16Re, {paddingLeft: 16}]}>
                Language: {currentLanguageName}
              </Text> */}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[style.font16Re, {paddingLeft: 16}]}>
              {currentLanguageName}
            </Text>
            <Switch
              value={isSpanish}
              onValueChange={toggleLanguage}
              thumbColor={isSpanish ? colors.primary : colors.white}
              trackColor={{false: colors.white, true: colors.primaryColor}}
            />
          </View>
        </View>
        {/* </TouchableOpacity> */}

        {/* //// */}
        {/* <TouchableOpacity onPress={toggleLanguage}>
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
              <Text style={[style.font16Re, {paddingLeft: 16}]}>Language</Text>
            </View>
            <Icon name={'chevron-forward'} size={22} color={colors.white} />
          </View>
        </TouchableOpacity> */}
        {/* <Text style={[style.font14]}>{t('greeting')}</Text> */}
        {/* <Text style={[style.font14]}>{t('Downloads')}</Text> */}
        {/* <Text style={style.font16Re}> Current Language: {currentLanguage}</Text> */}
        {/* <LanguageToggle /> */}
        {/* //// */}
        <BaseButton
          title={t('Logout')}
          onPress={handleLogout}
          textStyle={{color: colors.black}}
          defaultStyle={{
            marginVertical: 30,
            backgroundColor: '#CFBA00',
            width: '90%',
          }}
        />
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
