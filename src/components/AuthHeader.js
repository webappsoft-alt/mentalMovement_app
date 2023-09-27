import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import style from '../assets/css/style';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../constants';

const AuthHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginVertical: 30,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text
        style={[
          title === 'Settings' ? style.font32Re : style.font22Re,
          {fontFamily: fonts.timesromanbold},
        ]}>
        {title}
      </Text>
      <Text></Text>
    </View>
  );
};

const styles = {
  header: {
    // paddingHorizontal: 20,
  },
  backButton: {
    // marginRight: 16,
  },
};

export default AuthHeader;
