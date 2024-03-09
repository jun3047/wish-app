import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
            <Link href="/detail/1">1</Link>
            <Link href="/detail/2">2</Link>
            <Link href="/detail/3">3</Link>
        </View>
    );
}