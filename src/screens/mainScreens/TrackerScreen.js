import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import images from '../../assets/images';
import BtnComp from '../../components/BtnComp';

const TrackerScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.secondary}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        
        <AntDesign name='arrowleft' size={25} color={'black'} style={{padding: 8, backgroundColor: 'white', position: 'absolute', top: 15, left: 20, borderRadius: 250}} onPress={() => navigation.goBack()} />
        
        <Image source={images.logo} />
        <View
          style={{
            width: wp('80%'),
            height: hp('50%'),
            borderRadius: 10,
            marginVertical: 50,
            overflow: 'hidden',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}>
          <Image
            source={images.truckImage}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <BtnComp btnText={'Start Tracking'} style={{width: wp('90%')}} />
      </ScrollView>
    </View>
  );
};

export default TrackerScreen;

const styles = StyleSheet.create({});
