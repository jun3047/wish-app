'use client';

import { Link, Stack, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text } from 'react-native';
import styled from '@emotion/native'
import { useRecoilState } from 'recoil';
import { userState } from '../../@store/recoilState';

export default () => {

    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [age, setAge] = useState<number | null>(null)

    return (
        <RegisterWarpper>
            <Stack.Screen options={{title: ' '}} />
            <Form setValue={setAge} />
            <RegisterButton active={!(age === null || isNaN(age))}>
                <Pressable 
                    onPress={()=>{
                        if (age === null || isNaN(age)) return;
                        setUserInfo({...userInfo, age})
                        router.push('/register/phone')
                    }}
                    style={{paddingTop: 20, width: '100%', height: '100%'}}
                >
                <Text style={{color: 'black', textAlignVertical: 'center', textAlign: 'center', fontWeight: '800', fontSize: 18,}}>
                    다음
                </Text>
                </Pressable>
            </RegisterButton>
        </RegisterWarpper>
    );
}


const Form = ({
    setValue
}:{
    setValue: React.Dispatch<React.SetStateAction<number | null>>
}) => {

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
        <FormText>나이를 입력해주세요</FormText>
        <FormInput
            onChangeText={(text:string)=>{
                console.log('text:', text)
                setValue(parseInt(text))
            }}
            placeholder='XX'
            ref={inputRef} 
            keyboardType='number-pad'
        />
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

const FormInput = styled.TextInput`
    font-size: 22px;
    color: white;
    background-color: #242224;
    width: 100%;
    padding: 20px 16px;
    height: 58px;
    border-radius: 29px;
`


const FormText = styled.Text`
    font-size: 22px;
    color: white;
    width: 100%;
    text-align: left;
    font-weight: 800;
    margin-bottom: 20px;
`


const RegisterButton = styled.View<{active: boolean}>`

    margin-top: 40%;
    border-radius: 40px;
    height: 60px;
    width: 300px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: white;

    ${props=>!props.active && `
        opacity: 0.5;
    `}
`