import {
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
import React from 'react';
import {useAlbumContext} from '../context/AlbumContext';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../components/Loader';
import Error from '../components/Error';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppColors from '../theme/colors';
import CategoryItem from '../components/CategoryItem';
import Title from '../components/Title';
import {useArtistContext} from '../context/ArtistContext';
import ArtistCard from '../components/ArtistCard';
import AlbumsCard from '../components/AlbumsCard';
import SCREENS from '../utils/routes';
import {useProfileContext} from '../context/ProfileContext';

const HomeScreen = ({navigation}) => {
  const {albums, loading, error} = useAlbumContext();
  const {profile} = useProfileContext();
  const {artists, loading: artLoading, error: artError} = useArtistContext();

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error error={error} />
        ) : (
          <ScrollView contentContainerStyle={{paddingBottom: 60}}>
            <View style={styles.header}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS.PROFİLE)}
                style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
                <Image
                  style={styles.headerImage}
                  source={{uri: profile?.image}}
                />
                <Text style={styles.headerText}>{profile?.name}</Text>
              </Pressable>
              <AntDesign
                size={24}
                name="clouddownloado"
                color={AppColors.White}
              />
            </View>

            <View style={{flexDirection: 'row', marginVertical: 20, gap: 10}}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: AppColors.SoftBlack,
                  borderRadius: 100,
                  padding: 15,
                  minWidth: 90,
                  alignItems: 'center',
                }}>
                <Text style={styles.text}>Music</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  backgroundColor: AppColors.SoftBlack,
                  borderRadius: 100,
                  padding: 15,
                  minWidth: 90,
                  alignItems: 'center',
                }}>
                <Text style={styles.text}>Podcast & Show</Text>
              </TouchableOpacity>
            </View>

            <View style={{gap: 10}}>
              <CategoryItem text={'Caz'} />
              <CategoryItem text={'Rock & Roll'} />
              <CategoryItem text={'Blues'} />
            </View>

            <Title text={'Your Top Artist'} />

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={artists}
              contentContainerStyle={{
                paddingBottom: 80,
                padding: 10,
                gap: 20,
                height: 180,
              }}
              renderItem={({item}) => <ArtistCard item={item} />}
            />

            <Title text={'Popular Albums'} />

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={albums}
              contentContainerStyle={{
                paddingBottom: 80,
                padding: 10,
                gap: 20,

                height: 180,
              }}
              renderItem={({item}) => <AlbumsCard item={item} />}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 30,
  },
  headerImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  headerText: {
    color: AppColors.White,
    fontSize: 14,
  },
  text: {
    color: AppColors.White,
  },
});
