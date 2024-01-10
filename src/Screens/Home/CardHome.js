import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useEffect } from 'react';
import style from '../../assets/css/style';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { colors, fonts } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastMessage } from '../../utils/Toast';

const CardHome = ({ items, leng, subscription = '', toggleToast = () => "" }) => {
  const navigation = useNavigation();
  return (
    <View style={{}}>
      <Text
        style={[
          style.font16Re,
          { fontFamily: fonts.bold, marginVertical: 10, color: colors.white },
        ]}>
        {leng === 'es' ? items.name_german : items.name}
      </Text>

      <FlatList
        numColumns={3}
        data={items.category}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.topic.audio_file_female == undefined) {
                  ToastMessage("There is no currently file present in this category")
                  return;
                }
                if (index < 3) {
                  navigation.navigate('HomeListScreen', {
                    title: items.name,
                    name_german: items.name_german,
                    card_Title: item.name,
                    cardgerman_Title: item.name_german,
                    topic: item.topic,
                    desc: items.description,
                    germa_desc: items.description_german
                  });
                  return;
                }
                if (subscription == 0) {
                  return toggleToast();
                }
                navigation.navigate('HomeListScreen', {
                  title: items.name,
                  name_german: items.name_german,
                  card_Title: item.name,
                  cardgerman_Title: item.name_german,
                  topic: item.topic,
                  desc: items.description,
                  germa_desc: items.description_german

                });
              }}>
              <ImageBackground
                source={require('../../assets/images/HomeCardbg.png')}
                style={styles.imageBackground}>
                <Text style={[style.font12Re, { padding: 10 }]}>
                  {leng === 'es' ? item.name_german : item.name}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CardHome;

const styles = StyleSheet.create({
  imageBackground: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 4,
  },
});
