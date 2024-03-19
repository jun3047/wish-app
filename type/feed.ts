import { FeedUserType } from "./user";

export interface FeedType {
    id: number;
    question: string;
    imgUrl: string;
    warnUserIds: number[];
    writer: FeedUserType;
    asker: FeedUserType;
    time: string;
}