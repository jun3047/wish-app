import { Link, Stack } from 'expo-router';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FlatList, NativeSyntheticEvent, Pressable, Text, TextInputChangeEventData, View } from 'react-native';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import useSchoolRealm from '../data/School';

export default () => {    

    const {filterItemsByKeyword} = useSchoolRealm()
    const [schoolList, setSchoolList] = useState<any[] | null>(null)
    const [searchValue, setSearchValue] = useState<string>('')
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null)

    useEffect(() => {

        setSchoolList(filterItemsByKeyword(searchValue, 20))

        if (schoolList && schoolList.length > 0) {
            setSelectedSchool(schoolList[0].name)
        }
    }, [searchValue])

    return (
        <RegisterWarpper>
            <Stack.Screen options={{
                title: '학교 추가',
                headerRight: () => (
                    <Link style={{color: 'white'}} href="/register/friends">Next</Link>
                ),
            }} />
            <SearchBar
                value={searchValue}
                setValue={setSearchValue}
            />
            <FlatList
                style={{width: '100%'}}
                data={schoolList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                    <SchoolBox 
                        onPress={()=>setSelectedSchool(item.name)}
                        active={selectedSchool === item.name}
                        name={item.name} 
                        location={item.location} 
                    />
                )}
            />
        </RegisterWarpper>
    );
}


const SchoolBox = ({ name, location, active, onPress }: {
        name: string,
        location: string,
        active: boolean,
        onPress: ()=>void
    }) => {

    return (
        <SchoolBoxWarpper active={active} onPress={onPress}>
            <Avator />
            <TextBowWarpper>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '800'}}>
                    {name}
                </Text>
                <Text style={{color: 'white', fontSize: 13, fontWeight: '100'}}>
                    {location}
                </Text>
            </TextBowWarpper>
        </SchoolBoxWarpper>
    )
}

const SearchBar = ({value, setValue} :{
    value: string,
    setValue: Dispatch<React.SetStateAction<string>>
}) => {

    return (
        <SearchBarWarpper>
            <Ionicons
                name='search'
                size={24}
                color='#909090'
                style={{marginRight: 10}}
            />
            <SearchBarInput 
                value={value}
                onChangeText={(text:string)=>setValue(text)}
                placeholder='본인 학교를 입력하면 바로 나와요'
            />
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