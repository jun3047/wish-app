import React, { Component } from 'react';
import { Linking } from 'react-native';
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