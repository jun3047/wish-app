import { Redirect, SplashScreen, Stack, router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import useAsyncStorage from '../@hooks/useAsyncStorage';
import { UserType } from '../@type/user';
import * as Notifications from 'expo-notifications';
import useUser from '../@hooks/useUser';
import { scheduleLocalNotificationAsync } from '../@hooks/usePushNotifications';
import usePoll from '../@hooks/usePoll';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});

const StackLayout = () => {
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();
    const [storedValue, save, load] = useAsyncStorage<UserType>('userInfo');
    const [userInfo, saveUserInfo] = useUser()
    const [pollInfo, savePollInfo] = usePoll()

    const handleNotification = async (data: Record<string, any>) => {

        if(data.pollInfo) savePollInfo(data.pollInfo)
        else if(data.req) {
            const newReq = 
                userInfo.requestFriends.length === 0 ? 
                [data.req]:
                [data.req, ...userInfo.requestFriends]

            saveUserInfo({
                ...userInfo,
                requestFriends: newReq
            })
        }
        else if (data.beFriend) {
            const newFriend = 
                userInfo.friends.length === 0 ? 
                [data.beFriend]:
                [data.beFriend, ...userInfo.friends]

            saveUserInfo({
                ...userInfo,
                friends: newFriend
            })
        }
        else if(data.writer) {
            console.log('writer:', data.writer)
        }
        else if(data.alarm) {
            const newAlarm = 
                userInfo.alarms.length === 0 ? 
                [data.alarm]:
                [data.alarm, ...userInfo.alarms]

            saveUserInfo({
                ...userInfo,
                alarms: newAlarm
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
    

        const initIsLogin = async () => {
            const _storedValue = await load()
            const path = _storedValue?.id === undefined ? 'register/first' : 'home'
            router.navigate(path)
            SplashScreen.hideAsync();
            return;
        };

        // scheduleLocalNotificationAsync({
        //     title: "1",
        //     body: "2",
        //     data: { type: 'local' }
        // })

        initIsLogin();
      
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);



      return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
            <Stack screenOptions={{
                headerStyle: { 
                    backgroundColor: 'black',
                },
                headerTintColor: 'white',
            }}>
                <Stack.Screen
                    options={{
                        headerBackTitleVisible: false, 
                    }}
                    name='register/first'
                />
                <Stack.Screen 
                    options={{
                        headerLeft: () => null,
                        headerBackButtonMenuEnabled: false,
                        headerShown: false,
                    }
                }
                name='(tabs)'
                />
            </Stack>
        </SafeAreaView>
      )
}


export default StackLayout;