import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AppColors from '../theme/colors';
import Title from '../components/Title';
import {SearchOptions} from '../utils/apiOptions';
import axios from 'axios';
import Loader from '../components/Loader';
import SongCard from '../components/SongCard';
import {screenHight, screenWidth} from '../utils/screens';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const SongsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [songs, setSongs] = useState([]);
  const [showSearchText, setShowSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const progress = useProgress();

  const handleSearch = async () => {
    const options = SearchOptions;
    options.params.term = searchText || 'popüler';

    setLoading(true);
    try {
      const response = await axios.request(options);

      const formatedSongs =
        response.data?.tracks?.hits?.map(i => i.track) || [];

      setSongs(formatedSongs);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
      setShowSearchText(searchText);
    }
  };

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();

      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlay = async track => {
    const formatedTarck = {
      id: track.key,
      url: track.hub.actions.find(action => action.type === 'uri').uri,
      title: track.title,
      artist: track.subtitle,
      artwork: track.images.coverart,
    };

    const trackData = [formatedTarck];
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();

    await TrackPlayer.seekTo(position - 10);
  };
  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();

    await TrackPlayer.seekTo(position + 10);
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    handleSearch();
    setupPlayer();
  }, []);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios"
              size={32}
              color={AppColors.White}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              backgroundColor: AppColors.SoftBlack,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}>
            <TextInput
              onSubmitEditing={handleSearch}
              onChangeText={setSearchText}
              placeholderTextColor={AppColors.DarkGray}
              placeholder="Search"
              style={{
                flex: 1,
                padding: 10,
                color: AppColors.White,
                fontSize: 18,
              }}
            />

            <TouchableOpacity onPress={() => handleSearch()}>
              <Feather name="search" size={32} color={AppColors.White} />
            </TouchableOpacity>
          </View>
        </View>

        <Title
          text={
            showSearchText
              ? `${showSearchText} için arama sonuçları`
              : 'Search Songs'
          }
        />

        {loading ? (
          <Loader />
        ) : error ? (
          <Error error={error} />
        ) : songs?.length > 0 ? (
          <FlatList
            contentContainerStyle={{
              gap: 20,
              paddingHorizontal: 10,
              marginTop: 10,
            }}
            data={songs}
            renderItem={({item}) => (
              <SongCard item={item} handlePlay={handlePlay} />
            )}
          />
        ) : (
          <View>
            <Text
              style={{
                color: AppColors.White,
                textAlign: 'center',
                fontSize: 21,
                fontWeight: '700',
                marginTop: 40,
              }}>
              Sonuç bulunamadı
            </Text>
          </View>
        )}

        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          swipeDirection={'down'}
          onSwipeComplete={() => setModalVisible(false)}>
          <LinearGradient
            colors={['#3c3c3c', '#000000']}
            style={{
              height: screenHight,
              marginTop: 200,
              borderRadius: 20,
            }}>
            <View style={{padding: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <AntDesign
                    name="circledowno"
                    size={32}
                    color={AppColors.White}
                  />
                </TouchableOpacity>

                <Text style={{fontSize: 25, color: AppColors.White}}>
                  Track Player
                </Text>
              </View>

              <View>
                <Image
                  source={{
                    uri: selectedTrack?.images['coverarthq' || 'coverart'],
                  }}
                  width={screenWidth - 60}
                  height={screenHight / 3}
                  style={{borderRadius: 20, resizeMode: 'cover'}}
                />
              </View>

              <View style={{marginVertical: 10, gap: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: AppColors.White,
                      fontSize: 22,
                      fontWeight: '700',
                    }}>
                    {selectedTrack?.title}
                  </Text>
                  <Entypo name="heart" size={32} color={AppColors.White} />
                </View>
                <Text
                  style={{
                    color: AppColors.DarkGray,
                    fontSize: 18,
                    fontWeight: '500',
                  }}>
                  {selectedTrack?.subtitle}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: 'blue',
                  position: 'relative',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 3,
                    backgroundColor: AppColors.Gray,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      width:
                        `${(progress.position / progress.duration) * 100}%` ||
                        0,
                      height: 3,
                      backgroundColor: AppColors.Green,
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 20,
                    backgroundColor: AppColors.Green,
                    position: 'absolute',
                    top: -4,
                    left: `${
                      (progress.position / progress.duration - 0.02) * 100
                    }%`,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 12,
                }}>
                <Text style={{color: AppColors.White, fontSize: 15}}>
                  {formatTime(progress.position)}
                </Text>
                <Text style={{color: AppColors.White, fontSize: 15}}>
                  {formatTime(progress.duration)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={seekBackward} activeOpacity={0.8}>
                  <MaterialIcons
                    name="replay-10"
                    size={30}
                    color={AppColors.White}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayback} activeOpacity={0.8}>
                  {!isPlaying ? (
                    <AntDesign
                      name="playcircleo"
                      size={50}
                      color={AppColors.White}
                    />
                  ) : (
                    <AntDesign
                      name="pausecircleo"
                      size={50}
                      color={AppColors.White}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={seekForward} activeOpacity={0.8}>
                  <MaterialIcons
                    name="forward-10"
                    size={30}
                    color={AppColors.White}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({});
