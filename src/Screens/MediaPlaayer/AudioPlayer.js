import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import TrackPlayer, {Event, State} from 'react-native-track-player';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import {
  Download,
  Forword,
  More,
  Pause,
  Previous,
  Revert,
  Share,
  Volume,
} from '../../assets/MediaImg';
import {Cross, Heart, Infor, PauseSvg, PlaySvg} from '../../assets/images';
import style from '../../assets/css/style';
import {colors, fonts} from '../../constants';
import Slider from 'react-native-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastMessage} from '../../utils/Toast';
import {decode, encode} from 'base-64';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const AudioPlayer = ({title, volume, subTitle, audioFile, setVolume}) => {
  const {t} = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [downloadedFilePath, setDownloadedFilePath] = useState(null);
  const [downloadMsg, setDownloadMsg] = useState(false);
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(true);

  const getCurrentDataAsync = async () => {
    const pathData = await AsyncStorage.getItem('filePath');
    if (pathData) {
      const ArrNew = JSON.parse(pathData);
      const storedArray = [...ArrNew];
      const isExsit = storedArray.some(
        storeObj => storeObj?.name == audioFile.split('/').pop(),
      );
      if (isExsit) {
        const filterPath = storedArray.filter(
          obj => obj.name == audioFile.split('/').pop(),
        );
        return filterPath;
      }
      return 'false';
    } else {
      return 'false';
    }
  };
  const runAudio = async () => {
    const filePath = await getCurrentDataAsync();
    TrackPlayer.setupPlayer()
      .then(async () => {
        await runAudioUrl(filePath);
        // setIsPlayerInitialized(false);
      })
      .catch(async error => {
        console.log(error);
        await runAudioUrl(filePath);
        // setIsPlayerInitialized(false);
      });
  };

  const runAudioUrl = async filePath => {
    let audioUrl = audioFile;

    if (filePath !== 'false') {
      audioUrl = `file://${filePath[0].path}`;
      // setIsPlayerInitialized(false);
    }
    console.log('riunnn===>>>>>>', audioUrl);

    await TrackPlayer.add({
      id: 'track1',
      url: audioUrl,
      title: 'Track 1',
      artist: 'Artist 1',
      // artwork: require('../../assets/images/img/RESTDAYRUHETAG.jpg'),
    });

    // Start playback if the component is still mounted
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      runAudio();
      return () => TrackPlayer.reset();
    }, []),
  );

  useEffect(() => {
    const trackChangedListener = TrackPlayer.addEventListener(
      Event.PlaybackTrackChanged,
      async data => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        setIsPlaying(currentTrack !== null);

        if (data.nextTrack === null) {
          await TrackPlayer.skip();
          await TrackPlayer.play();
          setIsPlaying(true);
        }
      },
    );

    return () => {
      trackChangedListener.remove();
    };
  }, []);

  useEffect(() => {
    const updatePosition = async () => {
      const currentPosition = await TrackPlayer.getPosition();
      const currentDuration = await TrackPlayer.getDuration();
      setPosition(currentPosition);
      setTimeout(() => {
        setIsPlayerInitialized(false);
      }, 1000);
      setDuration(currentDuration);
    };

    const interval = setInterval(updatePosition, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const togglePlayback = async () => {
    const playbackState = await TrackPlayer.getState();

    if (playbackState === State.Paused) {
      await TrackPlayer.play();
    } else if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }

    setIsPlaying(!isPlaying);
  };

  const skipToNextTrack = async () => {
    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  const skipToPreviousTrack = async () => {
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const [prevVolume, setPrevVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = async () => {
    if (isMuted) {
      await TrackPlayer.setVolume(prevVolume);
      setIsMuted(false);
    } else {
      const currentVolume = await TrackPlayer.getVolume();
      setPrevVolume(currentVolume);
      await TrackPlayer.setVolume(0);
      setIsMuted(true);
    }
  };

  const mutedIcon = <FontAwesome name="volume-mute" size={24} color="white" />;
  const unmutedIcon = <FontAwesome name="volume-up" size={24} color="white" />;

  const downloadAudioFile = async (url, filename) => {
    setDownloadMsg(true);

    let Arr = [];
    const pathData = await AsyncStorage.getItem('filePath');

    const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        setDownloadMsg(false);
        throw new Error('Failed to download audio file');
      }

      const contentLength = response.headers.get('content-length');
      const totalBytes = parseInt(contentLength, 10) || 0;
      let downloadedBytes = 0;

      const binaryContent = await response.arrayBuffer();
      const base64Content = encode(new Uint8Array(binaryContent));

      await RNFS.writeFile(filePath, base64Content, 'base64', progress => {
        // Track the download progress here
        downloadedBytes = progress.bytesWritten;
        const percent = (downloadedBytes / totalBytes) * 100;
        console.log(`Download progress: ${percent.toFixed(2)}%`);
      });

      // setDownloadMsg(false);
      if (pathData) {
        const ArrNew = JSON.parse(pathData);
        const updatedArraay = [...ArrNew];
        updatedArraay.push({
          path: filePath,
          name: filename,
          card_Title: title,
          title: volume,
          voice: subTitle,
          audioFile: audioFile,
        });
        ToastMessage('Downloaded successfully completed');
        await AsyncStorage.setItem('filePath', JSON.stringify(updatedArraay));
        setDownloadedFilePath(filePath);
        setDownloadMsg(false);
      } else {
        Arr.push({
          path: filePath,
          name: filename,
          card_Title: title,
          title: volume,
          voice: subTitle,
          audioFile: audioFile,
        });
        const dataToStore = JSON.stringify(Arr);
        await AsyncStorage.setItem('filePath', dataToStore);
        setDownloadedFilePath(filePath);
        ToastMessage('Downloaded successfully completed');
        setDownloadMsg(false);
      }

      setDownloadMsg(false);
      console.log('Audio file downloaded and saved:', filePath);
    } catch (error) {
      console.error('Error downloading audio file:', error);
    } finally {
      setDownloadMsg(false);
    }
  };

  const fileViewinReact = async filename => {
    setDownloadMsg(true);
    console.log(filename, 'filename');
    if (!filename) {
      setDownloadMsg(false);
      ToastMessage('File does not exist');
      return;
    }
    const pathData = await AsyncStorage.getItem('filePath');
    if (pathData) {
      const ArrNew = JSON.parse(pathData);
      const storedArray = [...ArrNew];
      const isExsit = storedArray.some(storeObj => storeObj.name == filename);
      if (isExsit) {
        ToastMessage('File is already downloaded');
        setDownloadMsg(false);
        return;
      }
    }

    const url = `https://locatestudent.com/mental_movement/upload/${filename}`;
    if (Platform.OS == 'ios') {
      await downloadAudioFile(url, filename);
      return;
    }
    let localFile = `${RNFS.DocumentDirectoryPath}/${filename}`;
    const downloadOptions = {
      fromUrl: url,
      toFile: localFile,
    };
    let Arr = [];
    RNFS.downloadFile(downloadOptions)
      .promise.then(() => {
        const handleDownload = async () => {
          if (pathData) {
            const ArrNew = JSON.parse(pathData);
            const updatedArraay = [...ArrNew];
            updatedArraay.push({
              path: localFile,
              name: filename,
              card_Title: title,
              title: volume,
              voice: subTitle,
              audioFile: audioFile,
            });
            ToastMessage('Downloaded successfully completed');
            setDownloadMsg(false);
            await AsyncStorage.setItem(
              'filePath',
              JSON.stringify(updatedArraay),
            );
            setDownloadedFilePath(localFile);
          } else {
            Arr.push({
              path: localFile,
              name: filename,
              card_Title: title,
              title: volume,
              voice: subTitle,
              audioFile: audioFile,
            });
            const dataToStore = JSON.stringify(Arr);
            await AsyncStorage.setItem('filePath', dataToStore);

            setDownloadMsg(false);
            setDownloadedFilePath(localFile);
            ToastMessage('Downloaded successfully completed');
          }
        };

        handleDownload();
      })
      .catch(error => {
        setDownloadMsg(false);
        console.log('Error downloading file:', error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginLeft: 20, top: -50}}>
        <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>{title}</Text>
        <Text style={[style.font16Re, {fontFamily: fonts.bold}]}>
          {subTitle} {t('Voice')}
        </Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
          width: '96%',
          alignSelf: 'center',
        }}>
        <Text style={[style.font16Re]}>{formatTime(position)}</Text>

        <Slider
          style={{width: '70%', alignSelf: 'center', marginHorizontal: 10}}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={value => {
            TrackPlayer.seekTo(value);
            setPosition(value);
          }}
          thumbTintColor="#CFBA00"
          minimumTrackTintColor="#CFBA00"
          maximumTrackTintColor="#C4C4C4"
        />
        <Text style={[style.font16Re]}>{formatTime(duration)}</Text>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={toggleMute} style={{width: 40}}>
            {isMuted ? mutedIcon : unmutedIcon}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '50%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity onPress={skipToPreviousTrack}>
              <Previous />
            </TouchableOpacity>
            {isPlayerInitialized ? (
              <ImageBackground
                source={require('../../assets/Playbg.png')}
                style={{
                  height: 60,
                  width: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator color={colors.white} />
              </ImageBackground>
            ) : (
              <TouchableOpacity onPress={togglePlayback}>
                {isPlaying ? (
                  <ImageBackground
                    source={require('../../assets/Playbg.png')}
                    style={{
                      height: 60,
                      width: 60,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assets/Pausebutton.png')}
                      style={{height: 30, width: 30}}
                      resizeMode="center"
                    />
                  </ImageBackground>
                ) : (
                  <ImageBackground
                    source={require('../../assets/Playbg.png')}
                    style={{
                      height: 60,
                      width: 60,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../../assets/Palybutton.png')}
                      style={{height: 30, width: 30}}
                      resizeMode="center"
                    />
                  </ImageBackground>
                )}
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={skipToNextTrack}>
              <Forword />
            </TouchableOpacity>
          </View>
          {downloadMsg === true ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <TouchableOpacity
              onPress={() => fileViewinReact(audioFile.split('/').pop())}>
              <Download />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '70%',
            alignSelf: 'center',
            marginVertical: 30,
          }}>
          {/* <Heart /> */}

          {/* <More /> */}
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;
