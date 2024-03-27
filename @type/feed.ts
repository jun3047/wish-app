import { UserType } from "./user";

export interface FeedType {
    id: number;
    question: string;
    imgUrl: string;
    warnUserIds: number[] | [];
    writer: UserType;
    asker: UserType;
    time: string;
}