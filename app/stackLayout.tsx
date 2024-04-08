import { Redirect, SplashScreen, Stack, router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import useAsyncStorage from '../@hooks/useAsyncStorage';
import { SimpleUserType, UserType } from '../@type/user';
import * as Notifications from 'expo-notifications';
import useUser from '../@hooks/useUser';
import usePoll from '../@hooks/usePoll';
import useGrant from '../@hooks/useGrant';

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
    const [alarmGrant, changeAlarmGrant] = useGrant()

    const handleNotification = async (data: Record<string, any>) => {

        const user = await load()

        if(data.pollInfo) savePollInfo(data.pollInfo)
        // else if(data.req) {

        //     const newReq =
        //     !user?.receivedFriends?.length ?
        //         [data.req]:
        //         [data.req, ...user.receivedFriends]

        //     await saveUserInfo({
        //         ...user,
        //         receivedFriends: newReq
        //     })
        // } 일방적인 친구 받기로 변경하면서 현재 사용하지 않음
        else if (data.beFriend) {
            const newFriend = 
                !user?.friends?.length ? 
                [data.beFriend]:
                [data.beFriend, ...user.friends]

            await saveUserInfo({
                ...user,
                friends: newFriend,
                requestFriends: user.requestFriends.filter((user: SimpleUserType) => user.id !== data.beFriend.id)
            })
        }
        else if(data.writer) {
            console.log('writer:', data.writer)
        }
        else if(data.alarm) {
            const newAlarm = 
                !user?.alarms?.length ?
                [data.alarm]:
                [data.alarm, ...user.alarms]

            await saveUserInfo({
                ...user,
                alarms: newAlarm
            })
        }
    }

    const initPush = () => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: alarmGrant,
              shouldPlaySound: alarmGrant,
              shouldSetBadge: false,
            }),
        });
    }

    const initIsLogin = async () => {

        const _storedValue = await load()
        const path = _storedValue?.id === undefined ? 'register/first' : 'home'
        router.replace(path)

        SplashScreen.hideAsync();
        return;
    };

    useEffect(() => {

        initIsLogin();
        initPush();
  
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          const data = notification.request.content.data;
          handleNotification(data)
        });
        
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          const data = response.notification.request.content.data
          handleNotification(data)
        });
      
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