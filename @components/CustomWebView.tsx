import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { openInstagramProfile, shareInsta } from '../@hooks/instaShare';
import useVibration from '../@hooks/useVibration';
import useContacts from '../@hooks/useContacts';
import useImagePicker from '../@hooks/useImagePicker';
import { CommonActions } from '@react-navigation/native'
import { router, useNavigation } from 'expo-router';
import { handleWebPush, handleWebPushLocal } from '../@hooks/usePushNotifications';
import useUser from '../@hooks/useUser';
import usePoll from '../@hooks/usePoll';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGrant from '../@hooks/useGrant';

const CustomWebView = ({uri}) => {

    const webViewRef = useRef(null);

    const vibration = useVibration();
    // const {contacts, getContacts} = useContacts(webViewRef);
    const {image, pickImage} = useImagePicker();

    const navigation = useNavigation();
    
    const [userInfo, saveUserInfo] = useUser()
    const [pollInfo, savePollInfo] = usePoll()
    const [alarmGrant, changeAlarmGrant] = useGrant()

    useEffect(() => {

        if(!userInfo) return;
        if(!pollInfo) return;
        const type = "앱동기화"

        const message = `${type}${JSON.stringify({userInfo, pollInfo})}`
        webViewRef.current.postMessage(message);

    }, [userInfo, pollInfo])
    
    const updateAppDate = async (data) => {

        if(data.userInfo) saveUserInfo(data.userInfo)
        if(data.pollInfo) savePollInfo(data.pollInfo)
    }

    const signout = async () => {
        saveUserInfo(null)
        savePollInfo(null)

        await AsyncStorage.removeItem('userInfo')
        await AsyncStorage.removeItem('pollInfo')
        await AsyncStorage.removeItem('grant')
        
        navigation.dispatch(CommonActions.reset({
            routes: [{key: "register/first", name: "register/first"}]
        }))
    }
    
    const handleWebViewMessage = async (event) => {

        const {data} = event.nativeEvent;

        if(data.includes('인스타프로필')) return openInstagramProfile(data.replace('인스타프로필', ''))
        if(data.includes('알람권한변경')) return changeAlarmGrant()
        if(data.includes('초기화')) return signout()
        if(data.includes('앱동기화')) return await updateAppDate(JSON.parse(data.replace('앱동기화', '')))
        if(data.includes('첫투표로컬푸시')) return await Notifications.scheduleNotificationAsync({
            content: JSON.parse(data.replace('첫투표로컬푸시', '')),
            trigger: { seconds: 1 },
          });
        if(data.includes('로컬푸시')) return await handleWebPushLocal(JSON.parse(data.replace('로컬푸시', '')))
        if(data.includes('푸시')) return await handleWebPush(JSON.parse(data.replace('푸시', '')).pushs)
        if(data.includes('탭이동')) return router.navigate(`/${data.replace('탭이동', '')}`)

        if(data.includes('프로필이동')) return router.navigate(`/profile/${data.replace('프로필이동', '')}`)
        if(data.includes('카메라')) {
            const queryData = encodeURIComponent(data.replace('카메라', ''));
            return router.navigate(`/camera/${queryData}`);
        }          
        if(data.includes('알람')) return router.navigate(`/alarm/${data.replace('알람', '')}`)

        if(data.includes('진동')) return vibration()
        if(data.includes('인스타')) return shareInsta(image)
        // if(data.includes('연락처')) return getContacts()
    };

    const [loading, setLoading] = useState(true);


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
            injectedJavaScript={`
                window.localStorage.setItem('userInfo', "${JSON.stringify(userInfo).replace(/"/g, '\\"')}");
                window.localStorage.setItem('pollInfo', "${JSON.stringify(pollInfo).replace(/"/g, '\\"')}");
                window.localStorage.setItem('grant', "${JSON.stringify({alarm: alarmGrant}).replace(/"/g, '\\"')}");
                true; // note: this line is required to avoid a warning
            `}
        />
        </>
    );
}

export default CustomWebView;