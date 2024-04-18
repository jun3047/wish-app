import { RecoilRoot } from "recoil";
import StackLayout from "./stackLayout";
import * as amplitude from '@amplitude/analytics-react-native';
import { useEffect } from "react";
import * as Updates from 'expo-updates';

  export default () => {

    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();
  
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        alert(`Error fetching latest Expo update: ${error}`);
      }
    }  

    useEffect(() => {
      amplitude.init(process.env.EXPO_PUBLIC_AMPLITUDE_KEY);
      onFetchUpdateAsync()
    }, []);

    return (
        <RecoilRoot>
          <StackLayout />
        </RecoilRoot>
    );
}