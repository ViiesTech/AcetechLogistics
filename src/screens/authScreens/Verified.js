import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import colors from '../../theme/colors';
import images from '../../assets/images';
import BtnComp from '../../components/BtnComp';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Verified = ({ navigation, route }) => {
  const { id } = route.params
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
        btnText={'Reset Your Password'}
        style={{
          backgroundColor: colors.primary,
          width: wp('85%'),
          marginTop: 50,
        }}
        onPress={() => navigation.navigate('ResetPassword', { id: id })}
      />
    </View>
  );
};

export default Verified;

const styles = StyleSheet.create({});
