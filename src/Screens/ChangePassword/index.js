import {StyleSheet, Text, View} from 'react-native';
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
import {validatePassword} from '../../utils/Validations';
import {useTranslation} from 'react-i18next';
const ChnagePassword = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [isEyePressed, setEyePressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onEyePress = () => {
    setEyePressed(!isEyePressed);
  };

  const [disable, setDisable] = useState(true);
  useMemo(() => {
    const isData =
      formData.newPassword.trim() &&
      formData.newPassword?.length > 7 &&
      formData.confirmPassword.trim() > 7 &&
      formData.confirmPassword?.length > 7;
    setDisable(!isData);
  }, [formData]);

  const handleUpdatePAssword = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setIsLoading(true);
      const res = await ApiRequest({
        type: 'update_password',
        password: formData?.confirmPassword,
        user_id: parseInt(user_id),
      });
      const resp = res?.data.result;
      console.log('res.data', res.data);
      if (resp) {
        //   console.log('register donesss////');
        //   await AsyncStorage.setItem('user_id', userIdString);
        //   console.log(typeof id, 'type of id');

        ToastMessage(res?.data?.message);
        setIsLoading(false);
        navigation.navigate('Profile');
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

  const {t} = useTranslation();

  return (
    <Container customStyle={{paddingHorizontal: 0}}>
      <View style={{marginVertical: 20, padding: 10}}>
        <AuthHeader />
        <Text
          style={[
            style.font28Re,
            {fontFamily: fonts.timenewregularroman, marginTop: 50},
          ]}>
          {t('Change Password')}
        </Text>
      </View>
      <View style={styles.container}>
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
            setFormData({...formData, newPassword: text});
          }}
          isEye={true}
          onEyePress={onEyePress}
          secureTextEntry={isEyePressed ? false : true}
        />
        {!validatePassword(formData.newPassword) &&
          formData.newPassword?.length > 2 && (
            <Text style={{top: -12, color: colors.red}}>
              {' '}
              Password must be 8 digits (Aa1234*/)
            </Text>
          )}

        <InputBox
          notShow
          placeholder={'Confirm Password'}
          value={formData.confirmPassword}
          onChangeText={text => {
            setFormData({...formData, confirmPassword: text});
          }}
          isEye={true}
          onEyePress={onEyePress}
          secureTextEntry={isEyePressed ? false : true}
        />
        {!validatePassword(formData.confirmPassword) &&
          formData.confirmPassword?.length > 2 && (
            <Text style={{top: -12, color: colors.red}}>
              {' '}
              Password must be 8 digits (Aa1234*/)
            </Text>
          )}

        <View style={styles.buttonContainer}>
          <BaseButton
            disabled={disable}
            title={'Change Password'}
            defaultStyle={{width: '80%'}}
            onPress={handleUpdatePAssword}
          />
        </View>
      </View>
      {/* <Footer agreed={false} /> */}
    </Container>
  );
};

export default ChnagePassword;

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
