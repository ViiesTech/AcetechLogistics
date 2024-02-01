import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {useState} from 'react';
import Input from '../../components/Input';
import colors from '../../theme/colors';
import BtnComp from '../../components/BtnComp';
import images from '../../assets/images';

const Home = ({navigation, route}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [form, setForm] = useState({
    name: '',
    truckNumber: '',
    trailerNumber: '',
  });
  const selectedOption = route.params?.selectedOption ?? 'rider';

  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return {...oldForm, [key]: changedText};
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.secondary}}>
      <ScrollView style={{flexGrow: 1}}>
        <Image
          source={images.logo}
          style={{alignSelf: 'center', marginTop: hp('4%')}}
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
            style={{width: '85%', alignSelf: 'center', marginVertical: 10}}>
            <BtnComp
              btnText={'Continue'}
              style={{backgroundColor: colors.primary}}
              onPress={() => navigation.navigate('TrackerScreen')}
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
