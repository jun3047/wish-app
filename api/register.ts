import axios from "axios";
import { ServerUserType, UserType } from "../type/user";
import { sendPushNotification } from "../hooks/usePushNotifications";

export default async function register({
        token,
        name,
        age,
        phone,
        gender,
        school,
        schoolLocation,
        requestFriendInfos,
    }: {
        token: string;
        name: string;
        age: number;
        phone: string;
        gender: "boy" | "girl";
        school?: string;
        schoolLocation?: string;
        requestFriendInfos?: ServerUserType[];
    }) {

    const {data} = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/user`, {
        token,
        name,
        age,
        phone,
        gender,
        school,
        schoolLocation,
        requestFriendIds: requestFriendInfos?.map((friend) => friend.id) || [],
    });
    
    requestFriendInfos.forEach(async (friend) => {

        console.log('sendPushNotification!', friend.token)
        console.log('sendPushNotification!', friend)

        await sendPushNotification(friend.token, {
            title: "새로운 친구 요청",
            body: "지금 확인해보세요",
            data: {
                user: friend,
                type: "req_friend",
            },
        })
    })

    return data.id;
}