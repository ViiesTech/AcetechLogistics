import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../theme/colors';
import images from '../../assets/images';
import BtnComp from '../../components/BtnComp';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Verified = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: colors.secondary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={images.success} />

      <BtnComp
        btnText={'Back to login'}
        style={{
          backgroundColor: colors.primary,
          width: wp('85%'),
          marginTop: 50,
        }}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Verified;

const styles = StyleSheet.create({});
