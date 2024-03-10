import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { RecoilRoot } from 'recoil';

const StackLayout = () => {

    useEffect(() => {
        const initIsLogin = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');

            // test
            return router.replace('register/first')

            router.replace(userInfo === null ? 'register/first' : 'home')
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