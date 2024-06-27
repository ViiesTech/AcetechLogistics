import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/mainScreens/Home';
import TrackerScreen from '../screens/mainScreens/TrackerScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  const formState = useSelector(state => state.user.formStatus)
  useEffect(() => {
    console.log('userformstate', formState)
  }, [])
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {formState == 1 ?
        <Stack.Screen name='TrackerScreen' component={TrackerScreen} />
        :
        <>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='TrackerScreen' component={TrackerScreen} />
        </>
      }
    </Stack.Navigator>
  )
}

export default MainStack