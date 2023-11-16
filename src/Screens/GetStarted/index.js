import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants';
import { BaseButton } from '../../components/BaseButton';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import { useTranslation } from 'react-i18next';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const GetStarted = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <ImageBackground
      source={require('../../assets/images/png/start_img.png')}
      style={{
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 0,
        paddingBottom: Platform.OS == 'ios' ? 20 : 0,
      }}>
      <FocusAwareStatusBar
        animated={true}
        // barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <View style={styles.container}>
        {/* <Image
          source={require('../../assets/images/png/logo.png')}
          style={{height: 70, width: 190, alignSelf: 'center'}}
        /> */}
        <View />

        <View style={styles.buttonContainer}>
          <BaseButton
            title={t('Get Started')}
            defaultStyle={{ backgroundColor: colors.white }}
            textStyle={{ color: colors.black }}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'space-between', // Place elements vertically with space between them
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20, // Add margin at the bottom
  },
});
