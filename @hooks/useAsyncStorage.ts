import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

function useAsyncStorage<T>(key: string) {

  const [storedValue, setStoredValue] = useState<T>(null);

  const load = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setStoredValue(JSON.parse(value));
        return JSON.parse(value)
      }
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
    }
  };

  const save = async (value: T) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setStoredValue(value);
    } catch (error) {
      console.error('AsyncStorage Error: ', error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return [storedValue, save, load] as const;
}

export default useAsyncStorage;
