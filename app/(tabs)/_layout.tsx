import { Tabs, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import useVibration from "../../@hooks/useVibration";
import * as amplitude from '@amplitude/analytics-react-native';

export default () => {

    const virbrate = useVibration();
    const pathname = usePathname();

    useEffect(() => {

        let routeName = '';

        if(pathname.includes('alarm/')) {
            routeName = 'alarmDetail'
        }else if(pathname.includes('camera/')) {
            routeName = 'camera'
        }else{
            const route = pathname.split('/')[1]
            routeName = route
        }

        amplitude.track(`view_${routeName}`)
        virbrate()
    });

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: 'black',
                borderTopWidth: 0,
            },
        }}>
            <Tabs.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    title: '홈',
                }}             
                name="home" />
            <Tabs.Screen 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                    title: '친구',
                }}
                name="friend" />
            <Tabs.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={size} color={color} />
                    ),
                    title: '알람',
                }}
                name="alarm" />
            <Tabs.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                    title: '마이',
                }}
                name="my" />
        </Tabs>
    );
}