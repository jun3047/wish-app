import { AlarmType } from "./alarm";

export interface UserType {
    id: number;
    token: string;
    name: string;
    age: number;
    phone: string;
    gender: "남자" | "여자";
    feedIds: number[] | [];
    school?: string;
    schoolLocation?: string;
    friends: SimpleUserType[] | [];

    requestFriends: SimpleUserType[] | []; //local only
    receivedFriends: SimpleUserType[] | []; //local only
    alarms: AlarmType[]| [] //local only
}

export interface SimpleUserType {
    id: number;
    token: string;
    name: string;
    age: number;
    phone: string;
    gender: "남자" | "여자";
    feedIds: number[] | null;
    school?: string;
    schoolLocation?: string;
}