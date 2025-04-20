import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppColors from '../theme/colors';
import {notFoundImage} from '../utils/constans';
import {screenWidth} from '../utils/screens';

const SongCard = ({item, handlePlay}) => {
  return (
    <Pressable
      onPress={() => handlePlay(item)}
      style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
      <Image
        source={{
          uri: item.images.coverart || item.images.coverarthq || notFoundImage,
        }}
        width={50}
        height={50}
        style={{borderRadius: 100}}
      />
      <View>
        <Text
          numberOfLines={1}
          style={{
            color: AppColors.White,
            fontSize: 18,
            width: screenWidth - 80,
          }}>
          {item.title}
        </Text>
        <Text style={{color: AppColors.DarkGray}}>{item.subtitle}</Text>
      </View>
    </Pressable>
  );
};

export default SongCard;

const styles = StyleSheet.create({});
