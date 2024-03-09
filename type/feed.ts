export interface FeedType {
    id: number;
    token: string;
    question: string;
    imgUrl: string;
    warnUserId: number[];
    writerId: number;
    writerName: string;
    askerId: number;
    askerName: string;
    time: string;
}