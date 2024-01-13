import {StyleSheet, View, Platform, Image, Text, Linking} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {BaseButton} from '../../components/BaseButton';
import {colors} from '../../constants';
import style from '../../assets/css/style';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
const Coaching = () => {
  const webviewBackgroundColorScript = `
  const style = document.createElement('style');
  style.innerHTML = 'body { background-color: black !important; }';
  document.head.appendChild(style);
`;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingTop: Platform.OS !== 'ios' ? 10 : getStatusBarHeight() + 30,
        paddingBottom: Platform.OS == 'ios' ? 10 : getStatusBarHeight() + 30,
        paddingHorizontal: 16,
      }}>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={'#000000'}
        translucent={true}
      />
      <Image
        source={require('../../assets/Marco.jpg')}
        style={{width: '100%', height: 250, borderRadius: 10, marginBottom: 20}}
      />
      <Text style={style.title}>Coaching</Text>
      <Text style={style.subTitle}>
        Mental Movement bietet sowohl 1:1-Coachings als auch Gruppencoachings
        für Sportler*Innen. Lass Dich von Dr. Marco Rathschlag & seinen Coaches
        aufs nächste Level bringen
      </Text>
      <BaseButton
        title={'JETZT MEHR ERFAHREN'}
        textStyle={{color: colors.black}}
        defaultStyle={{
          width: '80%',
          marginVertical: 24,
          backgroundColor: colors.white,
        }}
        onPress={() =>
          // Linking.openURL("https://www.mental-movement.de/high-performance-coaching/")
          Linking.openURL('https://www.mental-movement.de/')
        }
      />
    </View>
  );
};

export default Coaching;

const styles = StyleSheet.create({});
