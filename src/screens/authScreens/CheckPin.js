import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
import Toast from 'react-native-toast-message';
import { baseUrl } from '../../assets/utils/baseUrl';
const CheckPin = ({ navigation, route }) => {
  const [count, setCount] = useState(59);
  const [value, setValue] = useState('');
  const [loading, setIsLoading] = useState(false)
  const { id } = route.params;
  const userId = id || null;
  const CELL_COUNT = 5;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;
    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="*"
          isLastFilledCell={isLastFilledCell({ index, value })}>
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

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
    });
  }
  useEffect(() => {
    if (count !== 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  const handleVerification = () => {
    setIsLoading(true)
    console.log("userId", userId)
    console.log("value", value)

    let data = JSON.stringify({
      "id": userId,
      "otp": value
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/verify-otp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };
    if (value) {
      axios.request(config)
        .then((response) => {
          setIsLoading(false)
          console.log(JSON.stringify(response.data));
          if (response.data.success == 'true') {
            showToast("success", response.data.message)
            setTimeout(() => {
              navigation.navigate('Verified', { id: id })
            }, 1000)
          } else {
            showToast("error", response.data.message)
          }
        })
        .catch((error) => {
          setIsLoading(false)
          showToast("error", error.message)
          console.log("error", error);
        });
    } else {
      setIsLoading(false)
      showToast("error", 'Plz Fill The Required Fields')
    }

  }

  const resendCode = () => {

  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.secondary }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
          style={{ marginBottom: hp('3%'), alignSelf: 'center' }}
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

        <Text style={{ color: 'black', fontSize: hp('1.6%'), alignSelf: 'center', width: wp('84%') }}>
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
        <Text style={{ color: colors.themeBlack, alignSelf: 'center' }}>
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
          onPress={resendCode}
          style={{ alignSelf: 'center', padding: 5, marginTop: 7 }}>
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

        <BtnComp padding={1} height={50} btnText={loading ? (<ActivityIndicator size={'large'} color={'white'} />) : 'Verify'} onPress={(handleVerification)} style={{ marginTop: 30, backgroundColor: colors.primary }} />
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
  },
  cell: {
    width: 60,
    height: 60,
    fontSize: 34,
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
    borderRadius: 15,
    paddingVertical: 10,
    color: 'black',
  },
  focusCell: {
    borderColor: '#4E4B66',
  },
});
