import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from '../screens/authScreens/Welcome'
import Login from '../screens/authScreens/Login';
import Signup from '../screens/authScreens/Signup';
import CheckPin from '../screens/authScreens/CheckPin';
import Verified from '../screens/authScreens/Verified';
import ForgotPassword from '../screens/authScreens/ForgotPassword';
import ResetPassword from '../screens/authScreens/ResetPassword';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Welcome' component={Welcome} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='CheckPin' component={CheckPin} />
      <Stack.Screen name='Verified' component={Verified} />
      <Stack.Screen name='ResetPassword' component={ResetPassword} />
    </Stack.Navigator>
  )
}

export default AuthStack