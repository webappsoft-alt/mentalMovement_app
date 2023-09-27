import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import {colors, fonts} from '../../constants';
import style from '../../assets/css/style';
import {Heart, SelfEsteemCardPlayer} from '../../assets/images';
// import CardHomeList from './CardHomeList';
import {useNavigation} from '@react-navigation/native';
import ExploreTranungCard from './ExploreTranungCard';
import CardHomeList from '../HomeListScreen/CardHomeList';

const ExploreTraning = ({route}) => {
  const navigation = useNavigation();
  const {topic} = route.params;
  console.log(topic, '////////////title');
  const title = route?.params?.title;
  const card_Title = route?.params?.card_Title;
  const [subCategory, setSubCatagory] = useState([]);
  const [topicData, setTopicData] = useState([]);
  console.log(topicData, 'sub 1');
  useEffect(() => {
    setSubCatagory(route?.params?.sub_category);
    setTopicData(route?.params?.topic);
  }, []);

  console.log(subCategory, 'mkkkmk');
  const data = [
    {
      id: '2',
      title: 'Pre-Training',
      subTitle: 'Calming and Relaxing',
      subTitle: 'Session 01 - 02:23',
      time: ' 25 mins · Harry',
      imageSource: require('../../assets/BGPreTraning.png'),
    },
    {
      id: '3',
      title: 'Post Training',
      subTitle: 'Elemental Journey',
      subTitle: 'Session 01 - 02:23',
      time: ' 05 mins · Harry',
      imageSource: require('../../assets/BGPostTraning.png'),
    },
    {
      id: '4',
      title: 'Evening',
      subTitle: 'Calming and Relaxing',
      subTitle: 'Session 01 - 02:23',
      time: ' 10 mins · Harry',
      imageSource: require('../../assets/BGEvening.png'),
    },
  ];
  return (
    <Container>
      <View style={{marginVertical: 40}}>
        <AuthHeader
          title={
            route?.params?.title ? route?.params?.title : route?.params?.heading
          }
        />
      </View>
      {subCategory?.length > 0 ? (
        <FlatList
          data={subCategory}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            console.log(item.topic, 'djdjdj');
            return (
              <ExploreTranungCard
                title={item.name}
                subTitle={item.subTitle}
                imageSource={require('../../assets/BGMorning.png')}
                time={item.time}
                onPress={() =>
                  navigation.navigate('MainStack', {
                    // screen: 'MediaPlayerAudio',
                    screen: 'HomeListScreen',
                    params: {
                      title: item.name,
                      topic: item.topic,
                      card_Title: item.name,
                    },
                  })
                }
              />
            );
          }}
        />
      ) : (
        <>
          <CardHomeList
            topicData={topicData}
            card_Title={card_Title}
            voice={'Male'}
            duration={topicData.duration_male}
            onPress={() => {
              !topicData.audio_file_male
                ? ToastMessage('This is uder proces')
                : navigation.navigate('MainStack', {
                    screen: 'MediaPlayerAudio',

                    params: {
                      title: title,
                      card_Title: card_Title,
                      voice: 'Male',
                      audioFile:
                        topicData.profile_url + topicData.audio_file_male,
                    },
                  });
            }}
          />
          <CardHomeList
            topicData={topicData}
            card_Title={card_Title}
            duration={topicData.duration_female}
            voice={'Female'}
            onPress={() =>
              !topicData.audio_file_female
                ? ToastMessage('This is uder proces')
                : navigation.navigate('MainStack', {
                    screen: 'MediaPlayerAudio',

                    params: {
                      card_Title: card_Title,
                      title: title,
                      audioFile:
                        topicData.profile_url + topicData.audio_file_female,
                      voice: 'Female',
                    },
                  })
            }
          />
        </>
      )}
    </Container>
  );
};

export default ExploreTraning;

const styles = StyleSheet.create({});
