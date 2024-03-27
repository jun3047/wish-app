import axios from "axios";

export default async function getRecommendFriends({
        phoneList,
        school,
        schoolLocation,
    }: {
        phoneList: string[];
        school?: string;
        schoolLocation?: string;
    }) {

    const {data} = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/friend/recommend`, {
        phoneList,
        school,
        schoolLocation,
    });

    const _data = data.map((friend) => {
        return {
            name: friend.name,
            age: friend.age,
            id: friend.id,
            school: friend.school,
            schoolLocation: friend.schoolLocation,
            gender: friend.gender,
            token: friend.token,
        }
    });

    return _data;
}