import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import {colors, fonts} from '../../constants';
import style from '../../assets/css/style';
import {SelfEsteemCardPlayer} from '../../assets/images';
import CardHomeList from './CardHomeList';
import {useNavigation} from '@react-navigation/native';
import {BaseButton} from '../../components/BaseButton';
import {ToastMessage} from '../../utils/Toast';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import {err} from 'react-native-svg/lib/typescript/xml';
const HomeListScreen = ({route}) => {
  const card_Title = route?.params?.card_Title;
  const title = route?.params?.title;
  const datatopic = route.params?.topic1;
  // console.log(datatopic, 'datatopic');

  // console.log(route?.params?.card_Title, 'title////');
  // console.log(route?.params?.topic, 'topic');
  // const topic = route?.params?.topic;
  useEffect(() => {
    if (route?.params?.topic) {
      // setTopicData(...topicData, route?.params?.topic);
      setTopicData(route?.params?.topic);
    }
  }, [route?.params?.topic]);

  const [topicData, setTopicData] = useState([]);
  console.log(topicData, 'audioFileaudioFile.');
  console.log(
    topicData.profile_url + topicData.audio_file_female,
    'audio_file_female.',
  );
  console.log(
    topicData.profile_url + topicData.audio_file_male,
    'audio_file_male.',
  );

  const navigation = useNavigation();
  // const data = [
  //   {
  //     id: '1',
  //     title: 'Morning',
  //     subTitle: 'Male',
  //     lenght: '02:23',
  //     imageSource: require('../../assets/images/SelfExteemCard.png'),
  //   },
  //   {
  //     id: '2',
  //     title: 'Morning',
  //     subTitle: 'Female',
  //     lenght: '02:23',
  //     imageSource: require('../../assets/images/SelfExteemCard.png'),
  //   },
  // ];

  const fileViewinReact = filename => {
    if (!filename) {
      ToastMessage('File does not exist');
      return;
    }

    const url = `https://locatestudent.com/mental_movement/upload/${filename}`; // Full URL
    const localFile = `${RNFS.DocumentDirectoryPath}/${filename}`;
    const res = RNFS.downloadFile({
      fromUrl: url,
      toFile: localFile,
    });

    console.log(' successfully', res);
    res.promise
      .then(() => {
        console.log('Downloaded successfully');
        // Open the downloaded file with FileViewer
        // FileViewer.open(localFile, {showOpenWithDialog: true})
        //   .then(() => {
        //     console.log('Opened with FileViewer');
        //   })
        //   .catch(error => {
        //     console.log('Error opening file with FileViewer:', error);
        //   });
      })
      .catch(error => {
        console.log('Error downloading file:', error);
        // Handle the error (e.g., show an error message to the user)
      });
  };

  return (
    <Container>
      <View style={{marginVertical: 40}}>
        <AuthHeader
          title={
            route?.params?.title ? route?.params?.title : route?.params?.heading
          }
        />
      </View>
      {/* <BaseButton
        title={'Download mael'}
        onPress={() => fileViewinReact(topicData.audio_file_male)}
      /> */}
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
                  audioFile: topicData.profile_url + topicData.audio_file_male,
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
    </Container>
  );
};

export default HomeListScreen;

const styles = StyleSheet.create({});
