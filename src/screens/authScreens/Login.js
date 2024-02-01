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
  
  const Login = ({navigation, route}) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [form, setForm] = useState({
      email: '',
      password: '',
    });
    const selectedOption = route.params?.selectedOption ?? "rider"
  
    const onChangeText = (changedText, key) => {
      setForm(oldForm => {
        return {...oldForm, [key]: changedText};
      });
    };
  
    return (
      <View style={{flex: 1, backgroundColor: colors.secondary}}>
        <ScrollView style={{flexGrow: 1}}>
            <Image source={images.logo} style={{alignSelf:'center', marginTop: hp('4%')}} />
          <Text style={styles.heading}>Sign in with email or username</Text>
  
          <View style={styles.inputCont}>
            <Input
              placeholder={'johndoe@example.com'}
              value={form.email}
              onChangeText={changedText => onChangeText(changedText, 'email')}
              keyboardType={'email-address'}
            />
          </View>

          <View
            style={{
              width: wp('80%'),
              alignSelf: 'center',
              marginVertical: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
  
            <TouchableOpacity activeOpacity={0.6}>
              <Text
                style={{marginLeft: 10, color: '#7A86A1', fontSize: hp('2%')}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
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
  
          <View
            style={{width: wp('85%'), alignSelf: 'center', marginVertical: 10}}>
            <BtnComp
              btnText={'Login'}
              style={{backgroundColor: colors.primary}}
              onPress={() => navigation.navigate('MainStack')}
            />
          </View>
  
          <View style={{width: wp('82%'), alignSelf: 'center', height: 2, backgroundColor: 'black', marginVertical: 30}} />
  
          <View
            style={{
              width: wp('85%'),
              alignSelf: 'center',
              marginVertical: 15,
              alignItems: 'center'
            }}>
            <Text style={{color: '#7A86A1', fontSize: hp('2%'), textAlign: 'center'}}>Don't have an account?  </Text>
          </View>

          <BtnComp btnText={'Create an account'} onPress={() => navigation.navigate('Signup')} style={{borderWidth: 1, backgroundColor: colors.secondary, width: wp('90%'), alignSelf: 'center', borderRadius: 8}} textStyle={{color: 'black', fontWeight: 'regular'}} />
  
        </ScrollView>
      </View>
    );
  };
  
  export default Login;
  
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
      width: wp('85%'),
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
    }
  });
  