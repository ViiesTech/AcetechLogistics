import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../theme/colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from 'react-native-confirmation-code-field';
import BtnComp from '../../components/BtnComp';
import images from '../../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CheckPin = ({navigation, route}) => {
  const [count, setCount] = useState(59);
  const [value, setValue] = useState('');

  const CELL_COUNT = 5;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;
    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="*"
          isLastFilledCell={isLastFilledCell({index, value})}>
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  useEffect(() => {
    if (count !== 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: colors.secondary}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            width: wp('88%'),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: hp('3%'),
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} color={'black'} />
          </TouchableOpacity>
        </View>
        <Image
          source={images.logo}
          style={{marginBottom: hp('3%'), alignSelf: 'center'}}
        />

        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: hp('4%'),
            width: wp('84%'),
            alignSelf: 'center'
          }}>
          Email Verification
        </Text>

        <Text style={{color: 'black', fontSize: hp('1.6%'), alignSelf: 'center', width: wp('84%')}}>
          An email has been sent to your registered email address. Enter the
          verification code below:
        </Text>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
        <Text style={{color: colors.themeBlack, alignSelf: 'center'}}>
          00 : {count}
        </Text>

        <Text
          style={{
            alignSelf: 'center',
            color: colors.themeBlack,
            marginTop: 20,
          }}>
          Didn't receive a code?
        </Text>

        <TouchableOpacity
          disabled={count > 0}
          style={{alignSelf: 'center', padding: 5, marginTop: 7}}>
          <Text
            style={{
              alignSelf: 'center',
              color: count <= 0 ? colors.themeBlack : 'rgba(0,0,0,0.3)',
              fontSize: hp('2%'),
              fontWeight: 'bold',
              borderBottomWidth: 2,
              borderBottomColor: 'grey',
            }}>
            Resend Code
          </Text>
        </TouchableOpacity>

        {/* {value.length === 4 ? ( */}
          <BtnComp btnText={'Verify'} onPress={() => navigation.navigate('Verified')} style={{marginTop: 30, backgroundColor: colors.primary}} />
        {/* ) : null} */}
      </ScrollView>
    </View>
  );
};
export default CheckPin;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: 'black',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.themeBlue,
    color: colors.themeBlack,
  },
  underlineStyleHighLighted: {
    borderColor: '#000000',
  },
  codeFieldRoot: {
    marginTop: 40,
    padding: 20,
  },
  cell: {
    width: 60,
    height: 60,
    lineHeight: 40,
    fontSize: 34,
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
    borderRadius: 15,
    padding: 15,
    color: 'black',
  },
  focusCell: {
    borderColor: '#4E4B66',
  },
});
