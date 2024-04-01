import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { loaclPollInfoState } from '../@store/recoilState';
import { PollType } from '../@type/poll';

export default function usePoll() {

  const [poll, setPoll] = useRecoilState(loaclPollInfoState)

  const load = async () => {
    try {
      const value = await AsyncStorage.getItem('pollInfo');
      if (value !== null) {
        setPoll(JSON.parse(value));

        return JSON.parse(value)
      }
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
    }
  };

  const save = async (value: PollType | null) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('pollInfo', jsonValue);
      setPoll(value);
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return [poll, save] as const;
}