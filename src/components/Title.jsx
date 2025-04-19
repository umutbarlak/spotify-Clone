import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppColors from '../theme/colors';

const Title = ({text}) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  text: {
    color: AppColors.White,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
