import { ActivityIndicator, Image, PermissionsAndroid, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../theme/colors';
import images from '../../assets/images';
import BtnComp from '../../components/BtnComp';
import Toast from 'react-native-toast-message';
import { clearToken, clearUserTrackingId, startTrackings, updateTrackings, userTrackingId } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import CustomPopup from '../../components/CustomPopup';
import { baseUrl } from '../../assets/utils/baseUrl';

const TrackerScreen = ({ navigation }) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [showStartBtn, setShowStartBtn] = useState(true)
  const trackingValue = useSelector(state => state.user.startTracking)
  const updatedValue = useSelector(state => state.user.updateTracking)
  const trackingId = useSelector(state => state.user.userTrackingId)
  const [popup, setShowPopup] = useState(false)
  const token = useSelector(state => state.user.token);
  const [loading, setIsLoading] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const dispatch = useDispatch()

  Geolocation.getCurrentPosition(
    position => {
      console.log('coordssss', position); // Log the entire position object
      setLongitude(position.coords.longitude); // Set the longitude
      setLatitude(position.coords.latitude); // Set the latitude
    },
    error => {
      console.error('Error getting location:', error); // Log any errors that occur
    }
  );
  console.log('long',longitude,'lat',latitude)

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
    });
  }
  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("ACCESS_FINE_LOCATION permission granted");
      } else {
        console.log("ACCESS_FINE_LOCATION permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    permission()
  })
  useEffect(() => {
    console.log('Start Tracking, ', trackingValue)
  }, [])

  const startTracking = () => {
    setIsLoading(true)
    // {
    //   trackingValue &&
    //     Geolocation.getCurrentPosition(
    //       position => {
    //         setLongitude(position.coords.longitude);
    //         setLatitude(position.coords.latitude);
    //       },
    //       error => {
    //         console.error('Error getting location:', error);
    //       }
    //     );


    let data = JSON.stringify({
      "userTrackingId": "",
      "longitude": longitude,
      "latitude": latitude,
      "finishStatus": ""
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/user-tracking-info`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setIsLoading(false)

        console.log("current response", JSON.stringify(response.data));
        console.log("userTrackingId", response.data.trackingInfo);
        showToast('success', response.data.message)
        dispatch(userTrackingId(response.data.trackingInfo))
        // setTimeout(()=>{
        //   console.log('idd', `${trackingId}`)

        // },5000)
        dispatch(startTrackings(false))
        dispatch(updateTrackings(true))
        setShowStartBtn(false)
      })
      .catch((error) => {

        setIsLoading(false)
        showToast('error', error.message)

        console.log(error);
      });

  }


  // };


  const updateTracking = () => {
    setIsLoading(false)

    Geolocation.getCurrentPosition(
      position => {
        // console.log(Math.random().toFixed(2)*10)
        setLongitude(position.coords.longitude)
        setLatitude(position.coords.latitude)
      },
      error => {
        console.error('Error getting location:', error);
      }
    );
    console.log('long', longitude)
    console.log('lat', latitude)
    console.log('idd', `${trackingId}`)
    setShowStartBtn(false)

    let data = JSON.stringify({
      "userTrackingId": `${trackingId}`,
      "longitude": longitude,
      "latitude": latitude,
      "finishStatus": ""
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/user-tracking-info`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        // showToast('success', response.data.message)

        console.log(JSON.stringify(response.data));
        console.log(JSON.stringify('userTrackingId', response.data.trackingInfo));

      })
      .catch((error) => {
        // showToast('error', error)

        console.log(error);
      });

  }

  console.log('START Tracking', trackingValue)
  useEffect(() => {
    let intervalId;
    if (updatedValue) {
      intervalId = setInterval(() => {
        updateTracking();
      }, 5000);
    }

    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, [updatedValue]);



  const stopTracking = () => {
    setIsLoading(true)

    console.log('idd', `${trackingId}`)

    dispatch(updateTrackings(false))
    console.log('Stopped Tracking');
    let data = JSON.stringify({
      "userTrackingId": `${trackingId}`,
      "longitude": longitude,
      "latitude": latitude,
      "finishStatus": "finish"
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/user-tracking-info`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setIsLoading(false)
        showToast('success', response.data.message)

        console.log(JSON.stringify(response.data));
        console.log('userTrackingIdsssss', response.data.trackingInfo);
        setShowStartBtn(true)

      })
      .catch((error) => {
        setIsLoading(false)
        showToast('error', error.message)

        console.log(error);
      });

  };



  const handleLogout = () => {
    setTimeout(() => {
      setShowPopup(!popup)


      // dispatch(startTrackings(true))
    }, 500)
    // dispatch(clearToken())
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.secondary }}
    >


      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        {
          popup && (
            <View style={{ position: 'absolute', zIndex: 4854 }} >
              <CustomPopup
                logout={() => {
                  setTimeout(() => {
                    setIsLoading(true)
                    if (trackingId == "") {
                      dispatch(clearToken())
                      return
                    }
                    if (trackingId !== "") {
                      dispatch(clearUserTrackingId())
                    }
                    stopTracking()
                    dispatch(clearToken())
                    // dispatch(clearUserTrackingId())
                    setIsLoading(false)

                    // dispatch(clearToken())
                  }, 500)
                }}
                showPop={() => setShowPopup(!popup)} />
            </View>
          )
        }
        {logoutLoading ? (
          <View style={{ height: '100%', position: 'absolute', zIndex: 10, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={'25'} color={'white'} />
          </View>
        ) : null}

        <View

          style={{ width: '35%', height: 50, alignSelf: 'center', alignSelf: 'flex-end', marginVertical: 20, marginRight: 20 }}>
          <BtnComp
            btnText={'Log Out'}
            style={{ backgroundColor: colors.primary }}
            onPress={(handleLogout)}
          />
        </View>
        <Image source={images.logo} />
        <View
          style={{
            width: wp('80%'),
            height: hp('50%'),
            borderRadius: 10,
            marginVertical: 50,
            overflow: 'hidden',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}>
          <Image
            source={images.truckImage}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        {showStartBtn ?
          (

            <BtnComp height={50} padding={1} btnText={loading ? (<ActivityIndicator size={'large'} color={'white'} />) : 'Start Tracking'} style={{ width: wp('90%') }} onPress={startTracking} />
          ) : (
            <BtnComp height={50} padding={1} btnText={loading ? (<ActivityIndicator size={'large'} color={'white'} />) : 'Stop Tracking'} style={{ width: wp('90%') }} onPress={stopTracking} />

          )

        }
      </ScrollView>
    </View>
  );
}
export default TrackerScreen;

const styles = StyleSheet.create({});
