import {
  StyleSheet,
  ImageBackground,
  Text,
  Linking,
  View,
  TextInput,
  FlatList,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../../components/Container';
import {AppLogo, Drawer, Heart} from '../../assets/images';
import style from '../../assets/css/style';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
const Coaching = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <WebView
        source={{
          uri: 'https://www.mental-movement.de/high-performance-coaching/',
        }}
        style={{flex: 1}}
      />
    </Container>
  );
};

export default Coaching;

const styles = StyleSheet.create({});
