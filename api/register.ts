import axios from "axios";
import env from "../env.json";

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
        gender: "boy" | "girl";
        school?: string;
        schoolLocation?: string;
        requestFriendIds?: number[];
    }) {

    const API_URL = env["API_URL"]

    const {data} = await axios.post(`${API_URL}/user`, {
        token,
        name,
        age,
        phone,
        gender,
        school,
        schoolLocation,
        requestFriendIds,
    });

    return data.id;
}