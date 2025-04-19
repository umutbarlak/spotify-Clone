import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useProfileContext} from '../context/ProfileContext';
import LinearGradient from 'react-native-linear-gradient';
import {screenWidth} from '../utils/screens';
import AppColors from '../theme/colors';

const ProfileScreen = () => {
  const {profile, loading, error, getProfile} = useProfileContext();

  // useEffect(() => {
  //   getProfile();
  // }, []);

  function formatNumber(num) {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  }

  console.log(profile);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={profile?.playlist}
          ListHeaderComponent={() => (
            <>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: profile?.image}}
                  width={120}
                  height={120}
                  style={{borderRadius: 100}}
                />
                <Text style={{color: AppColors.White}}>{profile.name}</Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 20}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: AppColors.White}}>Takipçi</Text>
                  <Text
                    style={{
                      fontSize: 22,
                      color: AppColors.White,
                      marginTop: 5,
                    }}>
                    {formatNumber(profile.followersCount)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: AppColors.White}}>Takip</Text>
                  <Text
                    style={{
                      fontSize: 22,
                      color: AppColors.White,
                      marginTop: 5,
                    }}>
                    {formatNumber(profile.followingCount)}
                  </Text>
                </View>
              </View>
            </>
          )}
          contentContainerStyle={{gap: 10, padding: 10, paddingBottom: 70}}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image
                source={{
                  uri: `https://picsum.photos/seed/${item.name}/200/300`,
                }}
                width={50}
                height={50}
                style={{borderRadius: 6}}
              />
              <View>
                <Text style={{color: AppColors.White}}>{item.name}</Text>
                <Text style={{color: AppColors.Gray, marginTop: 5}}>
                  {item.followers_count}
                </Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
