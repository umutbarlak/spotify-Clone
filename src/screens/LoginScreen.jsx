import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppColors from '../theme/colors';

const LoginScreen = ({navigation}) => {
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{height: 80}} />
        <View style={{alignItems: 'center'}}>
          <Entypo name="spotify" size={80} color="#fff" />
          <Text style={styles.loginTitle}>
            Millions of songs. Free on Spotify
          </Text>
        </View>

        <View style={{height: 80}} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Main')}
          style={[styles.btn, styles.loginButton]}
          activeOpacity={1}>
          <Text style={styles.buttonText}>Sing In with Spotify</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.socialButton]}
          activeOpacity={0.99}>
          <AntDesign
            style={styles.google}
            name="google"
            size={20}
            color={AppColors.White}
          />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.socialButton]}
          activeOpacity={0.99}>
          <Ionicons
            style={styles.google}
            name="logo-facebook"
            size={22}
            color={AppColors.White}
          />
          <Text style={styles.buttonText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.socialButton]}
          activeOpacity={0.99}>
          <AntDesign
            style={styles.google}
            name="mobile1"
            size={20}
            color={AppColors.White}
          />
          <Text style={styles.buttonText}>Continue with Phone Number</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginTitle: {
    color: AppColors.White,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 35,
    textAlign: 'center',
  },
  btn: {
    padding: 15,
    borderRadius: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: AppColors.Green,
    justifyContent: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: AppColors.Black,
    borderWidth: 1,
    borderColor: AppColors.LightGray,
  },
  buttonText: {
    color: AppColors.White,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  google: {
    position: 'absolute',
    left: 15,
  },
});
