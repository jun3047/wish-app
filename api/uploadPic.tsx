import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { FeedUserType } from '../type/user';
import { useRecoilState } from 'recoil';
import { userState } from '../store/recoilState';

export const uploadImage = async (body: {
    question: string;
    asker: FeedUserType;
    writer: FeedUserType;
    fileUrl: string;
}) => {

    const { question, asker, writer, fileUrl } = body;

    try {

        console.log(`${process.env.EXPO_PUBLIC_API_URL}/feed`)
        console.log({
            question,
            writer,
            asker
        })
        const {data} = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/feed`, {
            question,
            writer,
            asker
        });
    
        const {id, imgUrl} = data;

        const uploadResponse = await FileSystem.uploadAsync(imgUrl, fileUrl, {
            httpMethod: 'PUT',
            headers: {
                'Content-Type': 'image/jpeg', // 이미지의 MIME 타입 설정
            },
        });
    
        if (uploadResponse.status === 200) {
            console.log("Upload successful");
            return id;
        } else {
            console.error("Upload failed", uploadResponse);
            return null;
        }
    } catch (e) {
        console.error("Error uploading file:", e);
        return null;
    }
};