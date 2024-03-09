export interface UserType {
    id: number;
    token: string;
    name: string;
    age: number;
    phone: string;
    gender: "boy" | "girl";
    school: string;
    friendIds: string[];
    requestFriendIds: string[];
    feedIds: number[];
}