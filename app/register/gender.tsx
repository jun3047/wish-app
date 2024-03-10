import { Stack, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';

import { Text, Pressable, TouchableOpacity } from 'react-native';
import styled from '@emotion/native'
import { useRecoilState } from 'recoil';
import { userState } from '../../store/recoilState';

export default () => {

    const [userInfo, setUserInfo] = useRecoilState(userState);

    const setGender = (gender: 'boy' | 'girl') => {
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
        </RegisterWarpper>
    );
}

const GenderButton = ({
    setGender
}:{
    setGender: (gender: 'boy'|'girl')=> void
}) => {

    const onPress = (gender: 'boy'|'girl') => {
        router.push("/register/name")
        setGender(gender)
    }

    return (
        <>
        <RegisterButton>
            <TouchableOpacity onPress={()=>onPress('boy')} style={{paddingTop: 20, width: '100%', height: '100%'}}>
            <Text style={{color: 'white', textAlignVertical: 'center', textAlign: 'center', fontWeight: '800', fontSize: 18,}}>
                boy 🙋🏻‍♂️
            </Text>
            </TouchableOpacity>
        </RegisterButton>
        <RegisterButton>
            <TouchableOpacity onPress={()=>onPress('girl')} style={{paddingTop: 20, width: '100%', height: '100%'}}>
            <Text style={{color: 'white', textAlignVertical: 'center', textAlign: 'center', fontWeight: '800', fontSize: 18,}}>
                girl 🙋🏻‍♀️
            </Text>
            </TouchableOpacity>
        </RegisterButton>
        </>
    )
}

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