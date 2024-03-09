import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const StackLayout = () => {

    useEffect(() => {
        const initIsLogin = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            router.replace(!!userInfo ? 'home' : 'register/first')
        };
        
        initIsLogin();
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
                        headerLeft: () => null,
                        headerBackButtonMenuEnabled: false,
                        headerShown: false,
                    }
                }
                name='(tabs)'
                />
                <Stack.Screen
                    options={{
                        headerBackTitleVisible: false, 
                    }}
                    name='register/first'
                />
            </Stack>
        </SafeAreaView>
    );
}

export default StackLayout;