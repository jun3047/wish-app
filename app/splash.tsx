import styled from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default () => {

    return (
        <SafeAreaView style={{flex: 1, display:'flex', justifyContent: 'center', alignContent: 'center', backgroundColor: 'black'}}>
            <RegisterLogoText style={{color: 'white'}}>Splash</RegisterLogoText>
        </SafeAreaView>
    );
}

const RegisterLogoText = styled.Text`
    margin-top: 50%;
    font-size: 36px;
    color: white;
    text-align: center;
    font-weight: 900;
    margin-bottom: 12px;
`