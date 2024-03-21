import React, { useEffect } from 'react';
import CustomWebView from '../../components/CustomWebView';
import { UserType } from '../../type/user';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import { Pressable, Text } from 'react-native';
import useUser from '../../hooks/useUser';

export default () => {
  
  const [userInfo, saveUserInfo] = useUser()

  const handleNotification = async () => {
    saveUserInfo({
      ...userInfo,
      age: userInfo.age + 20,
    }) 
  }

  return (
    <>
    <Pressable onPress={handleNotification}>
      <Text>
        +10
      </Text>
      <Text>
        {userInfo.age}
      </Text>
    </Pressable>
    <CustomWebView uri={'my'} />
    </>
  )
}