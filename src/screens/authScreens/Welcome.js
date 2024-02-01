import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import images from '../../assets/images';
import BtnComp from '../../components/BtnComp';
import colors from '../../theme/colors';

const Welcome = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.secondary, alignItems: 'center'}}>
        <View style={{alignItems:'center', width: wp('90%'), alignSelf: 'center', marginTop: hp('35%')}}>
            <Image source={images.logo} />

            <Text style={{color:'black', fontSize: hp('4.5%'), textAlign: 'center', marginVertical: hp('5%')}}>LOAD MANAGEMENT SYSTEM</Text>

            <View style={{width: wp('85%'), alignSelf: 'center'}}>
                <BtnComp btnText={'Get Started'} onPress={() => navigation.navigate('Login')} style={{backgroundColor: colors.primary}} />
            </View>
        </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})