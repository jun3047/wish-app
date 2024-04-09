import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';

export default function useGrant () {

    const [alarmGrant, setAlarmGrant] = useState<boolean>(true);

    const load = async () => {
        try {
          const value = await AsyncStorage.getItem('grant');

          if (value === null) {
            await AsyncStorage.setItem('grant', JSON.stringify({alarm: true}));
            setAlarmGrant(true);
            return;
          }

          setAlarmGrant(JSON.parse(value).alarm);
          console.log('alarmGrant:', JSON.parse(value).alarm);
        } catch (error) {
          console.error('AsyncStorage Error: ', error);
        }
      };
    
      const change = async () => {
        try {
            await AsyncStorage.setItem('grant', JSON.stringify({alarm: !alarmGrant}));
            alert('푸시 알림이 ' + (!alarmGrant ? '켜졌습니다' : '꺼졌습니다'));
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                shouldShowAlert: !alarmGrant,
                shouldPlaySound: !alarmGrant,
                shouldSetBadge: false,
                }),
            });
            setAlarmGrant(!alarmGrant);

        } catch (error) {
          console.error('AsyncStorage Error: ', error);
        }
      };
    
      useEffect(() => {
        load();
      }, []);


    return [
        alarmGrant,
        change
    ] as const;
}