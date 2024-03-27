import { Link, Stack, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text } from 'react-native';
import styled from '@emotion/native'
import { useRecoilState } from 'recoil';
import { userState } from '../../@store/recoilState';

export default () => {

    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [auth, setAuth] = useState<string | null>(null)

    const authNumber = userInfo.phone.split("+")[1];
    const phone = userInfo.phone.split("+")[0];
    console.log(authNumber)

    const isAuth = (auth: string) => auth === authNumber;
    const isSixDigit = (auth: string) => {
        const regExp = /^\d{6}$/;
        return regExp.test(auth);
    }
    
    return (
        <RegisterWarpper>
            <Stack.Screen options={{title: ' '}} />
            <Form
                auth={ auth }
                setAuth={ setAuth }
            />
            <RegisterButton active={isSixDigit(auth)}>
                <Pressable onPress={()=>{

                    if(!isSixDigit(auth)) return
                    if(!isAuth(auth)) return alert('인증번호가 일치하지 않습니다.')

                    setUserInfo({...userInfo, phone: phone})
                    router.replace('/register/gender')

                }} style={{paddingTop: 20, width: '100%', height: '100%'}}>
                <Text style={{color: 'black', textAlignVertical: 'center', textAlign: 'center', fontWeight: '800', fontSize: 18,}}>
                    다음
                </Text>
                </Pressable>
            </RegisterButton>
        </RegisterWarpper>
    );
}


const Form = ({
    auth,
    setAuth
}:{
    auth: string,
    setAuth: React.Dispatch<React.SetStateAction<string | null>>
}) => {

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
        <FormText>인증번호를 입력해주세요</FormText>
        <FormInput
            onChangeText={(text:string)=>{
                setAuth(text)
            }}
            placeholder='XXXXXX'
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

    ${props => props.active || `
        opacity: 0.5;
    `}
`