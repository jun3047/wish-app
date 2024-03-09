import { Link, Stack } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Text } from 'react-native';
import styled from '@emotion/native'

export default () => {
    return (
        <RegisterWarpper>
            <Stack.Screen options={{title: ' '}} />
            <Form />
            <RegisterButton>
                <Link style={{paddingTop: 20, width: '100%', height: '100%'}} href="/register/gender">
                <Text style={{color: 'black', textAlignVertical: 'center', textAlign: 'center', fontWeight: '800', fontSize: 18,}}>
                    다음
                </Text>
                </Link>
            </RegisterButton>
        </RegisterWarpper>
    );
}


const Form = () => {

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
        <FormText>인증번호를 입력해주세요</FormText>
        <FormInput ref={inputRef} keyboardType='number-pad' />
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


const RegisterButton = styled.View`

    margin-top: 40%;
    border-radius: 40px;
    height: 60px;
    width: 300px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: white;
`