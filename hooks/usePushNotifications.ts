import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    console.log('Must use physical device for Push Notifications');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expo })).data;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

async function scheduleLocalNotificationAsync() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 10 },
    });
  }


  async function handleWebPush(
    pushs: {
      token: string,
      data: {
        title: string,
        body: string,
        data: { [key: string]: any }
      }
    }[]
  ) {

    pushs.forEach(async (push) => {
      await sendPushNotification(push.token, push.data);
    });
  }

  
  async function sendPushNotification(
    expoPushToken: string, 
    data: {
      title: string,
      body: string,
      data: { [key: string]: any }
    }) {

    const message = {
      to: expoPushToken,
      sound: 'default',
      title: data.title,
      body: data.body,
      data: data.data
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

export { 
    registerForPushNotificationsAsync, 
    scheduleLocalNotificationAsync, 
    sendPushNotification,
    handleWebPush
};