import { atom, useRecoilState, RecoilEnv } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

const useSyncAppData = <T>(atomKey: string, storageKey: string, initValue: any) => {

  const loaclState = atom<T|null>({
    key: atomKey,
    default: initValue,
  });

  const [data, setData] = useRecoilState(loaclState);

  const load = async () => {
    try {
      const value = await AsyncStorage.getItem(storageKey);
      if (value !== null) {
        setData(JSON.parse(value));

        return JSON.parse(value)
      }
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
    }
  };

  const save = async (value: T | null) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storageKey, jsonValue);
      setData(value);
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return [data, save, load] as const;
}


export default useSyncAppData