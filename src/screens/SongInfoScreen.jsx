import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {screenWidth} from '../utils/screens';
import {useAlbumContext} from '../context/AlbumContext';
import Loader from '../components/Loader';
import Error from '../components/Error';

const SongInfoScreen = () => {
  const {getOneAlbum, albumSongs, oneloading, oneerror} = useAlbumContext();
  const navigation = useNavigation();
  const route = useRoute();

  const {album} = route.params || {};

  const id = album.uri.split(':')[2];

  useEffect(() => {
    getOneAlbum(id);
  }, []);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{padding: 10, gap: 10}}
          ListHeaderComponent={() => (
            <>
              <TouchableOpacity
                style={{padding: 10}}
                onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={32}
                  color={AppColors.White}
                />
              </TouchableOpacity>

              <View>
                <Image
                  source={{uri: album.coverArt}}
                  width={screenWidth}
                  height={screenWidth / 2}
                  style={{resizeMode: 'contain', borderRadius: 10}}
                />
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  color: AppColors.White,
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginVertical: 10,
                }}>
                {album.name}
              </Text>

              <View>
                <Text style={{color: AppColors.Gray, textAlign: 'center'}}>
                  {album.artist.name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 20,
                }}>
                <Pressable>
                  <Feather name="download" size={32} color={AppColors.Green} />
                </Pressable>

                <Pressable>
                  <MaterialIcons
                    name="playlist-add"
                    size={32}
                    color={AppColors.Green}
                  />
                </Pressable>
                <Pressable>
                  <Feather
                    name="play-circle"
                    size={32}
                    color={AppColors.Green}
                  />
                </Pressable>
              </View>

              {/* <View>
                <View>
                  <View style={{gap: 10}}>
                    <Text
                      style={{
                        color: AppColors.White,
                        fontSize: 16,
                        fontWeight: '500',
                      }}>
                      Album:
                      <Text style={{color: AppColors.Gray}}> {album.name}</Text>
                    </Text>
                    <Text
                      style={{
                        color: AppColors.White,
                        fontSize: 16,
                        fontWeight: '500',
                      }}>
                      Artist:
                      <Text style={{color: AppColors.Gray}}>
                        {album.artist.name}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        color: AppColors.White,
                        fontSize: 16,
                        fontWeight: '500',
                      }}>
                      Year:
                      <Text style={{color: AppColors.Gray}}> {album.year}</Text>
                    </Text>
                  </View>
                </View>
              </View> */}
            </>
          )}
          data={oneloading ? [] : albumSongs}
          renderItem={({item}) => (
            <View
              style={{
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: AppColors.SoftBlack,
                borderRadius: 6,
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Image
                  source={{
                    uri: `https://picsum.photos/seed/${item.songName}/200/300`,
                  }}
                  width={50}
                  height={50}
                  style={{borderRadius: 6}}
                />
                <Text style={{color: AppColors.White}}>{item.songName}</Text>
                <Text style={{color: AppColors.White}}>({item.artist})</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={oneloading ? <Loader /> : null}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({});
