import { Stack, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';

import { Text, Pressable, TouchableOpacity } from 'react-native';
import styled from '@emotion/native'
import { useRecoilState } from 'recoil';
import { userState } from '../../@store/recoilState';

export default () => {

    const [userInfo, setUserInfo] = useRecoilState(userState);

    const setGender = (gender: '남자' | '여자') => {
        setUserInfo({
            ...userInfo,
            gender
        })
    }
    
    return (
        <RegisterWarpper>
            <Stack.Screen options={{title: ' '}} />
            <FormText>성별을 선택해주세요</FormText>
            <GenderButton
                setGender={setGender}
            />
            <AuthText>성별은 다른이에게 익명으로 알림이 보낼 때, 최소한으로 제공되는 정보 이외로는 활용되지 않습니다. 응답은 선택사항입니다.</AuthText>
        </RegisterWarpper>
    );
}

const GenderButton = ({
    setGender
}:{
    setGender: (gender: '남자'|'여자')=> void
}) => {

    const onPress = (gender: '남자'|'여자') => {
        router.push("/register/name")
        setGender(gender)
    }

    return (
        <>
        <RegisterButton>
            <TouchableOpacity onPress={()=>onPress('남자')} style={{paddingTop: 20, width: '100%', height: '100%'}}>
            <Text style={{color: 'white', textAlignVertical: 'center', textAlign: 'center', fontWeight: '800', fontSize: 18,}}>
                남자 🙋🏻‍♂️
            </Text>
            </TouchableOpacity>
        </RegisterButton>
        <RegisterButton>
            <TouchableOpacity onPress={()=>onPress('여자')} style={{paddingTop: 20, width: '100%', height: '100%'}}>
            <Text style={{color: 'white', textAlignVertical: 'center', textAlign: 'center', fontWeight: '800', fontSize: 18,}}>
                여자 🙋🏻‍♀️
            </Text>
            </TouchableOpacity>
        </RegisterButton>
        <RegisterButton>
            <TouchableOpacity onPress={()=>onPress('여자')} style={{paddingTop: 20, width: '100%', height: '100%'}}>
            <Text style={{color: 'white', textAlignVertical: 'center', textAlign: 'center', fontWeight: '800', fontSize: 18,}}>
                응답하지 않음 🤷🏻‍♂️
            </Text>
            </TouchableOpacity>
        </RegisterButton>
        </>
    )
}

const AuthText = styled.Text`
    position: absolute;

    bottom: 10%;
    font-size: 13px;
    color: #646464;
    width: 100%;
    text-align: center;
    font-weight: 800;
    margin-bottom: 20px;
`

const RegisterWarpper = styled.View`
    flex: 1;
    background-color: black;
    display: flex;
    align-items: center;
    padding: 0 37px;
    padding-top: 20%;
`


const FormText = styled.Text`
    font-size: 22px;
    color: white;
    width: 100%;
    text-align: left;
    font-weight: 800;
    margin-bottom: 20px;
`


const RegisterButton = styled.View`

    border-radius: 40px;
    height: 60px;
    width: 300px;
    margin-bottom: 20px;
    font-weight: 900;
    
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #242224;
`