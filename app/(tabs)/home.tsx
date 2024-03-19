import React, { useEffect, useRef } from 'react';
import CustomWebView from '../../components/CustomWebView';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { scheduleLocalNotificationAsync, sendPushNotification } from '../../hooks/usePushNotifications';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import { ServerUserType, UserType } from '../../type/user';

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

  const {save} = useAsyncStorage<UserType>('userInfo')
  const userInfo = useAsyncStorage<UserType>('userInfo').storedValue

  const handleNotification = async (data: Record<string, any>) => {

    if (data.type === 'req_friend') {
      await save({
        ...userInfo,
        requestFriendInfos: 
        userInfo?.requestFriendInfos ? 
        [ ...userInfo.requestFriendInfos, data.user as ServerUserType]:
        [ data.user as ServerUserType]
      })
    }

    if (data.type === 'be_friend') {
      await save({
        ...userInfo,
        friendIds: userInfo?.friendIds ?
        [ ...userInfo.friendIds, data.user.id]:
        [ data.user.id]
      })
    }
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