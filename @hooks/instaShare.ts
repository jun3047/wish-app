import React, { Component } from 'react';
import { Linking, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export const shareInsta = async (uri: string | null) => {

    if(!uri) return;

    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
        return;
    }

    try {
        await MediaLibrary.createAssetAsync(uri);
    } catch (error) {
        console.error('Error saving photo', error);
    }

    const encodedURL = encodeURIComponent(uri);

    const instagramURL_test = `instagram://library?OpenInEditor=1&LocalIdentifier=${encodedURL}`;
    
    Linking.openURL(instagramURL_test);
}

export const openInstagramProfile = (instaId: string) => {
    const url = `https://www.instagram.com/${instaId}/`;

    Linking.openURL(url)
        .catch((err) => Alert.alert(
            'Instagram을 열 수 없습니다',
            '다시 시도하거나 인스타에서 @wishappteam으로 문의해주세요',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
        ));
};