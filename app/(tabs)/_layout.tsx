import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import useVibration from "../hooks/useVibration";

export default () => {

    const virbrate = useVibration();
    useEffect(() => virbrate());

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: 'black',
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