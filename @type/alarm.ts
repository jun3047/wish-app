import { UserType } from "./user";

export interface AlarmType {
    id: number;
    question: string;
    asker: UserType;
}