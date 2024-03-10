import { Link, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import styled from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Update from "expo-updates";
import getRecommendFriends from '../../api/getRecommendFriends';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/recoilState';
import register from '../../api/register';

export default () => {

    const [userInfo, setUserInfo] = useRecoilState(userState);

    interface IFriend {
        name: string;
        age: number;
        id: number;
        gender: string;
        school?: string;
        schoolLocation?: string;
    }

    const [recommendFriendList, setRecommendFriendList] = useState<IFriend[]|null>()
    const [selectedFriendList, setSelectedFriendList] = useState<number[]>([])

    const registerUser = async () => {

        setUserInfo({
            ...userInfo,
            requestFriendIds: selectedFriendList
        })

        const id = await register(userInfo)
        
        await AsyncStorage.setItem('userInfo', JSON.stringify({
            ...userInfo,
            id
        }));
    };

    useEffect(()=>{

        (async () => {
            const _recommendFriendList = await getRecommendFriends({
                phoneList: ['01012341234', '01012341235', '01012341236'],
                school: userInfo.school,
                schoolLocation: userInfo.schoolLocation
            })
            setRecommendFriendList(_recommendFriendList)
        })()
            
    }, [])

    return (
        <RegisterWarpper>
        <Stack.Screen options={{
            title: '친구 추가',
            headerRight: () => (
                <Pressable onPress={ async ()=> {
                    await registerUser()
                    await Update.reloadAsync()
                }}>
                <Text style={{color: 'white'}}>
                    {selectedFriendList.length === 0 ? '가입하기' : '선택 완료'}
                </Text>
                </Pressable>
            ),
        }} />
        <FlatList
            style={{width: '100%'}}
            data={recommendFriendList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
                <FriendBox
                    name={item.name}
                    age={item.age}
                    school={item.school}
                    gender={item.gender}
                    id={item.id}
                    active={selectedFriendList.includes(item.id)}
                    onPress={(_id)=> {
                        selectedFriendList.includes(_id) ?
                        setSelectedFriendList(selectedFriendList.filter((id)=>id !== _id)) :
                        setSelectedFriendList([...selectedFriendList, _id])
                    }}
                />
            )}
        />
        </RegisterWarpper>
    );
}


const FriendBox = ({
    name,
    age,
    school,
    gender,
    id,
    active,
    onPress
}: {
    name: string;
    age: number;
    school: string;
    gender: string;
    id: number;
    active: boolean;
    onPress: (id: number)=>void;
}) => {

    return (
        <FriendBoxWarpper onPress={()=>onPress(id)}>
            <Avator />
            <TextBowWarpper>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '800'}}>
                    {name}
                </Text>
                <Text style={{color: 'white', fontSize: 13, fontWeight: '100'}}>
                    {age}살 {school}
                </Text>
            </TextBowWarpper>
            <View style={{flex:1}} />
            <CheckMark active={active} />
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