import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppColors from '../theme/colors';

const ArtistCard = ({item}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: 120,
        alignItems: 'center',
      }}>
      <Image
        source={{uri: item.images[0].url}}
        width={120}
        height={120}
        style={{borderRadius: 100}}
      />
      <Text
        style={{
          color: AppColors.White,
          marginVertical: 2,
          fontSize: 12,
        }}
        numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({});
