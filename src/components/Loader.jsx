import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppColors from '../theme/colors';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={AppColors.Green} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
