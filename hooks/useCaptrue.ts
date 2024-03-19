// useCapture.ts
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { RefObject } from 'react';

const useCapture = (ref: RefObject<any>) => {

    const captureComponent = async () => {
        try {
            const uri = await captureRef(ref, {
                format: 'png',
                quality: 0.8,
            });

            return uri;

        } catch (error) {

            console.error('Error saving photo', error);
            return null;
        }
    };

    return captureComponent;
};

export default useCapture;