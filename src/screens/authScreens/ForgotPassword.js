import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import colors from '../../theme/colors'
import images from '../../assets/images'
import Input from '../../components/Input'
import BtnComp from '../../components/BtnComp'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { baseUrl } from '../../assets/utils/baseUrl'
const ForgotPassword = ({ navigation }) => {

    const [form, setForm] = useState({
        email: ''
    })
    const [loading, setIsLoading] = useState(false)
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

    const handleVerification = () => {
        setIsLoading(true)
        let data = JSON.stringify({
            "email": form.email
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/email-verification`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
        if (form.email) {
            axios.request(config)
                .then((response) => {
                    setIsLoading(false)

                    console.log(JSON.stringify(response.data));
                    if (response.data.success == 'true') {
                        showToast('success', response.data.message)
                        setTimeout(() => {
                            navigation.navigate('CheckPin', { id: response.data.id })
                        }, 1000)
                    } else {
                        showToast('error', response.data.message)
                    }
                })
                .catch((error) => {
                    setIsLoading(false)
                    console.log(error);
                });
        } else {
            setIsLoading(false)
            showToast('error', 'Plz Fill The Required Fields')
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.secondary, }}>
            <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                <Image source={images.logo} style={{ alignSelf: 'center', marginTop: hp('4%') }} />
                <Text style={styles.heading}>Enter Your Email Address</Text>

                <View style={styles.inputCont}>
                    <Input
                        placeholder={'johndoe@example.com'}
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

                </View>

                <View
                    style={{ width: wp('85%'), alignSelf: 'center', marginVertical: 10 }}>
                    <BtnComp
                        padding={1}
                        height={50}
                        btnText={loading ? (<ActivityIndicator size={'large'} color={'white'} />) : 'Verify'}
                        style={{ backgroundColor: colors.primary }}
                        onPress={(handleVerification)}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default ForgotPassword

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