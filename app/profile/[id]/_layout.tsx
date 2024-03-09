import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react';
import useVibration from '../../hooks/useVibration';
import WebView from 'react-native-webview';

export default () => {

    const {id} = useLocalSearchParams()
    const vibrate = useVibration()

    console.log(id)

    return (
        <>
        <Stack.Screen options={{
            title: '',
            headerBackTitleVisible: false,
        }} />
        <WebView
            style={{
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: 'black',
            }}
            source={{ uri: `http://192.168.219.172:3000/profile/${id.replace('[','').replace(']','')}` }}
            onMessage={(event)=>{
              const {data} = event.nativeEvent
              if(data === '진동') return vibrate()
            }}
        />
        </>
    );
  }