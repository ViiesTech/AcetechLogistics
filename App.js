import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Routes from './src/routes'
import { Provider } from 'react-redux'
import { persistor, store } from './src/redux/store'
import Toast from 'react-native-toast-message'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
      <Toast />

    </>
  )
}

export default App

const styles = StyleSheet.create({})