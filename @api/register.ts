import axios from "axios";

export default async function register({
        token,
        name,
        age,
        phone,
        gender,
        school,
        schoolLocation,
    }: {
        token: string;
        name: string;
        age: number;
        phone: string;
        gender: "남자" | "여자";
        school?: string;
        schoolLocation?: string;
    }) {

    alert('register 시작' + JSON.stringify({token, name, age, phone, gender, school, schoolLocation}))

    const {data} = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/user`, {
        token,
        name,
        age,
        phone,
        gender,
        school,
        schoolLocation,
    });

    return data.id;
}