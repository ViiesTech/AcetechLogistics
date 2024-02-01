import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../theme/colors';

const Input = ({
  placeholder,
  value,
  onChangeText,
  style,
  keyboardType,
  secureTextEntry = false,
  passwordField = false,
  onEyePress
}) => {

  
  return (
    <View style={styles.mainCont}>
      <TextInput
        value={value}
        onChangeText={changedText => onChangeText(changedText)}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="grey"
        style={[styles.input, style]}
      />
      {
        passwordField ? (
          secureTextEntry ? (
            <TouchableOpacity style={styles.eyeIcon} onPress={onEyePress}>
              <Entypo name="eye-with-line" size={20} color={colors.themeBlue}/>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.eyeIcon} onPress={onEyePress}>
              <Entypo name="eye" size={20} color={colors.themeBlue}  />
            </TouchableOpacity>
          )
        ) : null
      }

    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  mainCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 5,
    borderColor: 'black',
    overflow: 'hidden',
    paddingLeft: 5
  },
  input: {
    backgroundColor: 'white',
    padding: hp('1.5%'),
    borderRadius: 15,
    color: 'black',
    fontSize: hp('2%'),
    width: '86%',
    zIndex: -1
  },
  eyeIcon: {
    padding: 10,
    zIndex: 500,
  }
});
