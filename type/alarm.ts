import { ServerUserType } from "./user";

export interface AlarmType {
    id: number;
    question: string;
    asker: ServerUserType;
}