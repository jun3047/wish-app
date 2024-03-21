import React, { useEffect, useRef } from 'react';
import CustomWebView from '../../components/CustomWebView';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { scheduleLocalNotificationAsync, sendPushNotification } from '../../hooks/usePushNotifications';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import { UserType } from '../../type/user';
import { useUser } from '@realm/react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default () => {

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const [userInfo, saveUserInfo] = useUser()

  const handleNotification = async (data: Record<string, any>) => {

    const newUesrInfo = {
      ...userInfo,
      age: userInfo.age += 10,
    }

    alert(data.type)

    saveUserInfo(newUesrInfo) 
  }

  useEffect(() => {
  
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      const data = notification.request.content.data;
      handleNotification(data)
    });
    
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data
      handleNotification(data)
    });

    // scheduleLocalNotificationAsync();
  
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);  
  
  return (
    <CustomWebView uri={'home'} />
    )
}