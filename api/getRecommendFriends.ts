import axios from "axios";
import env from "../env.json";

export default async function getRecommendFriends({
        phoneList,
        school,
        schoolLocation,
    }: {
        phoneList: string[];
        school?: string;
        schoolLocation?: string;
    }) {

    const API_URL = env["API_URL"]

    console.log(`${API_URL}/friend/recommend`);

    const {data} = await axios.post(`${API_URL}/friend/recommend`, {
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
            gender: friend.gender
        }
    });

    return _data;
}