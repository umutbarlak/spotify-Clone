import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppColors from '../theme/colors';

const CategoryItem = ({text, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.SoftBlack,
    padding: 10,
    borderRadius: 6,
  },
  text: {
    color: AppColors.White,
    fontSize: 16,
    fontWeight: '700',
  },
});
