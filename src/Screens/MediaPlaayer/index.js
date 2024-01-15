import {
  StyleSheet,
  ImageBackground,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import AuthHeader from '../../components/AuthHeader';
import AudioPlayer from './AudioPlayer';
import {Cross, Infor} from '../../assets/images';
import style from '../../assets/css/style';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import {Volume} from '../../assets/MediaImg';
import TrackPlayer from 'react-native-track-player';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiRequest from '../../services/ApiService';
const MediaPlayerAudio = ({route}) => {
  const card_Title = route?.params?.card_Title;
  const title = route?.params?.title;
  const voice = route?.params?.voice;
  const audioFile = route?.params?.audioFile;
  const disable = route?.params?.disable;

  const items1 = route?.params?.items;
  const itemsFav = route?.params?.itemsFav;
  const topicFav = route?.params?.topicFav;
  const items = route?.params?.items;
  const [status, setStatus] = useState(route.params?.status);

  // console.log(itemsFav?.cat_id, 'items;;;;;;');
  console.log(itemsFav, 'status;;;;;;');
  const [volume, setVolume] = useState(1.0); // Initial volume level
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const navigation = useNavigation();
  // PanResponder for volume control
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (!isDraggingVolume) {
        setIsDraggingVolume(true);
      }

      const maxVolume = 2.0;
      const minVolume = 0.0;
      let newVolume = volume - gestureState.dy / 300; // Adjust the divisor to control sensitivity

      // Ensure volume stays within valid range
      if (newVolume > maxVolume) {
        newVolume = maxVolume;
      } else if (newVolume < minVolume) {
        newVolume = minVolume;
      }

      TrackPlayer.setVolume(newVolume);
      setVolume(newVolume);
    },
    onPanResponderRelease: () => {
      setIsDraggingVolume(false);
    },
  });
  const [isLiked, setIsLiked] = useState(status); // State to manage like status

  const heartPress = async item => {
    const user_id = await AsyncStorage.getItem('user_id');
    const sendData = {
      type: 'like_dislike',
      user_id: user_id,
      topic_id: items ? items?.topic[0]?.id : topicFav?.id,
      cat_id: items ? items?.topic[0]?.category_id : itemsFav?.cat_id,
      status: status === 'like' ? 'dislike' : 'like',
    };

    console.log(sendData, 'sendData');
    try {
      setStatus(status === 'like' ? 'dislike' : 'like');
      // setIsLiked(!isLiked);
      const res = await ApiRequest(sendData);
      console.log(res.data, 'likes===--==>>');
    } catch (error) {
      setStatus(status === 'like' ? 'dislike' : 'like');

      console.log(error);
    }
  };
  return (
    <ImageBackground
      {...panResponder.panHandlers}
      source={require('../../assets/Sportpicture.png')}
      style={{flex: 1, alignItems: 'center', padding: 10}}>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 40,
          padding: 20,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={heartPress}
          style={{
            height: 30,
            width: 30,
            backgroundColor: colors.white,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <Text>sd</Text> */}
          <Icon
            name={status === 'like' ? 'heart' : 'hearto'}
            size={18}
            color={'black'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Cross />
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text style={{textAlign: 'center'}}>
          Swipe Up/Down to Adjust Volume
        </Text>
        <Text style={{textAlign: 'center'}}>{(volume * 100).toFixed(1)}%</Text>
      </View> */}
      <View style={{position: 'absolute', bottom: 10}}>
        <AudioPlayer
          title={card_Title}
          subTitle={voice}
          audioFile={audioFile}
          volume={title}
          setVolume={setVolume}
          isDraggingVolume={isDraggingVolume}
          setIsDraggingVolume={setIsDraggingVolume}
        />
      </View>
    </ImageBackground>
  );
};

export default MediaPlayerAudio;

const styles = StyleSheet.create({});
