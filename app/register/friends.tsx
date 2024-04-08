import { Link, Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from 'react-native';
import styled from '@emotion/native';
import getRecommendFriends from '../../@api/getRecommendFriends';
import { useRecoilState } from 'recoil';
import { userState } from '../../@store/recoilState';
import register from '../../@api/register';
import { registerForPushNotificationsAsync } from '../../@hooks/usePushNotifications';
import { SimpleUserType, UserType } from '../../@type/user';
import useUser from '../../@hooks/useUser';
import { useNavigation } from 'expo-router'
import { CommonActions } from '@react-navigation/native'
import pushApi from '../../@api/push';
import makeUserSimple from '../../@util/makeUserSimple';
import usePoll from '../../@hooks/usePoll';
import useContacts from '../../@hooks/useContacts';
import friendApi from '../../@api/friend';

export default () => {

    const navigation = useNavigation();

    const handleResetAction = () => {
      navigation.dispatch(CommonActions.reset({
        routes: [{key: "(tabs)", name: "(tabs)"}]
      }))
    }

    const [userInfo, setUserInfo] = useRecoilState(userState);
    const [user, save] = useUser()
    const [poll, savePoll] = usePoll()
    // const { getContacts} = useContacts()
    
    const [recommendFriendList, setRecommendFriendList] = useState<UserType[]|null>()
    const [selectedFriendList, setSelectedFriendList] = useState<SimpleUserType[]>([])
    const [registering, setRegistering] = useState(false)
    const [friendLoading, setFriendLoading] = useState(true)

    const registerUser = async (selectedFriendList: SimpleUserType[]) => {

        const token = await registerForPushNotificationsAsync()
        const id = await register({...userInfo, token })

        await save({
            ...userInfo,
            token,
            id,
            friends: selectedFriendList,
            requestFriends: [],
            receivedFriends: [],
            feedIds: [],
            alarms: [],
        })
        
        setUserInfo({ ...userInfo, token, })
        savePoll({ question: null, nextTime: '' })

        return {id, token}
    };


    const beFriend = async (simpleUser: SimpleUserType, targetUser: SimpleUserType) => {
        friendApi.beFriend(simpleUser, targetUser)
        pushApi.reciveFriend(simpleUser, targetUser.token)
      }

    useEffect(()=>{

        (async () => {

            // const contacts = await getContacts()

            const _recommendFriendList = await getRecommendFriends({
                phoneList: [],
                school: userInfo.school,
                schoolLocation: userInfo.schoolLocation
            })
            setRecommendFriendList(_recommendFriendList)
            setFriendLoading(false)

        })()
            
    }, [])

    return (
        <RegisterWarpper>
        <Stack.Screen options={{
            title: '친구 추가',
            headerRight: () => (
                registering ? 
                <ActivityIndicator color="white" />
                :
                <Pressable onPress={ async ()=> {

                    const res = await new Promise((resolve, reject) => {
                        Alert.alert(
                        'WISH는 투표를 받아야 글을 쓸 수 있어요',
                        '첫 번째 알림은 WISH 앱에서 보내줄게요',
                        [
                            {text: '좋아요', onPress: () => resolve(true)},
                            {text: '취소', onPress: () => resolve(false), style: 'cancel'},
                        ]
                        )
                    })

                    if(!res) return

                    setRegistering(true)
                    const {id, token} = await registerUser(selectedFriendList)

                    const simpleUser = makeUserSimple({...user, id, token})
                    selectedFriendList.map((friend)=>{
                        beFriend(simpleUser, friend)
                    })

                    pushApi.poll(
                        makeUserSimple({...user, id, token: undefined}),
                        token,
                        '최근에 찍은 가장 좋아하는 사진이 뭐야?'
                    )

                    setRegistering(false)
                    handleResetAction()
                }}>
                <Text style={{color: 'white'}}>
                    {selectedFriendList.length === 0 ? '가입하기' : '선택 완료'}
                </Text>
                </Pressable>
            ),
        }} />

        {
            friendLoading ? 
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color="white" />
            </View>
            
            :

            !recommendFriendList?.length ?
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 24, fontWeight: '800'}}>
                와 우리학교 첫 유저입니다 🥳
            </Text>
            <Text style={{color: 'white', fontSize: 24, fontWeight: '800'}}>
                친구들을 초대해보세요~!
            </Text>
            </View>

            :

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
        }
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