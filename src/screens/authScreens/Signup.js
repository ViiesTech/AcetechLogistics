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
  import Fontisto from 'react-native-vector-icons/Fontisto';
  import BouncyCheckbox from 'react-native-bouncy-checkbox';
  import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '../../assets/images';
  
  const Signup = ({navigation}) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [selectedOption, setSelectedOption] = useState('rider');
  
    const onChangeText = (changedText, key) => {
      setForm(oldForm => {
        return {...oldForm, [key]: changedText};
      });
    };
  
    return (
      <View style={{flex: 1, backgroundColor: colors.secondary}}>
        <ScrollView style={{flexGrow: 1}}>
          <View style={{width: wp('88%'), alignSelf: 'center', flexDirection: 'row', alignItems: 'center', marginVertical: hp('3%')}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name='arrowleft' size={25} color={'black'} />
            </TouchableOpacity>
          </View>
  
          <Image source={images.logo} style={{alignSelf: 'center'}} />
  
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BouncyCheckbox
              size={25}
              fillColor={colors.primary}
              unfillColor="#FFFFFF"
              text="Remember me"
              isChecked={false}
              disableText={true}
              iconStyle={{borderColor: 'red'}}
              innerIconStyle={{borderWidth: 2}}
              textStyle={{
                fontFamily: 'JosefinSans-Regular',
                color: colors.themeBlue,
              }}
              // onPress={(isChecked: boolean) => {}}
            />
            <Text
              style={{marginLeft: 10, color: 'black', fontSize: hp('2%')}}>
              I have read the terms and conditions
            </Text>
          </View>
        </View>
  
          <View
            style={{width: wp('85%'), alignSelf: 'center', marginVertical: 30}}>
            <BtnComp
              style={{backgroundColor: colors.primary, paddingVertical: 20}}
              btnText={'Create an account'}
              onPress={() => navigation.navigate('CheckPin')}
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