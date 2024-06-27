import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import Input from '../../components/Input';
import colors from '../../theme/colors';
import BtnComp from '../../components/BtnComp';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '../../assets/images';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { baseUrl } from '../../assets/utils/baseUrl';

const Signup = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const [loading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [selectedOption, setSelectedOption] = useState('rider');
  let [checked, setIsChecked] = useState(false)
  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return { ...oldForm, [key]: changedText };
    });
  };

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
    });
  }

  const handleSignup = () => {
    setIsLoading(true)
    let data = JSON.stringify({
      "name": form.name,
      "email": form.email,
      "password": form.password,
      "user_type": "user"
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };

    if (!form.password || !form.confirmPassword || !form.name || !form.email || !checked) {
      setIsLoading(false)
      showToast('error', 'Please Fill The Required Fields')

    }
    else if (form.password !== form.confirmPassword) {
      setIsLoading(false)
      showToast('error', 'Passwords Must Be Same')
    }
    else if (!String(form.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      setIsLoading(false)
      showToast('error', 'This Email is not valid')

    }

    else if (form.password.length < 8) {
      setIsLoading(false)
      showToast('error', 'Password Must Be Eight Characters');
    }
    else {

      axios.request(config)
        .then((response) => {
          setIsLoading(false)
          console.log("response", JSON.stringify(response.data));
          if (response.data.success == "true") {

            showToast("success", response.data.message)
            navigation.navigate('Login')
          } else {
            showToast('error', response.data.message)

          }
        })

        .catch((error) => {
          setIsLoading(false)

          console.log(error);
          showToast("error", error.message)
        });

    }
    console.log('checked', checked)
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.secondary }}>
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ width: wp('88%'), alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginVertical: hp('3%') }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name='arrowleft' size={25} color={'black'} />
          </TouchableOpacity>
        </View>

        <Image source={images.logo} style={{ alignSelf: 'center' }} />

        <Text style={styles.heading}>Create an account</Text>
        <View style={styles.inputCont}>
          <Input
            placeholder={'Full Name'}
            value={form.name}
            onChangeText={changedText => onChangeText(changedText, 'name')}
          />
        </View>

        <View style={styles.inputCont}>
          <Input
            placeholder={'johndoe@example.com'}
            value={form.email}
            onChangeText={changedText => onChangeText(changedText, 'email')}
            keyboardType={'email-address'}
          />
        </View>

        <View style={styles.inputCont}>
          <Input
            placeholder={'7+ Characters'}
            value={form.password}
            onChangeText={changedText => onChangeText(changedText, 'password')}
            passwordField={true}
            secureTextEntry={secureTextEntry}
            onEyePress={() => setSecureTextEntry(!secureTextEntry)}
          />
        </View>

        <View style={styles.inputCont}>
          <Input
            placeholder={'7+ Characters'}
            value={form.confirmPassword}
            onChangeText={changedText =>
              onChangeText(changedText, 'confirmPassword')
            }
            passwordField={true}
            secureTextEntry={confirmSecureTextEntry}
            onEyePress={() =>
              setConfirmSecureTextEntry(!confirmSecureTextEntry)
            }
          />
        </View>

        <View
          style={{
            width: wp('82%'),
            alignSelf: 'center',
            marginVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BouncyCheckbox
              size={25}
              fillColor={colors.primary}
              unfillColor="#FFFFFF"
              text="Remember me"
              isChecked={checked}
              disableText={true}
              iconStyle={{ borderColor: 'red' }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{
                fontFamily: 'JosefinSans-Regular',
                color: colors.themeBlue,
              }}
              onPress={() => setIsChecked(!checked)}
            />
            <Text
              style={{ marginLeft: 10, color: 'black', fontSize: hp('2%') }}>
              I have read the terms and conditions
            </Text>
          </View>
        </View>

        <View
          style={{ width: wp('85%'), alignSelf: 'center', marginVertical: 30 }}>
          <BtnComp
            height={50}
            padding={1}
            style={{ backgroundColor: colors.primary, paddingVertical: 20 }}
            btnText={
              loading ? (
                <ActivityIndicator color={'white'} size={'large'} />
              ) : (
                'Create an account'
              )
            }
            onPress={handleSignup}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  heading: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 30,
    marginVertical: 20
  },
  inputCont: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  subHeading: {
    color: '#7A86A1',
    fontSize: hp('2%'),
    width: wp('85%'),
    alignSelf: 'center',
    marginVertical: 5,
  },
  optionCont: {
    flexDirection: 'row',
    width: wp('88%'),
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignSelf: 'center',
    borderRadius: 250,
    justifyContent: 'space-between',
    marginVertical: 15,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 10,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 250,
  }
});