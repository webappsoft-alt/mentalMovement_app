import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
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
const GoogleFit = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    newPass: '',
    confirmPass: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isEyePressed, setEyePressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onEyePress = () => {
    setEyePressed(!isEyePressed);
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
          Google Fit
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
          Mindfullness
        </Text>
        <Text style={[style.font14Re, {color: '#858585', width: '70%'}]}>
          By activating this, google fit will track your daily meditation
          progress.
        </Text>
      </View>
    </Container>
  );
};

export default GoogleFit;

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
