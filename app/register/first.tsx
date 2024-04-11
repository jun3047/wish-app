import { Link, Stack, router } from 'expo-router';
import React from 'react';
import { Linking, Pressable, Text } from 'react-native';
import styled from '@emotion/native'

export default () => {
    return (
        <RegisterWarpper>
            <Stack.Screen options={{    
                animationTypeForReplace: 'pop',
                headerShown: false, 
                headerTitle: ' '}}
            />
            <RegisterLogoText>WISH</RegisterLogoText>
            <RegisterSubText>친구들이 원하는</RegisterSubText>
            <RegisterSubText>당신의 사진</RegisterSubText>
            <RegisterButton>
                <Pressable 
                    onPress={()=> {
                        console.log('click')
                        router.navigate('/register/age')
                    }}
                    style={{paddingTop: 20, width: '100%', height: '100%'}}
                >
                <Text style={{color: 'black', textAlignVertical: 'center', textAlign: 'center', fontWeight: '800', fontSize: 18,}}>시작하기</Text>
                </Pressable>
            </RegisterButton>
            <RegisterTermsText onPress={()=> {
                Linking.openURL('https://jun3047.notion.site/WISH-f3b840b5dab64244ba6f5771c06ddcb4?pvs=4')
            }}
            >진행시 이용약관과 개인정보 처리방침에</RegisterTermsText>
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