import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react';
import useVibration from '../../../@hooks/useVibration';
import CustomWebView from '../../../@components/CustomWebView';

export default () => {

    const {id} = useLocalSearchParams()
    const vibrate = useVibration()

    return (
        <>
        <Stack.Screen options={{
            title: '',
            headerBackTitleVisible: false,
        }} />
        <CustomWebView
            uri={`profile/${id}`}
        />
        </>
    );
  }