import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

const DetailPage = () => {

    const {id} = useLocalSearchParams()

    return (
        <>
        <Stack.Screen options={{title: '가입'}} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Detail {id}</Text>
        </View>
        </>
    )
}

export default DetailPage