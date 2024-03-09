import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import WebView from 'react-native-webview';

export default () => {
    return (
        <WebView 
            source={{ uri: 'https://www.naver.com' }}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
    );
}