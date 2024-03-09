import { Link, Stack } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import styled from '@emotion/native'

export default () => {
    return (
        <RegisterWarpper>
            <Stack.Screen options={{headerShown: false, headerTitle: ' '}} />
            <RegisterLogoText>WANT</RegisterLogoText>
            <RegisterSubText>친구들이 원하는</RegisterSubText>
            <RegisterSubText>당신의 사진</RegisterSubText>
            <RegisterButton>
                <Link style={{paddingTop: 20, width: '100%', height: '100%'}} href="/register/age">
                <Text style={{color: 'black', textAlignVertical: 'center', textAlign: 'center', fontWeight: '800', fontSize: 18,}}>시작하기</Text>
                </Link>
            </RegisterButton>
            <RegisterTermsText>진행시 이용약관과 개인정보 처리방침에</RegisterTermsText>
            <RegisterTermsText>동의한 것으로 간주합니다.</RegisterTermsText>
        </RegisterWarpper>
    );
}

const RegisterWarpper = styled.View`
    flex: 1;
    background-color: black;
    display: flex;
    align-items: center;
`

const RegisterLogoText = styled.Text`
    margin-top: 50%;
    font-size: 36px;
    color: white;
    text-align: center;
    font-weight: 900;
    margin-bottom: 12px;
`

const RegisterSubText = styled.Text`
    font-size: 24px;
    color: grey;
    text-align: center;
    font-weight: 800;
`

const RegisterButton = styled.View`

    margin-top: 50%;
    border-radius: 40px;
    height: 60px;
    width: 300px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: white;
    margin-bottom: 10%;
`

const RegisterTermsText = styled.Text`
    color: grey;
    font-size: 13px;
`