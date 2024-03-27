import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { useRecoilState } from 'recoil';
import { userState } from '../@store/recoilState';
import { SimpleUserType } from '../@type/user';
import { handleWebPush } from '../@hooks/usePushNotifications';

export const uploadImage = async (body: {
    question: string;
    asker: SimpleUserType;
    writer: SimpleUserType;
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
    
            handleWebPush([{
                token: asker.token,
                data: {
                    title: `${writer.name}님이 내 질문에 대한 사진을 업로드 했어요`,
                    body: `지금 피드에서 확인해봐요`,
                    data: {writer}
                }
            }])

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