import { Link, Stack, router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, Text } from 'react-native';
import styled from '@emotion/native'
import { useRecoilState } from 'recoil';
import { userState } from '../../@store/recoilState';
import sendMessage from '../../@api/sendAuthMsg';

export default () => {

    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [phone, setPhone] = useState<string | null>(null)

    const isPhone = (phone: string) => {
        const regExp = /^010\d{4}\d{4}$/;
        return regExp.test(phone);
    }

    const getRandomSixNumber = () => Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    const createCheckButtonAlert = (number: string): Promise<boolean>  => {
        return new Promise((resolve, reject) => {
          Alert.alert(
            `${number.slice(0,3)}-${number.slice(3,7)}-${number.slice(7,12)} \n 본인 번호가 맞습니까?`,
            `추후 변경할 수 없습니다`,
            [
                {
                  text: '아닙니다',
                  onPress: () => resolve(false), // '아닙니다' 버튼을 누르면 false를 반환합니다.
                  style: 'destructive',
                },
                {
                text: '맞습니다',
                onPress: () => resolve(true), // '맞습니다' 버튼을 누르면 true를 반환합니다.
                },
            ],
            { cancelable: false } // Android에서 물리적 뒤로 가기 버튼을 사용한 취소를 방지합니다.
          );
        });
      };      


    return (
        <RegisterWarpper>
            <Stack.Screen options={{title: ' '}} />
            <Form
                phone={ phone }
                setPhone={ setPhone }
            />
            <AuthText>WISH는 개인정보를 안전하게 관리합니다. 유저의 연락처는 서버로 안전하게 전송되면, 친구를 추천해주는데만 사용되며, 절대로 동의없는 광고나 스팸 문자를 보내지 않습니다.</AuthText>
            <RegisterButton active={isPhone(phone)}>
                <Pressable 
                        onPress={async ()=>{
                            if (!isPhone(phone)) return;

                            // TODO: 인증번호 승인되면 열어줘야 함
                            const res = await createCheckButtonAlert(phone)

                            if (!res) return;
                            setUserInfo({...userInfo, phone: phone})

                            return router.push('/register/gender')

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
            keyboardType='number-pad'
            defaultValue='010'
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

const AuthText = styled.Text`
    position: absolute;

    bottom: 62%;
    font-size: 13px;
    color: #646464;
    width: 100%;
    text-align: center;
    font-weight: 800;
    margin-bottom: 20px;
`