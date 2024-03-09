import { Link, Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import styled from '@emotion/native';

export default () => {
    return (
        <RegisterWarpper>
        <Stack.Screen options={{
            title: '친구 추가',
            headerRight: () => (
                <Link style={{color: 'white'}} href="/register/school">Next</Link>
            ),
        }} />
        {
            [1,2,3,4,5].map((item, index) => {
                return (
                    <FriendBox key={index} />
                )
            })
        }
        </RegisterWarpper>
    );
}


const FriendBox = () => {

    return (
        <FriendBoxWarpper>
            <Avator />
            <TextBowWarpper>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '800'}}>
                    친구 추가
                </Text>
                <Text style={{color: 'white', fontSize: 13, fontWeight: '100'}}>
                    함께 아는 친구 1명
                </Text>
            </TextBowWarpper>
            <View style={{flex:1}} />
            <CheckMark active={true} />
        </FriendBoxWarpper>
    )
}

interface FriendBoxProps {
    active: boolean;
}

const CheckMark = styled.View<FriendBoxProps>`
    background-color: ${props => props.active ? 'white' : 'transparent'};
    width: 24px;
    height: 24px;
    border-radius: 12px;
    border: 2px solid white;
`

const Avator = styled.View`
    width: 40px;
    height: 40px;
    background-color: #909090;
    border-radius: 20px;
    margin-right: 20px;
`

const TextBowWarpper = styled.View`
    display: flex;
    align-items: left;
    gap: 3px;
`

const FriendBoxWarpper = styled.Pressable`
    width: 100%;
    height: 63px;
    background-color: black;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: row;
    margin: 4px 0;
`

const RegisterWarpper = styled.View`
    flex: 1;
    background-color: black;
    display: flex;
    align-items: center;
    padding: 0 17px;
    padding-top: 20px;
`