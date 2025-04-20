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

const SongsScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [songs, setSongs] = useState([]);
  const [showSearchText, setShowSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    const trackData = {
      id: track.key,
      url: track.hub.actions.find(action => action.type === 'uri').uri,
      title: track.title,
      artist: track.subtitle,
      artwork: track.images.coverart,
    };
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

  useEffect(() => {
    // handleSearch();
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
              marginTop: 120,
              borderRadius: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 20,
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

            <View style={{padding: 10}}>
              <Image
                source={{uri: selectedTrack.images['coverarthq' || 'coverart']}}
                width={screenWidth - 60}
                height={screenHight / 3}
                style={{borderRadius: 10, resizeMode: 'cover'}}
              />
            </View>
          </LinearGradient>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({});
