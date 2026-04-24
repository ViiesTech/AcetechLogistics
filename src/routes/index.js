import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {useSelector} from 'react-redux';
import Welcome from '../screens/authScreens/Welcome';
import Login from '../screens/authScreens/Login';
import Signup from '../screens/authScreens/Signup';
import ForgotPassword from '../screens/authScreens/ForgotPassword';
import CheckPin from '../screens/authScreens/CheckPin';
import Verified from '../screens/authScreens/Verified';
import ResetPassword from '../screens/authScreens/ResetPassword';
import TrackerScreen from '../screens/mainScreens/TrackerScreen';
import Home from '../screens/mainScreens/Home';

const Stack = createNativeStackNavigator();
const Routes = () => {
  const token = useSelector(state => state.user.token);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* {

          token ? <Stack.Screen name='MainStack' component={MainStack} />

            : <Stack.Screen name='AuthStack' component={AuthStack} />
        } */}
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CheckPin" component={CheckPin} />
        <Stack.Screen name="Verified" component={Verified} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="TrackerScreen" component={TrackerScreen} />
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="TrackerScreen" component={TrackerScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
