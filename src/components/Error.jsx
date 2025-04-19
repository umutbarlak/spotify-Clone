import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppColors from '../theme/colors';

const Error = ({error}) => {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          margin: 40,
          padding: 10,
          borderRadius: 10,
          backgroundColor: AppColors.Red,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'bold',
            color: AppColors.White,
          }}>
          {error}
        </Text>
      </View>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({});
