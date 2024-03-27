import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { loaclUserInfoState } from '../@store/recoilState';
import { UserType } from '../@type/user';

export default function useUser() {

  const [user, setUser] = useRecoilState(loaclUserInfoState)

  const load = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value !== null) {
        setUser(JSON.parse(value));

        return JSON.parse(value)
      }
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
    }
  };

  const save = async (value: UserType) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userInfo', jsonValue);
      setUser(value);
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return [user, save] as const;
}