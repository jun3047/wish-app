import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { usePushNotifications } from '../hooks/usePushNotifications';
import WebView from 'react-native-webview';
import { shareInsta } from '../hooks/instaShare';
import useVibration from '../hooks/useVibration';
import useContacts from '../hooks/useContacts';
import useImagePicker from '../hooks/useImagePicker';
import env from '../../env.json';

export default () => {

    const { expoPushToken, notification } = usePushNotifications();
    const vibration = useVibration();
    const {contacts, loading, getContacts} = useContacts();
    const {image, pickImage} = useImagePicker();


    useEffect(() => {
        console.log(expoPushToken)
    },[expoPushToken])

    const handleWebViewMessage = (event) => {

        switch(event.nativeEvent.data) {
            case '진동':
                vibration()
                break;
            case '인스타':
                shareInsta(image)
                break;
            case '연락처':
                useContacts()
                break;
            case '사진선택':
                pickImage()
                break;
        }
    };    
    
    return (
        <WebView
            style={{
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: 'black',
            }}
            source={{ uri: `${env['WEB_URL']}/alarm` }}
            onMessage={handleWebViewMessage}
        />
    );
}