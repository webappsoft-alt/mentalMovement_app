import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import { colors, fonts } from '../../constants';
import style from '../../assets/css/style';
import { SelfEsteemCardPlayer } from '../../assets/images';
import CardHomeList from './CardHomeList';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Downloads = ({ }) => {
  const [downloads, setDownloads] = useState([]);
  const getDownloads = async () => {
    const pathData = await AsyncStorage.getItem('filePath');
    if (pathData) {
      setDownloads(JSON.parse(pathData))
    }
  }
  // console.log(datatopic, 'datatopic');

  // console.log(route?.params?.card_Title, 'title////');
  // console.log(route?.params?.topic, 'topic');
  // const topic = route?.params?.topic;
  useEffect(() => {
    getDownloads()
  }, []);
  const navigation = useNavigation();

  return (
    <Container>
      <View style={{ marginVertical: 40 }}>
        <AuthHeader
          title={'Downloads'}
        />
      </View>
      {downloads.length == 0 ? <Text style={style.font12Re}>You don't any have downloads yet</Text> : null}
      <FlatList
        data={downloads}
        keyExtractor={(item, index) => index.toLocaleString()}
        renderItem={({ item }) => (
          <CardHomeList
            card_Title={item?.card_Title}
            voice={item?.voice}
            duration={''}
            onPress={() => {
              navigation.navigate('MainStack', {
                screen: 'MediaPlayerAudio',
                params: {
                  title: item?.title,
                  card_Title: item?.card_Title,
                  voice: item?.voice,
                  audioFile: item?.audioFile,
                },
              });
            }}
          />
        )}
      />

    </Container>
  );
};

export default Downloads;

const styles = StyleSheet.create({});
