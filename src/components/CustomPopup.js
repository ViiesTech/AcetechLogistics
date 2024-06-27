import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CloseIcon from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux'
const CustomPopup = ({showPop,logout}) => {
    const dispatch = useDispatch()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#f0f0f0', paddingVertical: 30,paddingHorizontal:10, borderRadius: 5 }}>
                <TouchableOpacity style={{ position: 'absolute', right: 0, padding: 10 }} onPress={showPop}>
                <CloseIcon name='closecircle' size={20}  />
                </TouchableOpacity>
                <View style={{marginTop:20}}>
                <Text style={{ color: 'black',fontSize:18,fontWeight:'bold' }}>Are You Sure You Want To Log Out?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop:15 }}>

                    <TouchableOpacity onPress={showPop} style={{ backgroundColor: '#D8ECC3', padding: 10,borderRadius:5 ,width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#006400',fontSize:16,fontWeight:'bold' }}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logout} style={{ backgroundColor: '#FF6347', padding: 10, width: '40%',borderRadius:5,  justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#006400',fontSize:16,fontWeight:'bold' }}>Yes</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
    )
}

export default CustomPopup;