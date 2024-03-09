import { Stack } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import * as Update from "expo-updates";
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {

    const setUserData = async () => {
        const userInfo = {
            name: 'test',
            age: 20,
        }
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    };

    return (
        <RegisterWarpper>
            <Stack.Screen options={{
                title: '학교 추가',
                headerRight: () => (
                    <Pressable onPress={ async ()=> {
                            await setUserData()
                            await Update.reloadAsync()
                        }}>
                        <Text style={{color: 'white'}}>Next</Text>
                    </Pressable>
                ),
            }} />
            <SearchBar />
            {
                [1,2,3,4,5, 1,2,3,4,5].map((item, index) => {
                    return (
                        <SchoolBox key={index} />
                    )
                })
            }
        </RegisterWarpper>
    );
}


const SchoolBox = () => {

    const active = true

    return (
        <SchoolBoxWarpper active={active}>
            <Avator />
            <TextBowWarpper>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '800'}}>
                    월산중학교
                </Text>
                <Text style={{color: 'white', fontSize: 13, fontWeight: '100'}}>
                    경상남도 고성군
                </Text>
            </TextBowWarpper>
        </SchoolBoxWarpper>
    )
}

const SearchBar = () => {

    return (
        <SearchBarWarpper>
            <Ionicons
                name='search'
                size={24}
                color='#909090'
                style={{marginRight: 10}}
            />
            <SearchBarInput placeholder='학교를 입력하세요'/>
        </SearchBarWarpper>
    )
}

const SearchBarInput = styled.TextInput`
    font-size: 16px;
    color: white;
    width: 100%;
`

const SearchBarWarpper = styled.View`
    margin: 14px 0;
    background-color: #1C1C1E;
    width: 100%;
    border-radius: 10px;

    padding: 12px;

    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
`


const Avator = styled.View`
    width: 40px;
    height: 40px;
    background-color: #909090;
    border-radius: 20px;
    margin: 0 20px 0 11px;
`

const TextBowWarpper = styled.View`
    display: flex;
    align-items: left;
    gap: 3px;
`

interface SchoolBoxProps {
    active: boolean;
}

const SchoolBoxWarpper = styled.Pressable<SchoolBoxProps>`
    width: 100%;
    height: 63px;
    background-color: ${props => props.active ? '#2A2A2A':'black'};
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: row;
    border-radius: 20px;
    margin: 4px 0;
`

const RegisterWarpper = styled.View`
    flex: 1;
    background-color: black;
    display: flex;
    align-items: center;
    padding: 0 17px;
`