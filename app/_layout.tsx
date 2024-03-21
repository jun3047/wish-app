'use client';

import { Redirect, Stack, router } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import useAsyncStorage from '../hooks/useAsyncStorage';
import { UserType } from '../type/user';

const StackLayout = () => {

    const [storedValue, save, load] = useAsyncStorage<UserType>('userInfo');

    useEffect(() => {

        const initIsLogin = async () => {
            const _storedValue = await load()
            console.log('initIsLogin', _storedValue)
            const path = _storedValue?.id === undefined ? 'register/first' : 'home'
            return router.replace(path)
        };
        
        initIsLogin();
    }, []);

    return (
        <RecoilRoot>
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
        </RecoilRoot>
    );
}

export default StackLayout;