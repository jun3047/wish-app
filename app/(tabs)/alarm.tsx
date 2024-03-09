import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { usePushNotifications } from '../hooks/usePushNotifications';

export default () => {

    const { expoPushToken, notification } = usePushNotifications();

    useEffect(() => {
        console.log(expoPushToken)
    },[expoPushToken])

    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
        <Text>Alarm</Text>
    </View>
    );
}