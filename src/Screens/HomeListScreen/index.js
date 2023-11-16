import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import { colors, fonts } from '../../constants';
import style from '../../assets/css/style';
import { SelfEsteemCardPlayer } from '../../assets/images';
import CardHomeList from './CardHomeList';
import { useNavigation } from '@react-navigation/native';
import { BaseButton } from '../../components/BaseButton';
import { ToastMessage } from '../../utils/Toast';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { err } from 'react-native-svg/lib/typescript/xml';
import { useTranslation } from 'react-i18next';
const HomeListScreen = ({ route }) => {
  const { i18n, t } = useTranslation()
  const card_Title = i18n.language == 'es' ? route?.params?.cardgerman_Title : route?.params?.card_Title;
  const title = i18n.language == 'es' ? route?.params?.name_german : route?.params?.title;
  const datatopic = route.params?.topic1;

  const germa_desc = route.params?.germa_desc;
  const desc = route.params?.desc;

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
      <View style={{ marginVertical: 40 }}>
        <AuthHeader
          title={
            route?.params?.title ? title : route?.params?.heading
          }
        />
      </View>
      <Text style={style.subTitle}>{i18n.language == 'es' ? germa_desc : desc}</Text>
      {/* <BaseButton
        title={'Download mael'}
        onPress={() => fileViewinReact(topicData.audio_file_male)}
      /> */}
      <CardHomeList
        topicData={topicData}
        card_Title={card_Title}
        voice={t('germanMale')}
        duration={topicData.duration_male}
        onPress={() => {
          !topicData.audio_file_male
            ? ToastMessage('This is uder proces')
            : navigation.navigate('MainStack', {
              screen: 'MediaPlayerAudio',

              params: {
                title: title,
                card_Title: card_Title,
                voice: t('germanMale'),
                audioFile: topicData.profile_url + topicData.audio_file_male,
              },
            });
        }}
      />
      <CardHomeList
        topicData={topicData}
        card_Title={card_Title}
        duration={topicData.duration_female}
        voice={t('femaleGermal')}
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
                voice: t('femaleGermal'),
              },
            })
        }
      />
    </Container>
  );
};

export default HomeListScreen;

const styles = StyleSheet.create({});
