import React from 'react';
import useVibration from '../hooks/useVibration';
import WebView from 'react-native-webview';
import { router } from 'expo-router';

export default () => {

    const vibrate = useVibration()

    return (
      <WebView
            style={{
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: 'black',
            }}
            source={{ uri: 'http://192.168.219.172:3000/home' }}    
            onMessage={(event)=>{
              const {data} = event.nativeEvent
              if(data === '진동') return vibrate()
              if(data === '알림이동') return router.navigate('/alarm')
              if(data === '친구이동') return router.navigate('/friend')
              if(data.includes('프로필이동')) {
                return router.navigate(`/profile/[${data.replace('프로필이동', '')}]`)
              }
            }}
        />
    );
  }