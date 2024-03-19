import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { shareInsta } from '../hooks/instaShare';
import useVibration from '../hooks/useVibration';
import useContacts from '../hooks/useContacts';
import useImagePicker from '../hooks/useImagePicker';
import { router } from 'expo-router';
import useAsyncStorage from '../hooks/useAsyncStorage';
import { handleWebPush, sendPushNotification } from '../hooks/usePushNotifications';
  
const CustomWebView = ({uri}) => {

    const vibration = useVibration();
    const {contacts, getContacts} = useContacts();
    const {image, pickImage} = useImagePicker();
    
    const webViewRef = useRef(null); // WebView ref 추가  ㄱr
    const userInfo = useAsyncStorage('userInfo').storedValue
    const saveUser = useAsyncStorage('userInfo').save
    const pollInfo = useAsyncStorage('pollInfo').storedValue
    const savePollInfo = useAsyncStorage('pollInfo').save

    console.log('userInfo', userInfo)
    
    const _userInfo = JSON.stringify(userInfo).replace(/"/g, '\\"');
    const _pollInfo = JSON.stringify(pollInfo).replace(/"/g, '\\"');
    const injectedJavaScript = `
      window.localStorage.setItem('userInfo', "${_userInfo}");
      window.localStorage.setItem('pollInfo', "${_pollInfo}");
      true; // note: this line is required to avoid a warning
    `;

    const updateAppDate = async (data) => {

        data.userInfo && saveUser(data.userInfo)
        data.pollInfo && savePollInfo(data.pollInfo)
    }
    
    const handleWebViewMessage = async (event) => {

        const {data} = event.nativeEvent;

        if(data.includes('앱동기화')) return await updateAppDate(JSON.parse(data.replace('앱동기화', '')))
        if(data.includes('푸시')) return await handleWebPush(JSON.parse(data.replace('푸시', '')).pushs)
        if(data.includes('프로필이동')) return router.navigate(`/profile/${data.replace('프로필이동', '')}`)
        if(data.includes('카메라')) return router.navigate(`/camera/${data.replace('카메라', '')}`)
        if(data.includes('알람')) return router.navigate(`/alarm/${data.replace('알람', '')}`)

        switch(data) {
            case '진동':
                vibration()
                break;
            case '인스타':
                shareInsta(image)
                break;
            case '연락처':
                useContacts()
                break;
        }
    };    

    const [loading, setLoading] = useState(true);

    console.log(process.env.EXPO_PUBLIC_WEB_URL)

    return (
        <>
        {loading && (
            <View style={{
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}    
        <WebView
            ref={webViewRef}
            onLoadEnd={()=>setLoading(false)}
            style={{
                flex: 1, 
                backgroundColor: 'black',
                paddingBottom: 20,
            }}
            source={{ uri: `${process.env.EXPO_PUBLIC_WEB_URL}/${uri}` }}
            onMessage={handleWebViewMessage}
            injectedJavaScript={injectedJavaScript}
        />
        </>
    );
}

export default CustomWebView;