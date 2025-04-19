import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppColors from '../theme/colors';
import {useNavigation} from '@react-navigation/native';
import SCREENS from '../utils/routes';

const AlbumsCard = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.SONGSINFO, {album: item})}
      activeOpacity={0.8}
      style={{
        width: 120,
        alignItems: 'center',
        backgroundColor: 'blue',
      }}>
      <Image source={{uri: item.coverArt}} width={120} height={120} />
      <Text
        style={{
          color: AppColors.White,
          marginVertical: 2,
          fontSize: 12,
        }}
        numberOfLines={1}>
        {item.name}
      </Text>
      <Text
        style={{
          color: AppColors.DarkGray,
          marginVertical: 2,
          fontSize: 12,
        }}
        numberOfLines={1}>
        {item.artist.name}
      </Text>
    </TouchableOpacity>
  );
};

export default AlbumsCard;

const styles = StyleSheet.create({});
