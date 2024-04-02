import axios from "axios";
import { UserType } from "../@type/user";
import { sendPushNotification } from "../@hooks/usePushNotifications";

export default async function register({
        token,
        name,
        age,
        phone,
        gender,
        school,
        schoolLocation,
        requestFriendIds,
    }: {
        token: string;
        name: string;
        age: number;
        phone: string;
        gender: "남자" | "여자";
        school?: string;
        schoolLocation?: string;
        requestFriendIds?: number[];
    }) {

    const {data} = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/user`, {
        token,
        name,
        age,
        phone,
        gender,
        school,
        schoolLocation,
    });
    
    // TODO: 가입시에 저장해서 보내도록 해야함
    // requestFriendIds.forEach(async (id) => {
    //     await sendPushNotification(friend.token, {
    //         title: "새로운 친구 요청",
    //         body: "지금 확인해보세요",
    //         data: {
    //             user: friend,
    //             type: "req_friend",
    //         },
    //     })
    // })

    return data.id;
}