import { Link, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import styled from '@emotion/native';
import * as Update from "expo-updates";
import getRecommendFriends from '../../api/getRecommendFriends';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/recoilState';
import register from '../../api/register';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import { registerForPushNotificationsAsync } from '../../hooks/usePushNotifications';
import { UserType } from '../../type/user';
import useUser from '../../hooks/useUser';

export default () => {

    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [user, save] = useUser()

    const [recommendFriendList, setRecommendFriendList] = useState<UserType[]|null>()
    const [selectedFriendList, setSelectedFriendList] = useState<UserType[]>([])

    const registerUser = async () => {

        const token = await registerForPushNotificationsAsync()
        const id = await register({...userInfo, token })

        await save({ ...userInfo, token, id, friendIds: [], requestFriendIds: [], addFriendIds: [], feedIds: []})

        setUserInfo({
            ...userInfo,
            token,
        })
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
            renderItem={({item}) => (
                <FriendBox
                    item={item}
                    active={selectedFriendList.some(friend => item.id === friend.id)}
                    onPress={(_item)=> {
                        selectedFriendList.some(friend => _item.id === friend.id) ?
                        setSelectedFriendList(selectedFriendList.filter((friend)=>friend.id !== _item.id)) :
                        setSelectedFriendList([...selectedFriendList, _item])
                    }}
                />
            )}
        />
        </RegisterWarpper>
    );
}


const FriendBox = ({
    item,
    active,
    onPress
}: {
    item: UserType;
    active: boolean;
    onPress: (id: UserType)=>void;
}) => {

    return (
        <FriendBoxWarpper onPress={()=>onPress(item)}>
            <Avator />
            <TextBowWarpper>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '800'}}>
                    {item.name}
                </Text>
                <Text style={{color: 'white', fontSize: 13, fontWeight: '100'}}>
                    {item.age}살 {item.school}
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