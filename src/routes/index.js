import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthStack from './AuthStack'
import MainStack from './MainStack'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator();
const Routes = () => {
  const token = useSelector(state => state.user.token)
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {

          token ? <Stack.Screen name='MainStack' component={MainStack} />

            : <Stack.Screen name='AuthStack' component={AuthStack} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes

const styles = StyleSheet.create({})