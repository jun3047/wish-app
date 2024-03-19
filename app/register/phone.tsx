import { Link, Stack, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text } from 'react-native';
import styled from '@emotion/native'
import { useRecoilState } from 'recoil';
import { userState } from '../../store/recoilState';
import sendMessage from '../../api/sendAuthMsg';

export default () => {

    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [phone, setPhone] = useState<string | null>(null)

    const isPhone = (phone: string) => {
        const regExp = /^010\d{4}\d{4}$/;
        return regExp.test(phone);
    }

    const getRandomSixNumber = () => Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    return (
        <RegisterWarpper>
            <Stack.Screen options={{title: ' '}} />
            <Form
                phone={ phone }
                setPhone={ setPhone }
            />
            <RegisterButton active={isPhone(phone)}>
                <Pressable 
                        onPress={()=>{
                            if (!isPhone(phone)) return;
                            const auth = getRandomSixNumber();
                            sendMessage(phone, auth)
                            setUserInfo({...userInfo, phone: `${phone}+${auth}`})
                            router.push('/register/auth')
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
    phone,
    setPhone
}:{
    phone: string,
    setPhone: React.Dispatch<React.SetStateAction<string | null>>
}) => {

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
        <FormText>전화번호를 입력해주세요</FormText>
        <FormInput
            onChangeText={(text:string)=>{
                setPhone(text)
            }}
            placeholder='01012345678'
            ref={inputRef}
            keyboardType='number-pad' />
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