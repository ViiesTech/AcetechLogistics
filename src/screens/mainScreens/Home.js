import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import Input from '../../components/Input';
import colors from '../../theme/colors';
import BtnComp from '../../components/BtnComp';
import images from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken, formStatus } from '../../redux/authSlice';
import { UseDispatch } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { baseUrl } from '../../assets/utils/baseUrl';
const Home = ({ navigation, route }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    truckNumber: '',
    trailerNumber: '',
  });

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
    });
  }
  const dispatch = useDispatch()
  const selectedOption = route.params?.selectedOption ?? 'rider';
  const user = useSelector(state => state.user.token)
  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return { ...oldForm, [key]: changedText };
    });
  };
  const handleToken = () => {
    console.log("token", user)
  }
  const handleDetails = () => {
    setIsLoading(true)
    console.log('token', 'ghfhhghfg')
    let data = JSON.stringify({
      "secondName": form.name,
      "truckNumber": form.truckNumber,
      "trailerNumber": form.trailerNumber
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/user-fill-data`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user}`
      },
      data: data
    };
    if (form.name && form.truckNumber && form.trailerNumber) {
      axios.request(config)
        .then((response) => {
          setIsLoading(false)

          console.log('success', JSON.stringify(response.data));
          if (JSON.stringify(response.data.success) == 'true') {
            dispatch(formStatus(1))
            navigation.navigate('TrackerScreen')
          }

        })
        .catch((error) => {
          setIsLoading(false)

          console.log(error);
          showToast('error', error)

        });
    } else {
      setIsLoading(false)

      showToast('error', 'Plz Fill The Required Fields')
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: colors.secondary }}>
      <ScrollView style={{ flexGrow: 1 }}>
        <Image
          source={images.logo}
          style={{ alignSelf: 'center', marginTop: hp('4%') }}
        />

        <View
          style={{
            backgroundColor: 'white',
            width: wp('90%'),
            alignSelf: 'center',
            marginVertical: 25,
            paddingVertical: 15,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <Text style={styles.subHeading}>Enter Your Name*</Text>
          <View style={styles.inputCont}>
            <Input
              placeholder={'Type here...'}
              value={form.name}
              onChangeText={changedText => onChangeText(changedText, 'name')}
            />
          </View>

          <Text style={styles.subHeading}>Enter Your Truck Number</Text>
          <View style={styles.inputCont}>
            <Input
              placeholder={'Type here...'}
              value={form.truckNumber}
              onChangeText={changedText =>
                onChangeText(changedText, 'truckNumber')
              }
              keyboardType={'number-pad'}
            />
          </View>

          <Text style={styles.subHeading}>Enter Your Trailer Number</Text>
          <View style={styles.inputCont}>
            <Input
              placeholder={'Type here...'}
              value={form.trailerNumber}
              onChangeText={changedText =>
                onChangeText(changedText, 'trailerNumber')
              }
              keyboardType={'number-pad'}
            />
          </View>

          <View
            style={{ width: '85%', alignSelf: 'center', marginVertical: 10 }}>
            <BtnComp
              height={50}
              padding={1}
              btnText={loading ? (<ActivityIndicator size={'large'} color={'white'} />) : 'Continue'}
              style={{ backgroundColor: colors.primary }}
              // onPress={() => navigation.navigate('TrackerScreen')}
              onPress={(handleDetails)}
            />
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: 'black',
    width: wp('85%'),
    alignSelf: 'center',
    marginVertical: hp('3%'),
  },
  inputCont: {
    width: '85%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  subHeading: {
    color: '#7A86A1',
    fontSize: hp('2%'),
    width: '85%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  bottomBtn: {
    width: wp('85%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 250,
    flexDirection: 'row',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
