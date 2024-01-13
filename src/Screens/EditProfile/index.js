import {StyleSheet, ActivityIndicator, Modal, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../services/ApiService';
import {useTranslation} from 'react-i18next';
const EditProfile = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  // const [formData1, setFormData1] = useState({
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  // });
  console.log(formData, 'data');
  // const [disabled, setDisabled] = useState(true);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const LoadingModal = () => (
    <Modal
      transparent
      visible={showLoadingModal}
      animationType="fade"
      onRequestClose={() => setShowLoadingModal(false)}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={colors.gray1} />
      </View>
    </Modal>
  );

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    handleGetData();
  }, []);
  const handleGetData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setShowLoadingModal(true);
      const res = await ApiRequest({
        type: 'get_data',
        table_name: 'users',
        id: user_id,
      });
      const resp = res?.data?.data[0];
      console.log(res.data);
      setFormData({
        email: resp?.email,
        first_name: resp.first_name,
        last_name: resp.last_name,
      });
      // setFormData1({
      //   email: resp?.email,
      //   first_name: resp.first_name,
      //   last_name: resp.last_name,
      // });
      setShowLoadingModal(false);
    } catch (error) {
      setShowLoadingModal(false);
      console.log(error);
    }
  };
  const [isLoading1, setIsLoading1] = useState(false);
  const handleUpdateData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    try {
      setIsLoading1(true);
      // setDisabled(true);
      const res = await ApiRequest({
        type: 'update_data',
        id: user_id,
        table_name: 'users',
        // email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });
      const resp = res.data;
      setIsLoading1(false);
      setFormData({first_name: '', last_name: ''});
      // setDisabled(false);
      handleGetData();
      // navigation.navigate('Profile');
    } catch (error) {
      setIsLoading1(false);
      // setDisabled(false);
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
          {t('Edit Profile')}
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
          {t('Profile')}
        </Text>

        <InputBox
          notShow
          placeholder={'First Name'}
          // value={formData.first_name}
          onChangeText={text => {
            setFormData({...formData, first_name: text});
          }}
          updateText={formData.first_name}
        />
        <InputBox
          notShow
          placeholder={'Last Name'}
          // value={formData.last_name}
          onChangeText={text => {
            setFormData({...formData, last_name: text});
          }}
          updateText={formData.last_name}
        />

        <InputBox
          notShow
          placeholder={'Email'}
          editable={false}
          // value={formData.email}
          onChangeText={text => {
            setFormData({...formData, email: text});
          }}
          updateText={formData.email}
        />

        <View style={styles.buttonContainer}>
          <BaseButton
            // title={}
            defaultStyle={{width: '80%'}}
            title={
              isLoading1 ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                t('Update Profile')
              )
            }
            onPress={handleUpdateData}
            // disabled={disabled}
            customStyle={{marginVertical: 10}}

            // onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
      {/* <Footer agreed={false} /> */}
      <LoadingModal />
    </Container>
  );
};

export default EditProfile;

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
