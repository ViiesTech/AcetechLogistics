import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import colors from '../../theme/colors'
import images from '../../assets/images'
import Input from '../../components/Input'
import BtnComp from '../../components/BtnComp'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { baseUrl } from '../../assets/utils/baseUrl'
const ResetPassword = ({ navigation, route }) => {

    const { id } = route.params;
    const [loading, setIsLoading] = useState(false)
    const userId = id || null;
    const [form, setForm] = useState({
        password: '',
        confirm_pass: ''

    })
    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
        });
    }

    const onChangeText = (changedText, key) => {
        setForm(oldForm => {
            return { ...oldForm, [key]: changedText }
        })
    }
    const handleResetPass = () => {
        setIsLoading(true)
        console.log('route', route)
        let data = JSON.stringify({
            "id": userId,
            "password": form.password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/forgot-password`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
        if (!form.password || !form.confirm_pass) {
            setIsLoading(false)
            showToast('error', 'Plz Fill The Required Fields')

        } else if (form.password != form.confirm_pass) {
            setIsLoading(false)
            showToast('error', 'Passwords Must Be Same')

        } else {
            axios.request(config)
                .then((response) => {
                    setIsLoading(false)
                    console.log(JSON.stringify(response.data));
                    if (response.data.success == 'true') {
                        showToast('success', response.data.message)
                        setTimeout(() => {
                            navigation.navigate('Login')
                        }, 1000)
                    } else {
                        showToast('error', response.data.message)
                    }
                })
                .catch((error) => {
                    setIsLoading(false)
                    showToast('error', error.message)
                    console.log(error);
                });
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.secondary, }}>
            <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                <Image source={images.logo} style={{ alignSelf: 'center', marginTop: hp('4%') }} />
                <Text style={styles.heading}>Reset Your Password</Text>

                <View style={styles.inputCont}>
                    <Input
                        placeholder={'Password'}
                        onChangeText={changedText => onChangeText(changedText, 'password')}
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



                </View>
                <View style={styles.inputCont}>
                    <Input
                        placeholder={'Confirm Password'}
                        //   value={form.email}
                        onChangeText={changedText => onChangeText(changedText, 'confirm_pass')}
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



                </View>

                <View
                    style={{ width: wp('85%'), alignSelf: 'center', marginVertical: 10 }}>
                    <BtnComp
                        padding={1}
                        height={50}
                        btnText={loading ? (<ActivityIndicator size={'large'} color={'white'} />) : 'Reset'}
                        style={{ backgroundColor: colors.primary }}
                        onPress={(handleResetPass)}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default ResetPassword

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