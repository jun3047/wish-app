import React from 'react';
import useVibration from '../hooks/useVibration';
import WebView from 'react-native-webview';
import { router } from 'expo-router';
import env from '../../env.json';

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
            source={{ uri: `${env['WEB_URL']}/my` }}
            onMessage={(event)=>{
              const {data} = event.nativeEvent
              if(data === '진동') return vibrate()
              if(data.includes('프로필이동')) {
                    return router.navigate(`/profile/${data.replace('프로필이동', '')}`)
                }
            }}
        />
    );
  }